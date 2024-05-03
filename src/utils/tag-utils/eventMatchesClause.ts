import getTvValue from '@utils//event-utils/getTvValue.ts';

export default function eventMatchesClause(event: TVEvent, clause: TagMatchClause) {
  if (!event) return false;
  if (!clause) return false;

  const clauseValue = clause.value;
  const eventValue = getTvValue(event, [clause.path as string]);
  const clauseMode = clause.mode;

  const clauseValueLower = clauseValue ? String(clauseValue).toLowerCase() : '';
  const eventValueLower = eventValue ? String(eventValue).toLowerCase() : '';

  switch (clauseMode) {
    case 'EQUALS':
      return clauseValueLower === eventValueLower;

    case 'NOT_EQUALS':
      return clauseValueLower !== eventValueLower;

    case 'CONTAINS':
      return eventValueLower.indexOf(clauseValueLower) > -1;

    case 'NOT_CONTAINS':
      return eventValueLower.indexOf(clauseValueLower) < 0;
  }

  // just in case
  return false;
}
