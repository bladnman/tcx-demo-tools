import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SxProps,
} from '@mui/material';
import React from 'react';
import useTagColors, {
  CustomPaletteColor,
} from '@dialogs/tag-editor-dialog/hooks/useTagColors.ts';
import TagBase from '@dialogs/tag-editor-dialog/parts/TagBase.tsx';

type Props = {
  tagKey: string;
  tagIcon: string;
  label?: string;
  sx?: SxProps;
  onChange?: (colorName: string) => void;
  defaultColorName?: string;
};

export default function TagStyleDropbox(props: Props) {
  const {
    label = 'Style',
    tagKey,
    tagIcon,
    onChange,
    sx,
    defaultColorName = 'appSlate',
  } = props || {};

  const { tagColorsArray } = useTagColors();
  const [selectedIndex, setSelectedIndex] = React.useState<number>(
    tagColorsArray.findIndex((color) => color.name === defaultColorName) ?? 0,
  );

  const handleChange = (event: SelectChangeEvent) => {
    const selectedIdx = ~~event.target.value;
    setSelectedIndex(selectedIdx);

    // COLOR NAME - send to parent
    const selectedPaletteColor = tagColorsArray[selectedIdx];
    const newColorName = selectedPaletteColor.name ?? defaultColorName;
    onChange?.(newColorName);
  };

  const renderItems = () => {
    return tagColorsArray.map((_color: CustomPaletteColor, idx) => {
      return renderItem(idx);
    });
  };
  const renderItem = (idx: number) => {
    const color = tagColorsArray[idx];
    if (!color) return null;
    return (
      <MenuItem key={idx} value={idx} sx={{ py: '0.1em' }}>
        <TagBase
          tagKey={tagKey}
          tagIcon={tagIcon}
          textColor={color.contrastText}
          bgColor={color.main}
        />
      </MenuItem>
    );
  };
  return (
    <FormControl variant="standard" sx={{ minWidth: '7em', ...sx }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={String(selectedIndex)}
        label={label}
        onChange={handleChange}
        renderValue={(value) => renderItem(value as unknown as number)}
      >
        {renderItems()}
      </Select>
    </FormControl>
  );
}
