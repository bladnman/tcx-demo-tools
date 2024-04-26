import { Box, SxProps } from '@mui/material';
import React from 'react';
import isNU from '@pages/telemetry-viewer-page/utils/isNU.ts';

export type AppSvgIconProps = React.ComponentProps<'svg'> & {
  title?: string;
  link?: string;
  target?: string;
  size?: number | string; // sets both height and width
  width?: number | string;
  height?: number | string;
  sx?: React.CSSProperties | SxProps;
};
const DEFAULT_SIZE = 20;
export default function AppSvgIcon(
  props: {
    Icon: React.FC<React.ComponentProps<'svg'>>;
  } & AppSvgIconProps,
) {
  const { Icon, size = DEFAULT_SIZE, width, height, ...otherProps } = props;
  const finalHeight = !isNU(height) ? height : size;
  const finalWidth = !isNU(width) ? width : size;
  return (
    <Box
      onClick={() => openLink(props.link, props.target)}
      sx={{
        cursor: props.link ? 'pointer' : 'default',
      }}
      display="flex"
      alignItems={'center'}
    >
      <Icon width={finalWidth} height={finalHeight} {...otherProps} />
    </Box>
  );
}

function openLink(url?: string, target?: string) {
  if (!url) return;

  const link = document.createElement('a');
  link.href = url;
  link.target = target ?? '_blank';
  link.click();
}
