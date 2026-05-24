const express = require("express");
const router = express.Router();
const klientController = require("../controllers/klientController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/", verifyToken, klientController.createKlient);
router.get("/", verifyToken, klientController.getAllKlientet);
router.put("/:id", verifyToken, klientController.updateKlient);
router.delete("/:id", verifyToken, klientController.deleteKlient);

module.exports = router;
