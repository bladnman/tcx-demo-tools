import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import getTraceSpanTagStruct from '@utils//event-utils/getTraceSpanTagStruct.ts';

export default function SumTraceSpanTagList({ event }: SummaryVisualizationProps) {
  const tagStruct = getTraceSpanTagStruct(event);
  if (!tagStruct) return null;

  const traceTags = [
    { key: 'originator', value: tagStruct.originator ?? '' },
    // { key: 'http.url', value: tagStruct.url ?? '' },
    { key: 'url summary', value: tagStruct.urlShort ?? '' },
    { key: 'http.status_code', value: String(tagStruct.status_code ?? '') },
    { key: 'http.method', value: tagStruct.method ?? '' },
    { key: 'psn.platform', value: tagStruct.platform ?? '' },
    { key: 'error', value: tagStruct.error !== undefined ? String(tagStruct.error) : '' },
    { key: 'error.msg', value: tagStruct.errorMessage ?? '' },
    { key: 'flow', value: tagStruct.flow ?? '' },
  ];
  return (
    <VStack hFill left spacing={0} sx={{ position: 'relative' }}>
      {traceTags.map((tag, idx) => {
        const key = tag.key;
        const value = String(tag.value);
        const isUrl = key === 'http.url';
        const isUrlShort = key === 'url summary';
        const isUrlLike = isUrl || isUrlShort;

        if (value === '') return null;

        let labelColor = 'text.primary';
        let valueColor = 'text.primary';

        if (isUrlLike) {
          labelColor = 'appOrange.main';
          valueColor = 'appOrange.main';
        } else if (key === 'http.status_code') {
          const isSuccessful = ~~value >= 200 && ~~value < 300;
          labelColor = isSuccessful ? 'appGreen.main' : 'appRed.main';
          valueColor = isSuccessful ? 'appGreen.main' : 'appRed.main';
        } else if (key === 'error.msg') {
          labelColor = 'appRed.main';
          valueColor = 'appRed.main';
        }
        return (
          <HStack key={`${event.id}${key}${idx}`} hFill topLeft spacing={3}>
            <HStack topLeft sx={{ width: '20%', flexShrink: 0 }}>
              <Typography
                sx={{
                  fontSize: '0.9em',
                  color: labelColor,
                }}
              >
                {key}
              </Typography>
            </HStack>

            <HStack hFill topLeft>
              <Typography
                sx={{
                  fontSize: '0.9em',
                  color: valueColor,
                  wordBreak: isUrl ? 'break-all' : 'normal',
                }}
              >
                {value}
              </Typography>
            </HStack>
          </HStack>
        );
      })}
    </VStack>
  );
}
