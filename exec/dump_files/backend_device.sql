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
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `device_code` varchar(100) NOT NULL,
  `gym_code` int NOT NULL,
  `use_device` tinyint DEFAULT NULL,
  PRIMARY KEY (`device_code`),
  KEY `FK_admin_TO_device_1` (`gym_code`),
  CONSTRAINT `FK_admin_TO_device_1` FOREIGN KEY (`gym_code`) REFERENCES `admin` (`gym_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES ('53E26709',1234,1),('93839b11',1234,1),('a582c5a3',1234,1),('e37f9eec',1234,1),('f566c3a3',1234,1),('z039fgib',1234,NULL),('z11vuie5',1234,NULL),('z123erhn',1234,NULL),('z345we5b',1234,NULL),('z34afb1',1234,NULL),('z482gbnh',1234,NULL),('z485bbz1',1234,NULL),('z4e8412e',1234,NULL),('z73vhhe1',1234,NULL),('z8gk78bx',1234,NULL),('z9fn34fz',1234,NULL),('zbnf44z1',1234,NULL),('zfn14kr6',1234,NULL),('znb10vxx',1234,NULL),('znbdiu46',1234,NULL),('zvjd12op',1234,NULL),('zz121bj5',1234,NULL),('zzpp55re',1234,NULL),('zzre12e9',1234,NULL);
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 14:58:35
