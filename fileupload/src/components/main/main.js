import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./main.module.scss";
import FileUpload from "./components/FileUpload/FileUpload";

const main = () => {
  const [urlFile, setUrlFile] = useState();
  return (
    <div className={styles.main} data-testid="main">
      <FileUpload urlFile={urlFile} setUrlFile={setUrlFile} />
      {urlFile ? urlFile : "none "}
    </div>
  );
};
main.propTypes = {};

main.defaultProps = {};

export default main;
