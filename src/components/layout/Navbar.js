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


const Navbar = () => {

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
            <nav>
              
            </nav>
            <Button href="/login" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
              Login
            </Button>
            <Button href="/signupuser" variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Sign Up User
            </Button>
            <Button href="/signupstreamer" variant="contained" sx={{ my: 1, mx: 1.5 }}>
              Sign Up Streamer
            </Button>
          </Toolbar>
          <Divider/>
          <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              <nav>
                <Link variant="button" color="text.primary" href="#" sx={{ my: 1, mx: 1.5 }} >
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

export default Navbar;
