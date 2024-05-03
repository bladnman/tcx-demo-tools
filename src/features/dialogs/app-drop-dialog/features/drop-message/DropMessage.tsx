import { HStack, VStack } from '@common/mui-stacks.tsx';
import { Typography } from '@mui/material';

export default function DropMessage() {
  return (
    <VStack>
      <VStack
        sx={{
          backgroundColor: 'bg85.dark',
          height: '15em',
          width: '25em',
          borderRadius: '1em',
        }}
      >
        <HStack>
          <Typography variant="h5" component="p">
            Drop to load file...
          </Typography>
        </HStack>
      </VStack>
    </VStack>
  );
}
