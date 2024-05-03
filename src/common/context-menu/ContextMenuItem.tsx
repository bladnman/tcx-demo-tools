import { ReactNode } from 'react';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

interface ContextMenuItemProps {
  icon?: ReactNode;
  label: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
export default function ContextMenuItem({
  icon,
  label,
  disabled = false,
  onClick,
}: ContextMenuItemProps) {
  return (
    <MenuItem disabled={disabled} onClick={() => onClick?.()}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText>{label}</ListItemText>
    </MenuItem>
  );
}
