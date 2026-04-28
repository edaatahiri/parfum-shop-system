const prisma = require("../config/db");


exports.createPorosi = async (req, res) => {
  try {
    const data = await prisma.porosite_Furnitoreve.create({
      data: req.body
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPorosite = async (req, res) => {
  try {
    const data = await prisma.porosite_Furnitoreve.findMany({
      include: {
        furnitor: true
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getPorosiById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.porosite_Furnitoreve.findUnique({
      where: { porosi_id: id },
      include: {
        furnitor: true
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updatePorosi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.porosite_Furnitoreve.update({
      where: { porosi_id: id },
      data: req.body
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deletePorosi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.porosite_Furnitoreve.delete({
      where: { porosi_id: id }
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};