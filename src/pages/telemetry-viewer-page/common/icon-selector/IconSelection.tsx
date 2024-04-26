import EmojiPicker from 'emoji-picker-react';
import React from 'react';
import { Popover, Typography } from '@mui/material';
import useHover from '@pages/telemetry-viewer-page/hooks/useHover.ts';
import { VStack } from '@common/mui-stacks.tsx';

export default function IconSelection({
  icon,
  error = false,
  onChange,
}: {
  icon: string;
  error?: boolean;
  onChange: (emoji: string) => void;
}) {
  const { hovered, ...hoverHandlers } = useHover();

  // POPOVER LOGIC
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const popoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const popoverClose = () => {
    setAnchorEl(null);
  };
  const handleEmojiSelect = (emoji: string) => {
    popoverClose();
    onChange(emoji);
  };
  const open = Boolean(anchorEl);
  const color = error ? 'error' : 'fg.main';
  return (
    <>
      <VStack
        onClick={popoverOpen}
        gap={0.5}
        sx={{
          cursor: 'pointer',
          paddingX: 1,
          paddingTop: 1.5,
          paddingBottom: 2,
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: hovered || open ? 'fg50.main' : 'transparent',
          backgroundColor: hovered || open ? 'fg25.main' : 'transparent',
          borderRadius: '4px',
          fontSize: '2em',
        }}
        {...hoverHandlers}
      >
        <Typography variant={'caption'} sx={{ pointerEvents: 'none', color: color }}>
          Icon
        </Typography>
        <Typography sx={{ pointerEvents: 'none', fontSize: '1em' }}>{icon}</Typography>
      </VStack>

      <Popover
        id="mouse-over-popover"
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={popoverClose}
        disableRestoreFocus
        // font size needed fixing for emoji display
        sx={{ fontSize: '0.75rem' }}
      >
        <EmojiPicker
          onEmojiClick={(emoji) => {
            handleEmojiSelect(emoji.emoji);
          }}
          autoFocusSearch={true}
        />
      </Popover>
    </>
  );
}
