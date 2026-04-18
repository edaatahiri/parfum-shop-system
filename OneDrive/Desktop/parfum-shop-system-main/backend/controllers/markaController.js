const db = require("../config/db");

exports.getAllMarkat = (req, res) => {
  db.query("SELECT * FROM Markat", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

exports.createMarka = (req, res) => {
  const { emri, shteti_origjines, website, pershkrimi, logoja } = req.body;
  const q =
    "INSERT INTO Markat (emri,shteti_origjines, website, pershkrimi, logoja) VALUES( ?,?,?,?,?)";

  db.query(
    q,
    [emri, shteti_origjines, website, pershkrimi, logoja],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Marka u shtua me sukses!" });
    },
  );
};
