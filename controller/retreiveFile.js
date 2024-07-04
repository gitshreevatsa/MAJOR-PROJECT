require("dotenv").config();
const { contract, provider } = require("../utils/contractCall");
const crypto = require("crypto");

const retrieveAllFiles = async (req, res) => {
  console.log("retrieve controller");
  console.log(await provider.getNetwork())
  // retrieve all cid's from contract
  const walletAddress = req.query.wallet;
  // Get the cid from contract using the wallet address

  const tokenIds = await contract.getTokenIDsByOwner(walletAddress);
  console.log(tokenIds);

  const retreivedCids = [];
  const decryptedCids = [];

  const fileNameToCID = {};

  for (let i = 0; i < tokenIds.length; i++) {
    const cid = await contract.getTokenURI(tokenIds[i]);
    const filename = await contract.getFileName(tokenIds[i]);
    fileNameToCID[filename] = cid.toString();
    // Get File Name from the same token ID
    // Add it to the JSON of fileName : CID
    retreivedCids.push(cid);
  }
  console.log(retreivedCids);
  console.log("File Name To CID", fileNameToCID);
  const shortKeyHex = walletAddress.slice(2, 18);

  // Convert hexadecimal key to a Buffer
  let keyBuffer = Buffer.from(shortKeyHex, "hex");

  // If the key length is less than 32 bytes (256 bits), pad it with zeros
  while (keyBuffer.length < 32) {
    keyBuffer = Buffer.concat([keyBuffer, Buffer.alloc(1, 0)]);
  }

  // Initialization Vector (IV)
  // IV should be the same IV used for encryption
  const iv = Buffer.alloc(16); // Assuming IV is all zeros for simplicity

  // Create a decipher using AES-256-CBC algorithm

  // Update the decipher with the encrypted CID and finalize
  // change it to keys.length
  for (const fileName in fileNameToCID) {
    const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, iv);

    const decryptedCID = decipher.update(
      fileNameToCID[fileName],
      "base64",
      "utf-8"
    );
    const finalDecryptedCID = decryptedCID + decipher.final("utf-8");
    fileNameToCID[fileName] = finalDecryptedCID;
    console.log("Decrypted CID:", finalDecryptedCID, "File Name:", fileName);
  }
  // get all files and return them
  res.status(200).json({ fileNameToCID });
};

module.exports = { retrieveAllFiles };

/**
 * let decryptedCID = decipher.update(retreivedCids[i], "base64", "utf-8");
    console.log(decryptedCID);
    decryptedCID += decipher.final("utf-8");

    decryptedCids.push(decryptedCID);
 */
