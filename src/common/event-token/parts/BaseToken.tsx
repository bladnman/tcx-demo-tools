import { HStack } from '@common/mui-stacks.tsx';
import { SxProps, Typography } from '@mui/material';

export default function BaseToken(props: TelemetryTokenProps & { sx?: SxProps }) {
  const {
    eventIcon,
    eventColor,
    eventAbbrv = 'n/a',
    eventDetails,
    eventTag,
    tokenMode = 'details',
    tokenFontSize = 1,
    tokenColorMode = 'dual',
    tokenWidth = 'min',
    sx = {},
  } = props;
  const showDetails = tokenMode === 'details';
  const showTag = showDetails || tokenMode === 'tag';
  const isIconOnly = tokenMode === 'icon';
  const isDualColor = tokenColorMode === 'dual';
  const isMaxWidth = tokenWidth === 'max';
  return (
    <HStack
      data-id={'TelemetryToken'}
      spacing={'0.5em'}
      fontSize={`${tokenFontSize}em`}
      vAlign={'stretch'}
      hAlign={'leading'}
      sx={{
        color: `${eventColor}.contrastText`,
        backgroundColor: `${eventColor}.main`,
        paddingLeft: '0.5em',
        paddingRight: showDetails ? 0 : '1em',
        borderRadius: '1em',
        borderTopRightRadius: showDetails ? 0 : '1em',
        borderBottomRightRadius: showDetails ? 0 : '1em',
        whiteSpace: 'nowrap',
        maxWidth: '100%',
        overflow: 'hidden',
        width: isMaxWidth ? '100%' : isIconOnly ? '2em' : 'auto',
        height: isMaxWidth ? '100%' : isIconOnly ? '2em' : 'auto',
        ...sx,
      }}
    >
      {/*  ICON  */}
      <HStack
        data-id={'TelemetryTokenIcon'}
        sx={{
          width: isIconOnly ? '1em' : '1.5em',
          flexShrink: 0,
        }}
      >
        {eventIcon}
      </HStack>

      {/*  ABBRV  */}
      {showTag && (
        <HStack
          data-id={'TelemetryTokenAbbrv'}
          sx={{
            minWidth: '3em',
            flexShrink: 0,
          }}
        >
          <Typography variant={'tag'}>{eventAbbrv}</Typography>
        </HStack>
      )}

      {/*  DETAILS  */}
      <HStack
        data-id={'TelemetryToken_body'}
        hAlign={'leading'}
        sx={{
          px: '0.75em',
          maxWidth: '100%',
          color: isDualColor ? 'fg.main' : `${eventColor}.contrastText`,
          backgroundColor: isDualColor ? 'tokenDetailsBG.main' : 'transparent',
          overflow: 'hidden',
          width: isMaxWidth ? '100%' : 'auto',
          marginRight: isMaxWidth ? '7px' : '0',
        }}
      >
        <HStack hFill data-id={'TelemetryToken_details'}>
          {eventDetails}
        </HStack>

        {eventTag}
      </HStack>
    </HStack>
  );
}
