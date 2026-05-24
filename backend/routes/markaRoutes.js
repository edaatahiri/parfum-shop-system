const express = require("express");
const router = express.Router();
const markaController = require("../controllers/markaController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", markaController.getAllMarkat);
router.post("/", verifyToken, markaController.createMarka);
router.put("/:id", verifyToken, markaController.updateMarka);
router.delete("/:id", verifyToken, markaController.deleteMarka);

module.exports = router;
