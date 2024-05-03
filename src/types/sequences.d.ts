/**
 * @fileoverview
 * This file contains type definitions for the Telemetry Viewer Page.
 *
 * We do NOT want any "export" statements in this file. If you include
 * the "export" keyword, the TypeScript compiler will treat this file
 * as a module, and you will not be able to use the types defined here
 * without "importing" them. THIS DEFEATS THE MAGIC OF TYPE INFERENCE.
 *
 * If you have types that need parts to be exported, you should define
 * a new type file in this same folder. Those types will need to be
 * imported, while the majority (these) will not.
 */

interface Sequence {
  name: string;
  id: string;
  beginMs: number;
  beginEventId: string;

  key?: string;
  endMs?: number;
  endEventId?: string;

  // PROOFS
  isComplete?: boolean;
  isSuccessful?: boolean;
  hasAppErrors?: boolean;
  hasNetErrors?: boolean;
  durationMs?: number;

  // ENGINE SPECIFIC VALUES
  type?: string; // open string for engine to use
  engineKey?: string; // open string for engine to use
  subEngineKey?: string; // open string for engine to use
  category?: string; // open string for engine to use
  subcategory?: string; // open string for engine to use
}
interface Sequences {
  [key: string]: Sequence[] | undefined;
}
