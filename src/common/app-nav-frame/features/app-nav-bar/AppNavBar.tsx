import NavTabs from '@common/app-nav-frame/features/app-nav-bar/features/NavTabs.tsx';
import { HStack } from '@common/mui-stacks.tsx';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, Typography } from '@mui/material';
import actionSetIsSettingsDialogOpen from '@store/settings-store/actions/actionSetIsSettingsDialogOpen.ts';
import './AppNavBar.css';

export default function AppNavBar() {
  return (
    <HStack
      hFill
      spaceBetween
      sx={{
        px: 1.5,
        py: 0,
        flexShrink: 0,
        backgroundColor: 'bg.main',
      }}
      data-id="app-nav-bar"
    >
      <Typography variant={'title'} sx={{ whiteSpace: 'nowrap' }}>
        T W I{' '}
        <span style={{ paddingLeft: 2 }} className="rotating-z">
          Z
        </span>
      </Typography>

      <NavTabs />

      <IconButton
        sx={{ color: 'fg50.main' }}
        onClick={() => {
          actionSetIsSettingsDialogOpen(true);
        }}
      >
        <SettingsIcon />
      </IconButton>
    </HStack>
  );
}
