const prisma = require("../config/db");

exports.createKategoria = async (req, res) => {
  try {
    const kategoria = await prisma.kategoria.create({
      data: {
        emri: req.body.emri,
        pershkrimi: req.body.pershkrimi,
      },
    });
    res.status(201).json(kategoria);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllKategorite = async (req, res) => {
  try {
    const kategorite = await prisma.kategoria.findMany();
    res.json(kategorite);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateKategoria = async (req, res) => {
  try {
    const updated = await prisma.kategoria.update({
      where: { kategori_id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteKategoria = async (req, res) => {
  try {
    await prisma.kategoria.delete({
      where: { kategori_id: parseInt(req.params.id) },
    });
    res.json({ message: "Kategoria u fshi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
