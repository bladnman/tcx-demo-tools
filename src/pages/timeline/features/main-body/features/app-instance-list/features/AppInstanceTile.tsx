import { Typography } from '@mui/material';
import { VStack } from '@common/mui-stacks.tsx';

export default function AppInstanceTile({ sequence }: { sequence: Sequence }) {
  const isOpen = !sequence.endEventId;
  const tileSx = {
    // border: '1px solid #ccc',
    minHeight: '8em',
    borderRadius: '0.5em',
    padding: '16px',
    backgroundColor: isOpen ? 'bg75.main' : 'paper.main',
    color: isOpen ? 'bg75.contrastText' : 'paper.contrastText',
  };
  return (
    <VStack spaceBetween sx={tileSx}>
      <Typography variant="h6">{sequence.type}</Typography>
      <Typography variant="caption">{sequence.name}</Typography>
    </VStack>
  );
}
