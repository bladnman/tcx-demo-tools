import { VStack } from '@common/mui-stacks.tsx';
import EventRawViewer from '@features/inspector-panel/features/event-raw-viewer/EventRawViewer.tsx';
import { Button } from '@mui/material';
import useMerlinData from '@pages/welcome/useMerlinData.ts';
import { useEffect, useState } from 'react';

export default function SqlTester() {
  const [isActive, setIsActive] = useState(false);
  const { isLoading, data } = useMerlinData(isActive);

  useEffect(() => {
    if (data) {
      setIsActive(false);
    }
  }, [data]);

  return (
    <VStack hFill>
      <Button
        disabled={isLoading}
        variant="outlined"
        color="primary"
        onClick={() => setIsActive(!isActive)}
      >
        Test SQL Fetch
      </Button>
      {data && (
        <VStack hFill left sx={{ height: '25em', overflow: 'auto' }}>
          <EventRawViewer event={data} collapsed={1} />
        </VStack>
      )}
    </VStack>
  );
}
