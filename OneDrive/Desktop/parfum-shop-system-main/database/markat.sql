CREATE TABLE `markat` (
  `marka_id` int NOT NULL AUTO_INCREMENT,
  `emri` varchar(100) DEFAULT NULL,
  `shteti_origjines` varchar(100) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `pershkrimi` text,
  `logoja` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`marka_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM world.markat;