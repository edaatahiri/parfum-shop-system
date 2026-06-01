const express = require("express");
const router = express.Router();
const parfumController = require("../controllers/parfumController");
const { verifyToken, isManagment } = require("../middlewares/authMiddleware");

router.get("/", parfumController.getAllParfumet);
router.post("/", verifyToken, isManagment, parfumController.createParfum);
router.put("/:id", verifyToken, isManagment, parfumController.updateParfum);
router.delete("/:id", verifyToken, isManagment, parfumController.deleteParfum);

module.exports = router;
