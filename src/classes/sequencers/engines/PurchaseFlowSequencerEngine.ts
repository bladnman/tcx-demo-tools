import TWEvent from '@classes/data/TWEvent.ts';
import { APP_NAMES } from '@const/APPS.ts';
import { EVENT_TYPE_DEF, MajorClientEventTypes } from '@const/EVENT_TYPE.ts';
import SequencerEngineBase from '../SequencerEngineBase.ts';

class PurchaseFlowSequencerEngine extends SequencerEngineBase {
  static sequenceType: SequenceType = 'purchaseFlow';
  get sequenceType(): SequenceType {
    return PurchaseFlowSequencerEngine.sequenceType;
  }

  protected doesEventBelongToSequence(_event: TWEvent, sequence: Sequence): boolean {
    return this.isSequenceOpen(sequence);
  }

  protected updateEventOrSequence(event: TWEvent, sequence: Sequence): void {
    const eventApp = event.appName ?? '(none)';
    const eventLocation = event.getStr('locationScene', '(none)');

    // PURCHASE COMPLETED?
    if (
      event.twType === EVENT_TYPE_DEF.Navigation?.type &&
      eventApp === APP_NAMES.UNIVERSAL_CHECKOUT &&
      eventLocation === 'checkout:purchase thank you'
    ) {
      sequence.isSuccessful = true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected doesEventCloseSequence(event: TWEvent, _sequence: Sequence): boolean {
    const eventApp = event.appName ?? '(none)';
    const eventLocation = event.getStr('locationScene', '(none)');

    // if game hub restarts, close the sequence
    if (eventApp === APP_NAMES.GAME_HUB) {
      if (eventLocation === 'init') return true;
    }

    return ![
      APP_NAMES.GAME_HUB,
      APP_NAMES.PS_PLUS_SVC_HUB,
      APP_NAMES.UNIVERSAL_CHECKOUT,
    ].includes(eventApp);
  }

  protected doesEventStartNewSequence(
    event: TWEvent,
    openSequences: Sequence[],
  ): boolean {
    // bail - already a sequence open
    if (openSequences.length) return false;

    /**
     * There are only a few places we show "buy" buttons.
     * - Game Hub
     * - PDP : Game Hub Add-On page
     * - PS Plus Service Hub
     * - Others?
     */

    const eventApp = event.appName ?? '(none)';
    const eventLocation = event.getStr('locationScene') ?? '(none)';

    // already in Universal Checkout? Start a sequence
    if (
      eventApp === APP_NAMES.UNIVERSAL_CHECKOUT &&
      event.twType === EVENT_TYPE_DEF.Startup?.type &&
      eventLocation !== 'Prelaunch'
    )
      return true;

    // bail - not a purchase APP
    if (!this.purchaseApps.includes(eventApp)) return false;

    if (eventApp === APP_NAMES.GAME_HUB) {
      // only with a purchase button
      const ctaSubType = event.getStr('ctaSubType', '');
      return ['add_to_cart', 'in_cart'].includes(ctaSubType as string);
    }

    if (eventApp === APP_NAMES.PS_PLUS_SVC_HUB) {
      // when on "pre" page that offers a purchase
      return eventLocation.includes('pre:ps plus tier selector');
    }

    return false;
  }

  nonLogicApps = [
    APP_NAMES.NOTIFICATION_OVERLAY,
    APP_NAMES.ACTION_CARD_HOST,
    APP_NAMES.CONTROL_CENTER,
  ];
  purchaseApps = [APP_NAMES.GAME_HUB, APP_NAMES.PS_PLUS_SVC_HUB, APP_NAMES.MONTE_CARLO];
  logicEventTypes = [...MajorClientEventTypes, 'Startup'];
  protected isEventASequenceLogicType(event: TWEvent): boolean {
    if (!this.logicEventTypes.includes(event.twType)) return false;

    // still want you to have an appName
    const appName = event.appName;
    if (!appName) return false;

    // some apps are not used in our logic
    return !this.nonLogicApps.includes(appName);
  }
}
export default PurchaseFlowSequencerEngine;
