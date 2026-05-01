const express = require("express");

const {
  getFurnitoret,
  getFurnitorById,
  createFurnitor,
  updateFurnitor,
  deleteFurnitor
} = require("../controllers/furnitoretController");

const router = express.Router();

router.get("/", getFurnitoret);
router.get("/:id", getFurnitorById);
router.post("/", createFurnitor);
router.put("/:id", updateFurnitor);
router.delete("/:id", deleteFurnitor);

module.exports = router;