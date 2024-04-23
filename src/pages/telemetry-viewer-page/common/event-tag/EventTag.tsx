import { TAG_CONFIG } from '@pages/telemetry-viewer-page/constants/TAG_CONFIG.ts';
import { HStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import getMatchingTagsConfigs from '@pages/telemetry-viewer-page/utils/tag-utils/getMatchingTagsConfigs.ts';

export default function EventTag({ event }: { event: TVEvent }) {
  return getMatchingTagsConfigs(event, TAG_CONFIG).map((tagConfig) => (
    <EventTagDisplay key={tagConfig.key} event={event} tagConfig={tagConfig} />
  ));
}
function EventTagDisplay({ tagConfig }: { event: TVEvent; tagConfig: TagConfig }) {
  const textSx = {
    fontSize: '0.8em',
  };
  const bgColor = tagConfig.themeColor ? `${tagConfig.themeColor}.main` : 'transparent';
  const textColor = tagConfig.themeColor
    ? `${tagConfig.themeColor}.contrastText`
    : 'fg.main';

  if (!tagConfig.isActive) return null;

  return (
    <HStack
      key={tagConfig.key}
      sx={{
        border: '1px solid',
        borderRadius: '0.15em',
        px: '0.5em',
        borderColor: bgColor,
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <Typography sx={textSx}>{tagConfig.icon}</Typography>
      <Typography sx={textSx}>{tagConfig.key}</Typography>
    </HStack>
  );
}
