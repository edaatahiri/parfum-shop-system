const express = require("express");

const {
  getShitjet,
  getShitjeById,
  createShitje,
  updateShitje,
  deleteShitje,
} = require("../controllers/shitjetController");

const router = express.Router();

router.get("/", getShitjet);
router.get("/:id", getShitjeById);
router.post("/", createShitje);
router.put("/:id", updateShitje);
router.delete("/:id", deleteShitje);

module.exports = router;