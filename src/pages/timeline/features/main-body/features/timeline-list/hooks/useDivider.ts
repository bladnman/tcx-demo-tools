import { useState } from 'react';

interface TDivider {
  field: string | undefined;
  setField: (field: string | undefined) => void;
  value: string | undefined;
  setValue: (value: string | undefined) => void;
}
export default function useDivider(inField: string | undefined) {
  const [field, setField] = useState<string | undefined>(inField);
  const [value, setValue] = useState<string | undefined>();

  return { field, setField, value, setValue } as TDivider;
}
