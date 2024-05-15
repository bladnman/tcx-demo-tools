/**
 * @fileoverview
 * This file contains engineCode definitions for the Telemetry Viewer Page.
 *
 * We do NOT want any "export" statements in this file. If you include
 * the "export" keyword, the TypeScript compiler will treat this file
 * as a module, and you will not be able to use the types defined here
 * without "importing" them. THIS DEFEATS THE MAGIC OF TYPE INFERENCE.
 *
 * If you have types that need parts to be exported, you should define
 * a new engineCode file in this same folder. Those types will need to be
 * imported, while the majority (these) will not.
 */
interface Sequence {
  name: string;
  id: string;
  beginMs: number;
  beginEventId: string;
  sequenceType: SequenceType;
  eventCount: number;

  endMs?: number;
  endEventId?: string;
  durationMs?: number; // DOES NOTE INDICATE COMPLETION
  lastUpdateMs?: number; // last time the sequence was updated

  // PROOFS
  isComplete: boolean;
  isSuccessful: boolean;
  isFailure: boolean;
  hasAppErrors: boolean;
  hasNetErrors: boolean;

  // ENGINE SPECIFIC
  // a hash for each engine to use as needed
  engine: Record<string, unknown>;
}
interface Sequences {
  [key: string]: Sequence[] | undefined;
}
type SequenceType = 'appInstance' | 'purchaseFlow' | 'searchFlow';
