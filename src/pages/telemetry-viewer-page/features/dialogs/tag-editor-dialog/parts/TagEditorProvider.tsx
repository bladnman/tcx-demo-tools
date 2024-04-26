import * as React from 'react';
import { useState } from 'react';
import isNewTagConfig from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/utils/isNewTagConfig.ts';
import isDefaultTagConfig from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/utils/isDefaultTagConfig.ts';
import isDuplicateTagKey from '@pages/telemetry-viewer-page/features/dialogs/tag-editor-dialog/utils/isDuplicateTagKey.ts';

type TagEditorContextType = {
  tagConfig: TagConfig;
  tagIcon: string;
  setTagIcon: (icon: string) => void;
  tagKey: string;
  setTagKey: (key: string) => void;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  rules: TagMatchRule[];
  setRules: (rules: TagMatchRule[]) => void;
  ruleToEdit: TagMatchRule | null;
  setRuleToEdit: (rule: TagMatchRule | null) => void;
  tagThemeColor: string;
  setTagThemeColor: (color: string) => void;

  // form checks
  isValidIcon: boolean;
  isValidKey: boolean;
  isDuplicateKey: boolean;
  isTagSavable: boolean;
  isDefaultTag: boolean;
  isNewTag: boolean;
  isEdited: boolean;
};
export const TagEditorContext = React.createContext<TagEditorContextType>(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  null!,
); // hack to have empty default value
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37023#issuecomment-881653519

export default function TagEditorProvider({
  tagConfig,
  children,
}: {
  tagConfig: TagConfig;
  children: React.ReactNode;
}) {
  const [initialDate] = useState(Date.now());
  const [tagIcon, setTagIcon] = useState<string>(tagConfig.icon ?? '⛳️');
  const [tagKey, setTagKey] = useState<string>(tagConfig.key ?? 'FLAG');
  const [isActive, setIsActive] = useState(tagConfig.isActive ?? true);
  const [rules, setRules] = useState<TagMatchRule[]>([...tagConfig.rules] ?? []);
  const [tagThemeColor, setTagThemeColor] = useState<string>(
    tagConfig.themeColor ?? 'appSlate',
  );

  const [ruleToEdit, setRuleToEdit] = useState<TagMatchRule | null>(null);

  const isNewTag = isNewTagConfig(tagConfig);
  const isDefaultTag = isDefaultTagConfig(tagConfig);
  const isDuplicateKey = isNewTag && isDuplicateTagKey(tagKey);
  const isValidIcon = !!tagIcon;
  const isValidKey = !!tagKey && !isDuplicateKey;

  const isTagSavable = React.useMemo(() => {
    if (!tagIcon || !tagKey || !tagThemeColor || rules.length < 1) return false;

    // FOR NEW FLAGS CHECK FOR DUPLICATE KEY
    const isDuplicateNew = isNewTag && isDuplicateTagKey(tagKey);
    return !isDuplicateNew;
  }, [tagIcon, tagKey, tagThemeColor, rules.length, isNewTag]);

  const updatedDate = React.useMemo(() => {
    return Date.now();
  }, [tagIcon, tagKey, tagThemeColor, rules, isNewTag]);

  const isEdited = initialDate !== updatedDate;

  const value = {
    tagConfig,
    tagIcon,
    setTagIcon,
    tagKey,
    setTagKey,
    isActive,
    setIsActive,
    rules,
    setRules,
    ruleToEdit,
    setRuleToEdit,
    tagThemeColor,
    setTagThemeColor,

    // form checks
    isValidIcon,
    isValidKey,
    isDuplicateKey,
    isTagSavable,
    isDefaultTag,
    isNewTag,
    isEdited,
  };
  return <TagEditorContext.Provider value={value}>{children}</TagEditorContext.Provider>;
}
