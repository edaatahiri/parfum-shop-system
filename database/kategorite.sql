CREATE TABLE `kategorite` (
  `kategori_id` int NOT NULL AUTO_INCREMENT,
  `emri` varchar(100) DEFAULT NULL,
  `pershkrimi` text,
  PRIMARY KEY (`kategori_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM world.kategorite;