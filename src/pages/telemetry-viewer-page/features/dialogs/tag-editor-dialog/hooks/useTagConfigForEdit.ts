import useSettingsStore from '@pages/telemetry-viewer-page/store/settings-store/useSettingsStore.ts';
import uuid from 'react-uuid';
import { useMemo } from 'react';
import getTagConfigByKey from '@pages/telemetry-viewer-page/utils/tag-utils/getTagConfigByKey.ts';
import CONST from '../../../../../../const/CONST.ts';

export default function useTagConfigForEdit() {
  const { tagKeyForEdit } = useSettingsStore();

  return useMemo(() => {
    if (!tagKeyForEdit) return null;
    const isNewTag = tagKeyForEdit === CONST.NEW_TAG_KEY;

    // NEW
    if (isNewTag) {
      return {
        key: '',
        icon: '🍟',
        uuid: uuid(),
        isDefault: false,
        isActive: true,
        themeColor: 'appSlate',
        rules: [],
      };
    }

    // EDIT
    return getTagConfigByKey(tagKeyForEdit);
  }, [tagKeyForEdit]);
}
