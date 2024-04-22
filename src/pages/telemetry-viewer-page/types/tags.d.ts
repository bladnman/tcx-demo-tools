type TagMatchMode = 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS';
type TagMatchClause = {
  path: keyof Entry;
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
  bgColor: string;
  textColor: string;
  themeColor?: string;
  category?: string;
}
