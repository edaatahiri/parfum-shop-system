const express = require("express");

const {
  getShitjet,
  getShitjeById,
  createShitje,
  updateShitje,
  deleteShitje,
} = require("../controllers/shitjetController");

// 1. Importojmë Middleware-at e sigurisë (Policët e derës)
const { verifyToken, isManagment } = require("../middlewares/authMiddleware");

const router = express.Router();

// 2. I aplikojmë mbrojtjet te rrugët (Routes)
// Vetëm Admini mund t'i shohë të gjitha shitjet në Dashboard
router.get("/", verifyToken, isManagment, getShitjet);

// Për të parë një shitje specifike (KORRIGJUAR: Nga "//:id" në "/:id")
router.get("/:id", verifyToken, getShitjeById);

// Për të krijuar, përditësuar ose fshirë një shitje
router.post("/", verifyToken, createShitje);
router.put("/:id", verifyToken, updateShitje); // KORRIGJUAR: "/:id"
router.delete("/:id", verifyToken, deleteShitje); // KORRIGJUAR: "/:id"

module.exports = router;
