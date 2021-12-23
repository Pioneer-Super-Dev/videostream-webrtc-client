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
import axios from "axios";
import Constants from "../../constants/Constants";
import StripePayment from "../payment/StripePayment";
import ShopIcon from "@mui/icons-material/Shop";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const [itemData, setItemData] = React.useState([
    {
      _id: "61bdcfcbb585fbca8f65fbd0",
      streamer: "61addc0d0ca8c27b321b9b54",
      name: "",
      title: "",
      price: "",
      description: "",
    },
  ]);
  const [paid, setPaid] = React.useState([]);

  const [flag, setFlag] = React.useState(false);

  React.useEffect(async () => {
    await axios
      .get(`${Constants.USER_SERVER_URL}/api/upload/fileadd/${params.id}`)
      .then((response) => {
        console.log(response.data);
        setItemData(response.data);
      })
      .catch((err) => console.log(err));

    itemData.forEach(async (item, index) => {
      await axios
        .get(
          `${Constants.USER_SERVER_URL}/api/videopay/${params.id}/${
            auth.user && auth.user._id
          }/${item._id}`
        )
        .then((response) => {
          let temp = paid;
          temp.push(response.data.paid);
          setPaid(temp);
          console.log(response.data.paid);
        })
        .catch((err) => console.log(err));
    });
    // await axios
    //   .get(
    //     `${Constants.USER_SERVER_URL}/api/detailedpay/${params.id}/${
    //       auth.user && auth.user._id
    //     }`
    //   )
    //   .then((response) => {
    //     console.log(response.data);
    //     setItemData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  }, [auth.user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const onBuy = (event) => {
    console.log("BUY");
    const key = event.target.dataset.key;

    console.log(itemData[key]._id);

    navigate(
      `/stripepayment/${params.id}/${auth.user && auth.user._id}/${
        itemData[key]._id
      }/${itemData[key].price}`
    );

    axios
      .post(`${Constants.USER_SERVER_URL}/api/payment`, {
        from: auth.user && auth.user._id,
        to: params.id,
        amount: itemData[key].price,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));

    axios
      .post(`${Constants.USER_SERVER_URL}/api/videopay`, {
        streamer: params.id,
        watcher: auth.user && auth.user._id,
        video: itemData[key]._id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };
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
            {itemData.map((item, index) => (
              <Grid
                item
                md={3}
                sm={6}
                xs={12}
                fullWidth
                style={{ margin: "auto" }}
              >
                {paid[index] == 1 ? (
                  <></>
                ) : (
                  <Button
                    data-key={index}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    startIcon={<ShopIcon />}
                    onClick={onBuy}
                  >
                    BUY ${item.price}
                  </Button>
                )}
                <ImageListItem
                  key={item.name}
                  style={{
                    border: "solid",
                    filter: paid[index] ? "" : "blur(10px)",
                  }}
                >
                  {item.name.endsWith("mp4") ? (
                    <video width="100%" height="100%">
                      <source
                        src={`${Constants.USER_SERVER_URL}/upload/${item.name}`}
                        type="video/mp4"
                      />
                    </video>
                  ) : (
                    <img
                      disabled="false"
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
            ))}
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

Watcher.propTypes = {
  auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Watcher);
