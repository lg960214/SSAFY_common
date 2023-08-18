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
-- Table structure for table `reader`
--

DROP TABLE IF EXISTS `reader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reader` (
  `reader` varchar(100) NOT NULL,
  `region` varchar(30) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `gym_code` int NOT NULL,
  PRIMARY KEY (`reader`),
  KEY `FK_admin_TO_reader_1` (`gym_code`),
  CONSTRAINT `FK_admin_TO_reader_1` FOREIGN KEY (`gym_code`) REFERENCES `admin` (`gym_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reader`
--

LOCK TABLES `reader` WRITE;
/*!40000 ALTER TABLE `reader` DISABLE KEYS */;
INSERT INTO `reader` VALUES ('WW1001','A','벤치프레스1',1234),('WW1002','A','벤치프레스2',1234),('WW2001','B','풀업바',1234),('WW2002','C','케틀벨',1234),('WW2003','A','벤치프레스3',1234),('WW2004','A','레그프레스',1234),('WW2005','A','데드리프트',1234),('WW2006','B','런닝머신',1234),('WW2007','B','스쿼트랙',1234),('WW2008','B','덤벨',1234),('WW2009','B','랫풀다운',1234),('WW2010',NULL,NULL,1234),('WW2011',NULL,NULL,1234),('WW3001',NULL,NULL,1234),('WW3002',NULL,NULL,1234),('WW3003',NULL,NULL,1234),('WW3004',NULL,NULL,1234),('WW3005',NULL,NULL,1234),('WW3006',NULL,NULL,1234),('WW3007',NULL,NULL,1234),('WW3008',NULL,NULL,1234);
/*!40000 ALTER TABLE `reader` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-17 14:58:34
