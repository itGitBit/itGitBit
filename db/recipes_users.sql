-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: recipes
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `profile_picture` varchar(400) DEFAULT NULL,
  `active` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'user1','$2b$10$Hfi9OB17N3dvIPK1CpJXCOtPqJMnSh/AMTDQAbHY2MElBQCz7Bf.e','user1@example.com','admin','https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',1),(2,'ItaiDaGreat','$2b$2b$10$6F.JRKX7tUnDRrXpt8npjuJp/s7LvGbSSR/Z/MVO499xCVuXmUIqS','user2@example.com','user','https://images.pexels.com/photos/784633/pexels-photo-784633.jpeg',1),(5,'ItaiDaGreat1','$2b$10$9xdiKYOOCNFfxtSUg.en0eyaUMH85HoW5sSrqiZF4lx7Ptaiosugy','user3@example.com','user','https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg',1),(6,'Itai','$2b$10$XS/3mvZbfW3qMokpTquM/ejVZIxBxoYZsCw.cNpgqsYCxbKpdkAwG','itaib@gmail.com','user','https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg',1),(7,'Jada','$2b$10$8Ewcq2E0/UOKXzHDAg6KXuxd7KRrf7a3KIvY.xB1dhL9UV92DANwq','Jada@example.com','user','https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg',1),(8,'Jada1','$2b$10$DG0M.a4gu2k7jBqslXQVjeRrFYkPFx1H4K0O/QgTgGa8aOSXWZWci','Jada1@example.com','user','https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg',1),(9,'Jada2','$2b$10$pPv3HxgncXHsBvORh4FaE.XdP.qwCeWoeVXdpVlcMGDi6W8FaPkoW','Jada2@example.com','user','https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg',1);
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

-- Dump completed on 2024-04-24 20:20:40
