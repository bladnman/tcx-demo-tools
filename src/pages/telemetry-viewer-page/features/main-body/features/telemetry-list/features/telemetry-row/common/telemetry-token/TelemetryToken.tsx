import { HStack } from '@common/mui-stacks';
import { ReactNode } from 'react';

interface TelemetryTokenProps {
  eventIcon: ReactNode;
  eventColor: string;
  eventTag?: string;
  eventDetails?: ReactNode;

  variant?: 'details' | 'tag' | 'icon';
  width?: 'min' | 'max';
  fontSize?: string;
  colorMode?: 'dual' | 'single' | 'none';
}

export default function TelemetryToken(props: TelemetryTokenProps) {
  const {
    eventIcon,
    eventColor,
    eventTag = 'n/a',
    eventDetails,
    variant = 'details',
    fontSize = '1em',
    colorMode = 'dual',
    width = 'min',
  } = props;
  const showDetails = variant === 'details';
  const isDualColor = colorMode === 'dual';
  const isMaxWidth = width === 'max';
  return (
    <HStack
      data-id={'TelemetryToken'}
      spacing={'0.5em'}
      fontSize={fontSize}
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
        flexShrink: 0,
        maxWidth: '100%',
        overflow: 'hidden',
        width: isMaxWidth ? '100%' : 'auto',
      }}
    >
      <HStack
        data-id={'TelemetryTokenIcon'}
        sx={{
          width: '1.2em',
          flexShrink: 0,
        }}
      >
        {eventIcon}
      </HStack>
      <HStack
        data-id={'TelemetryTokenTag'}
        sx={{
          fontSize: '1.2em',
          fontFamily: 'urbana',
          minWidth: '3em',
          flexShrink: 0,
        }}
      >
        {eventTag}
      </HStack>

      {showDetails && !!eventDetails && (
        <HStack
          data-id={'TelemetryTokenDetails'}
          hAlign={'leading'}
          sx={{
            px: '0.75em',
            maxWidth: '100%',
            color: isDualColor
              ? 'tokenDetailsFG.main'
              : `${eventColor}.contrastText`,
            backgroundColor: isDualColor
              ? 'tokenDetailsBG.main'
              : 'transparent',
            overflow: 'hidden',
            width: isMaxWidth ? '100%' : 'auto',
            marginRight: isMaxWidth ? '7px' : '0',
          }}
        >
          {eventDetails}
        </HStack>
      )}
    </HStack>
  );
}
