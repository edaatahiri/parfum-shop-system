CREATE TABLE `shitjet` (
  `shitje_id` int NOT NULL AUTO_INCREMENT,
  `klient_id` int DEFAULT NULL,
  `punetor_id` int DEFAULT NULL,
  `data_shitjes` datetime DEFAULT CURRENT_TIMESTAMP,
  `shuma_totale` decimal(10,2) DEFAULT NULL,
  `zbritja` decimal(10,2) DEFAULT NULL,
  `metoda_pageses` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`shitje_id`),
  KEY `klient_id` (`klient_id`),
  KEY `punetor_id` (`punetor_id`),
  CONSTRAINT `shitjet_ibfk_1` FOREIGN KEY (`klient_id`) REFERENCES `klientet` (`klient_id`),
  CONSTRAINT `shitjet_ibfk_2` FOREIGN KEY (`punetor_id`) REFERENCES `punetoret` (`punetor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
SELECT * FROM world.shitjet;