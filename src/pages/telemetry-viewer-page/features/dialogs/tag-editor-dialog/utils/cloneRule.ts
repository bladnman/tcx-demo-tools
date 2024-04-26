export function cloneRule(rule?: TagMatchRule | null): TagMatchRule {
  if (!rule) return [];
  return rule.map((clause) => ({
    ...clause,
  }));
}
