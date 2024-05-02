import { Button, Tooltip } from '@mui/material';
import Icon from '@mdi/react';
import useConnectButton from '@pages/telemetry-viewer-page/features/main-body/features/action-bar/features/connect-button/hooks/useConnectButton.ts';

export default function ConnectionButton({ disabled = false }: { disabled?: boolean }) {
  const { handlePress, buttonIconPath, buttonColor } = useConnectButton();

  return (
    <Tooltip title={'Mock'}>
      <Button
        disabled={disabled}
        onClick={handlePress}
        variant={'contained'}
        // @ts-expect-error : using my own colors
        color={buttonColor}
      >
        <Icon path={buttonIconPath} size={1} />
      </Button>
    </Tooltip>
  );
}
