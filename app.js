const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer"); // Import multer
const upload = multer(); // Create an instance of multer
require("dotenv").config();

const nodeMailer = require("nodemailer");
const app = express();

const sendEmail = require("./router/emailRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "build")));

app.use("/", sendEmail);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

// register view
// app.set("view engine", "ejs");

// app.use("/", entryPoint);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("connected to port ", port);
});
