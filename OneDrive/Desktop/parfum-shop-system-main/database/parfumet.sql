CREATE TABLE `parfumet` (
  `parfum_id` int NOT NULL AUTO_INCREMENT,
  `emri` varchar(100) DEFAULT NULL,
  `marka_id` int DEFAULT NULL,
  `kategori_id` int DEFAULT NULL,
  `cmimi` decimal(10,2) DEFAULT NULL,
  `sasia_stok` int DEFAULT NULL,
  `gjinia_target` varchar(20) DEFAULT NULL,
  `volumi_ml` int DEFAULT NULL,
  `pershkrimi` text,
  `notat_ere` text,
  PRIMARY KEY (`parfum_id`),
  KEY `marka_id` (`marka_id`),
  KEY `kategori_id` (`kategori_id`),
  CONSTRAINT `parfumet_ibfk_1` FOREIGN KEY (`marka_id`) REFERENCES `markat` (`marka_id`),
  CONSTRAINT `parfumet_ibfk_2` FOREIGN KEY (`kategori_id`) REFERENCES `kategorite` (`kategori_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM world.parfumet;