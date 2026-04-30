const express = require("express");
const {
  getFurnitoret,
  getFurnitoriById,
  createFurnitori,
  updateFurnitori,
  deleteFurnitori
} = require("../controllers/furnitoretController");

const router = express.Router();

router.get("/", getFurnitoret);
router.get("/:id", getFurnitoriById);
router.post("/", createFurnitori);
router.put("/:id", updateFurnitori);
router.delete("/:id", deleteFurnitori);

module.exports = router;