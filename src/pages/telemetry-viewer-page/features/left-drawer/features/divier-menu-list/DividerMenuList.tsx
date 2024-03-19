import CollapsibleContainer from '@common/CollapsableContainer.tsx';
import SelectionMenuItem from '@pages/telemetry-viewer-page/features/left-drawer/components/SelectionMenuItem.tsx';
import { VStack } from '@common/mui-stacks.tsx';
import { getAllDividerFieldDefs } from '@pages/telemetry-viewer-page/constants/FIELD_DEF.ts';
import useTelemetryStore from '@pages/telemetry-viewer-page/store/useTelemetryStore.ts';

export default function DividerMenuList() {
  const { dividerField, setDividerField } = useTelemetryStore();
  const indentation = '2em';
  const dividers = getAllDividerFieldDefs();
  const handleItemClick = (item: FieldDefinition) => {
    setDividerField(item.field);
  };
  return (
    <CollapsibleContainer
      title={'Dividers'}
      collapsed={false}
      sx={{ width: '100%' }}
    >
      <VStack topLeft hFill sx={{ pl: indentation, paddingBottom: '1em' }}>
        {dividers.map((item) => (
          <SelectionMenuItem
            key={`${item.field}`}
            title={item.title}
            active={item.field === dividerField}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </VStack>
    </CollapsibleContainer>
  );
}
