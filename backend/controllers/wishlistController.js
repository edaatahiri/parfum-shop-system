const prisma = require("../config/db");

exports.toggleWishlist = async (req, res) => {
  try {
    const klient_id = parseInt(req.body.klient_id);
    const parfum_id = parseInt(req.body.parfum_id);

    if (!klient_id || !parfum_id) {
      return res
        .status(400)
        .json({ error: "klient_id dhe parfum_id janë të detyrueshme!" });
    }

    const existingItem = await prisma.wishlist.findFirst({
      where: {
        klient_id: klient_id,
        parfum_id: parfum_id,
      },
    });

    if (existingItem) {
      // Nëse ekziston, e heqim (Remove)
      await prisma.wishlist.delete({
        where: { wishlist_id: existingItem.wishlist_id },
      });
      return res
        .status(200)
        .json({ message: "U hiq nga wishlist", action: "removed" });
    } else {
      // Nëse nuk ekziston, e shtojmë (Add)
      const newItem = await prisma.wishlist.create({
        data: {
          klient_id: klient_id,
          parfum_id: parfum_id,
          data_shtimit: new Date(),
        },
      });
      return res
        .status(201)
        .json({
          message: "U shtua në wishlist",
          action: "added",
          item: newItem,
        });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getKlientWishlist = async (req, res) => {
  try {
    const { klientId } = req.params;
    const listat = await prisma.wishlist.findMany({
      where: { klient_id: parseInt(klientId) },
      include: {
        parfumi: true, // Sigurohu që emri i relacionit në schema.prisma është saktë (parfumi ose parfum)
      },
    });
    res.status(200).json(listat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
