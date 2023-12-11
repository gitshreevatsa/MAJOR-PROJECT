const lighthouse = require("@lighthouse-web3/sdk");
const { encryptXTEA } = require("../utils/encrypt");
require("dotenv").config();
const { contract } = require("../utils/contractCall");
const fs = require("fs");

const uploadController = async (req, res) => {
  console.log("upload controller");
  let fileData;
  const filePath = 'public/uploads/sudeep.pdf';
  const files = fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // File content is available in the 'data' variable
    console.log('File Content:', data);
    fileData = data;
});
  const apiKey = process.env.LIGHTHOUSE_API_KEY;
  console.log(files);
  const uploadResponse = await lighthouse.upload(filePath, apiKey);
  console.log(uploadResponse);

  const cid = uploadResponse.data.Hash;
  const user = "0xBbefc461F6D944932EEea9C6d4c26C21e9cCeFB8"; // from auth.js
  // encrypt cid with user's public key
  const encryptedCid = encryptXTEA(cid, user);
  console.log(encryptedCid)
  // store encrypted cid in smart contract
  const contractCall = await contract.safeMint(user, cid);
  console.log(contractCall);
  res.status(200).json({ cid: cid });
};

module.exports = { uploadController };
