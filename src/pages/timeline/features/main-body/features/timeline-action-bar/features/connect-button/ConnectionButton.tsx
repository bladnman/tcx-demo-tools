import { Button } from '@mui/material';
import Icon from '@mdi/react';
import useConnectButton from '@pages/timeline/features/main-body/features/timeline-action-bar/features/connect-button/hooks/useConnectButton.ts';

export default function ConnectionButton({ disabled = false }: { disabled?: boolean }) {
  const { handlePress, buttonIconPath, buttonColor } = useConnectButton();

  return (
    <Button
      disabled={disabled}
      onClick={handlePress}
      variant={'contained'}
      // @ts-expect-error : using my own colors
      color={buttonColor}
    >
      <Icon path={buttonIconPath} size={1} />
    </Button>
  );
}
