import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  BoxProps,
  TypographyProps,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import opacity from '@pages/telemetry-viewer-page/utils/opacity.ts';
import useHover from '@pages/telemetry-viewer-page/hooks/useHover.ts';
type CollapsibleContainerProps = {
  title: React.ReactNode;
  sx?: BoxProps['sx'];
  collapsed?: boolean;
  disabled?: boolean;
  showHover?: boolean;
  hoverColor?: string;
  titleSx?: TypographyProps['sx'];
  children?: React.ReactNode;
  collapsedChildren?: React.ReactNode;
  onToggleCollapse?: (isCollapsed: boolean) => void;
};

const CollapsibleContainer: React.FC<CollapsibleContainerProps> = ({
  title,
  sx,
  children,
  collapsedChildren,
  collapsed = false,
  disabled = false,
  showHover = true,
  hoverColor = 'transparent',
  titleSx = {},
  onToggleCollapse,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const { hovered, ...hoverHandlers } = useHover();

  const handleToggleCollapse = () => {
    if (disabled) return;
    const isNowCollapsed = !isCollapsed;
    setIsCollapsed(isNowCollapsed);
    if (onToggleCollapse) onToggleCollapse(isNowCollapsed);
  };

  const renderChildren = () => {
    if (isCollapsed) return collapsedChildren;
    return children;
  };

  const renderCollapseIcon = () => {
    if (isCollapsed) {
      return collapsedChildren ? (
        <KeyboardDoubleArrowRightIcon />
      ) : (
        <KeyboardArrowRightIcon />
      );
    }
    return collapsedChildren ? (
      <KeyboardDoubleArrowDownIcon />
    ) : (
      <KeyboardArrowDownIcon />
    );
  };
  const cursor = disabled ? 'default' : 'pointer';
  return (
    <Box sx={sx}>
      <Box
        display="flex"
        alignItems="center"
        onClick={handleToggleCollapse}
        {...hoverHandlers}
        sx={{
          cursor: cursor,
          opacity: disabled ? 0.5 : 1,
          borderColor:
            !disabled && showHover && hovered
              ? opacity(0.15, hoverColor)
              : 'transparent',
          borderStyle: 'dashed',
          borderWidth: showHover ? '1px' : 0,
        }}
      >
        <IconButton size="small" sx={titleSx} disabled={disabled}>
          {renderCollapseIcon()}
        </IconButton>

        <Typography component="span" sx={{ cursor: cursor, ...titleSx }}>
          {title}
        </Typography>
      </Box>
      {renderChildren()}
    </Box>
  );
};

export default CollapsibleContainer;
