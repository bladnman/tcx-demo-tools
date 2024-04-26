type TagMatchMode = 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS';
type TagMatchClause = {
  path: string;
  value: string;
  mode: TagMatchMode;
  uuid?: string;
};
type TagMatchRule = TagMatchClause[];
interface TagConfig {
  icon: string;
  key: string;
  rules: TagMatchRule[];
  uuid: string;
  isActive: boolean;
  isDefault: boolean;
  themeColor?: string;
  updatedDateMs?: number; // used to determine if the tag has been updated

  // @deprecated - not used, from old system
  category?: string;
  // @deprecated - use TagConfig.themeColor, from old system
  bgColor?: string;
  // @deprecated - use TagConfig.themeColor, from old system
  textColor?: string;
}
