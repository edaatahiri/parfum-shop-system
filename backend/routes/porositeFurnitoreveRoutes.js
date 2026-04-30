router.get("/", getPorosite);
router.get("/:id", getPorosiaById);
router.post("/", createPorosia);
router.put("/:id", updatePorosia);
router.delete("/:id", deletePorosia);