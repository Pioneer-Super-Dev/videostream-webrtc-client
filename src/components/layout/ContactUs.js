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
import axios from "axios";
import Grow from "@mui/material/Grow";
import Constants from "../../constants/Constants";

const ContactUs = () => {
  const [contact, setContact] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`${Constants.USER_SERVER_URL}/api/setting/contact`)
      .then((response) => {
        setContact(response.data.contact);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Typography variant="h2" gutterBottom component="div">
        Contact Us
      </Typography>
      <Typography variant="h6" gutterBottom component="div">
        {contact}
      </Typography>
    </Container>
  );
};
export default ContactUs;
