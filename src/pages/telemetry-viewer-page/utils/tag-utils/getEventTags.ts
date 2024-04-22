import eventMatchesRules from '@pages/telemetry-viewer-page/utils/tag-utils/eventMatchesRules.ts';

export default function getEventTags(
  event: TVEvent,
  tagConfigs: TagConfig[],
): TagConfig[] {
  if (!event) return [];
  if (!tagConfigs) return [];

  const tags: TagConfig[] = [];
  tagConfigs.forEach((tagConfig) => {
    const matches = eventMatchesRules(event, tagConfig.rules);
    if (matches) {
      tags.push(tagConfig);
    }
  });

  return tags;
}
