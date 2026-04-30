const logAction = require("../utilsAuditLogger");//per auditlog (lidhja)
const prisma = require("../config/db");

const logAction = require("../utilsAuditLogger");

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

    //  AUDIT LOG
    await logAction({
      userId: req.user?.id || 1,
      action: "CREATE",
      entity: "OFERTA",
      entityId: oferta.oferte_id,
      newData: oferta,
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

const logAction = require("../utilsAuditLogger");

exports.updateOferta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    
    const old = await prisma.ofertat.findUnique({
      where: { oferte_id: id },
    });

    if (!old) {
      return res.status(404).json({ error: "Oferta nuk ekziston" });
    }

    
    const updated = await prisma.ofertat.update({
      where: { oferte_id: id },
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

    // AUDIT LOG
    await logAction({
      userId: req.user?.id || 1,
      action: "UPDATE",
      entity: "OFERTA",
      entityId: id,
      oldData: old,
      newData: updated,
    });

    res.json(updated);
  } catch (err) {
    res.status(400).json({
      error: "Gabim gjate perditesimit: " + err.message,
    });
  }
};





exports.deleteOferta = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    
    const old = await prisma.ofertat.findUnique({
      where: { oferte_id: id },
    });

    if (!old) {
      return res.status(404).json({ error: "Oferta nuk ekziston" });
    }

    
    await prisma.ofertat.delete({
      where: { oferte_id: id },
    });

    // audit log
    await logAction({
      userId: req.user?.id || 1,
      action: "DELETE",
      entity: "OFERTA",
      entityId: id,
      oldData: old,
    });

    res.status(200).json({ message: "Oferta u fshi me sukses!" });
  } catch (err) {
    res.status(400).json({
      error: "Gabim gjate fshirjes: " + err.message,
    });
  }
};
