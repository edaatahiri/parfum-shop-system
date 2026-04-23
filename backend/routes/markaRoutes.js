const express = require("express");
const router = express.Router();
const markaController = require("../controllers/markaController");

router.post("/", markaController.createMarka);
router.get("/", markaController.getAllMarkat);
router.put("/:id", markaController.updateMarka);
router.delete("/:id", markaController.deleteMarka);

module.exports = router;
