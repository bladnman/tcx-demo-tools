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
interface TWEventData {
  // required
  twType: string;
  twEventTimeMs: number;
  twId: string;
  rawEvent: Hash;

  // optionals
  twTags?: string[];
  twSequenceData?: HashT<string[]>;
  twReceiptTimesMs?: number[];
  failures?: HashT<string[]>;
  payloads?: HashT<Hash>;
  filtered?: Hash;
}
interface TVEvent {
  id: string;
  type: string;
  namespace: string;
  eventName: string;
  appName?: string;
  platformType?: string;
  timestamp: string;
  timeMs: number;
  updateTimeMs?: number;
  hasFailures: boolean;
  hasPayloads: boolean;
  tvVersion: string;
  tvTags: string[];
  clientEvent?: Hash | null;
  dispatchedEvents: TelemetryDebuggerDispatchedEvent[];
  sequenceData?: EventSequenceData;
}
interface EventSequenceData {
  [key: string]: string[];
}
interface TelemetryDebuggerDispatchedEvent {
  inputEvent?: Hash | null;
  filteredEvent?: Hash | null;
  payloads: Hash | null;
  failures: Hash | null;
}
interface TelemetryDebuggerEvent {
  id: string;
  eventName: string;
  appName?: string | null;
  clientEvent?: Hash | null;
  dispatchedEvents: null | TelemetryDebuggerDispatchedEvent[];
}
type EventTypeDef = {
  type: string;
  abbreviation: string;
  color: string;
};

/**
 * TYPES RELATED TO DIFFERENT EVENT TYPES
 */
interface MetricData {
  timestamp: string;
  metricGroup: string;
  metricSegment: string;
  metric: string;
  startTime: number;
  latency: number;
  metricType: string;
}
