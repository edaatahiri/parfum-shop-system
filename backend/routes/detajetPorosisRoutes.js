import express from "express";
import {
  getDetajetPorosisByPorosia,
  createDetajPorosi,
  updateDetajPorosi,
  deleteDetajPorosi
} from "../controllers/detajetPorosisController.js";

const router = express.Router();

// Merr krejt detajet për një porosi specifike
router.get("/porosia/:porosiaId", getDetajetPorosisByPorosia);

// Shto detaj në porosi
router.post("/", createDetajPorosi);

// Update një detaj
router.put("/:id", updateDetajPorosi);

// Delete një detaj
router.delete("/:id", deleteDetajPorosi);

export default router;