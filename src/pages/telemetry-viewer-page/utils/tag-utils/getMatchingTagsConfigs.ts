export default function getMatchingTagsConfigs(
  event: TVEvent,
  tagConfigs: TagConfig[],
): TagConfig[] {
  if (!event) return [];
  if (!event.tags) return [];
  if (!tagConfigs) return [];

  const tags: TagConfig[] = [];
  tagConfigs.forEach((tagConfig) => {
    if (event.tags.includes(tagConfig.key)) {
      tags.push(tagConfig);
    }
  });

  return tags;
}
