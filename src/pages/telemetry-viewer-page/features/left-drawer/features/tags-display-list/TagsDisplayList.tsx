import { Typography } from '@mui/material';
import SelectionMenuItem from '@pages/telemetry-viewer-page/features/left-drawer/components/SelectionMenuItem.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import CollapsibleContainer from '@common/CollapsableContainer.tsx';
import useTagConfigs from '@pages/telemetry-viewer-page/features/left-drawer/features/tags-display-list/hooks/useTagConfigs.ts';

export default function TagsDisplayList() {
  const indentation = '2em';
  const { tagConfigs, toggleTag, selectedTagConfigs } = useTagConfigs();

  const renderTitle = () => {
    return (
      <Typography fontFamily={'anton'} fontSize={'0.8em'} fontWeight={'bold'}>
        TAGS
      </Typography>
    );
  };
  const renderItem = (item: TagConfig) => {
    return (
      <SelectionMenuItem
        key={`${item.key}`}
        title={item.key}
        active={item.isActive}
        onClick={() => toggleTag(item)}
      />
    );
  };
  const renderCollapsed = () => {
    if (!selectedTagConfigs.length) return null;
    return (
      <VStack topLeft hFill sx={{ pl: indentation, paddingBottom: '1em' }}>
        {selectedTagConfigs.map((tagConfig) => {
          return (
            <HStack hFill key={tagConfig.key}>
              {renderItem(tagConfig)}
            </HStack>
          );
        })}
      </VStack>
    );
  };
  const renderExpanded = () => {
    return (
      <VStack topLeft hFill sx={{ pl: indentation, paddingBottom: '1em' }}>
        {tagConfigs.map((tagConfig) => renderItem(tagConfig))}
      </VStack>
    );
  };
  return (
    <CollapsibleContainer
      title={renderTitle()}
      collapsed={false}
      sx={{ width: '100%' }}
      collapsedChildren={renderCollapsed()}
    >
      {renderExpanded()}
    </CollapsibleContainer>
  );
}
