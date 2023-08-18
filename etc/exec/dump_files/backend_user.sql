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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `id` varchar(30) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `phone_number` varchar(30) DEFAULT NULL,
  `sex` varchar(10) DEFAULT NULL,
  `gym_code` int DEFAULT NULL,
  `regist` tinyint DEFAULT NULL,
  `device_code` varchar(100) DEFAULT NULL,
  `name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FK_admin_TO_user_1` (`gym_code`),
  KEY `FK_device_TO_user_1` (`device_code`),
  CONSTRAINT `FK_admin_TO_user_1` FOREIGN KEY (`gym_code`) REFERENCES `admin` (`gym_code`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_device_TO_user_1` FOREIGN KEY (`device_code`) REFERENCES `device` (`device_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test1','$2a$10$OyP02SyJi3j/in55HWsdA.a2d6M2bOFJh4us3ELc8BXIwrlCzGIUq','test1@naver.com','010-1234-1234','남',1234,1,NULL,'남완희'),(5,'test2','$2a$10$bVhz3gbSdAqGLt69qi0BWuKNrPWpNYWSiT5viFxVncA5ttg4OLXa2','test2@naver.com','010-1111-1111','남',1234,1,'a582c5a3','김승준'),(6,'kdh1234','$2a$10$0GW5QkWauHLUcFMfnCzPueWITP.8NIWEUB8YB1p947jjIxQYXsddK','test2@naver.com','010-1111-1111','남',1234,1,NULL,'이승준'),(7,'nwh97','$2a$10$g7K2UINyPpxfbNY2vMwiJ.JoQg3OhsX6PH8lMXhXsqZ8oCXtR3k/.','test4@naver.com','010-2222-2222','남',1234,1,'53E26709','김도훈'),(8,'test10','$2a$10$RGzNx5uk68TGJbsK7KSdy.d3L645qJf.OriUdiLRm32.K6pN7zU92','test10@naver.com','010-9999-9999','남',1234,1,NULL,'김승우'),(9,'neymar','$2a$10$qclye8F.bLrrFItGOBREH.QC8ZuIxOd7nGLtuPardmsx5i4c2Hs.i','neymar@brazil.com','010-2184-2111','남',NULL,1,NULL,'조세호'),(10,'test6','$2a$10$7Y3QYxgS7vlO5J/lmRAVVe4/GOQpXfxItFBXzPtgnHZnVSjahf7Uq','test@test.kr','010-1924-4421','여',1234,1,NULL,'이문희'),(11,'test7','$2a$10$702beoBYKK.isEG4XyVw5O0YoEbJ7DJymNMdpa3nEfcrUHe6Dm0U.','kora@koar.com','010-1294-1211','남',1234,1,NULL,'유재석'),(12,'butter','$2a$10$/KZI8x9E9.uTlK4hSjBI8uu1iITuNJJvqJSb/Z6J/6Wrjmh2/Svn6','butter1@ham.com','010-1211-3321','여',NULL,NULL,NULL,'김선희'),(13,'kim','$2a$10$EHhKI2cVqxb1l2bfNaLwwea1r015w4F9l6H7IcZz/zDIatTGByu9q','cho@dkc.kr','010-9833-9831','여',NULL,NULL,NULL,'나문희'),(14,'asenal10','$2a$10$56US5/i6qvOimHAZCo1h4OnjhErtTvhH.1JnMd0fAapf3GeIV6rUy','henry10@a.com','010-2298-4432','남',NULL,NULL,NULL,'김장훈'),(15,'castard','$2a$10$yzOGxS3qGLYpgETJXAhIBuWuvu3KNOTl9fWFlmHGuhkpZw8ql5m5G','hoho@do.com','010-7777-7777','남',NULL,NULL,NULL,'강호동'),(16,'test8','$2a$10$3LbJ8LDbc9EsbbBCQfpNtu31oJZHqijso/Gxi1UiXbpXto42DWA12','koasf@saf.com','010-3234-1312','여',NULL,NULL,NULL,'김성은'),(17,'ksw0712','$2a$10$b/uepA45JJkijAEzFiCCo.DTyKbmD2XynyTaYID0WzIlo4jAhDpmC','sadfasf@dasf.kr','010-1864-1569','남',1234,1,'93839b11','윤성빈'),(18,'test12','$2a$10$97xgmBzznJtJrCpqq2L9U.4NMjkzuCKIVMtnzmDodCyIJG4cmiuIW','osadfas@asdf.kr','010-2341-2341','남',1234,1,'e37f9eec','박효신'),(19,'test13','$2a$10$YMhwb38VoWv0kJJWkcEI3eOrxCU8oU1B3JmyoCaGdcBz3I0QsTufK','asf@sadf.kr','010-2341-2341','여',1234,1,NULL,'이예은'),(20,'a104','$2a$10$pLWGfjMswuw2jvcKKyjup.AccMyY7XcmRq/PIV.BRrV5G9HftD1Fu','ssafy@ssafy.com','010-1234-5678','남',NULL,NULL,NULL,'이광수'),(21,'ssafy11','$2a$10$KvBS3VQC7BWOYtkQbddXmOGYDCK6SHdfrmn.mNvUtEzm.6WS2dMoq','ssafy@ssafy.com','010-1234-5678','남',1234,1,NULL,'고범수'),(22,'handsomeguy','$2a$10$saS.0rB56gm6QLuKzVgIjOasrAYi4ID7wlEgNePJjODc/TX4DiYk2','ssafy@ssafy.com','010-1234-5678','남',1234,1,'f566c3a3','최치훈'),(23,'StarGazer','$2a$10$Lr3QLEfcm5AG77Gu1U2qlu/FeNpeCyTuvOwBvq6QQqnCye0GZfeNq','sadfsd@asdfa.kr','010-2423-1241','남',1234,1,NULL,'고창석'),(24,'AquaGem','$2a$10$dCpdf904.J4e378rAm2ps.YxJZe/mYAekcmQHa5oJgEPO1lpkKwcK','asdasdf.@asdf.kr','010-2341-2412','남',1234,NULL,NULL,'배예성'),(25,'SwiftCoder','$2a$10$PQjAT3s.bQcsf2WnQxoTiuL1JylC3wYlceZsi9Gn0KWuPq3P7Xjg2','asfsf@sadfsf.kr','010-2341-2348','여',1234,NULL,NULL,'이예리'),(26,'LunaDream','$2a$10$ousYsHDOSkcJcfMnCoGr1eZU/BmKY5Jnux0aMHdPLz7vWZGzCXoD6','ssafy@ssafy.com','010-1234-5667','남',1234,1,NULL,'박철수'),(27,'PixelPilot','$2a$10$WmWNuP5Cr1om4QsU1RYTMuLk463KQQEgzyqqiDZT/XR5YsNtVipQi','ss@ss.com','010-1234-1234','남',1234,1,NULL,'김범수'),(28,'NatureCharm','$2a$10$xTANxMqPgbtX84mIMqXHqOhwd44NJ51RQiag3IrqXyPoyNUVCyyY.','ss@ss.com','010-1234-1234','남',1234,1,NULL,'이지훈'),(29,'UrbanQuest','$2a$10$8YYbyAwkaQIG3HW0DdX19.ZrsidC80Hl8bc4.r8X0279iXu3gF4Pq','ss@ss.com','010-1234-1234','여',1234,1,NULL,'이민정'),(30,'CyberWhiz','$2a$10$pRxgjjuqYhRGjRkJdQjCK.wypwPjgyfsJssnSrL9sFpru5ZmY0YI6','ss@ss.kr','010-1234-1234','남',1234,1,NULL,'최일수'),(31,'SkyBlaze','$2a$10$yFm1VXXe4XrSDVMjWdrpy.KexDdI0FbO1uBbt8KAQ5Rr.9KB8Ljgy','ss@ss.com','010-1234-1234','여',1234,1,NULL,'김민아'),(32,'CrystalByte','$2a$10$so4mdkHrNIYuR2gPGNT2I.LNI/29WpeWHJfF.5/RNzPaMy37eLnkm','EE@msfo.com','010-1234-1234','남',1234,1,NULL,'최창석'),(33,'WildWander','$2a$10$OUUGn8SOBba1aLsxYiz5.OHykUrmIWYE9VEDdCmWnBOWIPKtkXA2O','saljf@nsadof.com','010-1234-1234','남',1234,1,NULL,'김동숙'),(34,'QuantumSpark','$2a$10$VRnJbGZfLb4qRwTQPEvrTOuYLpb8oF9dyy31iS2D3YuNgaeAK.OJe','werlj@asdofo.com','010-1234-1234','남',1234,1,NULL,'한동숙'),(35,'EchoRider','$2a$10$aUn5POWlmqVwirygn9Jh6uIieVAubGQNJ/cMO0ws1JbVD5pGTyuqi','lsddjfkj@nadslvj.com','010-1234-1234','여',1234,1,NULL,'고은서'),(36,'SilverScript','$2a$10$wOywW9vdgZPuQpLz46u0NeJ.J8BW3y1WYz28G2NNaWzS/HDSq7cye','lasjflk@nsdvo.com','010-1234-1234','남',1234,1,NULL,'김민교'),(37,'MysticNova','$2a$10$q3tk6VPpjprsZZSDBX9/nuuTY6TphuxI97XIvlrmPjfOJ/sHxFjEy','laj@mcvo.com','010-1234-1234','남',1234,1,NULL,'이상호'),(38,'SolarFlare','$2a$10$dVWrhQHtpKRMDS2aQ3iy/O/0OWNpq8n383b5vd/Vub.4Mkl1EIOMi','asldfkj@nsadvio.com','010-4254-2343','남',1234,1,NULL,'김상호'),(39,'TechTide','$2a$10$D1TodA95XkLTqH2aMvY7ROsYS1EuMM3Tb18dXWvADzordz8/EwIQy','weroij@nsadf.com','010-1232-1234','남',1234,1,NULL,'김인호'),(40,'SerenePixel','$2a$10$.pV1dsE3JHyGuEVWEcY3zutlMIadosIBM3nZHBsM9oNnxH5d68yOq','sadfj@cco.com','010-2323-1241','남',1234,1,NULL,'이상식'),(41,'BlazeArrow','$2a$10$D0w3XkHwza5Zbn.GaQS8CeF.ZbANs1AApztpa29.ZnxaUNxRN6quG','soie@nco.com','010-2323-5393','여',1234,1,NULL,'이서연'),(42,'ZenFusion','$2a$10$5mYLH2LG51VhdvYajU75Au2GW4bUGkQO227lUgyNQt8u4.1J5ssra','asjdfo@sdie.com','010-3533-1248','남',1234,1,NULL,'이도현'),(43,'AeroSwift','$2a$10$7r25ZB2vwYDy9bNEGJZBYOXxpw28Kz3kI3hpsC9eHb0RvSJMcRdKy','dls@doe.com','010-2323-4858','남',1234,1,NULL,'고승범'),(44,'TerraByte','$2a$10$HtCYxBG0v15QbzPPhj3Q7OCnqKkN3Bnx6W/2CAvpzxzrNlzZ5S2xm','jsafo@come.com','010-2388-3847','여',NULL,NULL,NULL,'박서영'),(45,'QuantumLeaf','$2a$10$RGOVjf3qf.AvLSYWpjR1vOu.P31krrAXZ2AxFksZhGVvDvEihhja.','jawoei@come.com','010-4828-5848','여',1234,1,NULL,'한기순'),(46,'PixelVortex','$2a$10$eAFGJ5x/4HgkkgRmTto0C.jYsvK31VWPLLKCeYS246./vRfjDK.3i','lasdfj@nsco.com','010-6565-9859','남',NULL,NULL,NULL,'이석현'),(47,'NeoScribe','$2a$10$EvbRaxM5eKBUx.ewdeAJ6ePwrrHhu1YtRo6Dq0st8HfO6efAF9jGK','wekrj@choj.com','010-2843-4858','여',1234,1,NULL,'박성현'),(48,'VelvetEcho','$2a$10$.85Bpj5n7EKlIDZGHdvIO.kymwbXxtErnt5SGiRvUDUTxmlgfS5H6','lewoi@ncoe.com','010-8532-7473','남',1234,1,NULL,'남창희'),(49,'CosmicRise','$2a$10$E4hIJE5bq0bA6bLK3XHLVuUdh8hHL1GPsHymA0CzjF3u4V223LbDC','ewr@cc.com','010-1232-4883','남',1234,1,NULL,'박근호'),(50,'EmberCircuit','$2a$10$aYhNoYVwmZRtwqBnfZQ7IeEc9WRTk8txjgoabl2eSfA/yTxfPHfUO','lsdfj@oee.com','010-1237-4832','남',1234,1,NULL,'박현정'),(51,'SonicScribe','$2a$10$IMrqrJ2Wo9Kn0D.s1Ll4TubBFCXeZ6mxhgL9pxM8ckYCIbNj9oSti','ladjf@dodd.com','010-2737-3747','남',1234,1,NULL,'김윤정'),(52,'AuroraPulse','$2a$10$Xa9kmm4on0Cx10.e7m1Kxew0NOCms6F7GcMI.o37TsWZMngX/RnHK','ssss@ssss.com','010-0000-0000','남',1234,1,NULL,'이윤정'),(53,'SuperSon','$2a$10$mnQCR7R4Ljs0Idc6BcMmBuCy5bALj15iMbajxTLdP8ryHhsAz4Okm','sale@nasdfew.com','010-2222-2222','남',1234,1,NULL,'이은정'),(54,'skadhksgml','$2a$10$bJ79/K5pytFmJUNYNCybu.3WHhBHvHdbfkMu8GwAzAapS1zzi.R7i','skadhksgml@skadhksgml.com','010-0000-0000','남',NULL,NULL,NULL,'skadhksgml'),(55,'siwoo123','$2a$10$S6rT4vyipIRB8qNQDOlZg.EUk5Qd22y2b99e0JHE4lpfqUccgcCWi','sksj@naver.com','010-2111-1234','남',1234,1,NULL,'김시우'),(56,'test99','$2a$10$XnFcU7Ov4RfEd6ONhSj1sOFgJ230GstXAyf2LrBx.wpRABkVea5R6','test10@naver.com','01099999999','남',NULL,NULL,NULL,'김승우'),(57,'nwh1111','$2a$10$vszY6xb9Lj7CHSF68C1mbOtedb18k7air7SmrwQLM/9i9xLS/aSh.','lcj000107@naver.com','010-1234-1234','남',NULL,NULL,NULL,'남완희'),(58,'arsenal','$2a$10$..hwrlQ/UsasVsnaKW56I.q/x7uRX0MJhFsbNeQoVkaFuAnhA9hEm','arsenal@arsenal.com','010-4234-6853','남',NULL,NULL,NULL,'외데고르'),(59,'jih01011','$2a$10$zkkduVfnGWgeasbcXFdSNOdjXcGg4juKm4cfE/uB/2minsiAzv4sm','jih01011@lycos.co.kr','010-2452-3425','남',1234,NULL,NULL,'김승우'),(60,'dahyoni','$2a$10$uKd2g6GrA68.xi.HOed/EOx10k4dZfXrV0gV8WXJ8XG9VPeCgH7wW','dada@gmail.com','010-8462-7472','남',1234,NULL,NULL,'백상현'),(61,'aaaa','$2a$10$EYbvjjirAjbfExUIVejxx.gyvXI0Dvtttpjw3Otd4gxvcjZtJ5raC','sdkfj@nav.com','010-1111-1111','남',NULL,NULL,NULL,'fdgdfg'),(62,'abcd','$2a$10$9.vj7vC0CfWfBgxvCO1Ef.u8lv7xJcDwrErrs7YsMQIM92CjrRd4W','sdkfj@nadf','010-1111-1111','남',NULL,NULL,NULL,'ㄴㅁㅇㄹㄴㅇㄹ'),(63,'abcde','$2a$10$yKWk77EYzLCXwS3lSF7hC.giZUfTeAzAtK2z7DaiwKo3VTFzRfOEq','askldf@nasdf','010-1112-2222','남',NULL,NULL,NULL,'테테테테스트'),(64,'gogildong','$2a$10$nOTn4K6ry6ROwWaQT.PHm.G1WDLUjBEwdTbaoL6ccNJUzHGEn5/fm','gogildong@naver.com','010-3245-6824','남',1234,NULL,NULL,'고길동'),(65,'dawn','$2a$10$Sab7O3kzvXJrvwL.tc9//OMX75yTjXjVQ0.edLKD2T9WWwFsvTjRm','dawn@gmail.com','010-2358-5829','남',1234,NULL,NULL,'장현재'),(66,'flurry','$2a$10$27IUe6sg7bypWqUtoCPil.gxYBZlqyr3ZarTyxCm28/d6Eag/fKeq','flurry@gmail.com','010-2358-5821','남',NULL,NULL,NULL,'조현수'),(67,'kranich','$2a$10$Vx18yG67VoCnxU9uhanSDeqPSPGJFLgHYqFe7BU.V4h75M5xCfPO6','kranich@gmail.com','010-6819-4892','남',1234,NULL,NULL,'백학준'),(68,'naver','$2a$10$3Lu6JLbgUbO/tPpDhNXUBe85hHFwoNvby5LuN1WvLTu3BpW6Tgrsa','yangy@naver.com','010-5437-4859','여',NULL,NULL,NULL,'양화진');
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

-- Dump completed on 2023-08-17 14:58:36
