import { HStack, VStack } from '@common/mui-stacks.tsx';
import { SxProps, Typography } from '@mui/material';
import formatMilliseconds from '@utils/formatMilliseconds.ts';
import React from 'react';
import NumbersIcon from '@mui/icons-material/Numbers';
type BaseSequenceTileProps = SequenceTileProps & {
  children?: React.ReactNode;
};
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import NearbyErrorIcon from '@mui/icons-material/NearbyError';
import WarningIcon from '@mui/icons-material/Warning';
export default function BaseSequenceTile({
  sequence,
  isSelected = false,
  children,
}: BaseSequenceTileProps) {
  return (
    <VStack
      hFill
      left
      spacing={0}
      sx={{
        my: 0.5,
        px: 1,
        py: 0.5,
        borderRadius: 1,
        border: '1px solid',
        borderColor: isSelected ? 'pri.main' : 'fg35.main',
      }}
    >
      {children}
      <HStack hFill spaceBetween right spacing={0.25}>
        {/*
        - isComplete
        - isFailure
        - isSuccessful
        - durationMs
        */}
        <Typography variant={'caption'}>
          {formatMilliseconds(sequence.durationMs ?? 0)}
        </Typography>
        <HStack spacing={0.25}>
          <IndicatorActive sequence={sequence} />
          <IndicatorSuccessFail sequence={sequence} />
          <IndicatorAppError sequence={sequence} />
          <IndicatorNetError sequence={sequence} />
          <Pill>
            <Typography fontWeight={'bolder'}>{sequence.eventCount}</Typography>
            <Typography variant={'caption'}>evts</Typography>
          </Pill>
        </HStack>
      </HStack>
    </VStack>
  );
}
function IndicatorActive({ sequence }: { sequence: Sequence }) {
  if (sequence.endEventId) return null;
  return (
    <HStack
      sx={{
        width: '0.75em',
        height: '0.75em',
        backgroundColor: 'appOrange.main',
        borderRadius: 5,
        mx: 1,
      }}
    />
  );
}
function IndicatorSuccessFail({ sequence }: { sequence: Sequence }) {
  if (!sequence.isSuccessful && !sequence.isFailure) return null;
  const IndIcon = sequence.isSuccessful ? CheckBoxIcon : DisabledByDefaultIcon;
  const color = sequence.isSuccessful ? 'success.main' : 'error.main';
  return <IndIcon sx={{ fontSize: '1.5em', color }} />;
}
function IndicatorAppError({ sequence }: { sequence: Sequence }) {
  if (!sequence.hasAppErrors) return null;
  return (
    <Pill
      sx={{
        backgroundColor: 'appRed.main',
        color: 'appRed.contrastText',
      }}
    >
      <WarningIcon sx={{ fontSize: '1em' }} />
      <Typography variant={'caption'}>app</Typography>
    </Pill>
  );
}
function IndicatorNetError({ sequence }: { sequence: Sequence }) {
  if (!sequence.hasNetErrors) return null;
  return (
    <Pill
      sx={{
        backgroundColor: 'appRed.main',
        color: 'appRed.contrastText',
      }}
    >
      <NearbyErrorIcon sx={{ fontSize: '1em' }} />
      <Typography variant={'caption'}>net</Typography>
    </Pill>
  );
}
function Pill({ sx, children }: { sx?: SxProps; children: React.ReactNode }) {
  return (
    <HStack
      spacing={0.25}
      sx={{
        backgroundColor: 'bg75.main',
        borderRadius: 5,
        color: 'fg75.main',
        px: 1.25,
        py: 0.25,
        ...sx,
      }}
    >
      {children}
    </HStack>
  );
}
