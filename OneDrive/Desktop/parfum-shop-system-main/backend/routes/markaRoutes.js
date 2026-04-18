const express = require("express");
const router = express.Router();
const markaController = require("../controllers/markaController");

router.get("/", markaController.getAllMarkat);
router.post("/", markaController.createMarka);

module.exports = router;
