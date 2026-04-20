CREATE TABLE `punetoret` (
  `punetor_id` int NOT NULL AUTO_INCREMENT,
  `emri` varchar(100) DEFAULT NULL,
  `mbiemri` varchar(100) DEFAULT NULL,
  `pozita` varchar(100) DEFAULT NULL,
  `telefoni` varchar(30) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `data_punesimit` date DEFAULT NULL,
  `paga` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`punetor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM world.punetoret;