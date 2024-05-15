import Similar from '@assets/svg/icon__similar.svg?react';
import SimilarNot from '@assets/svg/icon__similar_not.svg?react';
import Equal from '@assets/svg/icon__equal.svg?react';
import EqualNot from '@assets/svg/icon__equal_not.svg?react';
import SideBarLeftDark from '@assets/svg/sidebar_dark_left.svg?react';
import SideBarLeftLight from '@assets/svg/sidebar_light_left.svg?react';
import SideBarRightLight from '@assets/svg/sidebar_light_right.svg?react';

import AppSvgIcon, { AppSvgIconProps } from './AppSvgIcon';

export function EqualIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={Equal} {...props} />;
}
export function EqualNotIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={EqualNot} {...props} />;
}
export function SimilarIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={Similar} {...props} />;
}
export function SimilarNotIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={SimilarNot} {...props} />;
}
export function SideBarLeftDarkIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={SideBarLeftDark} {...props} />;
}
export function SideBarLeftLightIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={SideBarLeftLight} {...props} />;
}
export function SideBarRightLightIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={SideBarRightLight} {...props} />;
}
