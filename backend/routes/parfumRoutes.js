const express = require("express");
const router = express.Router();
const parfumController = require("../controllers/parfumController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", parfumController.getAllParfumet);
router.post("/", verifyToken, parfumController.createParfum);
router.put("/:id", verifyToken, parfumController.updateParfum);
router.delete("/:id", verifyToken, parfumController.deleteParfum);

module.exports = router;
