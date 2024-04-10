import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { SxProps } from '@mui/material';

export interface StackProps
  extends Omit<BoxProps, 'top' | 'right' | 'bottom' | 'left' | 'ref'> {
  spacing?: number | string;
  vAlign?: 'center' | 'leading' | 'trailing' | 'stretch';
  hAlign?: 'center' | 'leading' | 'trailing' | 'stretch';

  topLeft?: boolean;
  topRight?: boolean;
  top?: boolean;
  bottomLeft?: boolean;
  bottomRight?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;

  spaceAround?: boolean;
  spaceBetween?: boolean;
  spaceEvenly?: boolean;

  vFill?: boolean;
  hFill?: boolean;
  fill?: boolean;
  'data-id'?: string;
}

const alignmentMap = {
  center: 'center',
  leading: 'flex-start',
  trailing: 'flex-end',
  stretch: 'stretch',
};

const getFill = (
  generalFill: boolean = false,
  explicitFill: boolean | undefined,
) => {
  return explicitFill ?? generalFill ? '100%' : 'auto';
};

const BaseStack = React.forwardRef<
  HTMLDivElement,
  StackProps & { flexDirection: 'row' | 'column' }
>((props, ref) => {
  const {
    children,
    spacing = '10px',
    padding = '0px',
    margin = '0px',
    sx,
    onClick,
    color,
    ...boxProps // Spread the remaining BoxProps
  } = props;

  // remove some items from boxProps
  delete boxProps.vAlign;
  delete boxProps.hAlign;
  delete boxProps.topLeft;
  delete boxProps.topRight;
  delete boxProps.top;
  delete boxProps.bottomLeft;
  delete boxProps.bottomRight;
  delete boxProps.bottom;
  delete boxProps.left;
  delete boxProps.right;
  delete boxProps.center;
  delete boxProps.spaceAround;
  delete boxProps.spaceBetween;
  delete boxProps.spaceEvenly;
  delete boxProps.vFill;
  delete boxProps.hFill;
  delete boxProps.fill;

  const alignmentValues = useAlignmentValues(props);
  const finalGap = typeof spacing === 'number' ? `${spacing}em` : spacing;

  const boxSx: unknown = {
    display: 'flex',
    gap: finalGap,
    padding,
    margin,
    ...alignmentValues,
    ...sx,
  };
  if (color) {
    // @ts-expect-error - patching sx
    boxSx['backgroundColor'] = `${color}.main`;
    // @ts-expect-error - patching sx
    boxSx['color'] = `${color}.contrastText`;
  }

  return (
    // @ts-expect-error -- BoxProps is not perfect with my alterations
    <Box
      ref={ref}
      sx={boxSx as SxProps}
      onClick={onClick}
      {...boxProps} // Apply the remaining BoxProps here
    >
      {children}
    </Box>
  );
});

export const VStack = React.forwardRef<HTMLDivElement, StackProps>(
  (props, ref) => {
    const { 'data-id': dataId, ...restProps } = props;
    return (
      <BaseStack
        data-id={dataId ?? 'VStack'}
        {...restProps}
        flexDirection="column"
        ref={ref}
      />
    );
  },
);

export const HStack = React.forwardRef<HTMLDivElement, StackProps>(
  (props, ref) => {
    const { 'data-id': dataId, ...restProps } = props;
    return (
      <BaseStack
        data-id={dataId ?? 'HStack'}
        {...restProps}
        flexDirection="row"
        ref={ref}
      />
    );
  },
);
const useAlignmentValues = (
  props: StackProps & { flexDirection: 'row' | 'column' },
) => {
  let {
    // AXIS ALIGNMENTS
    vAlign = 'center',
    hAlign = 'center',
  } = props;
  const {
    flexDirection = 'column',

    // CORNER ALIGNMENTS
    topLeft,
    topRight,
    top,
    bottomLeft,
    bottomRight,
    bottom,
    left,
    right,
    center,

    // SPACE DEFS
    spaceAround,
    spaceBetween,
    spaceEvenly,

    // FILLS
    fill,
    hFill,
    vFill,
  } = props;

  // CORNER ALIGNMENTS always win
  if (topLeft) {
    vAlign = 'leading';
    hAlign = 'leading';
  } else if (topRight) {
    vAlign = 'leading';
    hAlign = 'trailing';
  } else if (top) {
    vAlign = 'leading';
    hAlign = 'center';
  } else if (bottomLeft) {
    vAlign = 'trailing';
    hAlign = 'leading';
  } else if (bottomRight) {
    vAlign = 'trailing';
    hAlign = 'trailing';
  } else if (bottom) {
    vAlign = 'trailing';
    hAlign = 'center';
  } else if (left) {
    vAlign = 'center';
    hAlign = 'leading';
  } else if (right) {
    vAlign = 'center';
    hAlign = 'trailing';
  } else if (center) {
    vAlign = 'center';
    hAlign = 'center';
  }

  let justifyContent =
    flexDirection === 'column' ? alignmentMap[vAlign] : alignmentMap[hAlign];
  if (spaceAround) {
    justifyContent = 'space-around';
  } else if (spaceBetween) {
    justifyContent = 'space-between';
  } else if (spaceEvenly) {
    justifyContent = 'space-evenly';
  }

  const alignItems =
    flexDirection === 'column' ? alignmentMap[hAlign] : alignmentMap[vAlign];

  const textAlign =
    hAlign === 'center' ? 'center' : hAlign === 'trailing' ? 'right' : 'left';

  return {
    flexDirection,
    alignItems,
    justifyContent,
    width: getFill(fill, hFill),
    height: getFill(fill, vFill),
    flexGrow: fill ? 1 : 0,
    textAlign,
  };
};
