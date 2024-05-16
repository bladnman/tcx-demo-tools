import TWEvent from '@classes/data/TWEvent.ts';
import eventMatchesRules from '@utils//tag-utils/eventMatchesRules.ts';

export default function getEventTags(
  event: TWEvent,
  tagConfigs: TagConfig[],
): TagConfig[] | undefined {
  if (!event) return undefined;
  if (!tagConfigs) return undefined;

  const tags: TagConfig[] = [];
  tagConfigs.forEach((tagConfig) => {
    const matches = eventMatchesRules(event, tagConfig.rules);
    if (matches) {
      tags.push(tagConfig);
    }
  });

  return tags.length ? tags : undefined;
}
