-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: I9A104.p.ssafy.io    Database: backend
-- ------------------------------------------------------
-- Server version	8.0.33-0ubuntu0.20.04.4

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
-- Table structure for table `reader_state`
--

DROP TABLE IF EXISTS `reader_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reader_state` (
  `reader` varchar(100) NOT NULL,
  `state` tinyint DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`reader`),
  KEY `FK_user_TO_reader_state_1` (`user_id`),
  CONSTRAINT `FK_reader_TO_reader_state_1` FOREIGN KEY (`reader`) REFERENCES `reader` (`reader`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_TO_reader_state_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reader_state`
--

LOCK TABLES `reader_state` WRITE;
/*!40000 ALTER TABLE `reader_state` DISABLE KEYS */;
INSERT INTO `reader_state` VALUES ('WW1001',1,NULL),('WW1002',1,NULL),('WW2001',1,NULL),('WW2002',1,NULL),('WW2003',1,NULL),('WW2004',1,NULL),('WW2005',1,NULL),('WW2006',1,NULL),('WW2007',1,NULL),('WW2008',1,NULL),('WW2009',1,NULL),('WW2010',1,NULL),('WW2011',1,NULL);
/*!40000 ALTER TABLE `reader_state` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 14:58:36
