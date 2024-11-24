CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `iduser` int NOT NULL,
  `idlocation` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_location` (`iduser`,`idlocation`),
  KEY `id_idx` (`idlocation`),
  CONSTRAINT `fk_location` FOREIGN KEY (`idlocation`) REFERENCES `locations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (94,2,1),(117,2,2),(101,2,3),(103,2,5),(109,2,6),(112,2,8),(115,2,9),(105,2,10),(114,2,20),(12,3,5),(8,3,6),(15,3,10),(6,4,2),(7,4,5),(13,4,9),(14,6,5),(5,6,7),(10,6,10);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `country` varchar(45) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `description` text NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'France','Paris','Explore the romantic city of Paris with guided tours to the Eiffel Tower, Louvre, and more.','2024-10-31 22:00:00','2024-12-29 22:00:00',12000.00,'https://sa.visamiddleeast.com/content/dam/VCOM/regional/cemea/generic-cemea/travel-with-visa/destinations/paris/travel-paris-eiffel-tower-800x450.jpg'),(2,'Japan','Tokyo','Discover the vibrant culture of Tokyo with visits to temples, skyscrapers, and amazing food spots.','2024-10-09 18:00:00','2025-07-14 18:00:00',1500.00,'https://media.cntraveller.com/photos/6343df288d5d266e2e66f082/16:9/w_1920,c_limit/tokyoGettyImages-1031467664.jpeg'),(3,'USA','New York','Experience the bustling life of New York City with a tour of Central Park, Times Square, and Broadway shows.','2027-12-31 20:00:00','2041-01-04 20:00:00',1300.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/1200px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg'),(4,'Spain','Barcelona','Enjoy the artistic flair of Barcelona, from Gaudi’s architecture to vibrant street life.','2024-10-20 00:00:00','2024-10-25 00:00:00',1400.00,'https://www.barcelo.com/guia-turismo/wp-content/uploads/que-visitar-en-barcelona-1.jpg'),(5,'Thailand','Phuket','Relax on the beaches of Phuket and explore nearby islands by boat.','2025-10-17 21:00:00','2025-10-21 21:00:00',1100.00,'https://content.phuket101.net/wp-content/uploads/20210829162409/phuket-sunday-walking-street-market.jpg'),(6,'Netherlands','Amsterdam','Tour Amsterdam’s canals, museums, and charming streets.','2024-10-19 00:00:00','2024-10-24 00:00:00',1250.00,'https://static01.nyt.com/images/2023/09/24/multimedia/24-36Hrs-Amsterdam-01-01-cwqt/24-36Hrs-Amsterdam-01-01-cwqt-videoSixteenByNineJumbo1600.jpg'),(7,'Australia','Sydney','Take a trip to the stunning beaches and Opera House of Sydney.','2025-01-15 00:00:00','2025-01-20 00:00:00',1800.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/800px-Sydney_Opera_House_-_Dec_2008.jpg'),(8,'Iceland','Reykjavik','Witness the breathtaking Northern Lights and explore the beauty of Iceland’s landscapes.','2025-01-05 00:00:00','2025-01-10 00:00:00',2000.00,'https://content.r9cdn.net/rimg/dimg/f2/50/76faf4b0-city-11024-556f15e0.jpg?crop=true&width=1020&height=498'),(9,'South Africa','Cape Town','Enjoy the scenic beauty and culture of Cape Town with tours of Table Mountain and wine regions.','2025-01-12 00:00:00','2025-01-18 00:00:00',1600.00,'https://cdn.britannica.com/42/126842-050-0803BC41/Sea-Point-Cape-Town-SAf.jpg'),(10,'Brazil','Rio de Janeiro, ','Experience the Carnival atmosphere, beaches, and vibrant nightlife of Rio.','2025-01-20 00:00:00','2025-01-25 00:00:00',1450.00,'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/800px-Cidade_Maravilhosa.jpg'),(11,'Israel','Tel Aviv','Enjoy a week-long vacation in the vibrant city of Tel Aviv, Israel. Explore its beautiful beaches, bustling markets, and rich history.','2025-05-10 00:00:00','2025-05-22 00:00:00',1500.00,'https://www.carlton.co.il/wp-content/uploads/2023/02/Tel-Aviv-beach.b197b0.webp'),(19,'England','hogwarts','Embark on a magical journey to Hogwarts, the world-renowned school of witchcraft and wizardry!','2024-11-11 20:48:36','2038-11-10 22:00:00',1000000.00,'https://www.pluggedin.com/wp-content/uploads/2023/02/hogwarts-legacy-1024x587.jpg'),(20,'Middle-Earth','mordor','Prepare yourself for an unforgettable journey to the dark and mysterious lands of Mordor! ','2024-11-02 20:53:34','2041-11-08 20:53:34',1.00,'https://img.goodfon.com/wallpaper/nbig/a/8c/lord-of-the-rings-mordor-mount-doom-eye-of-sauron.webp');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(45) DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'willi','brown','willi@gmail.com','$2b$10$Apd6o5g4HzcHWwxrxsBigevBOqZ5eZBiczU7A2FzaXesyKvBFlPCW','admin'),(2,'Michael','Smith','michael.smith@example.com','$2a$10$TsUDY7BTDHA1IMiMIhtLCOU/eBIyDGt.ICw7m1FcgyVq9NTCxgo9K','user'),(3,'Sarah','Davis','sarah.davis@example.com','$2a$10$4aq3TIw7MMushcQUSQaH0.lW/9J2PrSvhwgB1ElqEQe4XOKUxrIfS','user'),(4,'Daniel','Lee','daniel.lee@example.com','$2a$10$.cC/Sytx0j5dSu4Q.ZqDSeJ1MBpsIz0YgGLoxC5t/GcSJc5GCPVXO','user'),(5,'Olivia','Brown','olivia.brown@example.com','$2a$10$thA1Pn0cvsnNXFrSQfO5i.Be4Hze20xdiyYO/q.zniKCMUZrRTwlO','user'),(6,'Emily','Johnson','emily.johnson@example.com','$2a$10$QP2cQhsNi2/CNZPzqH9SUu359iiSFXVuxEfATpYnVhnrowAvYHaWO','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-20  9:28:25
