const prisma = require("../config/db");


exports.createShitje = async (req, res) => {
  try {
    const data = await prisma.shitjet.create({
      data: req.body
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getShitjet = async (req, res) => {
  try {
    const data = await prisma.shitjet.findMany({
      include: {
        klient: true,
        punetor: true
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getShitjeById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.shitjet.findUnique({
      where: { shitje_id: id },
      include: {
        klient: true,
        punetor: true
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateShitje = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.shitjet.update({
      where: { shitje_id: id },
      data: req.body
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteShitje = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.shitjet.delete({
      where: { shitje_id: id }
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};