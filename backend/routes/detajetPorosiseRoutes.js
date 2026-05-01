const express = require("express");

const {
  getDetajetPorosi,
  getDetajPorosiById,
  createDetajPorosi,
  updateDetajPorosi,
  deleteDetajPorosi,
} = require("../controllers/detajetPorosiseController");

const router = express.Router();

router.get("/", getDetajetPorosi);
router.get("/:id", getDetajPorosiById);
router.post("/", createDetajPorosi);
router.put("/:id", updateDetajPorosi);
router.delete("/:id", deleteDetajPorosi);

module.exports = router;