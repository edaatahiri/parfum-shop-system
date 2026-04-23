const prisma = require("../config/db");

exports.createParfum = async (req, res) => {
  try {
    const parfum = await prisma.parfum.create({
      data: {
        emri: req.body.emri,
        gjinia_target: req.body.gjinia_target,
        volumi_ml: parseInt(req.body.volumi_ml),
        cmimi: parseFloat(req.body.cmimi),
        sasia_stok: parseInt(req.body.sasia_stok),
        pershkrimi: req.body.pershkrimi,
        notat_ere: req.body.notat_ere,
        kategoria_id: parseInt(req.body.kategoria_id),
        marka_id: parseInt(req.body.marka_id),
      },
    });
    res.status(201).json(parfum);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllParfumet = async (req, res) => {
  try {
    const parfumet = await prisma.parfum.findMany({
      include: { kategoria: true, marka: true },
    });
    res.json(parfumet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateParfum = async (req, res) => {
  try {
    const updated = await prisma.parfum.update({
      where: { parfum_id: parseInt(req.params.id) },
      data: {
        ...req.body,
        volumi_ml: req.body.volumi_ml
          ? parseInt(req.body.volumi_ml)
          : undefined,
        cmimi: req.body.cmimi ? parseFloat(req.body.cmimi) : undefined,
        sasia_stok: req.body.sasia_stok
          ? parseInt(req.body.sasia_stok)
          : undefined,
        kategoria_id: req.body.kategoria_id
          ? parseInt(req.body.kategoria_id)
          : undefined,
        marka_id: req.body.marka_id ? parseInt(req.body.marka_id) : undefined,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteParfum = async (req, res) => {
  try {
    await prisma.parfum.delete({
      where: { parfum_id: parseInt(req.params.id) },
    });
    res.json({ message: "Parfumi u fshi" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
