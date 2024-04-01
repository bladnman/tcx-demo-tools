import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';
import Tcx2Initiator2 from '@pages/tcx2/features/Tcx2Initiator2.tsx';

export default function TCx2() {
  return (
    <VStack fill sx={{ p: '4em' }}>
      <VStack sx={{ py: '2em' }}>
        <Typography variant={'h4'}>TCx 2.0</Typography>
        <Typography variant={'h6'}>
          Working tool while developing TCx 2.0
        </Typography>
      </VStack>

      <VStack
        fill
        sx={{ p: '0.5em', border: '1px solid', borderColor: 'fg25.main' }}
      >
        <VStack fill>
          <HStack fill sx={{ backgroundColor: 'bg85.main' }}>
            <Tcx2Initiator2 tcxName={'sally'} />
          </HStack>

          <HStack fill sx={{ backgroundColor: 'bg90.main' }}>
            <Tcx2Initiator2 tcxName={'jim'} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>
  );
}
