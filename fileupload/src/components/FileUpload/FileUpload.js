import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./FileUpload.module.scss";
import Dropzone, { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import imageToBase64 from "image-to-base64/browser";
import FormData from "form-data";
const axios = require("axios");

// Wrapper, specific put() function
/*
const res = await axios.put('/api/article/123', {
    title: 'Making PUT Requests with Axios',
    status: 'published'
});
*/
// General HTTP function

const FileUpload = (props) => {
  const [urlFile, setUrlFile] = React.useState("");

  useEffect(() => {
    if (props.urlFile) {
      console.log("props.urlFile", props.urlFile);
      setUrlFile(props.urlFile);
    }
  }, []);

  const uploadFile = async (files) => {
    console.log("file", files);
    /*
    let encodedData = imageToBase64(file);

    await encodedData.then((response) => {
      console.log("encodedData response", response);
    });
    
    console.log("encodedData", encodedData);
    */
    let avatar = files[0];
    let myData = files;
    let data = new FormData();
    data.append("file", files[0], files[0].name);

    console.log("myData", data);
    const url = "http://localhost:5000/upload";

    axios
      .post(url, data, {
        headers: {
          accept: "application/json",
          "Accept-Language": "en-US,en;q=0.8",
          "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        },
      })
      .then((response) => {
        //handle success
        console.log(response);

        let imgUrl = `/images/${response.data.data.name}`;
        //   alert(imgUrl);
        console.log("imgUrl", imgUrl);

        props.setUrlFile(imgUrl);
      })
      .catch((error) => {
        //handle error
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    console.log("file", acceptedFiles);
    uploadFile(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className={styles.FileUpload} data-testid="FileUpload">
      <div
        className={styles["dv-file-upload"]}
        style={{ backgroundImage: urlFile ? `url(${urlFile})` : `none` }}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: "#999999" }}>
              <CloudUploadIcon style={{ fontSize: 280, color: "#999999" }} />
              <br />
              Drag 'n' drop some files here
            </p>
          ) : (
            <p style={{ color: "#888" }}>
              <CloudUploadIcon style={{ fontSize: 280, color: "#888" }} />
              <br /> Drag 'n' drop some files here, or click to select files
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

FileUpload.propTypes = {};

FileUpload.defaultProps = {};

export default FileUpload;
