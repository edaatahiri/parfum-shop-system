const db = require("../config/db");

exports.getAllParfumes = (req, res) => {
  db.query("SELECT * FROM Parfumet", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

exports.createParfume = (req, res) => {
  const { emri, kategori_id, marka_id, cmimi, sasia_stok } = req.body;
  const q =
    "INSERT INTO Parfumet (emri, kategori_id, marka_id, cmimi, sasia_stok) VALUES(?,?,?,?,?)";
  db.query(
    q,
    [emri, kategori_id, marka_id, cmimi, sasia_stok],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Parfumi u shtua me sukses!" });
    },
  );
};
