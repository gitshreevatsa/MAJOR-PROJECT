const ethers = require("ethers");
const jwt = require("jsonwebtoken");

const getNonce = async (req, res) => {
  const { address } = req.body;
  console.log(address);
  const nonce = Date.now();
  const key = process.env.JWT_SECRET;
  const token = jwt.sign({ address, nonce }, key);
  res.status(200).send({ token, nonce });
};

const verifySignature = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const { signature } = req.body;
  const key = process.env.JWT_SECRET;
  const { address, nonce } = jwt.verify(token, key);
  console.log(address, nonce, signature);
  const recoveredAddress = ethers.verifyMessage(nonce.toString(), signature);
  if (recoveredAddress === address) {
    const token = jwt.sign({ address }, key);
    res.status(200).send({ token });
  } else {
    res.status(401).send({ error: "Signature verification failed" });
  }
};

const serailizeUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const key = process.env.JWT_SECRET;

    const { address } = jwt.verify(token, key);
    req.user = address;
    console.log(req.user);
  } catch {
    console.log("Error in serializing");
    req.user = null;
  }
};

const isLoggedin = async () => {
  if (req.user !== null) {
    console.log(req.user);
    return req.user;
  } else {
    throw new Error("User is not logged in");
  }
};

module.exports = {
  getNonce,
  verifySignature,
  serailizeUser,
  isLoggedin,
};
