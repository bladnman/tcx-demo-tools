import uuid from 'react-uuid';

export function getNewTagMatchClause(): TagMatchClause {
  return {
    path: 'eventType',
    mode: 'EQUALS',
    value: 'interaction',
    uuid: uuid(),
  };
}
