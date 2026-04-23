const express = require("express");
const router = express.Router();
const mostraController = require("../controllers/mostraController");

router.post("/", mostraController.createMostra);
router.get("/", mostraController.getAllMostrat);
router.put("/:id", mostraController.updateMostra);
router.delete("/:id", mostraController.deleteMostra);

module.exports = router;
