require("dotenv").config();
const { contract } = require("../utils/contractCall");
const crypto = require("crypto");

const uploadController = async (req, res) => {
  console.log("upload controller");
  const { walletAddress, contentID, filename } = req.body;
  let shortKeyHex = walletAddress.slice(2, 18);

  // Convert hexadecimal key to a Buffer
  let keyBuffer = Buffer.from(shortKeyHex, "hex");

  // If the key length is less than 32 bytes (256 bits), pad it with zeros
  while (keyBuffer.length < 32) {
    keyBuffer = Buffer.concat([keyBuffer, Buffer.alloc(1, 0)]);
  }

  // Initialization Vector (IV)
  // IV should be unique and unpredictable for each encryption operation
  // For simplicity, you can generate a random IV
  const iv = Buffer.alloc(16); // 16 bytes for AES

  // Create a cipher using AES-256-CBC algorithm
  const cipher = crypto.createCipheriv("aes-256-cbc", keyBuffer, iv);

  // Update the cipher with CID and finalize
  let encryptedCID = cipher.update(contentID, "utf-8", "base64");
  encryptedCID += cipher.final("base64");
  console.log("Encrypted CID:", encryptedCID);
  // store encrypted contentID in smart contract
  const contractCall = await contract.safeMint(walletAddress, filename, encryptedCID);
  console.log(contractCall);
  res.status(200).json({
    contentID: contentID,
    ecryptedContentID: encryptedCID,
    contractCall: contractCall.hash,
  });
};

module.exports = { uploadController };
