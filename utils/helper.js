function stringToUint32LE(str) {
    const result = [];
    for (let i = 0; i < str.length; i += 4) {
        result.push(
            str.charCodeAt(i) |
            (str.charCodeAt(i + 1) << 8) |
            (str.charCodeAt(i + 2) << 16) |
            (str.charCodeAt(i + 3) << 24)
        );
    }
    return result;
}

function uint32ToHexString(value) {
    return ('00000000' + (value >>> 0).toString(16)).slice(-8);
}

module.exports = { stringToUint32LE, uint32ToHexString };