const express = require("express");
const router = express.Router();
const kategoriController = require("../controllers/kategoriController");

router.post("/", kategoriController.createKategoria);
router.get("/", kategoriController.getAllKategorite);
router.put("/:id", kategoriController.updateKategoria);
router.delete("/:id", kategoriController.deleteKategoria);

module.exports = router;
