const { ethers } = require("ethers");
const abi = require("../abi/abi.json");
require("dotenv").config();

const address = "0x8178B391DaA307EAC5647A048aD9E5c0f452b738";

const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/eth_sepolia");

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(address, abi, signer);

module.exports = { contract, provider };
