import TWEvent from '@classes/data/TWEvent.ts';

export default function getMatchingTagsConfigs(
  event: TWEvent,
  tagConfigs: TagConfig[],
): TagConfig[] {
  if (!event) return [];
  if (!event.twTags) return [];
  if (!tagConfigs) return [];

  const tags: TagConfig[] = [];
  tagConfigs.forEach((tagConfig) => {
    if (event.twTags?.includes(tagConfig.key)) {
      tags.push(tagConfig);
    }
  });

  return tags;
}
