import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { Container } from "@mui/material";
import "./Upload.css";

export default function Upload() {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => {
    return { url: "http://localhost:5000/api/upload/file" };
  };

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => {
    console.log(files.map((f) => f.meta));
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        onSubmit={handleSubmit}
        accept="image/*,audio/*,video/*"
        className="dropzone"
      />
    </Container>
  );
}
