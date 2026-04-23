const express = require("express");
const router = express.Router();
const ofertatController = require("../controllers/ofertatController");

router.post("/", ofertatController.createOferta);
router.get("/", ofertatController.getAllOfertat);
router.put("/:id", ofertatController.updateOferta);
router.delete("/:id", ofertatController.deleteOferta);

module.exports = router;
