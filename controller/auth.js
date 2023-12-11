const ethers = require("ethers");
const jwt = require("jsonwebtoken");

const getNonce = async (req, res) => {
  const { address } = req.body;
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
  const recoveredAddress = ethers.verifyMessage(nonce, signature);
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
  } catch {
    req.user = null;
  }
};

const isLoggedin = async () => {
  if (req.user) {
    return req.user;
  } else {
    return null;
  }
};

module.exports = {
  getNonce,
  verifySignature,
  serailizeUser,
  isLoggedin,
};
