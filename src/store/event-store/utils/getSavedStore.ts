export default function getSavedStore<T>(name: string): T {
  const data = JSON.parse(localStorage.getItem(name) || '{}');
  return (data.state || {}) as T;
}
