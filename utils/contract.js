const AES = require("crypto-js/aes");

const plaintextConverter = (plaintext, key) => {
    const result = AES.encrypt(plaintext, key).toString();
    console.log(result);
    return result;
}

const ciphertextConverter = (ciphertext, key) => {

    const result = AES.decrypt(ciphertext, key).toString();
    console.log(result);
    return result;
}

module.exports = { plaintextConverter, ciphertextConverter };