const express = require("express");
const { serailizeUser } = require("./controller/auth");
const bodyParser = require("body-parser");
const lighthouse  = require("@lighthouse-web3/sdk");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

app.use(serailizeUser);
app.listen(3000, async () => {
  console.log("Listening on port 3000");
  console.log((await lighthouse.getUploads(process.env.LIGHTHOUSE_API_KEY)).data);
});
