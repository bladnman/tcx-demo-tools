export function getPatchedPaths(paths: string[]): string[] {
  const patchedPaths: string[] = [];

  // locations to check for each path
  // order of locations is important, it's how they are checked
  // null - no prefix, on the object itself
  const pubEventPatches = [null, 'clientEvent', 'dispatchedEvents[-1].inputEvent'];

  for (const path of paths) {
    for (const prefix of pubEventPatches) {
      const finalPrefix = prefix ? `${prefix}.` : '';
      patchedPaths.push(`${finalPrefix}${path}`);
    }
  }
  return patchedPaths;
}
