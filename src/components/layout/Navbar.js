import React, { Fragment } from "react";
import { Link as Linkin } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import { TextField } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PodcastsOutlinedIcon from "@mui/icons-material/PodcastsOutlined";
import Constants from "../../constants/Constants";

import axios from "axios";

import "./Navbar.css";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar = ({ user, isAuthenticated, level, logout }) => {
  const [logo, setLogo] = React.useState("");
  const [genders, setGenders] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${Constants.USER_SERVER_URL}/api/setting/logo`)
      .then((response) => {
        setLogo(response.data.logo);
      })
      .catch((err) =>
        // setAlert('Choose Proper Image', 'danger')
        console.log(err)
      );

    axios
      .get(`${Constants.USER_SERVER_URL}/api/setting/menu`)
      .then((response) => {
        setGenders(response.data.genders);
        // genders = response.data.genders;
        // console.log(`GENDERS ${genders}`);
      })
      .catch((err) =>
        // setAlert('Choose Proper Image', 'danger')
        console.log(err)
      );
  }, []);

  const navigate = useNavigate();

  /////////////////////RESPONSIVE MOBILE TOOLBAR LOGIN USER. LOGIN STREAMER, SIGN UP USER, SIGN UP STREAMER///////////////////////////////
  const [mobileMoreAnchorEl1, setMobileMoreAnchorEl1] = React.useState(null);
  const isMobileMenuOpen1 = Boolean(mobileMoreAnchorEl1);
  const handleMobileMenuClose1 = () => {
    setMobileMoreAnchorEl1(null);
  };
  const handleMobileMenuOpen1 = (event) => {
    setMobileMoreAnchorEl1(event.currentTarget);
  };
  const mobileMenuId1 = "primary-search-account-menu-mobile1";
  const renderMobileMenu1 = (
    <Menu
      anchorEl={mobileMoreAnchorEl1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId1}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen1}
      onClose={handleMobileMenuClose1}
    >
      <MenuItem>
        <Linkin className="linkin" to="/loginuser">
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login User
          </Button>
        </Linkin>
        <Linkin className="linkin" to="/loginstreamer">
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login Streamer
          </Button>
        </Linkin>
      </MenuItem>
      <MenuItem>
        <Linkin className="linkin" to="/signupuser">
          <Button
            href="/signupuser"
            variant="contained"
            sx={{ my: 1, mx: 1.5 }}
          >
            Sign Up User
          </Button>
        </Linkin>
        <Linkin className="linkin" to="/signupstreamer">
          <Button
            href="/signupstreamer"
            variant="contained"
            sx={{ my: 1, mx: 1.5 }}
          >
            Sign Up Streamer
          </Button>
        </Linkin>
      </MenuItem>
    </Menu>
  );

  /////////////////////RESPONSIVE MOBILE TOOLBAR HOME, GENDER1, GENDER2, ABOUT, SEARCH///////////////////////////////
  const [mobileMoreAnchorEl2, setMobileMoreAnchorEl2] = React.useState(null);
  const isMobileMenuOpen2 = Boolean(mobileMoreAnchorEl2);
  const handleMobileMenuClose2 = () => {
    setMobileMoreAnchorEl2(null);
  };
  const handleMobileMenuOpen2 = (event) => {
    setMobileMoreAnchorEl2(event.currentTarget);
  };
  const mobileMenuId2 = "primary-search-account-menu-mobile2";

  const renderMobileMenu2 = (
    <Menu
      anchorEl={mobileMoreAnchorEl2}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId2}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMobileMenuOpen2}
      onClose={handleMobileMenuClose2}
    >
      <MenuItem>
        <Linkin className="linkin" to="/">
          <Link variant="button" color="primary" sx={{ my: 1, mx: 1.5 }}>
            Home
          </Link>
        </Linkin>
      </MenuItem>
      {genders &&
        genders.map((gender) => {
          return (
            <MenuItem>
              <Link
                variant="button"
                color="text.primary"
                href="#"
                sx={{ my: 1, mx: 1.5 }}
              >
                {gender}
              </Link>
            </MenuItem>
          );
        })}
      <MenuItem>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          About Us
        </Link>
      </MenuItem>
      <MenuItem>
        <Link
          variant="button"
          color="text.primary"
          href="#"
          sx={{ my: 1, mx: 1.5 }}
        >
          Contact Us
        </Link>
      </MenuItem>
    </Menu>
  );

  /////////////////////DESKTOP TOOLBAR LOGIN USER. LOGIN STREAMER, SIGN UP USER, SIGN UP STREAMER///////////////////////////////
  const renderDesktopMenu1 = (
    <Toolbar sx={{ flexWrap: "wrap" }}>
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        <Linkin className="linkin" to="/">
          <img
            src={`${Constants.USER_SERVER_URL}/logo/${logo}`}
            alt="logo"
            style={{ height: 60, verticalAlign: "text-top" }}
          />
        </Linkin>
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Linkin className="linkin" to="/loginuser">
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login User
          </Button>
        </Linkin>
        <Linkin className="linkin" to="/loginstreamer">
          <Button variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login Streamer
          </Button>
        </Linkin>
        <Linkin className="linkin" to="/signupuser">
          <Button variant="contained" sx={{ my: 1, mx: 1.5 }}>
            Sign Up User
          </Button>
        </Linkin>
        <Linkin className="linkin" to="/signupstreamer">
          <Button variant="contained" sx={{ my: 1, mx: 1.5 }}>
            Sign Up Streamer
          </Button>
        </Linkin>
      </Box>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
  );

  /////////////////////DESKTOP TOOLBAR HOME, GENDER1, GENDER2, ABOUT, SEARCH///////////////////////////////
  const renderDesktopMenu2 = (
    <Toolbar sx={{ flexWrap: "wrap" }}>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          <nav>
            <Linkin className="linkin" to="/">
              <Link
                variant="button"
                color="primary"
                sx={{ my: 1, mx: 1.5 }}
                className="link"
              >
                Home
              </Link>
            </Linkin>
            {genders &&
              genders.map((gender) => {
                return (
                  <Link
                    variant="button"
                    color="text.primary"
                    href="#"
                    sx={{ my: 1, mx: 1.5 }}
                    className="link"
                  >
                    {gender}
                  </Link>
                );
              })}
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
              className="link"
            >
              About Us
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
              className="link"
            >
              Contact Us
            </Link>
          </nav>
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Button
        href="#"
        variant="outlined"
        sx={{ my: 1, mx: 1.5 }}
        startIcon={<SearchIcon />}
      >
        Search
      </Button>
    </Toolbar>
  );

  /////////////////////DESKTOP TOOLBAR PROFILE, LOGOUT///////////////////////////////
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadFile = () => {
    console.log("Upload File");
  };

  const viewProfile = () => {};

  const userLogOut = () => {
    logout();
  };

  const renderDesktopLogoutMenu1 = (
    <Toolbar sx={{ flexWrap: "wrap" }}>
      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        <Linkin className="linkin" to="/">
          {/* <Link> */}
          <img
            src={`${Constants.USER_SERVER_URL}/logo/${logo}`}
            alt="logo"
            style={{ width: 150, verticalAlign: "text-top" }}
          />
          {/* </Link> */}
        </Linkin>
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { md: "flex" } }}>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Typography variant="h6" color="primary" mr={2}>
            Welcome
          </Typography>
          <Typography variant="h6" mr={10}>
            {user ? user.firstname + " " + user.lastname : "Jhon"}
          </Typography>
          <Tooltip title="Account settings">
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={`${Constants.USER_SERVER_URL}/images/avatar3.png`}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {level == 1 ? (
            <>
              <Linkin className="link" to="/profile">
                <MenuItem onClick={viewProfile}>
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
              </Linkin>
              <Linkin className="link" to="/upload">
                <MenuItem onClick={uploadFile}>
                  <ListItemIcon>
                    <FileUploadOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Upload Files
                </MenuItem>
              </Linkin>
              <Divider />
              <Linkin className="link" to="/broadcaster">
                <MenuItem onClick={viewProfile}>
                  <ListItemIcon>
                    <PodcastsOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  Broadcasting
                </MenuItem>
              </Linkin>
              <Divider />
            </>
          ) : (
            <></>
          )}
          <Linkin className="link" to="/">
            <MenuItem onClick={userLogOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Linkin>
        </Menu>
      </Box>
      {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
      {renderMobileMenu1} */}
    </Toolbar>
  );

  return (
    <Fragment>
      {/* <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} /> */}
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        {isAuthenticated ? renderDesktopLogoutMenu1 : renderDesktopMenu1}
        <Divider />
        {renderDesktopMenu2}
      </AppBar>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  level: PropTypes.number,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  level: state.auth.level,
});

export default connect(mapStateToProps, { logout })(Navbar);
