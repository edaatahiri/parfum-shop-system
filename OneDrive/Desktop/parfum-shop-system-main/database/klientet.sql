CREATE TABLE `klientet` (
  `klient_id` int NOT NULL AUTO_INCREMENT,
  `emri` varchar(100) DEFAULT NULL,
  `mbiemri` varchar(100) DEFAULT NULL,
  `telefoni` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `data_lindjes` date DEFAULT NULL,
  `gjinia` varchar(10) DEFAULT NULL,
  `adresa` text,
  `data_regjistrimit` datetime DEFAULT CURRENT_TIMESTAMP,
  `piket_besnikerise` int DEFAULT '0',
  PRIMARY KEY (`klient_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM world.klientet;