const express = require("express");
const router = express.Router();
const mostraController = require("../controllers/mostraController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", mostraController.getAllMostrat);
router.post("/", verifyToken, mostraController.createMostra);
router.put("/:id", verifyToken, mostraController.updateMostra);
router.delete("/:id", verifyToken, mostraController.deleteMostra);

module.exports = router;
