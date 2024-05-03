export default function getMatchingTagsConfigs(
  event: TVEvent,
  tagConfigs: TagConfig[],
): TagConfig[] {
  if (!event) return [];
  if (!event.tvTags) return [];
  if (!tagConfigs) return [];

  const tags: TagConfig[] = [];
  tagConfigs.forEach((tagConfig) => {
    if (event.tvTags.includes(tagConfig.key)) {
      tags.push(tagConfig);
    }
  });

  return tags;
}
