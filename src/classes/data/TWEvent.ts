import CONST from '@const/CONST.ts';
import getObjectValue from '@utils/event-utils/getObjectValue.ts';
import isObjectNUE from '@utils/isObjectNUE.ts';

class TWEvent {
  twType: string;
  twId: string;
  twEventTimeMs: number;
  twReceiptTimesMs: number[];
  twVersion = CONST.TV_MESSAGE_VERSION;
  twTags?: string[];
  twSequenceData?: HashT<string[]>;

  rawEvent: Hash;
  failures?: HashT<string[]>;
  payloads?: HashT<Hash>;
  filtered?: Hash;

  constructor(eventData: TWEventData) {
    this.twId = eventData.twId;
    this.twType = eventData.twType;
    this.twEventTimeMs = eventData.twEventTimeMs;
    this.rawEvent = eventData.rawEvent;

    // optionals
    this.twReceiptTimesMs = eventData.twReceiptTimesMs ?? [this.twEventTimeMs];
    this.twTags = eventData.twTags;
    this.twSequenceData = eventData.twSequenceData;
    this.failures = isObjectNUE(eventData.failures) ? undefined : eventData.failures;
    this.payloads = isObjectNUE(eventData.payloads) ? undefined : eventData.payloads;
    this.filtered = isObjectNUE(eventData.filtered) ? undefined : eventData.filtered;
  }

  get(
    fieldPaths: string | string[],
    defaultValue?: string | string[] | number | null | undefined,
  ): unknown {
    if (!fieldPaths) return defaultValue;
    const paths = Array.isArray(fieldPaths) ? fieldPaths : [fieldPaths];

    for (const path of paths) {
      if (!path || path === '') continue;
      const value = getObjectValue(this, path) ?? getObjectValue(this.rawEvent, path);
      if (value !== undefined) return value;
    }
    return defaultValue;
  }
  getStr(
    fieldPaths: string | string[],
    defaultValue?: string | string[] | number | null | undefined,
  ): string | undefined {
    return this.get(fieldPaths, defaultValue) as string | undefined;
  }
  getNum(
    fieldPaths: string | string[],
    defaultValue?: string | string[] | number | null | undefined,
  ): number | undefined {
    return this.get(fieldPaths, defaultValue) as number | undefined;
  }

  // ACCESSORS
  // **NOTE**: do not use 'get' or 'getStr' in these accessors
  // this can cause infinite loops
  get hasFailures(): boolean {
    return this.failures !== undefined && Object.keys(this.failures).length > 0;
  }
  get appName(): string | undefined {
    return this.rawEvent['appName'];
  }

  get exportData() {
    return { message: 'must implement export' };
  }
}

export default TWEvent;
