import SequencerEngineBase from '@pages/telemetry-viewer-page/classes/sequencers/SequencerEngineBase.ts';
import getTvValue from '@pages/telemetry-viewer-page/utils/event-utils/getTvValue.ts';
import {
  HubAppNames,
  MajorClientEventTypes,
} from '@pages/telemetry-viewer-page/constants/EVENT_TYPE.ts';
import { fLeft, fLeftBack } from '@utils/MU.ts';

class AppInstanceSequencerEngine extends SequencerEngineBase {
  sequenceKey = 'appInstance';
  logicEventTypes = [...MajorClientEventTypes, 'Startup'];
  getSequenceName(event: TVEvent): string {
    return this.sourceName(event);
  }
  getSequenceKey(event: TVEvent): string {
    return this.getAppInstanceId(event) ?? this.getSequenceName(event) ?? '(none)';
  }
  isEventASequenceLogicType(event: TVEvent): boolean {
    if (!this.logicEventTypes.includes(event.type)) return false;
    // still want you to have an appName
    return !!event.appName && event.appName !== '';
  }
  doesEventCloseSequence(event: TVEvent, sequence: Sequence): boolean {
    // Overlay never disrupts sequences
    if (event.appName === 'notification-overlay') return false;

    // Action Cards never disrupt sequences
    if (event.appName === 'action-card-host-app') return false;

    // rnps-home does not close HUB APPS
    if (event.appName === 'rnps-home') {
      if (HubAppNames.includes(sequence.type as string)) return false;
    }

    // TODO: rnps-home likely does not have instances unless of a crash
    // only rnps-home can close rnps-home
    if (sequence.type === 'rnps-home' && event.appName !== 'rnps-home') {
      return false;
    }

    const isDifferent = this.getSequenceKey(event) !== sequence.key;
    if (isDifferent) {
      console.log(
        `[🐽](AppInstanceSequencerEngine) CLOSING 
                ❌ ${sequence.type}  x  ${event.appName} (${event.type})`,
      );
    }
    return isDifferent;
  }
  doesEventStartNewSequence(event: TVEvent, openSequences: Sequence[]): boolean {
    // don't start a new sequence if the appInstanceId was already used
    if (this.doesSeqExistForEventAppInstanceId(event)) return false;

    // it is extremely common that an event's sequence key is the same as the last open sequence
    // let's check there first to save some time
    const eventSequenceKey = this.getSequenceKey(event);
    const lastOpenSequence = openSequences.at(-1);
    if (eventSequenceKey === lastOpenSequence?.key) return false;

    // otherwise, let's look through the sequences to see if this event is part of any of them
    const matchingSequences = openSequences.filter(
      (sequence) => sequence.key === eventSequenceKey,
    );

    const isNew = matchingSequences.length < 1;
    if (isNew) {
      console.log(
        `[🐽](AppInstanceSequencerEngine) OPENING 
                ✅ ${event.appName} (${event.type})`,
      );
    }

    return matchingSequences.length < 1;
  }
  updateNewSequence(event: TVEvent, sequence: Sequence): void {
    sequence.type = event.appName;
    this.isDirty = true;
  }
  updateEventOrSequence(event: TVEvent, sequence: Sequence): void {
    /**
     * For appInstanceId sequences, we want events for this application
     * to be updated to include the appInstanceId. This allows other tools
     * to use this information later.
     */
    if (!event.appName || !sequence.key) return;

    if (event.appName === sequence.type) {
      event.sequenceData = (event.sequenceData ?? {}) as EventSequenceData;
      event.sequenceData[this.sequenceKey] = event.sequenceData[this.sequenceKey] ?? [];
      event.sequenceData[this.sequenceKey].push(sequence.key);
    }
  }

  /**
   * ENGINE SPECIFIC METHODS
   */
  protected getAppInstanceId(event: TVEvent): string | undefined {
    const appInstanceId = getTvValue(event, 'appInstanceId') as string | undefined;
    if (appInstanceId) return appInstanceId;

    const appName = getTvValue(event, 'appName') as string | undefined;
    if (!appName) return undefined;

    /**
     * In game-hub the appInstanceId is already implemented, but
     * ViewableImpressionCollection events do not include it (grr!).
     * In this case we will look for that last open game-hub
     * sequence and use its appInstanceId (or undefined).
     */
    if (event.type === 'ViewableImpressionCollection' && appName === 'game-hub') {
      const openGameHubSequence = this.getOpenSequences()
        .reverse()
        .find((sequence) => sequence.type === 'game-hub');
      if (openGameHubSequence) return openGameHubSequence.key;
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
  private doesSeqExistForEventAppInstanceId(event: TVEvent): boolean {
    const appInstanceId = getTvValue(event, 'appInstanceId') as string | undefined;

    // if it doesn't have an appInstanceId, then we don't care
    if (!appInstanceId) return false;

    // presuming that the appInstanceId is the sequence.key
    return !!this.sequenceList.find((sequence) => sequence.key === appInstanceId);
  }
  /**
   * NAME THE SEQUENCE
   *
   * This is simply the app name for many apps. But for some
   * there are better names to use.
   */
  protected sourceName(event: TVEvent): string {
    const appName = getTvValue(event, 'appName', '(none)') as string;

    if (['game-hub', 'monte-carlo', 'rnps-compilation-disc-hub'].includes(appName)) {
      return this.getAppLocationName(event);
    }

    return appName;
  }
  // NAME HELPERS
  private getAppLocationName(event: TVEvent): string {
    const appName = getTvValue(event, 'appName', '(none)') as string;
    let locationScene = getTvValue(event, 'locationScene', '(none)') as string;

    if (appName === 'monte-carlo') {
      locationScene = fLeftBack(locationScene, ':');
    } else if (appName === 'psplus-service-hub') {
      locationScene = fLeft(locationScene, ':', locationScene);
    }

    return `${appName}: ${locationScene}`;
  }
}
export default AppInstanceSequencerEngine;
