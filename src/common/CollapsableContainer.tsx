import React, { useState } from 'react';
import { Typography, IconButton, BoxProps, TypographyProps } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import opacity from '@pages/telemetry-viewer-page/utils/opacity.ts';
import useHover from '@pages/telemetry-viewer-page/hooks/useHover.ts';
import { HStack, VStack } from '@common/mui-stacks.tsx';
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
  const renderTitle = () => {
    if (typeof title === 'string') {
      return (
        <Typography component="span" sx={{ cursor: cursor, ...titleSx }}>
          {title}
        </Typography>
      );
    }
    return title;
  };
  const cursor = disabled ? 'default' : 'pointer';
  return (
    <VStack hFill sx={sx}>
      <HStack
        hFill
        left
        onClick={handleToggleCollapse}
        {...hoverHandlers}
        sx={{
          cursor: cursor,
          opacity: disabled ? 0.5 : 1,
          borderColor:
            !disabled && showHover && hovered ? opacity(0.15, hoverColor) : 'transparent',
          borderStyle: 'dashed',
          borderWidth: showHover ? '1px' : 0,
        }}
      >
        <IconButton size="small" sx={titleSx} disabled={disabled}>
          {renderCollapseIcon()}
        </IconButton>

        <HStack hFill left>
          {renderTitle()}
        </HStack>
      </HStack>
      <HStack hFill left>
        {renderChildren()}
      </HStack>
    </VStack>
  );
};

export default CollapsibleContainer;
