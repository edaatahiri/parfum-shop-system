const express = require("express");
const router = express.Router();
const kategoriController = require("../controllers/kategoriController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.get("/", kategoriController.getAllKategorite);
router.post("/", verifyToken, kategoriController.createKategoria);
router.put("/:id", verifyToken, kategoriController.updateKategoria);
router.delete("/:id", verifyToken, kategoriController.deleteKategoria);

module.exports = router;
