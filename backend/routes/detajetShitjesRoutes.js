const express = require("express");

const {
  getDetajet,
  getDetajById,
  createDetajShitje,
  updateDetaj,
  deleteDetaj,
} = require("../controllers/detajetShitjesController");

const router = express.Router();

router.get("/", getDetajet);
router.get("/:id", getDetajById);
router.post("/", createDetajShitje);
router.put("/:id", updateDetaj);
router.delete("/:id", deleteDetaj);

module.exports = router;