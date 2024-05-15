import { EVENT_TYPE_DEF } from '@const/EVENT_TYPE.ts';
import isEventWithinSequenceTime from '@utils/event-utils/isEventWithinSequenceTime.ts';
import uuid from 'react-uuid';

abstract class SequencerEngineBase {
  // temporary storage for sequences
  protected sequenceList: Sequence[] = [];
  protected isDirty: boolean = false;
  protected lastEventTimeMs: number = -1;
  protected debug: boolean = false;

  /**
   * Each engine has a unique key to identify its
   * sequences in the event object.
   */
  // **MUST HAVE** - abstract get sequenceType(): string;
  // static sequenceType: SequenceType;
  abstract get sequenceType(): SequenceType;

  /**
   * To help with efficiency, the engine can determine if it is
   * interested in a given event.
   *
   * **Example:**
   * Many engines do not care about 'native' events.
   *
   * **Note:**
   * If an event is not valid for the engine,
   * it will be ignored and not processed in any way.
   */
  protected abstract isEventASequenceLogicType(event: TVEvent): boolean;

  /**
   * The engine can determine if an event belongs to a sequence.
   *
   * This is a bit different from the "logic" events. This is very
   * engine-specific. Sometimes this will be true of all events. Other
   * times, it will be true if the appName is the same (for example).
   *
   * This typically includes the "start" event and may even include the
   * "end" event. This all depends on the engine's logic.
   */
  protected abstract doesEventBelongToSequence(
    event: TVEvent,
    sequence: Sequence,
  ): boolean;
  protected abstract doesEventCloseSequence(event: TVEvent, sequence: Sequence): boolean;
  protected abstract doesEventStartNewSequence(
    event: TVEvent,
    openSequences: Sequence[],
  ): boolean;

  protected getOpenSequences(): Sequence[] {
    return this.sequenceList.filter((sequence) => this.isSequenceOpen(sequence));
  }
  /**
   * At the end of the processing cycle, the engine can update
   * either the event or the sequence.
   *
   * **Important:**
   * This method is called with every event that is processed.
   * Other methods are called with events that are "valid" for the engine.
   * This allows the engine to update any event within the time window of a sequence.
   *
   */
  // @ts-expect-error - unused parameter
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected updateEventOrSequence(event: TVEvent, sequence: Sequence): void {
    // noop
  }
  // @ts-expect-error - unused parameter
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected updateNewSequence(event: TVEvent, sequence: Sequence): void {
    // noop
  }
  // @ts-expect-error - unused parameter
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected updateCompletedSequence(event: TVEvent, sequence: Sequence): void {
    // noop
  }
  protected startNewSequence(event: TVEvent): Sequence {
    const key = uuid();
    const newSequence: Sequence = {
      name: `${this.sequenceType} ${this.sequenceList.length + 1}`,
      id: key,
      sequenceType: this.sequenceType,
      beginMs: event.timeMs,
      beginEventId: event.id,
      eventCount: 0,
      engine: {},

      isComplete: false,
      isSuccessful: false,
      isFailure: false,
      hasAppErrors: false,
      hasNetErrors: false,
    };
    this.updateNewSequence(event, newSequence);
    this.sequenceList.push(newSequence);
    this.sequenceList.sort((a, b) => a.beginMs - b.beginMs);
    this.isDirty = true;

    this.callEngineToUpdateEvent(event, newSequence);

    if (this.debug) {
      console.log(`[🐽] ${this.sequenceType} - ✅ NEW SEQUENCE: ${newSequence.name}`, {
        event,
        newSequence,
      });
    }

    return newSequence;
  }
  protected isSequenceOpen(sequence: Sequence): boolean {
    return !sequence.endEventId;
  }
  private static instances: Map<string, SequencerEngineBase> = new Map();
  private processLogicEvent(event: TVEvent): void {
    /**
     * LOGIC EVENTS
     *
     * The engine gets to declare what is a valid event for its logic.
     * Events that are needed to determine where sequences start and end
     * are considered "logic" events.
     */
    this.sequenceList.forEach((sequence) => {
      // PROCESS EVENTS WITHIN SEQUENCE TIME WINDOW
      if (isEventWithinSequenceTime(event, sequence)) {
        // attempt to CLOSE SEQUENCE (if not already)
        if (
          this.isSequenceOpen(sequence) &&
          this.doesEventCloseSequence(event, sequence)
        ) {
          this.closeSequence(event, sequence);
        }
      }

      // Possibly update event or sequence
      this.callEngineToUpdateEvent(event, sequence);
    });

    // START NEW SEQUENCE
    const stillOpenSequences = this.sequenceList.filter((sequence) =>
      this.isSequenceOpen(sequence),
    );
    if (this.doesEventStartNewSequence(event, stillOpenSequences)) {
      this.startNewSequence(event); // also adds event to sequence
    }
  }
  private processNonLogicEvent(event: TVEvent): void {
    /**
     * NON-LOGIC EVENTS
     *
     * The engine gets to declare what is a valid event for its logic.
     * The logic is the "sequence" logic, so the engine can ignore events
     * that it does not need to determine where sequences start and end.
     *
     * But, for the events that are non-logic,
     * we still want to be able to update the event or sequence if it is
     * within the time window of an open sequence.
     */
    this.sequenceList.forEach((sequence) => {
      // Possibly update event or sequence
      this.callEngineToUpdateEvent(event, sequence);
    });
  }
  private callEngineToUpdateEvent(event: TVEvent, sequence: Sequence): void {
    if (!this.doesEventBelongToSequence(event, sequence)) return;

    sequence.eventCount++;

    // keep track of some sequence properties
    sequence.hasAppErrors =
      sequence.hasAppErrors || event.type === EVENT_TYPE_DEF.ApplicationError?.type;
    sequence.hasNetErrors =
      sequence.hasNetErrors || event.type === EVENT_TYPE_DEF.NetworkError?.type;

    // ALREADY CLOSED
    // when we find "escapees" (events that belong but show up
    // after the sequence has closed), we need to update the sequence
    // to this event as the close event
    if (!this.isSequenceOpen(sequence)) {
      sequence.endEventId = event.id;
      sequence.endMs = event.timeMs;
    }

    // OPEN SEQUENCE
    else {
      // update the sequence last time
      const prevUpdateMs = sequence.lastUpdateMs ?? sequence.beginMs ?? 0;
      sequence.lastUpdateMs = prevUpdateMs > event.timeMs ? prevUpdateMs : event.timeMs;
      sequence.durationMs = sequence.lastUpdateMs - sequence.beginMs;
    }

    event.sequenceData = (event.sequenceData ?? {}) as EventSequenceData;
    event.sequenceData[this.sequenceType] = event.sequenceData[this.sequenceType] ?? [];
    event.sequenceData[this.sequenceType].push(sequence.id);

    // allow the engine to update the event or sequence
    this.updateEventOrSequence(event, sequence);
  }
  private closeSequence(event: TVEvent, sequence: Sequence) {
    sequence.endMs = event.timeMs;
    sequence.endEventId = event.id;
    sequence.durationMs = sequence.endMs - sequence.beginMs;
    this.updateCompletedSequence(event, sequence); // allow engine to update sequence

    if (this.debug) {
      console.log(
        `[🐽] ${this.sequenceType} - ❌ Close SEQUENCE: ${sequence.name} by ${event.appName}`,
        {
          event,
          sequence,
        },
      );
    }

    this.isDirty = true;
  }

  /**
   * STANDARD METHODS
   */
  public constructor() {}
  static getInstance<T extends SequencerEngineBase>(this: new () => T): T {
    const className = this.name;
    if (!SequencerEngineBase.instances.has(className)) {
      SequencerEngineBase.instances.set(className, new this());
    }
    return SequencerEngineBase.instances.get(className) as T;
  }

  /**
   * MAIN PROCESSING METHOD
   */
  public processEvents(events: TVEvent[], sequenceList: Sequence[]): Sequence[] {
    this.sequenceList = [...sequenceList];
    this.isDirty = false;

    // CHECK EACH EVENT
    events.forEach((event) => {
      /**
       * SEQUENCE LOGIC
       *
       * Some events help the engine determine where sequences start and end.
       * These are considered "logic" events. The engine gets to declare what
       * is a valid event for its logic.
       *
       * Other events are not needed to determine where sequences start and end.
       * But, for the events that are non-logic, we still want to be able to
       * update the event or sequence if it is within the time window of an open sequence.
       */

      // THIS EVENT NOT VALID FOR "SEQUENCE LOGIC"
      if (!this.isEventASequenceLogicType(event)) {
        this.processNonLogicEvent(event);
      }

      // THIS EVENT IS VALID FOR "SEQUENCE LOGIC"
      else {
        this.processLogicEvent(event);
      }

      this.lastEventTimeMs = event.timeMs;
    });

    // NO CHANGES - return the original list
    if (!this.isDirty) return sequenceList;

    // CHANGES - return the new list
    return this.sequenceList;
  }
}
export default SequencerEngineBase;
