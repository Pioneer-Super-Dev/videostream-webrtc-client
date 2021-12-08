// import React from "react";
// import "react-dropzone-uploader/dist/styles.css";
// import Dropzone from "react-dropzone-uploader";
// import { Container } from "@mui/material";
// import "./Upload.css";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// function Upload({ user }) {
//   const [uploadingFile, setUploadingFile] = React.useState([]);

//   // specify upload params and url for your files
//   const getUploadParams = ({ meta }) => {
//     return { url: `http://localhost:5000/api/upload/file/${user && user.id}` };
//   };

//   // called every time a file's `status` changes
//   const handleChangeStatus = ({ meta, file }, status) => {
//     console.log(status, meta, file);
//   };

//   // receives array of files that are done uploading when submit button is clicked
//   const handleSubmit = (files) => {
//     console.log(files.map((f) => f.meta));
//   };

//   return (
//     <Container sx={{ py: 8 }} maxWidth="md">
//       <Dropzone
//         getUploadParams={getUploadParams}
//         onChangeStatus={handleChangeStatus}
//         onSubmit={handleSubmit}
//         accept="image/*,audio/*,video/*"
//         className="dropzone"
//       />
//     </Container>
//   );
// }

// Upload.propTypes = {
//   user: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   user: state.auth.user,
// });

// export default connect(mapStateToProps)(Upload);

import React from "react";
import { Box, Container, Grid, Button, Typography } from "@mui/material";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Upload from "rc-upload";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import UploadIcon from "@mui/icons-material/Upload";
import { setAlert } from "../../actions/alert";
import Grow from "@mui/material/Grow";
import Input from "@mui/material/Input";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";

function Uploader({ user, setAlert }) {
  const [uploadingFile, setUploadingFile] = React.useState([]);
  const [uploadingPercent, setUploadingPercent] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [fileName, setFileName] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setUploadingPercent(0);
  };

  const handleUploadProgress = (e) => {
    setUploadingPercent(e.percent);
  };

  const handleUploadSuccess = (body, file) => {
    setAlert("Successfully Uploaded", "success");
    setFileName(body);
    setTitle(file.name);
  };

  const handleUploadError = (e, body) => {
    setAlert("Upload Error", "error");
    setUploadingPercent(0);
  };

  const handlePrice = (e) => {
    if (e.target.value >= 0) setPrice(e.target.value);
  };

  const handleAdd = () => {
    axios
      .post(`http://localhost:5000/api/upload/fileadd/${user && user._id}`, {
        name: fileName,
        price: price,
        title: title,
        description: description,
      })
      .then((response) => setAlert("Successfully Added", "success"))
      .catch(
        (errors) => setAlert("Add Error", "error")
        // errors.forEach((error) => setAlert(error.msg, "error"))
      );
  };

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Box>
      <Grid>
        <LinearProgress variant="determinate" value={uploadingPercent} />
      </Grid>

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
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid>
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <CloudUploadRoundedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Upload
                </Typography>
              </Grid>
              <Grid sx={{ mt: 3 }}>
                <Upload
                  onClick={handleClick}
                  onProgress={handleUploadProgress}
                  onSuccess={handleUploadSuccess}
                  onError={handleUploadError}
                  action={"http://localhost:5000/api/upload/file"}
                  method="post"
                >
                  <LoadingButton
                    endIcon={<UploadIcon />}
                    loading={false}
                    loadingPosition="end"
                    variant="contained"
                  >
                    Upload File
                  </LoadingButton>
                </Upload>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={5} mt={1}>
              <Grid item xs={12} sm={12}>
                <Input
                  placeholder="Title"
                  type="text"
                  value={title}
                  onChange={handleTitle}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Input
                  placeholder="Price"
                  type="number"
                  value={price}
                  onChange={handlePrice}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Input
                  placeholder="Description"
                  type="text"
                  value={description}
                  onChange={handleDescription}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" onClick={handleAdd} fullWidth>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Grow>
    </Box>
  );
}

Upload.propTypes = {
  user: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert })(Uploader);
