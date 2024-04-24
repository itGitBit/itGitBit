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
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `description` varchar(700) NOT NULL,
  `steps` varchar(1000) NOT NULL,
  `image` varchar(450) DEFAULT NULL,
  `user_id` int NOT NULL,
  `likes_amount` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `recipe_title_description` (`title`,`description`) /*!80000 INVISIBLE */,
  KEY `Recipe_user_connection_idx` (`user_id`),
  CONSTRAINT `recipe_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (60,'Sinta','Salt and pepper t-bone steak','1. an hour before cooking add sea salt, pepper, and olive oil to the steak and rub it in. 2. cook for 4 minutes for medium cooking. 3. cook about 8 minutes for well done. 4. enjoy!','https://images.pexels.com/photos/15814371/pexels-photo-15814371/free-photo-of-raw-t-bone-steak-on-ice-cubes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',2,3),(86,'french fries','the best french fries you\'ll ever make','1. cut the potatoes to desired width. 2. fry deep in pre-heated oil. 3. cook about 8 minutes. 4. enjoy!','https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',5,4),(90,'Classic Tomato Spaghetti','A simple, classic spaghetti recipe that shows you how to create a delicious tomato sauce from scratch.','1. Boil pasta in salted water. 2. Sauté garlic and onions in olive oil. 3. Add crushed tomatoes and simmer. 4. Season with salt, pepper, and basil. 5. Mix spaghetti with the sauce and serve.','https://images.pexels.com/photos/14737/pexels-photo.jpg',1,4),(91,'Creamy Mushroom Risotto','A rich and creamy risotto, perfect for mushroom lovers. Made with Arborio rice, fresh mushrooms, and Parmesan cheese for a comforting meal.','1. Sauté chopped onions in butter until soft. 2. Add Arborio rice and toast lightly. 3. Gradually add chicken broth, stirring constantly. 4. Stir in fresh mushrooms and cook until soft. 5. Finish with Parmesan cheese and a touch of cream. Serve warm.','https://images.pexels.com/photos/2067418/pexels-photo-2067418.jpeg',2,3),(94,'Grilled Lemon Herb Chicken Salad','A refreshing and light chicken salad, marinated in lemon and herbs, then grilled to perfection. Served on a bed of mixed greens with a lemon vinaigrette dressing.','1. Marinate chicken breasts in lemon juice, olive oil, and herbs. 2. Grill chicken until cooked through. 3. Toss mixed greens with cucumber, tomatoes, and red onion. 4. Slice chicken and place on top of the salad. 5. Drizzle with lemon vinaigrette and serve.','https://images.pexels.com/photos/12364377/pexels-photo-12364377.jpeg',5,2),(102,'Classic Chocolate Chip Cookies','Delicious homemade chocolate chip cookies with a crispy edge and chewy center.','Preheat oven to 350°F. Cream butter and sugars, add eggs and vanilla. Mix in dry ingredients and chocolate chips. Bake on ungreased cookie sheets.','https://images.pexels.com/photos/1775283/pexels-photo-1775283.jpeg',5,1),(103,'Simple Vanilla Cupcakes','Light and fluffy vanilla cupcakes with a creamy frosting, perfect for any occasion.','Mix batter ingredients, fill cupcake liners, and bake. Whip up frosting and decorate.','https://images.pexels.com/photos/306070/pexels-photo-306070.jpeg',1,1),(107,'Classic Caesar Salad','A timeless Caesar salad with crunchy croutons, creamy dressing, and a sprinkle of Parmesan cheese.','Toss romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.','https://images.pexels.com/photos/20123614/pexels-photo-20123614/free-photo-of-gourmet-breakfast-with-coffee.jpeg',2,1),(110,'Spicy Szechuan Noodles','Quick and easy Szechuan noodles with a hot and spicy sauce, perfect for a weeknight meal.','Cook noodles, prepare Szechuan sauce, mix together and garnish with green onions.','https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg',5,1),(111,'Quinoa Salad with Lemon Dressing','A refreshing and nutritious quinoa salad tossed in a zesty lemon dressing.','Cook quinoa, chop vegetables, whisk dressing, and combine all ingredients.','https://images.pexels.com/photos/9893127/pexels-photo-9893127.jpeg',1,2),(112,'Homemade Beef Tacos','Savory beef tacos with fresh toppings and homemade taco shells, a family favorite.','Cook beef with spices, prepare taco shells, assemble tacos with toppings.','https://images.pexels.com/photos/674578/pexels-photo-674578.jpeg',2,1),(133,'Classic Margherita Pizza','A simple yet delicious classic Margherita pizza with homemade pizza dough, fresh mozzarella, tomatoes, basil, and a drizzle of olive oil.','Prepare pizza dough, spread tomato sauce, add slices of mozzarella, bake until crust is golden, garnish with fresh basil.','https://images.pexels.com/photos/6605214/pexels-photo-6605214.jpeg',2,2),(135,'Classic Chicken Parmesan','Crispy breaded chicken breasts topped with marinara sauce and melted mozzarella and Parmesan cheese. Served with a side of spaghetti for a comforting classic Italian meal.','Bread and fry chicken breasts, top with marinara sauce and cheese, bake until cheese is bubbly, serve with spaghetti.','https://images.pexels.com/photos/10806015/pexels-photo-10806015.jpeg',2,1);
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
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
