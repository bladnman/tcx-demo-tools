import uuid from 'react-uuid';

abstract class SequencerEngineBase {
  // temporary storage for sequences
  protected sequenceList: Sequence[] = [];
  protected isDirty: boolean = false;

  protected abstract getSequenceName(event: TVEvent): string;
  protected abstract getSequenceKey(event: TVEvent): string;

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
  protected startNewSequence(event: TVEvent): void {
    const newSequence: Sequence = {
      name: this.getSequenceName(event),
      key: this.getSequenceKey(event),
      beginMs: event.timeMs,
      id: uuid(),
      beginEventId: event.id,
    };
    this.updateNewSequence(event, newSequence);
    this.sequenceList.push(newSequence);
    this.isDirty = true;
  }
  protected isSequenceOpen(sequence: Sequence): boolean {
    return !sequence.endEventId;
  }
  protected isEventTimeWithinSequence(event: TVEvent, sequence: Sequence): boolean {
    if (!sequence.endMs) return event.timeMs >= sequence.beginMs;
    return event.timeMs >= sequence.beginMs && event.timeMs <= sequence.endMs;
  }

  private static instances: Map<string, SequencerEngineBase> = new Map();
  private processLogicEvent(event: TVEvent, openSequences: Sequence[]): void {
    /**
     * LOGIC EVENTS
     *
     * The engine gets to declare what is a valid event for its logic.
     * Events that are needed to determine where sequences start and end
     * are considered "logic" events.
     */
    // CHECK EVENT AGAINST EACH OPEN SEQUENCE
    openSequences.forEach((sequence) => {
      // PROCESS EVENTS WITHIN SEQUENCE TIME WINDOW
      if (this.isEventTimeWithinSequence(event, sequence)) {
        // attempt to CLOSE SEQUENCE
        if (this.doesEventCloseSequence(event, sequence)) {
          this.closeSequence(event, sequence);
        }

        // UPDATE SEQUENCE
        this.updateEventOrSequence(event, sequence); // allow engine to update sequence
      }
    });

    // START NEW SEQUENCE
    const stillOpenSequences = openSequences.filter((sequence) =>
      this.isSequenceOpen(sequence),
    );
    if (this.doesEventStartNewSequence(event, stillOpenSequences)) {
      this.startNewSequence(event); // also adds event to sequence
    }
  }
  private processNonLogicEvent(event: TVEvent, openSequences: Sequence[]): void {
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
    openSequences.forEach((sequence) => {
      if (this.isEventTimeWithinSequence(event, sequence)) {
        this.updateEventOrSequence(event, sequence); // allow engine to update sequence
      }
    });
  }
  private closeSequence(event: TVEvent, sequence: Sequence) {
    sequence.endMs = event.timeMs;
    sequence.endEventId = event.id;
    this.updateCompletedSequence(event, sequence); // allow engine to update sequence

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
   * Each engine has a unique key to identify its sequences in the event object.
   */
  public abstract sequenceKey: string;
  /**
   * MAIN PROCESSING METHOD
   */
  public processEvents(events: TVEvent[], sequenceList: Sequence[]): Sequence[] {
    this.sequenceList = [...sequenceList];
    this.isDirty = false;

    // CHECK EACH EVENT
    events.forEach((event) => {
      // get open sequences every time
      // since they can be created or closed
      // as each event processes
      const openSequences = this.getOpenSequences();

      // EVENT NOT VALID FOR SEQUENCE LOGIC
      if (!this.isEventASequenceLogicType(event)) {
        this.processNonLogicEvent(event, openSequences);
      }

      // EVENT IS VALID FOR SEQUENCE LOGIC
      else {
        this.processLogicEvent(event, openSequences);
      }
    });

    // NO CHANGES - return the original list
    if (!this.isDirty) return sequenceList;

    // CHANGES - return the new list
    return this.sequenceList;
  }
}
export default SequencerEngineBase;
