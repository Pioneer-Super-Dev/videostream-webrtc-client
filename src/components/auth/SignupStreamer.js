import * as React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { registerStreamer } from "../../actions/auth";
import PropTypes from "prop-types";
import axios from "axios";

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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import Autocomplete from "@mui/material/Autocomplete";

import FileUpload from "../layout/FileUpload";
import CountrySelect from "../layout/CountrySelect";
// import {DropzoneArea} from 'material-ui-dropzone'

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

const Input = styled("input")({
  display: "none",
});

const ImageThumb = ({ image }) => {
  if (image.name) {
    return (
      <Avatar
        src={URL.createObjectURL(image)}
        alt={image.name}
        sx={{ width: 200, height: 200, border: 1, borderColor: "primary" }}
      />
    );
  } else
    return (
      <Avatar
        src="/avatar/avatar1.png"
        sx={{ width: 200, height: 200, border: 1, borderColor: "primary" }}
      />
    );
};

const SignupStreamer = ({
  setAlert,
  registerStreamer,
  isAuthenticated,
  level,
}) => {
  const [file, setFile] = React.useState("");
  const [value, setValue] = React.useState(new Date("2022-01-01"));
  const [gender1, setGender] = React.useState("");
  const [country1, setCountry] = React.useState("");

  // React.useEffect(() => {
  //   if (isAuthenticated) {
  //     if(level == 1) return <Navigate to="/loginstreamer" />;
  //   }
  // }, []);

  const [formData, setFormData] = React.useState({
    fistname: "",
    lastname: "",
    nickname: "",
    email: "",
    password: "",
    password2: "",
    phonenumber: "",
    birthday: "2022-01-01",
    country: "",
    address: "",
    zipcode: "",
  });

  const {
    firstname,
    lastname,
    nickname,
    email,
    password,
    password2,
    phonenumber,
    birthday,
    country,
    address,
    zipcode,
  } = formData;

  //Image Upload
  // function handleUpload(event) {
  //   if(event.target.files[0]) setFile(event.target.files[0]);

  //   const data = new FormData();

  //   data.append( "image", event.target.files[0]);

  //   axios.post("api/upload",data)
  //   .then((response) => setFormData({...formData, profileimage: response.data}))
  //   .catch((err) =>
  //     setAlert('Choose Proper Image', 'danger')
  //   );

  // }

  //Form Data Change
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //Birthday Change
  const handleChange = (newValue) => {
    const d = new Date(newValue);
    var newDate = "";
    newDate += d.getFullYear();
    newDate += "-";
    if (d.getMonth() + 1 < 10) newDate += "0";
    newDate += d.getMonth();
    newDate += "-";
    if (d.getDate() < 10) newDate += "0";
    newDate += d.getDate();

    console.log(newValue);

    setValue(newValue);
    setFormData({ ...formData, birthday: newDate });
  };

  //Gender Change
  // const handleGenderChange = (event) => {
  //   setGender(event.target.value);
  //   setFormData({...formData, gender: event.target.value});
  // };

  //Sign Up Streamer
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "error");
    } else {
      registerStreamer({
        firstname,
        lastname,
        nickname,
        email,
        password,
        phonenumber,
        birthday,
        country,
        address,
        zipcode,
      });
    }
  };

  if (isAuthenticated) {
    if (level == 1) return <Navigate to="/loginstreamer" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up Streamer
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nickName"
                  label="Nick Name"
                  name="nickname"
                  autoComplete="nick-name"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="longer than 6"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  placeholder="Retype Password"
                  onChange={onChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Avatar
                </Typography>
                <Container sx={{display: 'flex', flexDirection: 'row' }}>
                  {
                      file? <ImageThumb image={file} /> : <Avatar src="/avatar/avatar1.png" sx={{ width: 200, height: 200, border: 1, borderColor: "primary" }}/>
                  }
                  <label htmlFor="icon-button-file">
                      <Input onChange={handleUpload} accept="image/*" id="icon-button-file" type="file" />
                      <IconButton color="primary" aria-label="upload picture" component="span">
                      <PhotoCamera />
                      </IconButton>
                  </label>
                </Container>
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="PhoneNumber"
                  name="phonenumber"
                  autoComplete="phone-number"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <MobileDatePicker
                    required
                    fullWidth
                    label="Birthday"
                    inputFormat="MM/dd/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  onChange={onChange}
                  autoComplete="country"
                />
                {/* <CountrySelect onChange={handleCountryChange}/> */}
                {/* <Autocomplete
                  id="country-select-demo"
                  options={countries}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  onChange={handleCountryChange}
                  value = {country1}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img
                        loading="lazy"
                        width="20"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      name="country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                    />
                  )}
                /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address(optional)"
                  name="address"
                  autoComplete="address"
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="zipCode"
                  label="Zip Code"
                  name="zipcode"
                  autoComplete="zip-code"
                  onChange={onChange}
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    value={gender1}
                    onChange={handleGenderChange}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid> */}

              {/* <Grid item xs={12}>
                <TextField
                  multiline
                  required
                  fullWidth
                  minRows="10"
                  id="biography"
                  label="Biography"
                  name="biography"
                  autoComplete="biography"
                  placeholder="more than 100 characters"
                  onChange={onChange}
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/loginstreamer" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

SignupStreamer.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerStreamer: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  level: PropTypes.number,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  level: state.auth.level,
});

export default connect(mapStateToProps, { setAlert, registerStreamer })(
  SignupStreamer
);
