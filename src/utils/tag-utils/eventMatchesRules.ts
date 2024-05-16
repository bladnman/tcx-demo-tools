import TWEvent from '@classes/data/TWEvent.ts';
import eventMatchesClause from '@utils//tag-utils/eventMatchesClause.ts';

export default function eventMatchesRules(event: TWEvent, allRules: TagMatchRule[]) {
  if (!event) return false;
  if (!allRules || allRules.length < 1) return false;

  /**
   * tl;dr
   * If any clauseGroup matches, the event matches the rule.
   *
   * Remember that a "rule" is an array of clauseGroups. To pass that
   * group, all clauses in the group must pass. Once a group passes,
   * the rule passes.
   */
  for (const clauseGroup of allRules) {
    // if any clauseGroup fails, return false
    const doesClauseGroupMatch = clauseGroup.every((clause) =>
      eventMatchesClause(event, clause),
    );
    if (doesClauseGroupMatch) {
      return true;
    }
  }

  return false;
}
