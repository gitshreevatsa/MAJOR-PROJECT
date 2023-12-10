const lighthouse = require("@lighthouse-web3/sdk");
const { encryptXTEA } = require("../utils/encrypt");
require("dotenv").config();
const { contract } = require("../utils/contractCall");

const uploadController = async (req, res) => {
  const files = ""; // change to req.files
  const apiKey = process.env.LIGHTHOUSE_API_KEY;

  const uploadResponse = await lighthouse.upload(files, apiKey);
  console.log(uploadResponse);

  const cid = uploadResponse.data.Hash;
  const user = req.user; // from auth.js
  // encrypt cid with user's public key
  const encryptedCid = encryptXTEA(cid, user);
  // store encrypted cid in smart contract
  const contractCall = await contract.safeMint(user, encryptedCid);
  console.log(contractCall);
  res.status(200).json({ cid: encryptedCid });
};

module.exports = { uploadController };
