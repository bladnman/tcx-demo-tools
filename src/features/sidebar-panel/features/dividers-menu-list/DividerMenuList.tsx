import CollapsibleContainer from '@common/CollapsableContainer.tsx';
import SelectionMenuItem from '@features/sidebar-panel/features/SelectionMenuItem.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import useDividerDefinitions from '@features/sidebar-panel/features/dividers-menu-list/hooks/useDividerDefinitions.ts';
import { Typography } from '@mui/material';

export default function DividerMenuList() {
  const indentation = '2em';
  const { dividerFieldList, selectedDividerFields, toggleDivider } =
    useDividerDefinitions();

  const renderTitle = () => {
    return (
      <Typography fontFamily={'anton'} fontSize={'0.8em'} fontWeight={'bold'}>
        DIVIDERS
      </Typography>
    );
  };
  const renderItem = (item: FieldDefinition) => {
    return (
      <SelectionMenuItem
        key={`${item.field}`}
        title={item.title}
        active={selectedDividerFields.includes(item.field)}
        onClick={() => toggleDivider(item)}
      />
    );
  };
  const renderCollapsed = () => {
    if (!selectedDividerFields.length) return null;
    return (
      <VStack topLeft hFill sx={{ pl: indentation, paddingBottom: '1em' }}>
        {selectedDividerFields.map((field) => {
          const def = dividerFieldList.find((item) => item.field === field);
          if (!def) return null;
          return (
            <HStack hFill key={field}>
              {renderItem(def)}
            </HStack>
          );
        })}
      </VStack>
    );
  };
  const renderExpanded = () => {
    return (
      <VStack topLeft hFill sx={{ pl: indentation, paddingBottom: '1em' }}>
        {dividerFieldList.map((def) => renderItem(def))}
      </VStack>
    );
  };
  return (
    <CollapsibleContainer
      title={renderTitle()}
      collapsed={true}
      sx={{ width: '100%' }}
      collapsedChildren={renderCollapsed()}
    >
      {renderExpanded()}
    </CollapsibleContainer>
  );
}
