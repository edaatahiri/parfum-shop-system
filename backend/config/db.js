const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "EdaRozi24root7",
<<<<<<< HEAD
  database: "world",
=======
  database: "parfum_shop"
>>>>>>> b9da55961dce7bb1fc43c2e16fe69726ca44dbea
});

db.connect((err) => {
  if (err) {
    console.log("DB error:", err);
  } else {
    console.log("MySQL connected");
  }
});

<<<<<<< HEAD
module.exports = db;
=======
module.exports = db;
>>>>>>> b9da55961dce7bb1fc43c2e16fe69726ca44dbea
