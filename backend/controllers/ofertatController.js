const prisma = require("../config/db");

exports.createOferta = async (req, res) => {
  try {
    const oferta = await prisma.ofertat.create({
      data: {
        emri: req.body.emri,
        pershkrimi: req.body.pershkrimi,
        perqindja_zbritjes: parseFloat(req.body.perqindja_zbritjes),
        data_fillimit: new Date(req.body.data_fillimit),
        data_perfundimit: new Date(req.body.data_perfundimit),
        statusi: req.body.statusi,
      },
    });
    res.status(201).json(oferta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllOfertat = async (req, res) => {
  try {
    const ofertat = await prisma.ofertat.findMany();
    res.status(200).json(ofertat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOferta = async (req, res) => {
  try {
    const updated = await prisma.ofertat.update({
      where: { oferte_id: parseInt(req.params.id) },
      data: {
        emri: req.body.emri,
        pershkrimi: req.body.pershkrimi,
        perqindja_zbritjes: req.body.perqindja_zbritjes
          ? parseFloat(req.body.perqindja_zbritjes)
          : undefined,
        data_fillimit: req.body.data_fillimit
          ? new Date(req.body.data_fillimit)
          : undefined,
        data_perfundimit: req.body.data_perfundimit
          ? new Date(req.body.data_perfundimit)
          : undefined,
        statusi: req.body.statusi,
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Gabim gjate perditesimit: " + err.message });
  }
};

exports.deleteOferta = async (req, res) => {
  try {
    await prisma.ofertat.delete({
      where: { oferte_id: parseInt(req.params.id) },
    });
    res.status(200).json({ message: "Oferta u fshi me sukses!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
