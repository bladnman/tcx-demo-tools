import { SideBarLeftLightIcon, SideBarRightLightIcon } from '@assets/icons/AppIcons.tsx';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Drawer, IconButton, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { HStack, VStack } from '../mui-stacks';

interface AppLayoutDoubleDrawerProps {
  leftDrawerTitle?: React.ReactNode;
  leftDrawerContent?: React.ReactNode;
  rightDrawerTitle?: React.ReactNode;
  rightDrawerContent?: React.ReactNode;
  appBarContent?: React.ReactNode;
  mainContent: React.ReactNode;
  appBarRef?: React.RefObject<HTMLDivElement>;
  statusBarContent?: React.ReactNode;
  statusBarHeight?: string;
  leftDrawerWidth?: number;
  rightDrawerWidth?: number;
  RightIcon?: React.ElementType;
  onLeftDrawerToggle?: (isOpen: boolean) => void;
  onRightDrawerToggle?: (isOpen: boolean) => void;
  isLeftDrawerOpen?: boolean;
  isRightDrawerOpen?: boolean;
  showLeftDrawerIcon?: boolean;
  showRightDrawerIcon?: boolean;
  title?: React.ReactNode;
}

export default function AppLayoutDoubleDrawer({
  leftDrawerContent,
  leftDrawerTitle,
  rightDrawerContent,
  rightDrawerTitle,
  appBarContent,
  mainContent,
  appBarRef,
  statusBarContent,
  statusBarHeight = '2.5em',
  leftDrawerWidth = 240,
  rightDrawerWidth = 240,
  RightIcon = MenuIcon,
  onLeftDrawerToggle,
  onRightDrawerToggle,
  isLeftDrawerOpen = false,
  isRightDrawerOpen = false,
  showLeftDrawerIcon = true,
  showRightDrawerIcon = true,
  title,
}: AppLayoutDoubleDrawerProps) {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(isLeftDrawerOpen);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(isRightDrawerOpen);

  useEffect(() => {
    setLeftDrawerOpen(isLeftDrawerOpen);
  }, [isLeftDrawerOpen]);

  useEffect(() => {
    setRightDrawerOpen(isRightDrawerOpen);
  }, [isRightDrawerOpen]);

  const handleLeftDrawerToggle = () => {
    const newState = !leftDrawerOpen;
    setLeftDrawerOpen(newState);
    onLeftDrawerToggle?.(newState);
  };

  const handleRightDrawerToggle = () => {
    const newState = !rightDrawerOpen;
    setRightDrawerOpen(newState);
    onRightDrawerToggle?.(newState);
  };

  return (
    <VStack
      data-id="double-drawer-layout"
      fill
      topLeft
      spacing={0}
      sx={{
        position: 'relative',
      }}
    >
      <AppBar
        position="absolute"
        ref={appBarRef}
        elevation={0}
        sx={{
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          width: `calc(100% - ${leftDrawerOpen ? leftDrawerWidth : 0}px - ${rightDrawerOpen ? rightDrawerWidth : 0}px)`,
          ml: `${leftDrawerOpen ? leftDrawerWidth : 0}px`,
          mr: `${rightDrawerOpen ? rightDrawerWidth : 0}px`, // Adjust marginRight when the right drawer is open
          backgroundColor: 'mainAppBar.main',
        }}
      >
        <Toolbar>
          <HStack left hFill spacing={1.5}>
            <HStack left hFill spacing={0}>
              {/* LEFT DRAWER ICON */}
              {leftDrawerContent && showLeftDrawerIcon && (
                <IconButton
                  color="inherit"
                  aria-label="open left drawer"
                  edge="start"
                  onClick={handleLeftDrawerToggle}
                  sx={{ mr: 2, width: '1.5em', flexShrink: 0, color: 'fg65.main' }}
                >
                  <SideBarLeftLightIcon />
                </IconButton>
              )}

              {/* TITLE */}
              {title}
            </HStack>

            {/* APP BAR */}
            {appBarContent && (
              <HStack hFill right>
                {appBarContent}
              </HStack>
            )}

            {/* RIGHT DRAWER ICON */}
            {rightDrawerContent && showRightDrawerIcon && (
              <IconButton
                color="inherit"
                aria-label="open right drawer"
                onClick={handleRightDrawerToggle}
              >
                <RightIcon />
              </IconButton>
            )}
          </HStack>
        </Toolbar>
      </AppBar>
      {leftDrawerContent && (
        <Drawer
          sx={{
            width: leftDrawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: leftDrawerWidth,
              boxSizing: 'border-box',
              height: `calc(100% - ${statusBarContent ? statusBarHeight : '0'})`,
              position: 'absolute',
            },
          }}
          variant="persistent"
          anchor="left"
          data-id="left-drawer"
          open={leftDrawerOpen}
        >
          <HStack
            hFill
            right
            sx={{ justifyContent: 'space-between', height: '4.5em', paddingLeft: '1em' }}
          >
            <HStack>{leftDrawerTitle}</HStack>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                padding: '8px',
              }}
            >
              <IconButton onClick={handleLeftDrawerToggle} sx={{ color: 'fg65.main' }}>
                <SideBarLeftLightIcon />
              </IconButton>
            </Box>
          </HStack>
          <VStack fill sx={{ overflow: 'hidden' }}>
            {leftDrawerContent}
          </VStack>
        </Drawer>
      )}
      {rightDrawerContent && (
        <Drawer
          sx={{
            width: rightDrawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: rightDrawerWidth,
              boxSizing: 'border-box',
              height: `calc(100% - ${statusBarContent ? statusBarHeight : '0'})`,
              position: 'absolute',
            },
          }}
          variant="persistent"
          anchor="right"
          data-id="right-drawer"
          open={rightDrawerOpen}
        >
          <HStack
            hFill
            hAlign={'leading'}
            sx={{ justifyContent: 'space-between', height: '4.5em', paddingRight: '1em' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                padding: '8px',
              }}
            >
              <IconButton onClick={handleRightDrawerToggle} sx={{ color: 'fg65.main' }}>
                <SideBarRightLightIcon />
              </IconButton>
            </Box>
            <HStack>{rightDrawerTitle}</HStack>
          </HStack>

          <VStack fill sx={{ overflow: 'hidden' }}>
            {rightDrawerContent}
          </VStack>
        </Drawer>
      )}
      <VStack
        component="main"
        data-id="main-content"
        fill
        topLeft
        spacing={0}
        sx={{
          flexGrow: 1,
          p: 0,
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          width: `calc(100% - ${leftDrawerOpen ? leftDrawerWidth : 0}px - ${rightDrawerOpen ? rightDrawerWidth : 0}px)`,
          marginLeft: `${leftDrawerOpen ? leftDrawerWidth : 0}px`,
          marginRight: `${rightDrawerOpen ? rightDrawerWidth : 0}px`,
          height: `calc(100% - ${statusBarContent ? statusBarHeight : '0'})`,
          position: 'relative',
        }}
      >
        <Toolbar />
        {mainContent}
      </VStack>
      {statusBarContent && (
        <HStack hFill sx={{ height: statusBarHeight }} data-id="status-bar">
          {statusBarContent}
        </HStack>
      )}
    </VStack>
  );
}
