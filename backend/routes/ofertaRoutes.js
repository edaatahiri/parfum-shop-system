const express = require("express");
const router = express.Router();
const ofertatController = require("../controllers/ofertatController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", ofertatController.getAllOfertat);
router.post("/", verifyToken, ofertatController.createOferta);
router.put("/:id", verifyToken, ofertatController.updateOferta);
router.delete("/:id", verifyToken, ofertatController.deleteOferta);

module.exports = router;
