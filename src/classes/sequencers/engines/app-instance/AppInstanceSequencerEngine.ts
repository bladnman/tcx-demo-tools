import TWEvent from '@classes/data/TWEvent.ts';
import { HubAppNames, MajorClientEventTypes } from '@const/EVENT_TYPE.ts';
import isEventWithinSequenceTime from '@utils/event-utils/isEventWithinSequenceTime.ts';
import { fLeft, fLeftBack } from '@utils/MU.ts';
import SequencerEngineBase from '../../SequencerEngineBase.ts';

class AppInstanceSequencerEngine extends SequencerEngineBase {
  static sequenceType: SequenceType = 'appInstance';
  get sequenceType(): SequenceType {
    return AppInstanceSequencerEngine.sequenceType;
  }

  logicEventTypes = [...MajorClientEventTypes, 'Startup'];
  getEventSequenceName(event: TWEvent): string {
    return this.sourceName(event);
  }
  isEventASequenceLogicType(event: TWEvent): boolean {
    if (!this.logicEventTypes.includes(event.twType)) return false;
    // still want you to have an appName
    return !!event.appName && event.appName !== '';
  }
  doesEventCloseSequence(event: TWEvent, sequence: Sequence): boolean {
    // if the sequence is already closed, don't close it again
    if (!this.isSequenceOpen(sequence)) return false;

    const eventApp = event.appName;
    const sequenceApp = sequence.engine.appName as string;
    const eventAppInstanceId = event.getStr('appInstanceId');
    const sameApp = eventApp === sequenceApp;

    // must have an eventApp
    if (!eventApp) return false;

    // using real event.appInstanceId
    // if same appName, but different appInstanceId, close the sequence
    if (eventAppInstanceId && sameApp && eventAppInstanceId !== sequence.id) return true;

    // Check if the event app is non-disruptive
    if (eventApp === 'notification-overlay') return false;

    // Never close an action card sequence
    if (sequenceApp === 'action-card-host-app') {
      // unless it's a startup event
      return event.twType === 'Startup';
    }

    // !Action Cards never disrupt sequences
    // todo: may want to allow for different action card apps to close one another
    if (event.appName === 'action-card-host-app') return false;

    const specialApps = [
      'universal-checkout',
      'action-card-host-app',
      'control-center',
      'game-hub',
    ];
    // Check if the event is non-disruptive
    //   - `eventApp` and `sequenceApp` are specialApps
    //   - they are not the same app
    if (!sameApp && specialApps.includes(eventApp) && specialApps.includes(sequenceApp)) {
      return false;
    }

    // Hub App Sequences
    // rnps-home does not close HUB APPS
    if (HubAppNames.includes(sequenceApp) && eventApp === 'rnps-home') {
      return false;
    }

    // Home UI
    if (sequenceApp === 'rnps-home') {
      // only rnps-home can close rnps-home
      if (eventApp !== 'rnps-home') return false;

      // only the new home location can close rnps-home
      return sequence.name !== this.getEventSequenceName(event);
    }

    // if app-name changes, close the sequence
    return eventApp !== sequenceApp;
  }
  doesEventStartNewSequence(event: TWEvent, openSequences: Sequence[]): boolean {
    // don't start a new sequence if the appInstanceId was already used
    if (this.doesSeqExistForEventAppInstanceId(event)) return false;

    // otherwise, let's look through the sequences to see if this event is part of any of them
    const matchingSequences = openSequences.filter((sequence) => {
      const appInstanceId = event.getStr('appInstanceId');
      if (appInstanceId) return appInstanceId === sequence.id;

      return event.appName === sequence.engine.appName;
    });

    return matchingSequences.length < 1;
  }
  updateNewSequence(event: TWEvent, sequence: Sequence): void {
    // engineCode is the appName
    // this is used later to determine if an event "belongs" to a sequence
    sequence.name = this.getEventSequenceName(event);

    sequence.engine.appName = event.appName;

    // App Instance - special case
    // if the event has an appInstanceId, we want to use that as the id
    const appInstanceId = this.getEventAppInstanceId(event);
    if (appInstanceId) {
      sequence.id = appInstanceId;
    }

    this.isDirty = true;
  }
  doesEventBelongToSequence(event: TWEvent, sequence: Sequence): boolean {
    // App Instance only applied to "client" events, which all have appName
    if (!event.appName) return false;

    // event has an appInstanceId (special case)
    const appInstanceId = event.getStr('appInstanceId');
    if (appInstanceId) {
      return appInstanceId === sequence.id;
    }

    /**
     * App Instance only applied to events from the same app
     *
     * But this is pretty faulty. When we have to rely on the
     * appName we want to only "be part of" sequences where our
     * timestamp falls within the sequence's time window.
     *
     * This prevents an event from being added to every sequence
     * that has the same appName.
     */
    if (!isEventWithinSequenceTime(event, sequence)) return false;
    return event.appName === sequence.engine.appName;
  }
  updateEventOrSequence(event: TWEvent, sequence: Sequence): void {
    if (event.appName === sequence.engine.appName) {
      // startup events in GH have a location of "init"
      // and these often are the first event in a sequence
      // let's patch those names to be more descriptive as
      // later events arrive
      if (sequence.name.includes(': init')) {
        sequence.name = this.getEventSequenceName(event);
      }
    }
  }

  /**
   * ENGINE SPECIFIC METHODS
   */
  // TODO: this seems like it's doing too much
  private getEventAppInstanceId(event: TWEvent): string | undefined {
    const appInstanceId = event.getStr('appInstanceId');
    if (appInstanceId) return appInstanceId;

    const appName = event.appName;
    if (!appName) return undefined;

    /**
     * In game-hub the appInstanceId is already implemented, but
     * ViewableImpressionCollection events do not include it (grr!).
     * In this case we will look for that last open game-hub
     * sequence and use its appInstanceId (or undefined).
     */
    if (event.twType === 'ViewableImpressionCollection' && appName === 'game-hub') {
      const openGameHubSequence = this.getOpenSequences()
        .reverse()
        .find((sequence) => sequence.engine.appName === 'game-hub');
      if (openGameHubSequence) return openGameHubSequence.id;
    }

    return undefined;
  }

  /**
   * In some cases the appInstanceId is not provided in the event.
   * In these situations we don't want to create a new sequence
   * if the appInstanceId was already used in a previous sequence.
   *
   * This is very nuanced and specific to apps that use appInstanceId.
   * But it prevents out-of-order events from creating new sequences
   * when they should not.
   */
  private doesSeqExistForEventAppInstanceId(event: TWEvent): boolean {
    const appInstanceId = event.getStr('appInstanceId');

    // if it doesn't have an appInstanceId, then we don't care
    if (!appInstanceId) return false;

    // presuming that the appInstanceId is the sequence.id
    return !!this.sequenceList.find((sequence) => sequence.id === appInstanceId);
  }
  /**
   * NAME THE SEQUENCE
   *
   * This is simply the app label for many apps. But for some
   * there are better names to use.
   */
  private sourceName(event: TWEvent): string {
    let appName = event.appName ?? '(none)';
    const platformType = event.getStr('platformType');
    if (platformType === 'mobile') {
      appName = `${appName}: ${event.getStr('mobileFeatureArea', '(none)')}`;
    }

    if (
      ['game-hub', 'monte-carlo', 'rnps-home', 'rnps-compilation-disc-hub'].includes(
        appName,
      )
    ) {
      return this.getAppLocationName(event);
    }

    return appName;
  }
  // NAME HELPERS
  private getAppLocationName(event: TWEvent): string {
    const appName = event.appName ?? '(none)';
    let locationScene = event.getStr('locationScene', '(none)');

    if (appName === 'monte-carlo') {
      locationScene = fLeftBack(locationScene, ':');
    } else if (appName === 'psplus-service-hub') {
      locationScene = fLeft(locationScene, ':', locationScene);
    }

    return `${appName}: ${locationScene}`;
  }
}
export default AppInstanceSequencerEngine;
