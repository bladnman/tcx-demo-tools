import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

export interface StackProps extends Omit<BoxProps, 'ref'> {
  // Use Omit to exclude 'ref' from BoxProps
  spacing?: number | string;
  vAlign?: 'center' | 'leading' | 'trailing';
  hAlign?: 'center' | 'leading' | 'trailing';
  vFill?: boolean;
  hFill?: boolean;
  fill?: boolean;
}

const alignmentMap = {
  center: 'center',
  leading: 'flex-start',
  trailing: 'flex-end',
};

const getFill = (
  generalFill: boolean = false,
  explicitFill: boolean | undefined
) => {
  return explicitFill ?? generalFill ? '100%' : 'auto';
};

const BaseStack = React.forwardRef<
  HTMLDivElement,
  StackProps & { flexDirection: 'row' | 'column' }
>((props, ref) => {
  const {
    children,
    flexDirection = 'row',
    spacing = '10px',
    padding = '0px',
    margin = '0px',
    vAlign = 'center',
    hAlign = 'center',
    vFill,
    hFill,
    fill,
    sx,
    onClick,
    ...boxProps // Spread the remaining BoxProps
  } = props;
  const finalGap = typeof spacing === 'number' ? `${spacing}em` : spacing;
  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection,
        gap: finalGap,
        padding,
        margin,
        alignItems:
          flexDirection === 'column'
            ? alignmentMap[hAlign]
            : alignmentMap[vAlign],
        justifyContent:
          flexDirection === 'column'
            ? alignmentMap[vAlign]
            : alignmentMap[hAlign],
        width: getFill(fill, hFill),
        height: getFill(fill, vFill),
        ...sx,
      }}
      onClick={onClick}
      {...boxProps} // Apply the remaining BoxProps here
    >
      {children}
    </Box>
  );
});

export const VStack = React.forwardRef<HTMLDivElement, StackProps>(
  (props, ref) => <BaseStack {...props} flexDirection="column" ref={ref} />
);

export const HStack = React.forwardRef<HTMLDivElement, StackProps>(
  (props, ref) => <BaseStack {...props} flexDirection="row" ref={ref} />
);
