import React, { useState } from 'react';
import { Box, Stack, Typography, Button, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ShortTextIcon from '@mui/icons-material/ShortText';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ForumIcon from '@mui/icons-material/Forum';
import MenuIcon from '@mui/icons-material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const quickNavItems = [
    { name: 'Home', icon: <HomeIcon />, path: '/' },
    { name: 'Long Videos', icon: <VideoLibraryIcon />, path: '/long-videos' },
    { name: 'Short Videos', icon: <ShortTextIcon />, path: '/short-videos' },
    { name: 'Subscribed', icon: <SubscriptionsIcon />, path: '/profile' },
    { name: 'Community Posts', icon: <ForumIcon />, path: '/community' },
  ];

  const categories = [
    { name: 'Home', icon: <HomeIcon />, path: '/' },
    { 
      name: 'Long Videos', 
      icon: <VideoLibraryIcon />, 
      path: '/long-videos',
      subcategories: [
        'JavaScript',
        'ReactJS',
        'Python',
        'DevOps',
        'Artificial Intelligence',
        'Machine Learning',
        'Cloud Computing',
        'Web Development',
        'Database',
        'System Design'
      ]
    },
    { 
      name: 'Short Videos', 
      icon: <ShortTextIcon />, 
      path: '/short-videos',
      subcategories: [
        'JavaScript',
        'ReactJS',
        'Python',
        'DevOps',
        'Artificial Intelligence',
        'Machine Learning',
        'Cloud Computing',
        'Web Development',
        'Database',
        'System Design'
      ]
    },
    { name: 'Subscribed', icon: <SubscriptionsIcon />, path: '/profile' },
    { name: 'Community Posts', icon: <ForumIcon />, path: '/community' },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.name);
    if (category.subcategories) {
      setShowSubcategories(!showSubcategories);
    } else {
      setShowSubcategories(false);
      navigate(category.path);
    }
  };

  const handleSubcategoryClick = (category, subcategory) => {
    navigate(`${category.path}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleQuickMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleQuickMenuClose = () => {
    setAnchorEl(null);
  };

  const handleQuickNavigation = (path) => {
    navigate(path);
    handleQuickMenuClose();
  };

  const drawer = (
    <Box sx={{ width: 250, bgcolor: '#000', height: '100%', color: '#fff' }}>
      <Stack spacing={2} sx={{ p: 2 }}>
        {categories.map((category) => (
          <Box key={category.name}>
            <Button
              className="category-btn"
              onClick={() => handleCategoryClick(category)}
              startIcon={category.icon}
              sx={{
                color: selectedCategory === category.name ? '#FC1503' : '#fff',
                justifyContent: 'flex-start',
                width: '100%',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#FC1503',
                  color: '#fff',
                },
              }}
            >
              {category.name}
            </Button>
            
            {showSubcategories && selectedCategory === category.name && category.subcategories && (
              <Stack spacing={1} sx={{ ml: 4, mt: 1 }}>
                {category.subcategories.map((subcategory) => (
                  <Button
                    key={subcategory}
                    onClick={() => handleSubcategoryClick(category, subcategory)}
                    sx={{
                      color: '#fff',
                      justifyContent: 'flex-start',
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      '&:hover': {
                        backgroundColor: '#FC1503',
                        color: '#fff',
                      },
                    }}
                  >
                    {subcategory}
                  </Button>
                ))}
              </Stack>
            )}
          </Box>
        ))}
      </Stack>
    </Box>
  );

  return (
    <>
      {/* Quick Navigation Menu Button */}
      <Tooltip title="Quick Navigation" arrow>
        <IconButton
          onClick={handleQuickMenuOpen}
          sx={{
            position: 'fixed',
            top: 10,
            right: 20,
            zIndex: 1200,
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            '&:hover': {
              backgroundColor: '#FC1503',
            },
          }}
        >
          <AppsIcon />
        </IconButton>
      </Tooltip>

      {/* Quick Navigation Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleQuickMenuClose}
        PaperProps={{
          sx: {
            bgcolor: '#000',
            color: '#fff',
            mt: 1,
          },
        }}
      >
        {quickNavItems.map((item) => (
          <MenuItem
            key={item.name}
            onClick={() => handleQuickNavigation(item.path)}
            sx={{
              '&:hover': {
                backgroundColor: '#FC1503',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#fff' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Menu>

      {/* Mobile Menu Button */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ 
          display: { sm: 'none' },
          position: 'fixed',
          top: 10,
          left: 10,
          zIndex: 1200,
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FC1503',
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              bgcolor: '#000',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              bgcolor: '#000',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Sidebar;
