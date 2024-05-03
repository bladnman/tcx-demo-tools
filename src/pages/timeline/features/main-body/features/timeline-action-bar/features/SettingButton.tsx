import { IconButton, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import actionSetIsSettingsDialogOpen from '@store/settings-store/actions/actionSetIsSettingsDialogOpen.ts';

export default function SettingButton() {
  return (
    <Tooltip title="Settings">
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => actionSetIsSettingsDialogOpen(true)}
        sx={{ mr: 2, width: '1.5em', flexShrink: 0 }}
      >
        <SettingsIcon />
      </IconButton>
    </Tooltip>
  );
}
