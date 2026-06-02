const prisma = require("../config/db");

exports.createDetajShitje = async (req, res) => {
  try {
    const { parfumetId, sasia, cmimi, shitjeld } = req.body;

    // SHTO KETU: Kontrollo nëse ID-të janë valid
    const shitjeIdInt = parseInt(shitjeld);
    const parfumIdInt = parseInt(parfumetId);

    if (isNaN(shitjeIdInt) || isNaN(parfumIdInt)) {
      return res
        .status(400)
        .json({ error: "ID-të e shitjes ose parfumit janë të pavlefshme." });
    }

    const sasiaNum = parseInt(sasia || 1);
    const cmimiNjesi = parseFloat(cmimi);

    // KRIJIMI: Përdor `connect` për të lidhur shitjen dhe parfumet ekzistuese
    const data = await prisma.detajet_shitjes.create({
      data: {
        sasia: sasiaNum,
        cmimi_njesi: cmimiNjesi,
        cmimi_total: cmimiNjesi * sasiaNum,

        // Lidhja me shitjen ekzistuese
        shitjet: {
          connect: { shitje_id: shitjeIdInt },
        },

        // Lidhja me parfum ekzistues
        parfum: {
          connect: { parfum_id: parfumIdInt },
        },
      },
    });

    res.status(201).json(data);
  } catch (err) {
    console.error("Gabim në createDetajShitje:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getDetajet = async (req, res) => {
  try {
    const data = await prisma.detajet_shitjes.findMany({
      include: {
        shitjet: true,
        parfum: true,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDetajById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.detajet_shitjes.findUnique({
      where: { detal_id: id },
      include: {
        shitjet: true,
        parfum: true,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDetaj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await prisma.detajet_shitjes.update({
      where: { detal_id: id },
      data: req.body,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDetaj = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.detajet_shitjes.delete({
      where: { detal_id: id },
    });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
