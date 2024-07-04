const { stringToUint32LE, uint32ToHexString } = require("./helper");

const plaintextConverter = (plaintext, key) => {
  if (key.length !== 16) {
    throw new Error("Invalid key length. XTEA requires a 128-bit key.");
  }

  // Pad the plaintext to ensure its length is a multiple of 8 bytes
  while (plaintext.length % 8 !== 0) {
    plaintext += '\0'; // Pad with null bytes
  }

  const numRounds = 32;
  const delta = 0x9e3779b9;

  let blocks = [];
  for (let i = 0; i < plaintext.length; i += 8) {
    blocks.push(plaintext.substring(i, i + 8));
  }

  let keyArray = stringToUint32LE(key);

  for (let block of blocks) {
    let v0 = stringToUint32LE(block.substring(0, 4));
    let v1 = stringToUint32LE(block.substring(4, 8));

    let sum = 0;

    for (let i = 0; i < numRounds; i++) {
      sum += delta;
      v0 += ((v1 << 4) + keyArray[0]) ^ (v1 + sum) ^ ((v1 >>> 5) + keyArray[1]);
      v1 += ((v0 << 4) + keyArray[2]) ^ (v0 + sum) ^ ((v0 >>> 5) + keyArray[3]);
    }

    keyArray = stringToUint32LE(uint32ToHexString(v0) + uint32ToHexString(v1));
  }

  return keyArray.map(uint32ToHexString).join('');
};

module.exports = { plaintextConverter };
