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
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=182 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (123,'all purpose flour'),(91,'Arborio Rice'),(126,'baking powder'),(1,'Basil'),(180,'breadcrumbs'),(92,'Butter'),(140,'Caesar dressing'),(154,'cheddar cheese'),(75,'chicken breast'),(97,'Chicken Breasts'),(93,'Chicken Broth'),(11,'chicken fillet'),(124,'chocolate chips'),(8,'cooking oil'),(96,'Cream'),(141,'croutons'),(90,'Crushed Tomatoes'),(100,'Cucumber'),(127,'eggs'),(147,'feta cheese'),(179,'fresh basil'),(94,'Fresh Mushrooms'),(88,'Garlic'),(125,'granulated sugar'),(149,'ground beef'),(98,'Lemon'),(148,'lemon juice'),(152,'lettuce'),(181,'marinara sauce'),(6,'meat'),(128,'milk'),(99,'Mixed Greens'),(177,'mozzarella cheese'),(142,'noodles'),(74,'oil'),(7,'olive oil'),(89,'Onion'),(95,'Parmesan Cheese'),(2,'Parsley'),(4,'pepper'),(176,'pizza dough'),(73,'potatoes'),(146,'quinoa'),(102,'Red Onion'),(139,'romaine-lettuce'),(3,'Salt'),(144,'sesame oil'),(143,'soy sauce'),(87,'Spaghetti'),(5,'steak'),(145,'Szechuan peppercorns'),(150,'taco seasoning'),(151,'taco shells'),(153,'tomato'),(178,'tomato sauce'),(101,'Tomatoes'),(129,'vanilla extract'),(122,'white sugar');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-24 20:20:39
