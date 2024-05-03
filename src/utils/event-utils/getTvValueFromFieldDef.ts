import getTvValue from '@utils//event-utils/getTvValue.ts';

export default function getTvValueFromFieldDef(
  event: TVEvent,
  fieldDef: FieldDefinition | FieldDefinition[],
): string | number | null | undefined {
  if (!event) return undefined;
  if (!fieldDef) return undefined;

  const fieldDefs = Array.isArray(fieldDef) ? fieldDef : [fieldDef];

  for (const fieldDef of fieldDefs) {
    const value = getTvValue(event, fieldDef.field);
    if (value !== undefined) return value;
  }

  return undefined;
}
