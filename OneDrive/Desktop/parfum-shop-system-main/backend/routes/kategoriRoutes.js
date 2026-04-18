const express = require("express");
const router = express.Router();
const kategoriController = require("../controllers/kategoriController");

router.get("/", kategoriController.getAllKategorite);
router.post("/", kategoriController.createKategorite);

module.exports = router;
