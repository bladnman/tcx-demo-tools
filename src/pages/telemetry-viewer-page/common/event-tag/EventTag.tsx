import getMatchingTagsConfigs from '@pages/telemetry-viewer-page/utils/tag-utils/getMatchingTagsConfigs.ts';
import BaseTag from '@pages/telemetry-viewer-page/common/event-tag/BaseTag.tsx';
import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';

export default function EventTag({ event }: { event: TVEvent }) {
  const tagConfigs = useSettingsStore((state) => state.tagConfigs);
  return getMatchingTagsConfigs(event, tagConfigs).map((tagConfig) => (
    <EventTagDisplay key={tagConfig.key} event={event} tagConfig={tagConfig} />
  ));
}
function EventTagDisplay({ tagConfig }: { event: TVEvent; tagConfig: TagConfig }) {
  if (!tagConfig.isActive) return null;

  return (
    <BaseTag
      icon={tagConfig.icon}
      label={tagConfig.key}
      themeColorName={tagConfig.themeColor ?? 'appSlate'}
    />
  );
}
