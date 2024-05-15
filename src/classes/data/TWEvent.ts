import CONST from '@const/CONST.ts';
import getObjectValue from '@utils/event-utils/getObjectValue.ts';
import isObjectNUE from '@utils/isObjectNUE.ts';

class TWEvent {
  twId: string;
  twType: string;
  twEventTimeMs: number;
  twReceiptTimesMs: number[];
  twVersion = CONST.TV_MESSAGE_VERSION;
  rawEvent: Hash;

  twTags?: string[];
  twSequenceData?: HashT<string[]>;
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

    // try each path in order
    for (const path of paths) {
      if (!path || path === '') continue;
      // CHECK IN TV top level fields
      let value = getObjectValue(this, path);
      // try in 'rawEvent' object if empty
      value = value ?? getObjectValue(this.rawEvent, path);
      // first value, we are done
      if (value) return value;
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

  get hasFailures(): boolean {
    return this.failures !== undefined && Object.keys(this.failures).length > 0;
  }

  get exportData() {
    return { message: 'must implement export' };
  }
}

export default TWEvent;
