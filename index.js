// external modules
const express = require("express");
const env = require("dotenv");
const path = require("path");

// load env
env.config();

const app = express();
const port = process.env.PORT || 8000;

// createing a static directory
app.use(express.static(path.join(__dirname, "public")));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ****************************************** Routing ***************************************************
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});
app.get("/vacation-packages", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "vacation-packages.html"));
});
app.get("/registration", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "customer-registration.html"));
});
app.get("/thank-you", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "thank-you.html"));
});
// *******************************************************************************************************

// not found page
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "views", "notfound.html"));
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
