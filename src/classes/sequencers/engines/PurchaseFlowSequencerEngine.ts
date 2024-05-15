import { APP_NAMES } from '@const/APPS.ts';
import { EVENT_TYPE_DEF, MajorClientEventTypes } from '@const/EVENT_TYPE.ts';
import { getAppName, getLocationScene } from '@store/event-store/utils/event-utils.ts';
import getTvValue from '@utils/event-utils/getTvValue.ts';
import SequencerEngineBase from '../SequencerEngineBase.ts';

class PurchaseFlowSequencerEngine extends SequencerEngineBase {
  static sequenceType: SequenceType = 'purchaseFlow';
  get sequenceType(): SequenceType {
    return PurchaseFlowSequencerEngine.sequenceType;
  }

  protected doesEventBelongToSequence(_event: TVEvent, sequence: Sequence): boolean {
    return this.isSequenceOpen(sequence);
  }

  protected updateEventOrSequence(event: TVEvent, sequence: Sequence): void {
    const eventApp = getAppName(event) ?? '(none)';
    const eventLocation = getLocationScene(event) ?? '(none)';

    // PURCHASE COMPLETED?
    if (
      event.type === EVENT_TYPE_DEF.Navigation?.type &&
      eventApp === APP_NAMES.UNIVERSAL_CHECKOUT &&
      eventLocation === 'checkout:purchase thank you'
    ) {
      sequence.isSuccessful = true;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected doesEventCloseSequence(event: TVEvent, _sequence: Sequence): boolean {
    const eventApp = getAppName(event) ?? '(none)';
    const eventLocation = getLocationScene(event) ?? '(none)';

    // if game hub restarts, close the sequence
    if (eventApp === APP_NAMES.GAME_HUB) {
      if (eventLocation === 'init') return true;
    }

    return ![
      APP_NAMES.GAME_HUB,
      APP_NAMES.PS_PLUS_SVC_HUB,
      APP_NAMES.UNIVERSAL_CHECKOUT,
    ].includes(getAppName(event) ?? '(none)');
  }

  protected doesEventStartNewSequence(
    event: TVEvent,
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

    const eventApp = getAppName(event) ?? '(none)';
    const eventLocation = getLocationScene(event) ?? '(none)';

    // already in Universal Checkout? Start a sequence
    if (
      eventApp === APP_NAMES.UNIVERSAL_CHECKOUT &&
      event.type === EVENT_TYPE_DEF.Startup?.type &&
      eventLocation !== 'Prelaunch'
    )
      return true;

    // bail - not a purchase APP
    if (!this.purchaseApps.includes(eventApp)) return false;

    if (eventApp === APP_NAMES.GAME_HUB) {
      // only with a purchase button
      const ctaSubType = getTvValue(event, 'ctaSubType') ?? '';
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
  protected isEventASequenceLogicType(event: TVEvent): boolean {
    if (!this.logicEventTypes.includes(event.type)) return false;

    const eventApp = getAppName(event);
    // still want you to have an appName
    if (!eventApp) return false;

    // some apps are not used in our logic
    const isNonLogicApp = this.nonLogicApps.includes(eventApp);
    return !isNonLogicApp;
  }
}
export default PurchaseFlowSequencerEngine;
