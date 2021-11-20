import React, { Fragment } from 'react';
import { Link as Linkin } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { TextField  } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search'
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const Navbarr = () => {
  const [mobileMoreAnchorEl1, setMobileMoreAnchorEl1] = React.useState(null);
  const [mobileMoreAnchorEl2, setMobileMoreAnchorEl2] = React.useState(null);

  const isMobileMenuOpen1 = Boolean(mobileMoreAnchorEl1);
  const isMobileMenuOpen2 = Boolean(mobileMoreAnchorEl2);

  const handleMobileMenuClose1 = () => {
    setMobileMoreAnchorEl1(null);
  };
  const handleMobileMenuClose2 = () => {
    setMobileMoreAnchorEl2(null);
  };


  const handleMobileMenuOpen1 = (event) => {
    setMobileMoreAnchorEl1(event.currentTarget);
  };
  const handleMobileMenuOpen2 = (event) => {
    setMobileMoreAnchorEl2(event.currentTarget);
  };

  const mobileMenuId1 = 'primary-search-account-menu-mobile1';
  const mobileMenuId2 = 'primary-search-account-menu-mobile2';

  const renderMobileMenu1 = (
    <Menu
      anchorEl={mobileMoreAnchorEl1}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId1}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen1}
      onClose={handleMobileMenuClose1}
    >
      <MenuItem>
          <Button href="/loginuser" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login User
          </Button>
          <Button href="/loginstreamer" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Login Streamer
          </Button>
      </MenuItem>  
      <MenuItem>
          <Button href="/signupuser" variant="contained" sx={{ my: 1, mx: 1.5 }}>
            Sign Up User
          </Button>
          <Button href="/signupstreamer" variant="contained" sx={{ my: 1, mx: 1.5 }}>
            Sign Up Streamer
          </Button>
      </MenuItem>
      
    </Menu>
  );

  const renderMobileMenu2 = (
    <Menu
      anchorEl={mobileMoreAnchorEl2}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId2}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMobileMenuOpen2}
      onClose={handleMobileMenuClose2}
    >
      <MenuItem>
        <Link fullWidth variant="button" color="primary" href="/" sx={{ my: 1, mx: 1.5 }}>
          Home
        </Link>
      </MenuItem>  
      <MenuItem>
        <Link fullWidth variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }}>
          Gender1
        </Link>
      </MenuItem>
      <MenuItem>
        <Link fullWidth variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }} >
          Gender2
        </Link>
      </MenuItem>
      <MenuItem>
        <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }} >
          Gender3
        </Link>
      </MenuItem>
      <MenuItem>
        <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }} >
          About Us
        </Link>
      </MenuItem>
      <MenuItem>
        <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }} >
          Contact Us
        </Link>
      </MenuItem>
      
    </Menu>
  );

  return (
      <Fragment>

        <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
        <CssBaseline />
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              <Link href="/">
                <img src="logo_blue.png" alt="logo" style={{width: 150, verticalAlign: 'text-top'}}/>
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button href="/loginuser" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Login User
              </Button>
              <Button href="/loginstreamer" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Login Streamer
              </Button>
              <Button href="/signupuser" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                Sign Up User
              </Button>
              <Button href="/signupstreamer" variant="contained" sx={{ my: 1, mx: 1.5 }}>
                Sign Up Streamer
              </Button>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId1}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen1}
                color="inherit"
              >
              <MenuIcon />
              </IconButton>
            </Box>
            {renderMobileMenu1}
          </Toolbar>
          <Divider/>
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId2}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen2}
                color="inherit"
              >
              <MenuIcon />
              </IconButton>
            </Box>
            {renderMobileMenu2}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                <nav>
                  <Link variant="button" color="primary" href="/" sx={{ my: 1, mx: 1.5 }}>
                    Home
                  </Link>
                  <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }}>
                    Gender1
                  </Link>
                  <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }} >
                    Gender2
                  </Link>
                  <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }} >
                    Gender3
                  </Link>
                  <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }} >
                    About Us
                  </Link>
                  <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }} >
                    Contact Us
                  </Link>
                </nav>
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            {/* <TextField id="outlined-basic" label="Search" variant="outlined" /> */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} startIcon={<SearchIcon />}>
              Search
            </Button>
          </Toolbar>
        </AppBar>
      </Fragment>
  );
};

export default Navbarr;
