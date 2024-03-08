import StoreContext from '../components/StoreProvider';
import { useContext } from 'react';

export default function useNamedId(name?: string): string {
  const context = useContext(StoreContext);
  if (!name) return '';
  return `${context?.name}-${name}`;
}
