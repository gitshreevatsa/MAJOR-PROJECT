const router = require("express").Router();

const { uploadController } = require("../controller/uploadFile");
const { retrieveAllFiles } = require("../controller/retreiveFile");
const { getNonce, verifySignature, isLoggedin } = require("../controller/auth");

router.post("/upload", uploadController);
router.get("/retrieve", retrieveAllFiles);
router.get("/nonce", getNonce);
router.post("/verify", verifySignature);

module.exports = router;