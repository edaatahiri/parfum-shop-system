const express = require("express");
const router = express.Router();
const parfumController = require("../controllers/parfumController");

router.post("/", parfumController.createParfum);
router.get("/", parfumController.getAllParfumet);
router.put("/:id", parfumController.updateParfum);
router.delete("/:id", parfumController.deleteParfum);

module.exports = router;
