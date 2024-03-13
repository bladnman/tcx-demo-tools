import StoreContext from '../common/StoreProvider';
import { useContext } from 'react';

export default function useTargetedId(name?: string): string | undefined {
  const context = useContext(StoreContext);
  if (!name) return undefined;
  return `${context?.targetName}-${name}`;
}
