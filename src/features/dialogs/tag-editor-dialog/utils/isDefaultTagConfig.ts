import { TAG_CONFIG } from '@const/TAG_CONFIG.ts';

export default function isDefaultTagConfig(tagConfig?: TagConfig | null) {
  if (!tagConfig) return false;
  // see if this uuid was provided by the default file
  // in the application. This may be used to determine
  // if the tag is editable or not.
  return !!TAG_CONFIG.find((config) => config.uuid === tagConfig.uuid);
}
