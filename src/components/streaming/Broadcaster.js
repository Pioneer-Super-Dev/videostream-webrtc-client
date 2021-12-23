import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import SendIcon from "@mui/icons-material/Send";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import NearMeDisabledOutlinedIcon from "@mui/icons-material/NearMeDisabledOutlined";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import BroadcasterVideoChat from "./BroadcasterVideoChat";
import Grow from "@mui/material/Grow";
import ImageListItem from "@mui/material/ImageListItem";
import Constants from "../../constants/Constants";
import axios from "axios";

const ariaLabel = { "aria-label": "description" };

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://pioneer.com/">
        Pioneer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Broadcaster = ({ auth, level }) => {
  const [flag, setFlag] = React.useState(true);
  const [itemData, setItemData] = React.useState([
    {
      _id: "61bdcfcbb585fbca8f65fbd0",
      streamer: "61addc0d0ca8c27b321b9b54",
      name: "",
      title: "",
      price: "",
      description: "",
      paid: 0,
    },
  ]);

  React.useEffect(async () => {
    await axios
      .get(
        `${Constants.USER_SERVER_URL}/api/upload/fileadd/${
          auth.user && auth.user._id
        }`
      )
      .then((response) => {
        console.log(response.data);
        setItemData(response.data);
      })
      .catch((err) => console.log(err));

    if (auth.user == null) setFlag(!flag);
  }, [flag]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  if (level != 1) return <Navigate to="/loginstreamer" />;
  else {
    if (auth.user && auth.user.verification != 2)
      return <Navigate to="/profile" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Grow in={true}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <BroadcasterVideoChat />
            <Grid
              container
              spacing={2}
              sx={{ flexGrow: 1, mt: 8 }}
              item
              md={8}
              sm={12}
              xs={12}
            >
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        "http://" +
                        window.location.hostname +
                        ":5000/images/" +
                        "avatar3.png"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      auth.user &&
                      auth.user.firstname + " " + auth.user.lastname
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {auth.user && auth.user.biography}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid container spacing={2} sx={{ flexGrow: 1, mt: 1 }}>
              {itemData ? (
                itemData.map((item) => (
                  <Grid
                    item
                    md={3}
                    sm={6}
                    xs={12}
                    fullWidth
                    style={{ margin: "auto" }}
                  >
                    <ImageListItem key={item.name}>
                      {item.name.endsWith("mp4") ? (
                        <video width="100%" height="100%" controls>
                          <source
                            src={`${Constants.USER_SERVER_URL}/upload/${item.name}`}
                            type="video/mp4"
                          />
                        </video>
                      ) : (
                        <img
                          width="100%"
                          height="100%"
                          src={`${Constants.USER_SERVER_URL}/upload/${item.name}`}
                          srcSet={``}
                          alt={item.title}
                          loading="lazy"
                        />
                      )}
                      {/* <ImageListItemBar
                    title={item.title}
                    subtitle={item.description}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.title}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  /> */}
                    </ImageListItem>
                  </Grid>
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Grow>
    </ThemeProvider>
  );
};

Broadcaster.propTypes = {
  auth: PropTypes.object,
  level: PropTypes.number,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  level: state.auth.level,
});

export default connect(mapStateToProps)(Broadcaster);
