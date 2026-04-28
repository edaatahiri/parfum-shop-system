const prisma = require("../config/db");


exports.createDetajShitje = async (req, res) => {
  try {
    const data = await prisma.detajet_Shitjes.create({
      data: req.body
    });

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDetajet = async (req, res) => {
  try {
    const data = await prisma.detajet_Shitjes.findMany({
      include: {
        shitje: true,
        parfum: true
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDetajById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.detajet_Shitjes.findUnique({
      where: { detal_id: id },
      include: {
        shitje: true,
        parfum: true
      }
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updateDetaj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.detajet_Shitjes.update({
      where: { detal_id: id },
      data: req.body
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.deleteDetaj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    await prisma.detajet_Shitjes.delete({
      where: { detal_id: id }
    });

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};