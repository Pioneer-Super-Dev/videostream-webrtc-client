import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";
import Constants from "../../constants/Constants";
import { setAlert } from "../../actions/alert";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
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
        src={`${Constants.USER_SERVER_URL}/images/${image}`}
        sx={{ width: 200, height: 200, border: 1, borderColor: "primary" }}
      />
    );
};

const Input = styled("input")({
  display: "none",
});

function Profile({ user, setAlert }) {
  const [file, setFile] = React.useState("");
  const [gender1, setGender] = React.useState("");
  const [genders, setGenders] = React.useState([]);
  // const [profileImage, setProfileImage] = React.useState("");
  const [biography, setBiography] = React.useState("");
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSend = () => {
    axios
      .post(`api/streamers/verification/${user && user._id}`)
      .then((response) => setFile(response.data))
      .catch((err) => console.log(err));

    setAlert("Verification Required\n Wait until accept", "success");
    setOpen(true);
  };

  const handleLater = () => {
    setOpen(false);
    navigate("/");
  };

  React.useEffect(() => {
    axios
      .get(`${Constants.USER_SERVER_URL}/api/setting/menu`)
      .then((response) => {
        setGenders(response.data.genders);
      })
      .catch((err) =>
        // setAlert('Choose Proper Image', 'danger')
        console.log(err)
      );

    setGender(user && user.gender);
    setFile(user && user.profileimage);
    setBiography(user && user.biography);

    if (!user || user.verification != 2) setOpen(true);
    else setOpen(false);
  }, []);

  // const [formData, setFormData] = React.useState({
  //   profileimage: "",
  //   gender: "",
  //   biography: "",
  // });

  // const { profileimage, gender, biography } = formData;

  //Image Upload
  function handleUpload(event) {
    if (event.target.files[0]) setFile(event.target.files[0]);

    const data = new FormData();

    data.append("image", event.target.files[0]);

    axios
      .post("api/upload", data)
      .then((response) => setFile(response.data))
      .catch((err) => console.log(err));
  }

  //Gender Change
  const handleGenderChange = (event) => {
    setGender(event.target.value);
    // setFormData({ ...formData, gender: event.target.value });
  };

  const onChange = (e) =>
    // setFormData({ ...formData, biography: e.target.value });
    setBiography(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${Constants.USER_SERVER_URL}/api/streamers/profile/${user._id}`, {
        profileimage: file,
        gender: gender1,
        biography: biography,
      })
      .then((response) => setAlert("Saved successfully", "success"))
      .catch((err) => console.log(err));
  };

  return (
    <Grow in={true}>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Profile Setting
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Typography component="h1" variant="h5">
                  Avatar
                </Typography>
                <Container sx={{ display: "flex", flexDirection: "row" }}>
                  {file ? (
                    <ImageThumb image={file} />
                  ) : (
                    <Avatar
                      src={`${Constants.USER_SERVER_URL}:5000/images/avatar1.png`}
                      sx={{
                        width: 200,
                        height: 200,
                        border: 1,
                        borderColor: "primary",
                      }}
                    />
                  )}
                  <label htmlFor="icon-button-file">
                    <Input
                      onChange={handleUpload}
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </Container>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Gender"
                    value={gender1}
                    onChange={handleGenderChange}
                  >
                    {genders &&
                      genders.map((gender) => {
                        return <MenuItem value={gender}>{gender}</MenuItem>;
                      })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
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
                  value={biography}
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save
            </Button>
          </Box>
        </Box>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleLater}
          aria-describedby="alert-dialog-slide-description"
        >
          {user && user.verification ? (
            <>
              <DialogTitle>{"ID VERIFICATION"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Verification is on progress. Wait until accepted
                </DialogContentText>
              </DialogContent>
            </>
          ) : (
            <>
              <DialogTitle>{"ID VERIFICATION"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <TextField
                    multiline
                    required
                    fullWidth
                    minRows="4"
                    placeholder="Input Verification Infomation"
                  />
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLater}>See Later</Button>
                <Button onClick={handleSend}>Send</Button>
              </DialogActions>
            </>
          )}
        </Dialog>
      </Container>
    </Grow>
  );
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert })(Profile);
