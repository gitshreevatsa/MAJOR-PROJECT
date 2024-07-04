const fs = require("fs");

const downloadFile = async (cid, path) => {
  console.log("Downloading file", cid);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
  await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`)
    .then(async (response) => {
      console.log(
        await response,
        // await response.text().then((data) => {
        //   const buffer = Buffer.from(data, "utf8");
        //   const filePath = `${path}/clown.jpg`;
        //   fs.writeFileSync(filePath, buffer);
        // })
      );
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = { downloadFile };
