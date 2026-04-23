const prisma = require("../config/db");

exports.createMostra = async (req, res) => {
  try {
    const mostra = await prisma.mostrat.create({
      data: {
        parfum_id: parseInt(req.body.parfum_id),
        sasia_stok: parseInt(req.body.sasia_stok),
        volumi_ml: parseInt(req.body.volumi_ml),
        statusi: req.body.statusi,
      },
    });
    res.status(201).json(mostra);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllMostrat = async (req, res) => {
  try {
    const mostrat = await prisma.mostrat.findMany({
      include: {
        parfumi: true,
      },
    });
    res.status(200).json(mostrat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMostra = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await prisma.mostrat.update({
      where: { mostre_id: parseInt(id) },
      data: {
        parfum_id: req.body.parfum_id
          ? parseInt(req.body.parfum_id)
          : undefined,
        sasia_stok: req.body.sasia_stok
          ? parseInt(req.body.sasia_stok)
          : undefined,
        volumi_ml: req.body.volumi_ml
          ? parseInt(req.body.volumi_ml)
          : undefined,
        statusi: req.body.statusi,
      },
    });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMostra = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.mostrat.delete({
      where: { mostre_id: parseInt(id) },
    });
    res.status(200).json({ message: "Mostra u fshi me sukses" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
