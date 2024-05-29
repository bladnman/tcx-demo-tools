import TWEvent from '@classes/data/TWEvent.ts';

export default function eventMatchesClause(event: TWEvent, clause: TagMatchClause) {
  if (!event) return false;
  if (!clause) return false;

  const clauseValue = clause.value;
  const eventValue = event.getStr(clause.path);
  const clauseMode = clause.mode;

  if (!eventValue || !clauseValue) return false;

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
