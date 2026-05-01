const express = require("express");

const {
  getPunetoret,
  getPunetorById,
  createPunetor,
  updatePunetor,
  deletePunetor,
} = require("../controllers/punetoretController");

const router = express.Router();

router.get("/", getPunetoret);
router.get("/:id", getPunetorById);
router.post("/", createPunetor);
router.put("/:id", updatePunetor);
router.delete("/:id", deletePunetor);

module.exports = router;