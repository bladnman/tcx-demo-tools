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
interface FieldDefinition {
  field: string;
  title: string;
  paths: string[];
  _patchedPaths?: string[]; // internal use only - dynamically patched paths
  divider?: {
    isAvailable: boolean;
    isDefault: boolean;
  };
  filter?: {
    isAvailable: boolean;
    isDefault: boolean;
    isDefaultCollapsed: boolean;
  };
  color?: string;
}
