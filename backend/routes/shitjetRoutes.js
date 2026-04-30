router.get("/", getShitjet);
router.get("/:id", getShitjaById);
router.post("/", createShitja);
router.put("/:id", updateShitja);
router.delete("/:id", deleteShitja);