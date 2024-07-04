const { ethers } = require("ethers");
const abi = require("../abi/abi.json");
require("dotenv").config();

const address = "0x9122b9ec4edd5019f352d0952a73d8c12bf2d3d3";

const provider = new ethers.JsonRpcProvider(
  "https://eth-sepolia.g.alchemy.com/v2/guZH80si3fOEy1HTR2NQW6CDNN6dFtCN"
);

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log(signer.address);

const contract = new ethers.Contract(address, abi, signer);

module.exports = { contract, provider };
