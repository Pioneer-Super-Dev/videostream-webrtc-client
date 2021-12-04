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
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import InfoIcon from "@mui/icons-material/Info";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import WatcherVideoChat from "./WatcherVideoChat";
import PresentIcon from "@mui/icons-material/PresentToAll";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useParams } from "react-router-dom";

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

const Watcher = ({ auth }) => {
  const params = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  console.log(params.id);

  // if(auth && auth.level != 2) return <Navigate to="/loginuser" />;

  return (
    <ThemeProvider theme={theme}>
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
          <WatcherVideoChat roomid={params.id} />
          <Grid
            container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
              mt: 3,
            }}
            spacing={1}
            md={12}
            sm={12}
            xs={12}
          >
            <IconButton color="primary" aria-label="add to shopping cart">
              <CardGiftcardIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add to shopping cart">
              <CardGiftcardIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add to shopping cart">
              <CardGiftcardIcon />
            </IconButton>
            <IconButton color="primary" aria-label="add to shopping cart">
              <PresentIcon />
            </IconButton>
          </Grid>
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
                  <Avatar alt="Remy Sharp" src="/avatar/avatar1.png" />
                </ListItemAvatar>
                <ListItemText
                  primary="Biography"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        I am a Streamer.
                      </Typography>
                      {
                        " — I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…"
                      }
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </Grid>

          <Grid container spacing={2} sx={{ flexGrow: 1, mt: 1 }}>
            {/* <Grid item md={3} sm={6} xs={12}>
                  <Item>md=8 sm=12</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                  <Item>md=8 sm=12</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>md=2 sm=6</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>md=2 sm=6</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                  <Item>md=8 sm=12</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                  <Item>md=8 sm=12</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>md=2 sm=6</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>md=2 sm=6</Item>
              </Grid> */}
            {itemData.map((item) => (
              <Grid item md={3} sm={6} xs={12} fullWidth>
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.title}
                    subtitle={item.author}
                    actionIcon={
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${item.title}`}
                      >
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];

Watcher.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Watcher);
