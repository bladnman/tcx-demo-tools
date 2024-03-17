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

// @deprecated - you should try to avoid using this type
type Hash = {
  // @ts-expect-error - we really do mean to use the 'any' here
  [key: string]: any;
};
type TelemetryEventMessage = {
  type: string;
  final: Hash;
  request?: Hash;
};
type EventTypeDef = {
  type: string;
  icon: string;
  abbreviation: string;
  color: string;
};
type EventFilterDef = {
  type: string;
  title: string;
  defaultCollapsed: boolean;
};
type TokenMode = 'details' | 'tag' | 'icon';
type TokenWidth = 'min' | 'max';
type TokenColorMode = 'dual' | 'single' | 'none';
interface TelemetryTokenProps {
  eventIcon?: ReactNode;
  eventColor?: string;
  eventTag?: string;
  eventDetails?: ReactNode;

  tokenMode?: TokenMode;
  tokenWidth?: TokenWidth;
  tokenFontSize?: number;
  tokenColorMode?: TokenColorMode;
}
type FilterType =
  | 'type'
  | 'platformType'
  | 'appName'
  | 'namespace'
  | 'vshErrorHexCode'
  | 'severity'
  | 'hostAppName'
  | 'errorType'
  | 'errorSubType'
  | 'consoleSessionId'
  | 'appInstanceId';
