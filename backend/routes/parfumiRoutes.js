const express = require("express");
const router = express.Router();
const parfumiController = require("../controllers/parfumiController");

router.get("/", parfumiController.getAllParfumes);
router.post("/", parfumiController.createParfume);

module.exports = router;
