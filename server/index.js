const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const _ = require("lodash");

const app = express();

// enable files upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//start app

app.post("/upload", async (req, res) => {
  try {
    //console.log("Server started on port req", req);
    //console.log("Server started on port req", req.body);

    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      let avatar = req.files.file;
      console.log("Server started on port req", req.body);
      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      avatar.mv("./uploads/" + avatar.name);
      avatar.mv("G://Uploads/" + avatar.name);

      let path = "G:\\Git\\oploader\\fileupload\\public\\images";
      avatar.mv(path + avatar.name);

      console.log(req);
      //send response
      res.send({
        status: true,
        message: "File is uploaded",

        data: {
          name: avatar.name,
          mimetype: avatar.mimetype,
          size: avatar.size,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
