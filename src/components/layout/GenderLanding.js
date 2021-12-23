import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./GenderLanding.css";
import axios from "axios";
import Grow from "@mui/material/Grow";
import { useParams } from "react-router-dom";

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

const GenderLanding = ({ broadcast }) => {
  //const [cards, setCards] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 , 48, 49, 50, 51, 52, 53, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 , 48, 49, 50, 51, 52, 53, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 , 48, 49, 50, 51, 52, 53, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 , 48, 49, 50, 51, 52, 53, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47 , 48, 49, 50, 51, 52, 53]);

  const [cards, setCards] = React.useState([]);

  const params = useParams();

  React.useEffect(() => {
    axios
      .get(`api/broadcasters/${params.gender}`)
      .then((response) => setCards(response.data))
      .catch((err) => console.log(err));
    // setInterval(
    //   () =>
    //     axios
    //       .get("api/broadcasters")
    //       .then((response) => setCards(response.data))
    //       .catch((err) => {}),
    //   3000
    // );
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container justifyContent="center">
        <Typography variant="h3" gutterBottom component="div">
          {params.gender.toUpperCase()} BROADCASTERS
        </Typography>
      </Grid>
      <Grid container spacing={4}>
        {cards.map((card) => (
          // <Grid item key={card} xs={12} sm={6} md={3}>
          <Grow in={true}>
            <Grid item xs={12} sm={6} md={3}>
              {/* <Link href={"watcher"}> */}
              <Link href={`watcher/${card.streamer}`} className="link">
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      // image = {"http://" + window.location.hostname + ":5000/images/" + "avatar" + (1 + Math.floor(Math.random() * 4)) + ".png"}
                      image={
                        "http://" +
                        window.location.hostname +
                        ":5000/images/" +
                        card.profileimage
                      }
                      alt="avatar"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {card.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          </Grow>
        ))}
      </Grid>
      <Copyright sx={{ mt: 5 }} />
      <ScrollUpButton />
    </Container>
  );
};

GenderLanding.propTypes = {
  broadcast: PropTypes.array,
};

const mapStateToProps = (state) => ({
  broadcast: state.broadcast,
});

export default connect(mapStateToProps)(GenderLanding);
