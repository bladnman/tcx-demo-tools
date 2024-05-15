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
type TagMatchMode = 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS';
type TagMatchClause = {
  path: string;
  value: string;
  mode: TagMatchMode;
  uuid?: string;
};
type TagMatchRule = TagMatchClause[];
interface TagConfig {
  icon: string;
  key: string;
  rules: TagMatchRule[];
  uuid: string;
  isActive: boolean;
  isDefault: boolean;
  themeColor?: string;
  updatedDateMs?: number; // used to determine if the tag has been updated

  // @deprecated - not used, from old system
  category?: string;
  // @deprecated - use TagConfig.themeColor, from old system
  bgColor?: string;
  // @deprecated - use TagConfig.themeColor, from old system
  textColor?: string;
}
