import React, { useEffect, useState } from 'react';
import { AppBar, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import { HStack, VStack } from '../mui-stacks';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';

interface AppLayoutDoubleDrawerProps {
  leftDrawerTitle?: React.ReactNode;
  leftDrawerContent?: React.ReactNode;
  rightDrawerTitle?: React.ReactNode;
  rightDrawerContent?: React.ReactNode;
  mainContent: React.ReactNode;
  appBarRef?: React.RefObject<HTMLDivElement>;
  leftDrawerWidth?: number;
  rightDrawerWidth?: number;
  LeftIcon?: React.ElementType;
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
  mainContent,
  appBarRef,
  leftDrawerWidth = 240,
  rightDrawerWidth = 240,
  LeftIcon = MenuIcon,
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
      data-id="app-layout-content"
      fill
      vAlign={'leading'}
      hAlign={'leading'}
      spacing={0}
      sx={{
        position: 'relative',
      }}
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
          width: `calc(100% - ${leftDrawerOpen ? leftDrawerWidth : 0}px - ${rightDrawerOpen ? rightDrawerWidth : 0}px)`,
          ml: `${leftDrawerOpen ? leftDrawerWidth : 0}px`,
          mr: `${rightDrawerOpen ? rightDrawerWidth : 0}px`, // Adjust marginRight when the right drawer is open
        }}
      >
        <Toolbar>
          {leftDrawerContent && showLeftDrawerIcon && (
            <IconButton
              color="inherit"
              aria-label="open left drawer"
              edge="start"
              onClick={handleLeftDrawerToggle}
              sx={{ mr: 2 }}
            >
              <LeftIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {rightDrawerContent && showRightDrawerIcon && (
            <IconButton
              color="inherit"
              aria-label="open right drawer"
              onClick={handleRightDrawerToggle}
            >
              <RightIcon />
            </IconButton>
          )}
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
            },
          }}
          variant="persistent"
          anchor="left"
          open={leftDrawerOpen}
        >
          <HStack
            hFill
            hAlign={'trailing'}
            sx={{ justifyContent: 'space-between', paddingLeft: '1em' }}
          >
            <HStack>{leftDrawerTitle}</HStack>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-end', // Aligns items to the start of the flex container
                padding: '8px', // Adds some padding around the IconButton, adjust as needed
              }}
            >
              <IconButton onClick={handleLeftDrawerToggle}>
                <ChevronLeftIcon />
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
            },
          }}
          variant="persistent"
          anchor="right"
          open={rightDrawerOpen}
        >
          <HStack
            hFill
            hAlign={'leading'}
            sx={{ justifyContent: 'space-between', paddingRight: '1em' }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start', // Aligns items to the start of the flex container
                padding: '8px', // Adds some padding around the IconButton, adjust as needed
              }}
            >
              <IconButton onClick={handleRightDrawerToggle}>
                <ChevronRightIcon />
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
        vAlign={'leading'}
        hAlign={'leading'}
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
          position: 'relative',
        }}
      >
        <Toolbar />
        {mainContent}
      </VStack>
    </VStack>
  );
}
