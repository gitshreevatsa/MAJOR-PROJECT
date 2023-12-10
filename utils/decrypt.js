const { stringToUint32LE, uint32ToHexString } = require("./helper");

function decryptXTEA(ciphertext, key) {
  if (key.length !== 16) {
    throw new Error("Invalid key length. XTEA requires a 128-bit key.");
  }

  const numRounds = 32;
  const delta = 0x9e3779b9;

  let v0 = stringToUint32LE(ciphertext.substring(0, 8));
  let v1 = stringToUint32LE(ciphertext.substring(8, 16));

  let sum = delta * numRounds;

  const keyArray = stringToUint32LE(key);

  for (let i = 0; i < numRounds; i++) {
    v1 -= ((v0 << 4) + keyArray[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + keyArray[3]);
    v0 -= ((v1 << 4) + keyArray[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + keyArray[1]);
    sum -= delta;
  }

  return uint32ToHexString(v0) + uint32ToHexString(v1);
}

module.exports = { decryptXTEA };
