-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: untity
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `parent_id` int DEFAULT NULL,
  `article` varchar(45) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `username` varchar(255) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id to Post.id_idx` (`post_id`),
  KEY `parrent_id to comment.id_idx` (`parent_id`),
  KEY `username Comment_idx` (`username`),
  KEY `profilePhoto commnt_idx` (`profile_photo`),
  CONSTRAINT `parrent_id to comment.id` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_id to Post.id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profilePhoto commnt` FOREIGN KEY (`profile_photo`) REFERENCES `user` (`profile_photo`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `username Comment` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,NULL,NULL,'test comment 1','2024-09-16 17:57:57',NULL,NULL),(2,NULL,NULL,'test comment 1','2024-09-16 17:59:13',NULL,NULL),(4,27,NULL,'test comment 1','2024-09-16 18:08:25','root','/Users/seoyongmin/Sample-image61ef99e3-bf68-4dd1-bd43-0ed9c9753d3b.webp'),(5,27,NULL,'test comment 2 updated','2024-09-16 19:26:15','root','/Users/seoyongmin/Sample-image61ef99e3-bf68-4dd1-bd43-0ed9c9753d3b.webp'),(6,27,NULL,'test comment 2 updated','2024-09-16 19:26:29','root','/Users/seoyongmin/Sample-image61ef99e3-bf68-4dd1-bd43-0ed9c9753d3b.webp'),(7,27,NULL,'test comment 2 updated','2024-09-16 19:27:21','root','/Users/seoyongmin/Sample-image61ef99e3-bf68-4dd1-bd43-0ed9c9753d3b.webp'),(8,27,NULL,'test comment 2 updated','2024-09-16 19:30:53','root','/Users/seoyongmin/Sample-image61ef99e3-bf68-4dd1-bd43-0ed9c9753d3b.webp'),(9,27,NULL,'test comment 2 updated','2024-09-16 19:32:23','root','/Users/seoyongmin/Sample-image61ef99e3-bf68-4dd1-bd43-0ed9c9753d3b.webp'),(10,27,NULL,'test comment 2 updated','2024-09-16 19:46:37','root','/Users/seoyongmin/Sample-image61ef99e3-bf68-4dd1-bd43-0ed9c9753d3b.webp'),(11,27,NULL,'test comment 2 updated','2024-09-16 19:48:29','root','/Users/seoyongmin/Sample-image61ef99e3-bf68-4dd1-bd43-0ed9c9753d3b.webp');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `follower_id` varchar(255) DEFAULT NULL,
  `followed_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_follower_followed` (`follower_id`,`followed_id`),
  KEY `idx_follower_followed` (`follower_id`,`followed_id`),
  KEY `followed_user_idx` (`followed_id`),
  CONSTRAINT `followed_user` FOREIGN KEY (`followed_id`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `follower_user` FOREIGN KEY (`follower_id`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES (3,'root','1234'),(2,'root','root');
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `username to user.username_idx` (`username`),
  KEY `post_id to post.id_idx` (`post_id`),
  CONSTRAINT `likes_post_id to post.id` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `username to user.username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `nickname` varchar(45) DEFAULT NULL,
  `article` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT '0',
  `post_image` varchar(255) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `username_idx` (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (21,'root','root','test article',0,'/Users/seoyongmin/Sample-image06f2d383-3599-40ea-a190-9b0cb967a294.webp',NULL,'2024-09-11 15:19:15'),(24,'root','root','test2',0,'/Users/seoyongmin/Sample-image5d193857-d6c6-4553-bfd1-794ddef1cc41.jpeg',NULL,'2024-09-12 14:39:55'),(25,'root','root','test2',0,'/Users/seoyongmin/Sample-image87d8fe0e-e745-4342-802e-f27d536718ad.jpeg',NULL,'2024-09-12 14:41:04'),(26,'root','root','test2',0,'/Users/seoyongmin/Sample-imagea1953500-bbc9-478a-8abe-cbe68663b5dd.webp','/Users/seoyongmin/Sample-image06f2d383-3599-40ea-a19','2024-09-12 16:07:20'),(27,'root','root','test post id',0,'/Users/seoyongmin/Sample-image0aa5b913-66fc-4825-ac58-9396b5dd2454.webp','/Users/seoyongmin/Sample-image06f2d383-3599-40ea-a190-9b0cb967a294.webp','2024-09-12 16:18:54');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(10) DEFAULT 'NOMAL',
  `message` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `profile` (`profile_photo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1234','$2a$10$v9oom5pmIhYNrh/kZ6y0IumNQKyxQue0kXWiCHoNH3MyIJgbvf0/u','1234','/Users/seoyongmin/Sample-imaged8d816dc-d6af-491a-991a-0f41866d6c71.webp','2401083a@g.yju.ac.kr',NULL,NULL),('roo',NULL,'roo1','/Users/seoyongmin/Sample-image06f2d383-3599-40ea-a190-9b0cb967a294.webp',NULL,'NOMAL',NULL),('root','$2a$10$DkkCaasyDsZRLgy33YYEi.JeAAd0OOSfnkM.6JGvnxya8TJupf3V.','root','/Users/seoyongmin/Sample-image61ef99e3-bf68-4dd1-bd43-0ed9c9753d3b.webp','',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-19 17:35:16
