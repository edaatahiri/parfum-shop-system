const prisma = require("../config/db");

exports.createWishlist = async (req, res) => {
  try {
    const item = await prisma.wishlist.create({
      data: {
        klient_id: parseInt(req.body.klient_id),
        parfum_id: parseInt(req.body.parfum_id),
        data_shtimit: req.body.data_shtimit
          ? new Date(req.body.data_shtimit)
          : new Date(),
      },
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllWishlists = async (req, res) => {
  try {
    const listat = await prisma.wishlist.findMany({
      include: {
        klientet: true,
        parfumi: true,
      },
    });
    res.status(200).json(listat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.wishlist.delete({
      where: { wishlist_id: parseInt(id) },
    });
    res.status(200).json({ message: "U hoq nga lista e dëshirave" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
