const prisma = require("../config/db");
exports.createFurnitor = async (req, res) => {
  try {
    const {
      emri,
      personi_kontaktit,
      telefoni,
      email,
      adresa,
      shteti
    } = req.body;

    if (!emri || !personi_kontaktit || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const furnitor = await prisma.furnitoret.create({
      data: {
        emri,
        personi_kontaktit,
        telefoni,
        email,
        adresa,
        shteti
      }
    });

    res.status(201).json(furnitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getFurnitoret = async (req, res) => {
  try {
    const furnitoret = await prisma.furnitoret.findMany();
    res.json(furnitoret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getFurnitorById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const furnitor = await prisma.furnitoret.findUnique({
      where: { furnitor_id: id }
    });

    if (!furnitor) {
      return res.status(404).json({ message: "Nuk u gjet" });
    }

    res.json(furnitor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateFurnitor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const updated = await prisma.furnitoret.update({
      where: { furnitor_id: id },
      data: req.body
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFurnitor = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.furnitoret.delete({
      where: { furnitor_id: id }
    });

    res.json({ message: "Furnitori u fshi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};