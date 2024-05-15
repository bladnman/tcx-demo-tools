import { SxProps, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Theme } from '@mui/material/styles';
import routeConfig from '@src/features/app-router/routeConfig.ts';
import { useLocation, useNavigate } from 'react-router-dom';

const NavTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <ToggleButtonGroup
      value={location.pathname}
      exclusive
      onChange={(_, newRoute) => {
        if (newRoute !== null) navigate(newRoute);
      }}
    >
      {routeConfig
        .filter((r) => !!r.label)
        .map((route) => (
          <ToggleButton key={route.path} value={route.path} sx={buttonBaseStyle}>
            {route.label}
          </ToggleButton>
        ))}
    </ToggleButtonGroup>
  );
};

export default NavTabs;

const buttonBaseStyle: SxProps<Theme> = {
  px: 5,
  minWidth: '12em',
  paddingTop: 1,
  marginTop: 0,
  paddingBottom: 1,
  border: 'none',
  borderRadius: 0,
  fontFamily: 'anton',
  backgroundColor: 'navTabUnselectedBG.main',
  color: 'navTabUnselectedFG.main',
  '&.Mui-selected': {
    backgroundColor: 'navTabSelectedBG.main',
    color: 'navTabSelectedFG.contrastText',
    '&:hover': {
      backgroundColor: 'navTabSelectedBG.main',
    },
  },
  '&:hover': {
    color: 'navTabSelectedBG.contrastText',
  },
};
