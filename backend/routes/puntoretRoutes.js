import express from "express";
import {
  getPuntoret,
  getPuntoriById,
  createPuntori,
  updatePuntori,
  deletePuntori,
} from "../controllers/puntoretController.js";

const router = express.Router();

router.get("/", getPuntoret);
router.get("/:id", getPuntoriById);
router.post("/", createPuntori);
router.put("/:id", updatePuntori);
router.delete("/:id", deletePuntori);

export default router;
