import React, { useState } from 'react';
import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { VStack } from '@components/mui-stacks.tsx';

interface AppLayoutDoubleDrawerProps {
  leftDrawerContent: React.ReactNode;
  rightDrawerContent: React.ReactNode;
  mainContent: React.ReactNode;
  appBarRef?: React.RefObject<HTMLDivElement>;
}

const drawerWidth = 240;

export default function AppLayoutDoubleDrawer({
  leftDrawerContent,
  rightDrawerContent,
  mainContent,
  appBarRef,
}: AppLayoutDoubleDrawerProps) {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  const handleLeftDrawerToggle = () => {
    setLeftDrawerOpen(!leftDrawerOpen);
  };

  const handleRightDrawerToggle = () => {
    setRightDrawerOpen(!rightDrawerOpen);
  };

  return (
    <VStack
      data-id="app-layout-content"
      fill
      vAlign={'leading'}
      hAlign={'leading'}
      spacing={0}
    >
      <AppBar
        position="fixed"
        ref={appBarRef}
        sx={{
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          width: `calc(100% - ${leftDrawerOpen ? drawerWidth : 0}px - ${rightDrawerOpen ? drawerWidth : 0}px)`,
          ml: `${leftDrawerOpen ? drawerWidth : 0}px`,
          mr: `${rightDrawerOpen ? drawerWidth : 0}px`, // Adjust marginRight when the right drawer is open
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open left drawer"
            edge="start"
            onClick={handleLeftDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            App Layout with Double Drawer
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open right drawer"
            onClick={handleRightDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Left Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={leftDrawerOpen}
      >
        <IconButton onClick={handleLeftDrawerToggle}>
          <ChevronLeftIcon />
        </IconButton>
        {leftDrawerContent}
      </Drawer>
      {/* Right Drawer */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="right"
        open={rightDrawerOpen}
      >
        <IconButton onClick={handleRightDrawerToggle}>
          <ChevronRightIcon />
        </IconButton>
        {rightDrawerContent}
      </Drawer>
      {/* Main Content */}
      <VStack
        component="main"
        data-id="main-content"
        fill
        vAlign={'leading'}
        hAlign={'leading'}
        spacing={0}
        sx={{
          flexGrow: 1,
          p: 1,
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          width: `calc(100% - ${leftDrawerOpen ? drawerWidth : 0}px - ${rightDrawerOpen ? drawerWidth : 0}px)`,
          marginLeft: `${leftDrawerOpen ? drawerWidth : 0}px`,
          marginRight: `${rightDrawerOpen ? drawerWidth : 0}px`,
        }}
      >
        <Toolbar />
        {mainContent}
      </VStack>
    </VStack>
  );
}
