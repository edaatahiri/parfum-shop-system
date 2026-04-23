const prisma = require("../config/db");

exports.createMarka = async (req, res) => {
  try {
    const marka = await prisma.markat.create({
      data: {
        emri: req.body.emri,
        shteti_origjines: req.body.shteti_origjines,
        website: req.body.website,
        pershkrimi: req.body.pershkrimi,
        logoja: req.body.logoja,
      },
    });
    res.status(201).json(marka);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllMarkat = async (req, res) => {
  try {
    const markat = await prisma.markat.findMany();
    res.status(200).json(markat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMarka = async (req, res) => {
  try {
    const updated = await prisma.markat.update({
      where: { marka_id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMarka = async (req, res) => {
  try {
    await prisma.markat.delete({
      where: { marka_id: parseInt(req.params.id) },
    });
    res.json({ message: "Marka u fshi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
