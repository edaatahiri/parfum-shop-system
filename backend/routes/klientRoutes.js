const express = require("express");
const router = express.Router();
const klientController = require("../controllers/klientController");

router.post("/", klientController.createKlient);
router.get("/", klientController.getAllKlientet);
router.put("/:id", klientController.updateKlient);
router.delete("/:id", klientController.deleteKlient);

module.exports = router;
