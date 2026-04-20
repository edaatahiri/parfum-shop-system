const db = require("./config/db");

exports.getAllKategorite = (req, res) => {
  db.query("SELECT * FROM kategorite", (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};

exports.createKategorite = (req, res) => {
  const { emri, pershkrimi } = req.body;

  const q = "INSERT INTO kategorite (emri,pershkrimi) VALUES(?,?)";

  db.query(q, [emri, pershkrimi], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: " Kategoria u shtua me sukses!" });
  });
};
