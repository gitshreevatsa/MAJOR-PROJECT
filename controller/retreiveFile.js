require("dotenv").config();
const { downloadFile } = require("../utils/downloadFile");
const { decryptXTEA } = require("../utils/decrypt");
const { contract } = require("../utils/contractCall");

const retreieveController = async (cid, user) => {
  const decryptedCid = decryptXTEA(cid, user);
  await downloadFile(
    decryptedCid,
    `./public/downloads/${user}/${decryptedCid}`
  );
};

const retrieveAllFiles = async (req, res) => {
  // retrieve all cid's from contract
  const getAllCids = await contract.getTokenIDsByOwner(req.user);
  // run for loop over the cid's
  for (let i = 0; i < getAllCids.length; i++) {
    await retreieveController(cid[i], req.user);
  }
  // get all files and return them
  res.status(200).json({ location: `/public/downloads/${req.user}` });
};

module.exports = { retrieveAllFiles };
