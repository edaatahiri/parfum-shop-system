const express = require("express");
const router = express.Router();
const parfumController = require("../controllers/parfumController");
const {
  verifyToken,
  isManagment,
} = require("../middlewares/authMiddleware");

// Rrugët e parfumit
router.get("/", parfumController.getAllParfumet);
router.post("/", verifyToken, isManagment, parfumController.createParfum);

// Korrigjimi: Ndryshuar nga isWorker në isManagment që të mos bëjë më crash
router.put("/:id", verifyToken, isManagment, parfumController.updateParfum);

router.delete("/:id", verifyToken, isManagment, parfumController.deleteParfum);

module.exports = router;