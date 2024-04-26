import { Button, IconButton, Tooltip, Typography } from '@mui/material';
import SelectionMenuItem from '@pages/telemetry-viewer-page/features/left-drawer/components/SelectionMenuItem.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import CollapsibleContainer from '@common/CollapsableContainer.tsx';
import useTagConfigs from '@pages/telemetry-viewer-page/features/left-drawer/features/tags-display-list/hooks/useTagConfigs.ts';
import { mdiTagEditOutline } from '@mdi/js';
import Icon from '@mdi/react';
import actionSetTagKeyForEdit from '@pages/telemetry-viewer-page/store/settings-store/actions/actionSetTagKeyForEdit.ts';
import BaseTag from '@pages/telemetry-viewer-page/common/event-tag/BaseTag.tsx';
import CONST from '@const/CONST.ts';

export default function TagsDisplayList() {
  const indentation = '2em';
  const { tagConfigs, toggleTag, selectedTagConfigs } = useTagConfigs();

  const renderTitle = () => {
    return (
      <HStack hFill spaceBetween>
        <Typography fontFamily={'anton'} fontSize={'0.8em'} fontWeight={'bold'}>
          TAGS
        </Typography>
        {renderAddButton()}
      </HStack>
    );
  };
  const renderItem = (tagConfig: TagConfig) => {
    return (
      <SelectionMenuItem
        key={`${tagConfig.key}`}
        title={tagConfig.key}
        active={tagConfig.isActive}
        onClick={() => toggleTag(tagConfig)}
      >
        <HStack hFill spaceBetween>
          <BaseTag
            icon={tagConfig.icon}
            label={tagConfig.key}
            themeColorName={tagConfig.themeColor ?? 'appSlate'}
          />

          <IconButton
            sx={{ height: '1em', width: '1.5em', color: 'primary.main' }}
            size={'small'}
            onClick={(event) => {
              event.stopPropagation();
              actionSetTagKeyForEdit(tagConfig.key);
            }}
          >
            <Tooltip title={'Edit'}>
              <Icon path={mdiTagEditOutline} size={0.75} />
            </Tooltip>
          </IconButton>
        </HStack>
      </SelectionMenuItem>
    );
  };
  const renderCollapsed = () => {
    const maxCollapsed = 5;
    if (!selectedTagConfigs.length) return null;
    const includeMore = selectedTagConfigs.length > maxCollapsed;
    return (
      <VStack topLeft hFill sx={{ pl: indentation, paddingBottom: '1em' }}>
        {selectedTagConfigs.slice(0, 5).map((tagConfig) => {
          return (
            <HStack hFill key={tagConfig.key}>
              {renderItem(tagConfig)}
            </HStack>
          );
        })}

        {includeMore && (
          <Typography fontSize={'0.8em'} color={'fg50.main'}>
            +{selectedTagConfigs.length - maxCollapsed} more
          </Typography>
        )}
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
  const renderAddButton = () => {
    return (
      <HStack hFill right>
        <Button
          variant={'text'}
          onClick={(event) => {
            event.stopPropagation();
            actionSetTagKeyForEdit(CONST.NEW_TAG_KEY);
          }}
        >
          <Typography fontSize={'0.8em'}>+ New Tag</Typography>
        </Button>
      </HStack>
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
