import React from "react";
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar'
import { Container } from "@mui/material";
import { id } from "date-fns/locale";

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */

const Input = styled('input')({
display: 'none',
});

function FileUpload() {
  // State to store uploaded file
  const [file, setFile] = React.useState("");

  // Handles file upload event and updates state
  function handleUpload(event) {
    if(event.target.files[0]) setFile(event.target.files[0]);

    // Add code here to upload file to server
    // ...
  }

  return (
    <Container sx={{display: 'flex', flexDirection: 'row' }}>
        {
            file? <ImageThumb image={file} /> : <Avatar src="/avatar/avatar.png" sx={{ width: 200, height: 200, border: 1, borderColor: "primary" }}/>
        }
        <label htmlFor="icon-button-file">
            <Input onChange={handleUpload} accept="image/*" id="icon-button-file" type="file" />
            <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoCamera />
            </IconButton>
        </label>
    </Container>
  );
}

/**
 * Component to display thumbnail of image.
 */
const ImageThumb = ({ image }) => {
    if(image.name) {
        return <Avatar src={URL.createObjectURL(image)} alt={image.name} sx={{ width: 200, height: 200, border: 1, borderColor: "primary" }}/>;
    }
    else return <Avatar src="/avatar/avatar.png" sx={{ width: 200, height: 200, border: 1, borderColor: "primary" }}/>;
};

export default FileUpload;