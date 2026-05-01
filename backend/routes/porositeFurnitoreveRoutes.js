const express = require("express");

const {
  getPorosite,
  getPorosiById,
  createPorosi,
  updatePorosi,
  deletePorosi,
} = require("../controllers/porositeFurnitoreveController");

const router = express.Router();

router.get("/", getPorosite);
router.get("/:id", getPorosiById);
router.post("/", createPorosi);
router.put("/:id", updatePorosi);
router.delete("/:id", deletePorosi);

module.exports = router;