const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");
const { verifyToken } = require("../middlewares/authMiddleware");
router.post("/", verifyToken, roleController.createRole);
router.get("/", verifyToken, roleController.getAllRoles);
router.put("/:id", verifyToken, roleController.updateRole);
router.delete("/:id", verifyToken, roleController.deleteRole);

module.exports = router;
