const prisma = require("../config/db");


exports.createDetajPorosi = async (req, res) => {
  try {
    const data = await prisma.detajet_Porosise_Furnitorit.create({
      data: req.body
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDetajetPorosi = async (req, res) => {
  try {
    const data = await prisma.detajet_Porosise_Furnitorit.findMany({
      include: {
        porosi: true,
        parfum: true
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDetajPorosiById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.detajet_Porosise_Furnitorit.findUnique({
      where: { detal_id: id },
      include: {
        porosi: true,
        parfum: true
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateDetajPorosi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.detajet_Porosise_Furnitorit.update({
      where: { detal_id: id },
      data: req.body
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteDetajPorosi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.detajet_Porosise_Furnitorit.delete({
      where: { detal_id: id }
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};