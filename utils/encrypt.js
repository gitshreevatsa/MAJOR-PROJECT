const { stringToUint32LE, uint32ToHexString } = require("./helper");

const encryptXTEA = (plaintext, key) => {
  if (key.length !== 16) {
    throw new Error("Invalid key length. XTEA requires a 128-bit key.");
  }

  const numRounds = 32;
  const delta = 0x9e3779b9;

  let v0 = stringToUint32LE(plaintext.substring(0, 4));
  let v1 = stringToUint32LE(plaintext.substring(4, 8));

  let sum = 0;

  const keyArray = stringToUint32LE(key);

  for (let i = 0; i < numRounds; i++) {
    sum += delta;
    v0 += ((v1 << 4) + keyArray[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + keyArray[1]);
    v1 += ((v0 << 4) + keyArray[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + keyArray[3]);
  }

  return uint32ToHexString(v0) + uint32ToHexString(v1);
};

module.exports = { encryptXTEA };
