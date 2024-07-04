const express = require("express");
const { serailizeUser } = require("./controller/auth");
const bodyParser = require("body-parser");
require("dotenv").config();
const filesRouter = require("./api/router");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());
// app.use(serailizeUser);
app.use("/api", filesRouter);

app.listen(5001, async () => {
  console.log("Listening on port 5001");
});
