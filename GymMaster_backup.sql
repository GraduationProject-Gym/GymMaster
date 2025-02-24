-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: GymMaster
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `attendances`
--

DROP TABLE IF EXISTS `attendances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendances` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `check_in` datetime DEFAULT NULL,
  `check_out` datetime DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `attendances_user_id_foreign` (`user_id`),
  CONSTRAINT `attendances_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendances`
--

LOCK TABLES `attendances` WRITE;
/*!40000 ALTER TABLE `attendances` DISABLE KEYS */;
INSERT INTO `attendances` VALUES (1,'2024-10-10 05:54:47','2024-10-10 07:52:45',12,'2024-10-10 05:54:47','2024-10-10 07:52:45'),(2,'2024-10-10 05:55:13','2024-10-10 05:55:23',13,'2024-10-10 05:55:13','2024-10-10 05:55:23'),(3,'2024-10-10 07:52:33',NULL,12,'2024-10-10 07:52:33','2024-10-10 07:52:33'),(4,'2025-02-24 11:42:30','2025-02-24 11:42:33',13,'2025-02-24 11:42:30','2025-02-24 11:42:33');
/*!40000 ALTER TABLE `attendances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_equipments`
--

DROP TABLE IF EXISTS `class_equipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_equipments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `class_id` bigint unsigned NOT NULL,
  `equipment_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `class_equipments_class_id_foreign` (`class_id`),
  KEY `class_equipments_equipment_id_foreign` (`equipment_id`),
  CONSTRAINT `class_equipments_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `gymclass` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_equipments_equipment_id_foreign` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_equipments`
--

LOCK TABLES `class_equipments` WRITE;
/*!40000 ALTER TABLE `class_equipments` DISABLE KEYS */;
INSERT INTO `class_equipments` VALUES (37,NULL,NULL,48,3),(38,NULL,NULL,48,5),(39,NULL,NULL,48,7),(40,NULL,NULL,49,3),(41,NULL,NULL,49,5),(42,NULL,NULL,49,7);
/*!40000 ALTER TABLE `class_equipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_exerciess`
--

DROP TABLE IF EXISTS `class_exerciess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_exerciess` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `class_id` bigint unsigned NOT NULL,
  `exercise_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `class_exerciess_class_id_foreign` (`class_id`),
  KEY `class_exerciess_exercise_id_foreign` (`exercise_id`),
  CONSTRAINT `class_exerciess_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `gymclass` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_exerciess_exercise_id_foreign` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_exerciess`
--

LOCK TABLES `class_exerciess` WRITE;
/*!40000 ALTER TABLE `class_exerciess` DISABLE KEYS */;
INSERT INTO `class_exerciess` VALUES (50,NULL,NULL,48,5),(51,NULL,NULL,48,7),(52,NULL,NULL,48,8),(53,NULL,NULL,49,9),(54,NULL,NULL,49,7),(55,NULL,NULL,49,6);
/*!40000 ALTER TABLE `class_exerciess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipments`
--

DROP TABLE IF EXISTS `equipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `used_weight` decimal(8,2) DEFAULT NULL,
  `number_of_equipments` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipments`
--

LOCK TABLES `equipments` WRITE;
/*!40000 ALTER TABLE `equipments` DISABLE KEYS */;
INSERT INTO `equipments` VALUES (3,'HIIT Training',15.00,10,'2024-10-09 13:04:25','2024-10-09 13:04:25',NULL),(4,'Treadmills',10.00,8,'2024-10-09 13:04:25','2024-10-09 13:04:25',NULL),(5,'Dumbbells',10.00,5,'2024-10-09 13:04:25','2024-10-09 13:04:25',NULL),(6,'Chest Press Machine',10.00,5,'2024-10-09 13:04:25','2024-10-09 13:04:25',NULL),(7,'Barbells',10.00,5,'2024-10-09 13:04:25','2024-10-09 13:04:25',NULL),(8,'dample',20.00,10,'2024-10-10 08:03:17','2024-10-10 08:03:17',NULL);
/*!40000 ALTER TABLE `equipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('Strength','Cardio','Flexibility and Mobility','Recovery and Rehabilitation') COLLATE utf8mb4_unicode_ci NOT NULL,
  `no_of_times` int NOT NULL DEFAULT '10',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES (5,'HIIT Training - Burpees','Cardio',10,'2024-10-09 13:07:49','2024-10-09 13:07:49',NULL),(6,'HIIT Training - Jump Squats','Cardio',12,'2024-10-09 13:07:49','2024-10-09 13:07:49',NULL),(7,'HIIT Training - Mountain Climbers','Cardio',15,'2024-10-09 13:07:49','2024-10-09 13:07:49',NULL),(8,'HIIT Training - High Knees','Cardio',8,'2024-10-09 13:07:49','2024-10-09 13:07:49',NULL),(9,'HIIT Training - Sprints','Cardio',11,'2024-10-09 13:07:49','2024-10-09 13:07:49',NULL),(10,'Strength','Cardio',30,'2024-10-10 06:46:08','2024-10-10 06:46:08',NULL),(11,'scooad','Strength',30,'2024-10-10 08:03:56','2024-10-10 08:03:56',NULL);
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gymclass`
--

DROP TABLE IF EXISTS `gymclass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gymclass` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `status` tinyint(1) NOT NULL,
  `total_no_of_session` int NOT NULL,
  `max_trainee` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `trainer_id` bigint unsigned NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `gymclass_trainer_id_foreign` (`trainer_id`),
  CONSTRAINT `gymclass_trainer_id_foreign` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gymclass`
--

LOCK TABLES `gymclass` WRITE;
/*!40000 ALTER TABLE `gymclass` DISABLE KEYS */;
INSERT INTO `gymclass` VALUES (48,'HIIT','High-Intensity Interval Training (HIIT) is a fast-paced workout designed to maximize fat burn and improve cardiovascular fitness in a short amount of time.',1,8,30,'2024-10-09 13:13:01','2024-10-09 13:13:01',25,NULL),(49,'Yoga','A Yogy is a gym member or participant who regularly practices yoga as part of their fitness routine.',1,10,20,'2024-10-09 18:39:55','2024-10-09 18:39:55',32,NULL);
/*!40000 ALTER TABLE `gymclass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `memberships`
--

DROP TABLE IF EXISTS `memberships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `memberships` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `type` enum('VIP','Normal') COLLATE utf8mb4_unicode_ci NOT NULL,
  `subscribe_type` enum('weekly','Monthly','Yearly') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(8,2) NOT NULL DEFAULT '0.00',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `memberships`
--

LOCK TABLES `memberships` WRITE;
/*!40000 ALTER TABLE `memberships` DISABLE KEYS */;
INSERT INTO `memberships` VALUES (20,'VIP','weekly',0.00,1,NULL,NULL),(21,'VIP','weekly',300.00,1,'2024-09-29 07:49:14','2024-09-29 07:49:14'),(22,'VIP','Monthly',300.00,1,'2024-09-29 07:49:31','2024-09-29 07:49:31'),(23,'VIP','Yearly',300.00,1,'2024-09-29 07:49:39','2024-09-29 07:49:39'),(24,'Normal','weekly',300.00,1,'2024-09-29 07:49:49','2024-09-29 07:49:49'),(25,'Normal','Monthly',300.00,1,'2024-09-29 07:49:59','2024-09-29 07:49:59'),(26,'Normal','Yearly',300.00,1,'2024-09-29 07:50:09','2024-09-29 07:50:09');
/*!40000 ALTER TABLE `memberships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2019_05_11_000000_create_otps_table',1),(5,'2024_09_15_192113_create_trainees_table',1),(6,'2024_09_15_192216_create_trainers_table',1),(7,'2024_09_15_192620_create_reviews_table',1),(8,'2024_09_15_192835_create_subscriptions_table',1),(9,'2024_09_15_193548_create_vouchers_table',1),(10,'2024_09_15_193743_create_memberships_table',1),(11,'2024_09_15_194944_create_gymclass_table',1),(12,'2024_09_15_195233_create_schedules_table',1),(13,'2024_09_15_195537_create_exercises_table',1),(14,'2024_09_15_195834_create_equipments_table',1),(15,'2024_09_15_200035_create_user_equipments_table',1),(16,'2024_09_15_200253_create_user_classes_table',1),(17,'2024_09_15_202744_add_column_to_reviews_table',1),(18,'2024_09_15_203228_add_column_to_subscriptions_table',1),(19,'2024_09_15_203636_add_column_to_vouchers_table',1),(20,'2024_09_15_203852_add_column_to_trainees_table',1),(21,'2024_09_15_204445_add_column_to_schedules_table',1),(22,'2024_09_15_205046_add_column_to_user_equipments_table',1),(23,'2024_09_15_205400_add_column_to_user_user_classes_table',1),(24,'2024_09_16_000234_create_personal_access_tokens_table',1),(25,'2024_09_16_073150_create_permission_tables',1),(26,'2024_09_16_130236_create_class_exerciess_table',1),(27,'2024_09_16_130555_add_column_to_user_class_exerciess_table',1),(28,'2024_09_16_130844_create_class_equipments_table',1),(29,'2024_09_16_131000_add_column_to_user_class_equipments_table',1),(30,'2024_09_19_080850_create_attendances_table',1),(31,'2024_09_20_082216_add_column_to_user_trainees_table',1),(32,'2024_09_20_082240_add_column_to_user_trainers_table',1),(33,'2024_09_22_114706_add_column_to_user_schedules_table',1),(34,'2024_09_24_103058_add_column_to_user_gymclass_table',1),(35,'2024_09_26_091147_add_deleted_at_column_to_gymclass_table',2),(36,'2024_09_27_012457_add_soft_deletes_to_equipments_table',2),(37,'2024_09_27_070306_add_soft_deletes_to_exercises_table',2),(38,'2024_09_27_085205_rename_no_of_tiems_in_exercises_table',2),(39,'2024_09_27_104606_add_soft_deletes_to_schedules_table',2),(43,'2024_09_28_173400_add_column_to_user_schedules_table',3),(44,'2024_09_30_094800_add_column_to_user_reviews_table',4),(45,'2024_09_30_105239_create_reports_table',5),(46,'2024_09_30_093733_add_column_to_user_reviews_table',6),(47,'2024_10_03_061501_add_column_to_user_reports_table',6);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otps`
--

DROP TABLE IF EXISTS `otps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otps` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `validity` int NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `otps_id_index` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otps`
--

LOCK TABLES `otps` WRITE;
/*!40000 ALTER TABLE `otps` DISABLE KEYS */;
/*!40000 ALTER TABLE `otps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
INSERT INTO `password_reset_tokens` VALUES ('mohamed13gad13@gmail.com','$2y$12$EoDyZkpE3xzffM0KZGrCG.RvqCC8LoH6WZZF2atf9Q6.6Ok1.NJJe','2025-02-24 11:28:46');
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',5,'asd','045c19686c95fc1e9a2b855ace6b2fbeaa5d0d1a8fe770f21cbbdde9da6ead12','[\"*\"]',NULL,NULL,'2024-09-25 16:23:53','2024-09-25 16:23:53'),(2,'App\\Models\\User',8,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','9d10ad588825f38f07ada09f3a1d94c6b7923149f936704520f04f11b983bacc','[\"*\"]',NULL,NULL,'2024-09-27 08:51:02','2024-09-27 08:51:02'),(3,'App\\Models\\User',10,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','e5d4422273e77012a087c509c64aa4ff3872e051f6fd9c38de2c5c260236a45f','[\"*\"]',NULL,NULL,'2024-09-27 13:56:53','2024-09-27 13:56:53'),(4,'App\\Models\\User',11,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7fdaaa7fb4390f07b89738f22c00d539374be3dcfb95ffc6c5853b8a07e0c046','[\"*\"]',NULL,NULL,'2024-09-27 13:59:51','2024-09-27 13:59:51'),(5,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','1464f357535d894c198f074bd3bff4968ac41cb4bcd0d149efa2968248f22151','[\"*\"]',NULL,NULL,'2024-09-27 14:18:56','2024-09-27 14:18:56'),(6,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','6e50e9a3834284bb1bcc9ab7c856cc5346265efcd34e14af35ca8be6033e96ca','[\"*\"]','2024-09-28 14:40:21',NULL,'2024-09-28 13:55:33','2024-09-28 14:40:21'),(7,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','4e1ec8b46db4943a3eba0493500d2b669175c29eefa49d314499671361ecc060','[\"*\"]','2024-09-28 15:07:53',NULL,'2024-09-28 14:44:52','2024-09-28 15:07:53'),(8,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','e15d1de95de676a61641ded0979ef711c7b1e498721bda675c4dc2fa5d750af4','[\"*\"]','2024-09-28 18:07:11',NULL,'2024-09-28 15:08:44','2024-09-28 18:07:11'),(9,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','0e1b09f653829b178532ee1b77eca9e6488d656e55e180426f953f60fccc7c81','[\"*\"]',NULL,NULL,'2024-09-29 07:38:12','2024-09-29 07:38:12'),(10,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','49d2b3d475dc997c164d97425c59146b5b8ca62d0b8c98cd49184f544c266310','[\"*\"]','2024-09-29 15:52:54',NULL,'2024-09-29 09:34:47','2024-09-29 15:52:54'),(11,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','0d957faa418f08d8194bd77386a577166498b9cf0df64ee7ddcaca341cd4c80c','[\"*\"]','2024-09-29 15:20:09',NULL,'2024-09-29 15:14:46','2024-09-29 15:20:09'),(12,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','54097ef95a9190804a3f50106daf6ebb8d7c2fe04a4c2b6ca18cd782fff1277a','[\"*\"]','2024-09-29 17:10:17',NULL,'2024-09-29 15:20:32','2024-09-29 17:10:17'),(13,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','40206f0b1e6df79a03bb13c8b007da560bce4b6e0035e4451e565b6cdaff5ef4','[\"*\"]','2024-09-29 17:25:06',NULL,'2024-09-29 17:11:31','2024-09-29 17:25:06'),(14,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','577c6d36f4a37e0c15231c1cfdcf21722e4e26854cf31ea1a8bad800a908abfd','[\"*\"]','2024-10-08 06:55:06',NULL,'2024-09-30 08:06:07','2024-10-08 06:55:06'),(15,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','4798d02b50e394645b961d718009921eb75c2eb732c8e3bce9e735cb64107b87','[\"*\"]',NULL,NULL,'2024-09-30 14:48:29','2024-09-30 14:48:29'),(16,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','c17d5690432ed977cac39bb2d337d8eece14217579fd88f65d07a5c0cda8b086','[\"*\"]','2024-10-01 08:12:08',NULL,'2024-09-30 18:08:35','2024-10-01 08:12:08'),(17,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','1a5548b9a67f298af5f9cf28f8fe0f84812eacbc7a3f89a2785f8961b0f48d3d','[\"*\"]','2024-10-01 09:46:29',NULL,'2024-10-01 08:14:05','2024-10-01 09:46:29'),(18,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','6b1c55835afecfee4ffbb7a37f2e97e41cacf10749d9874c5f14c9b91fdab298','[\"*\"]','2024-10-02 06:24:19',NULL,'2024-10-01 09:47:33','2024-10-02 06:24:19'),(19,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','b25cb1ca432a7457236b2251439fff2bbd26838fedc2bed42f33353ddbaa55e1','[\"*\"]','2024-10-02 12:55:29',NULL,'2024-10-01 17:40:42','2024-10-02 12:55:29'),(20,'App\\Models\\User',25,'asss','9b0479993519e5f25f105893f465e50ff81ec941334b594b099ac2b4f58d92c2','[\"*\"]',NULL,NULL,'2024-10-02 07:55:56','2024-10-02 07:55:56'),(21,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','96c30b8a32bb2284c4e6d88dc48de282138c1bd17c0baf13adefb50eaba8fd2b','[\"*\"]',NULL,NULL,'2024-10-02 07:57:15','2024-10-02 07:57:15'),(22,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','f247bf14a3b71dba14f34735788aa363d0de10410353e2744316e00f4e3c2f11','[\"*\"]',NULL,NULL,'2024-10-02 08:42:01','2024-10-02 08:42:01'),(23,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','e05f7338329b57c4751728b8f3af693fd4eaa84c0c71c5a054c0412807e2d596','[\"*\"]',NULL,NULL,'2024-10-02 08:43:44','2024-10-02 08:43:44'),(24,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d9f4e7bc4b25378636ee049f597ba44d80e9e6e0ccba824cd3d2f379f2090afd','[\"*\"]',NULL,NULL,'2024-10-02 08:45:20','2024-10-02 08:45:20'),(25,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','9201fd137885cb0ddd790c8caa12caf51871bd277067b1c79bac465e3afbc153','[\"*\"]',NULL,NULL,'2024-10-02 08:46:23','2024-10-02 08:46:23'),(26,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','b3ddb83141280730a35c136fe3c87a798378548d3b00c1334bfbfc69a9c3b64e','[\"*\"]',NULL,NULL,'2024-10-02 08:46:47','2024-10-02 08:46:47'),(27,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','a21d45903a6dc935c9892fd3365109396ebbd4be80912d49ed163f1e6d933c4c','[\"*\"]',NULL,NULL,'2024-10-02 08:47:53','2024-10-02 08:47:53'),(28,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','51e6795e35195175e43391df679d970247f43eadce099bea9e743dc8d57887d7','[\"*\"]',NULL,NULL,'2024-10-02 08:48:29','2024-10-02 08:48:29'),(29,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','8e622ebe88ce342f6ff1258dc7c5d0ca0c46ebc306f1f88c71f8f105c98220e4','[\"*\"]',NULL,NULL,'2024-10-02 09:03:37','2024-10-02 09:03:37'),(30,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','8f1f1b7164e75bc9d6c844b8a3a89a4c008f9c240cf5764cfc45cb5ff9840c70','[\"*\"]',NULL,NULL,'2024-10-02 09:04:33','2024-10-02 09:04:33'),(31,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','2c964b6983ec15840d35bd21d09aec6620693fe1ec8650d4291603ec97dac1a8','[\"*\"]','2024-10-02 09:11:06',NULL,'2024-10-02 09:09:00','2024-10-02 09:11:06'),(32,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','a2cdedef79ac9cf6f3e7ac0c0c2e2772392f0be5e2a8fe658a650499086ce35d','[\"*\"]',NULL,NULL,'2024-10-02 09:13:48','2024-10-02 09:13:48'),(33,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7e414228f15c7d3c6fd2d40d057fb05230ae94a573fe2fe78c9fe65e09043324','[\"*\"]',NULL,NULL,'2024-10-02 09:15:14','2024-10-02 09:15:14'),(34,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','9ee2ad2d16a0dbf662795172d14bd79e38f7afe2abe69df7730c5705314457e2','[\"*\"]',NULL,NULL,'2024-10-02 09:16:45','2024-10-02 09:16:45'),(35,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','ad54786568c01805d99460a0469574d4a365e78b39bfd36f789748a7e1bc83c8','[\"*\"]',NULL,NULL,'2024-10-02 09:18:40','2024-10-02 09:18:40'),(36,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','4940040fe78aa2cdeb4ad36a6b61d52a60df17a5d0f29e0172839a09dae60803','[\"*\"]',NULL,NULL,'2024-10-02 09:19:36','2024-10-02 09:19:36'),(37,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','0ecf6a9453bc4de0dd085abbb04cdcc70f24c62eb1010b3a2065ccd2525d70f0','[\"*\"]',NULL,NULL,'2024-10-02 09:20:23','2024-10-02 09:20:23'),(38,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','cc3f49d37c77d1032939e39cb4ac9fcd296e45b2c48bfe1391c6060fe246c522','[\"*\"]',NULL,NULL,'2024-10-02 09:22:40','2024-10-02 09:22:40'),(39,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','45377fecf0ec7459a98ddb5c04c4e77fb3e45fd9a6c33daeade78f9fd67234b8','[\"*\"]',NULL,NULL,'2024-10-02 09:23:59','2024-10-02 09:23:59'),(40,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','f6b801661a37b388135d3b0fbe07e1820769de8f68d50e1a78fd1111eeee2515','[\"*\"]',NULL,NULL,'2024-10-02 09:26:18','2024-10-02 09:26:18'),(41,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','0a9026c9c3be65eaef373c5105df9a374f8d9e442c57d3b6cd54a4c3223352ec','[\"*\"]',NULL,NULL,'2024-10-02 09:27:06','2024-10-02 09:27:06'),(42,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','50d2dc0447df7716c6ec68c96b5e67a78bdf4ad0da3a30267c53691f1ae95cf7','[\"*\"]',NULL,NULL,'2024-10-02 09:28:31','2024-10-02 09:28:31'),(43,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','fecfb8c168db248cbc033cf74ad9524f6cd557895252a2c36d1014d953c4fa32','[\"*\"]',NULL,NULL,'2024-10-02 09:30:53','2024-10-02 09:30:53'),(44,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','dcf40d0b1d6387da9c5119ae631b5e98f23c70b5d7217e477adc9e65f3706950','[\"*\"]',NULL,NULL,'2024-10-02 09:31:31','2024-10-02 09:31:31'),(45,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','bfc8079f86422856cefda84d03c5a9a626a25157b4d8f0eb45f968248417c4e6','[\"*\"]',NULL,NULL,'2024-10-02 09:32:32','2024-10-02 09:32:32'),(46,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d63c5659cac681256075e3c1b493ff2abc9d411b6030ee9a06ec27f1290de185','[\"*\"]',NULL,NULL,'2024-10-02 09:34:18','2024-10-02 09:34:18'),(47,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','4adf7be073a7db258dfc1c7cbbf8a9a5c7d7984a8e32cd903c882be7858e522d','[\"*\"]','2024-10-02 09:36:17',NULL,'2024-10-02 09:36:08','2024-10-02 09:36:17'),(48,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','068f0adb8d77b2f664e45e2749869f1edda21116bd5ed23c7f9af73037e5a05d','[\"*\"]',NULL,NULL,'2024-10-02 09:42:08','2024-10-02 09:42:08'),(49,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','b031c7e6e2256901e72d70652d5d9b898f5bf764521953bc5c26a33e2a0d6585','[\"*\"]',NULL,NULL,'2024-10-02 09:45:28','2024-10-02 09:45:28'),(50,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','ef5d945e0ca433486cc29ab70d802e2d22a1e7eb6c658e4c5b47cb7c6d843d92','[\"*\"]',NULL,NULL,'2024-10-02 09:58:05','2024-10-02 09:58:05'),(51,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','763ae8c0a364137ad074f321ece699a44bf7aa905704f002fc8a1d7e47b61373','[\"*\"]',NULL,NULL,'2024-10-02 10:01:34','2024-10-02 10:01:34'),(52,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','8df21ac63105eded6f02697ea8f83cbe903e58a935531f939add627c78d507cd','[\"*\"]','2024-10-02 10:14:49',NULL,'2024-10-02 10:05:18','2024-10-02 10:14:49'),(53,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d09ede5a984278806c881e9a30b5154628cab4d2a07f278b62efcaa2d753ed7b','[\"*\"]','2024-10-02 11:43:27',NULL,'2024-10-02 10:15:28','2024-10-02 11:43:27'),(54,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','919366ce41d11c85c4d3ccd0c14b022ab494310ec6e0ae6c1439d13335f4612c','[\"*\"]','2024-10-02 11:45:02',NULL,'2024-10-02 11:43:45','2024-10-02 11:45:02'),(55,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','4f88f63dbd52fc2545e2a5979533f5486a68aca9851f74c07afdc34613f924ee','[\"*\"]','2024-10-02 11:49:47',NULL,'2024-10-02 11:47:08','2024-10-02 11:49:47'),(56,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','f769ef57a8e823d38d57a5cac46d5489e337b8d3dc6667735da2203e1c6f045e','[\"*\"]','2024-10-02 12:32:35',NULL,'2024-10-02 11:54:47','2024-10-02 12:32:35'),(57,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','025d07276507fb12f03f991b702a8e7e900cc6a3bcd7e205c1310c43469113ea','[\"*\"]','2024-10-02 12:36:16',NULL,'2024-10-02 12:33:26','2024-10-02 12:36:16'),(58,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','e952883132fb86d29b5bd3c07a360ff023f24371a2c5555f45b7c9cebf35315e','[\"*\"]',NULL,NULL,'2024-10-02 12:36:46','2024-10-02 12:36:46'),(59,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7f72c3e2ef5d2246283a88227a76dfee607859973069cae6ae9acc500ded0f89','[\"*\"]','2024-10-02 13:28:20',NULL,'2024-10-02 12:38:37','2024-10-02 13:28:20'),(60,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','0868066d0bb39f7c99fa4e8d1781d23a59c1c0ffb8abceab9a9192d8fd9b820b','[\"*\"]','2024-10-02 13:29:49',NULL,'2024-10-02 13:29:28','2024-10-02 13:29:49'),(61,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','1eacbe23ff9ad3eccfde7915c305e7f8ddcf6b89196ae29447eedb760715539c','[\"*\"]','2024-10-02 13:37:17',NULL,'2024-10-02 13:32:46','2024-10-02 13:37:17'),(62,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','34d810c05f0d19b94cf2708eff202e7f41f9cbdae3975f262ce60678fd38bb3a','[\"*\"]','2024-10-02 13:48:38',NULL,'2024-10-02 13:43:35','2024-10-02 13:48:38'),(63,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','28612069706e55ad6d4f4dd25c191909bd4d0c20dce17612e6b7e754bc0ed16d','[\"*\"]','2024-10-02 17:33:52',NULL,'2024-10-02 13:50:48','2024-10-02 17:33:52'),(64,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','88e3b8325473a755d146882c6f318c06bafa64e45f8aa9a9ccb80de63c85d4f9','[\"*\"]','2024-10-02 17:35:54',NULL,'2024-10-02 17:35:33','2024-10-02 17:35:54'),(65,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','01e915999116052f965abcb1c9b47c12a51c76105a828489694c6ae94b12c4ac','[\"*\"]','2024-10-02 19:11:00',NULL,'2024-10-02 17:36:55','2024-10-02 19:11:00'),(66,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','a4b118c131bf6482bf2c7cf58d0fdf5e358ae0d866b02a35a6a8d00fb17a5cde','[\"*\"]','2024-10-02 19:26:32',NULL,'2024-10-02 19:11:45','2024-10-02 19:26:32'),(67,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','bf95d96ee295d0efb713becd06c50708b983f2b7962f1115f4d4849f9a828a62','[\"*\"]','2024-10-02 20:21:46',NULL,'2024-10-02 19:26:46','2024-10-02 20:21:46'),(68,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','c09a3f95e4a2544e49ece11e1922d87639f901924f99a935772f62567cffe5a8','[\"*\"]','2024-10-04 16:48:26',NULL,'2024-10-03 06:50:26','2024-10-04 16:48:26'),(69,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','ba2971741701891ae8eb8f0ea3647ebc3d1e1e7d12d472e1931d3ad23cb7a540','[\"*\"]','2024-10-03 10:41:45',NULL,'2024-10-03 08:20:32','2024-10-03 10:41:45'),(70,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7e384ceb283e539352eedd3d5bf6b35a5321ef1aa3e0bf78bc98d0535f71d3e0','[\"*\"]','2024-10-03 10:43:24',NULL,'2024-10-03 10:43:20','2024-10-03 10:43:24'),(71,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','9375bf16abd6645034e7961f6ca316e62e96db31e232ad527ee2bc937f7f3687','[\"*\"]','2024-10-04 18:04:53',NULL,'2024-10-03 10:43:40','2024-10-04 18:04:53'),(72,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','e86b3a57fc21c03cf804c3dad91d1b19ae6354cc93818d70f56bfa74f53f321f','[\"*\"]','2024-10-03 12:34:40',NULL,'2024-10-03 11:25:45','2024-10-03 12:34:40'),(73,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','966ec4963806835234b440e5cefce5c68b249322053003af4661bfe0869ed4e8','[\"*\"]','2024-10-04 09:39:12',NULL,'2024-10-04 07:28:50','2024-10-04 09:39:12'),(74,'App\\Models\\User',24,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','edacaff92bc05fb721247592c2d91e2f080dad93bd24cd2393a585d68e1abb9a','[\"*\"]','2024-10-04 08:26:41',NULL,'2024-10-04 08:25:29','2024-10-04 08:26:41'),(75,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','48a7ec871e460756e230820f89613a65a14234b771356964147c72b0c5849610','[\"*\"]','2024-10-04 12:34:53',NULL,'2024-10-04 12:19:29','2024-10-04 12:34:53'),(76,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','5931c60f7406121d3b264ae6deba6113b278e1699ba03a743c08f9f4eb86911f','[\"*\"]','2024-10-04 12:51:46',NULL,'2024-10-04 12:44:18','2024-10-04 12:51:46'),(77,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','3916efa732428129b6dec4bddb0a2fe4875c4de9743b4ad99e3140c84b7f690e','[\"*\"]','2024-10-04 15:36:10',NULL,'2024-10-04 15:35:33','2024-10-04 15:36:10'),(78,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','fb52e2d5d58206e61714207103afecbeb113f0b6bf9673ab0e9b89606df268ff','[\"*\"]','2024-10-04 15:36:34',NULL,'2024-10-04 15:36:29','2024-10-04 15:36:34'),(79,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','ee0be6bbcb20348b2809665db3b5b01df567af6d595a50682d4a0518367cff6c','[\"*\"]','2024-10-04 15:39:11',NULL,'2024-10-04 15:38:30','2024-10-04 15:39:11'),(80,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d8b74b506113bc9e52a8d9bc934e9143378ff285e21fe64a4b066e7b48912b85','[\"*\"]','2024-10-04 15:50:51',NULL,'2024-10-04 15:39:30','2024-10-04 15:50:51'),(81,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','788347862daf479bce5f178802f97566da6c91474aafd9081664f7d38dfe8920','[\"*\"]','2024-10-04 15:51:11',NULL,'2024-10-04 15:51:11','2024-10-04 15:51:11'),(82,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','f59e2a5837875bcea0c172f5a8275cd4b3bcce2ec69840512d43a3e5108ecace','[\"*\"]','2024-10-04 16:04:16',NULL,'2024-10-04 15:53:03','2024-10-04 16:04:16'),(83,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','9a5b9fc89a22e97779dd7a8dfc83bb97570ec06add40065398dbafd5528a9330','[\"*\"]','2024-10-04 16:05:32',NULL,'2024-10-04 16:05:32','2024-10-04 16:05:32'),(84,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','56569b22b0dc24623ac2d8e2f41f0affb915be45927d132181380d4dc39cc868','[\"*\"]','2024-10-04 16:09:20',NULL,'2024-10-04 16:09:11','2024-10-04 16:09:20'),(85,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','640f083f690538801b5408d79eea7aef79f0da2f03633c240b476419f663c38a','[\"*\"]','2024-10-04 16:10:12',NULL,'2024-10-04 16:10:03','2024-10-04 16:10:12'),(86,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','8f5972a0eaa979be9d69d44083043421d118568c7527d51dab7f63c657e088a3','[\"*\"]','2024-10-04 20:31:54',NULL,'2024-10-04 16:10:38','2024-10-04 20:31:54'),(87,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','296d5e82fc42dbc6b0b833539060388234782148f326c2b5bf4a4e334ce02cdf','[\"*\"]','2024-10-04 20:30:45',NULL,'2024-10-04 18:56:32','2024-10-04 20:30:45'),(88,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','57f65f81355a4cd204fadee646fbf72074be1cd94839ff84356c68c98eaeae00','[\"*\"]','2024-10-05 07:38:39',NULL,'2024-10-05 07:09:43','2024-10-05 07:38:39'),(89,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','8620aa12352c34f563337f639fc60e6228128f1ba82c52e9be4d7a4285f4ca7c','[\"*\"]','2024-10-05 07:44:20',NULL,'2024-10-05 07:42:05','2024-10-05 07:44:20'),(90,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','245eb1710200fa23dcc44689a4b582c73d77c3c1eb0a8f8b784eded82dd35c11','[\"*\"]','2024-10-05 07:52:27',NULL,'2024-10-05 07:44:39','2024-10-05 07:52:27'),(91,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7a377011dce15bc00670fe79655a1718f8852ba1f39fed30606878584511f42b','[\"*\"]','2024-10-05 07:52:50',NULL,'2024-10-05 07:52:50','2024-10-05 07:52:50'),(92,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','43ff4ff9484b2885ee3221089aa3b480c5019338a335fe8c1ab00b6bac052b53','[\"*\"]','2024-10-05 07:53:56',NULL,'2024-10-05 07:53:51','2024-10-05 07:53:56'),(93,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','3116ae4a25565c36db47e0dfef5dcf346542700f24ddaa6dc5264c04b25b648e','[\"*\"]',NULL,NULL,'2024-10-05 07:56:25','2024-10-05 07:56:25'),(94,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','ec7118eac2105887d39a4a6af0985e4e34a587984ab78277379b3e806070f5d8','[\"*\"]','2024-10-05 08:52:09',NULL,'2024-10-05 07:56:48','2024-10-05 08:52:09'),(95,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d3b182cd9ecbc47c75f7b9552e96f8ad39521e5b26e0a7cc37e9f071598da1c8','[\"*\"]','2024-10-05 09:15:28',NULL,'2024-10-05 09:15:22','2024-10-05 09:15:28'),(96,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','3c730e464e7b8c071c7685c53655b01e827e74cf130b5a23e8c0f1cfcbfcb404','[\"*\"]','2024-10-05 09:17:16',NULL,'2024-10-05 09:16:39','2024-10-05 09:17:16'),(97,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','97a5b619ebdc923e82a2e069f45dd585ffa284ab42308a3e31da6f83368280ce','[\"*\"]','2024-10-05 09:19:35',NULL,'2024-10-05 09:17:43','2024-10-05 09:19:35'),(98,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','720c0882c821698415d31f748ca70738fba3d992dde3af1e71780faa778eb8b7','[\"*\"]','2024-10-05 09:20:30',NULL,'2024-10-05 09:19:51','2024-10-05 09:20:30'),(99,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','214cbcb5ad24491ad8a5375db728bf29b1f7a2377c30b5c5ac1a0de9add8b688','[\"*\"]','2024-10-05 09:21:46',NULL,'2024-10-05 09:20:44','2024-10-05 09:21:46'),(100,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','100cba40c6e4e99000752e88f81a1a15241aa598a5d473ae369abebf5a2cff9c','[\"*\"]','2024-10-05 09:22:24',NULL,'2024-10-05 09:22:10','2024-10-05 09:22:24'),(101,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','0746a03c59ea64fb5d59cd6bec1aae4ef0cfeaaf69326863ff126c3261cfd62a','[\"*\"]','2024-10-05 09:25:00',NULL,'2024-10-05 09:23:25','2024-10-05 09:25:00'),(102,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','970f0558940ed29af8ea7afaee648530978a2ce1ad85d28d48b65cb491269ccb','[\"*\"]','2024-10-05 11:10:30',NULL,'2024-10-05 09:25:15','2024-10-05 11:10:30'),(103,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d781fe55adfa57ed5acfe6098c792e8fda53a0afb42f32dc5e71431ab800979d','[\"*\"]','2024-10-05 12:47:58',NULL,'2024-10-05 12:46:24','2024-10-05 12:47:58'),(104,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d927e56db99dac50a6c65bed1e1fbf75868a56639876dc312f696651a3f95c08','[\"*\"]','2024-10-05 12:48:32',NULL,'2024-10-05 12:48:19','2024-10-05 12:48:32'),(105,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','169adcf3b92fe2ce178b9f7236c4dcdfbe1007a3910fa81793af2ab9a0242577','[\"*\"]','2024-10-05 12:52:14',NULL,'2024-10-05 12:49:12','2024-10-05 12:52:14'),(106,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','cddb33c2c05b8ecea3e1fc5fe6bd114e52dd39bda42e0ed636456ed5fe1188f5','[\"*\"]','2024-10-05 12:54:44',NULL,'2024-10-05 12:52:33','2024-10-05 12:54:44'),(107,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','20e06ebbbdb99247a3c787f88a2d71550ba7c881ae78c93b885dfa623e1bb062','[\"*\"]','2024-10-05 12:55:15',NULL,'2024-10-05 12:55:00','2024-10-05 12:55:15'),(108,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','80d703040b2bb5b13583608b0b60f5c82dfd713782f8d2306827b408d9c24d2e','[\"*\"]','2024-10-05 12:55:34',NULL,'2024-10-05 12:55:34','2024-10-05 12:55:34'),(109,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','5da4119bab23d3b8cf3a7c2ee12c6359b078d1eb43d153c4290e0ad2cb93e87d','[\"*\"]','2024-10-05 13:00:57',NULL,'2024-10-05 13:00:55','2024-10-05 13:00:57'),(110,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','87a3fe379342ec9cefdc22aedb4035bc8d96c6f4b67403f8b779c57c48894c71','[\"*\"]','2024-10-05 13:03:46',NULL,'2024-10-05 13:01:21','2024-10-05 13:03:46'),(111,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','9efadd7fdc11ced33bd6c303aa410e2859c799596bddafda9773d215d24243fc','[\"*\"]','2024-10-05 13:08:54',NULL,'2024-10-05 13:04:03','2024-10-05 13:08:54'),(112,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','5f2a763435674c6b841cf28321ef2de662e34b9432e8ca08f2a2bb91bf309e87','[\"*\"]','2024-10-05 13:09:20',NULL,'2024-10-05 13:09:18','2024-10-05 13:09:20'),(113,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d6409673abb749f14f51b8c705afd13dd2f2b317618848ac5e9577e8e565818b','[\"*\"]','2024-10-05 13:10:09',NULL,'2024-10-05 13:09:43','2024-10-05 13:10:09'),(114,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','90f601ca9784760e44e52ea6d7569faf3be4142eafc289d2ea8bdcedbf111c32','[\"*\"]','2024-10-05 13:10:39',NULL,'2024-10-05 13:10:38','2024-10-05 13:10:39'),(115,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','30fbec548a51c2fae8123b97b53df0da603266cf5118e583fc8b20bad4e0faeb','[\"*\"]','2024-10-05 13:13:19',NULL,'2024-10-05 13:12:18','2024-10-05 13:13:19'),(116,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','dbd371c953c4a5b9d9bd26f3954089711747aec770f9747487b1631b16c2c22c','[\"*\"]','2024-10-05 13:26:01',NULL,'2024-10-05 13:14:17','2024-10-05 13:26:01'),(117,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','c574eb389820bffcf7e63817f6634c9cdfe8496a5eaef62c208052b34331e7d7','[\"*\"]','2024-10-05 13:32:36',NULL,'2024-10-05 13:26:35','2024-10-05 13:32:36'),(118,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','f4e46c74dff09a70961946009bd396c535b2d80a9910ffc100415b3cd5f801b9','[\"*\"]','2024-10-05 14:47:22',NULL,'2024-10-05 13:33:44','2024-10-05 14:47:22'),(119,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','caf346371653afcff798dd67319334b527088568d96bb2f4f79e99c7de65de97','[\"*\"]','2024-10-05 14:52:08',NULL,'2024-10-05 14:49:05','2024-10-05 14:52:08'),(120,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7d2d0694d174918cb9d1cd9cdfe368e237efbae138872ec2a6def90106e0a91f','[\"*\"]','2024-10-05 14:51:10',NULL,'2024-10-05 14:50:22','2024-10-05 14:51:10'),(121,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','25547b9e32a65d70f2fab5ea7f04e73307d87e5305a6df4bc6b852d0fc456385','[\"*\"]','2024-10-05 14:52:41',NULL,'2024-10-05 14:52:20','2024-10-05 14:52:41'),(122,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','9fb7db4d62d6e026981561583cd9dd76a0d8b6d0fbec3899df9e1b00247455b5','[\"*\"]','2024-10-05 18:56:08',NULL,'2024-10-05 15:15:59','2024-10-05 18:56:08'),(123,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','6f55c26f5be3908cb967b857ac56d2b41ee1e03930851c2b4ee07ac8f90b4ea2','[\"*\"]','2024-10-06 12:45:49',NULL,'2024-10-06 07:43:30','2024-10-06 12:45:49'),(124,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','825dd8f44c71f600fc9bc3ce7eac19a62cbb3d9c70ee81aedf1cba57b846e2fd','[\"*\"]','2024-10-06 12:57:49',NULL,'2024-10-06 12:46:13','2024-10-06 12:57:49'),(125,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7aafe6ec3455624eddb88ff923afd9a2eb7e5dae03f889c8326aa961de885fbf','[\"*\"]','2024-10-06 15:57:54',NULL,'2024-10-06 13:06:39','2024-10-06 15:57:54'),(126,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','62d7e8ab4b95c894b78569137bff7c13030aaebb5797325279aa856aea9f1777','[\"*\"]','2024-10-06 14:19:25',NULL,'2024-10-06 14:10:36','2024-10-06 14:19:25'),(127,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','821e3cfd13da03d5a7d80aed6ec71f1a9f638ea51e548aa80d2ce6c0a3414239','[\"*\"]','2024-10-06 16:02:11',NULL,'2024-10-06 15:58:30','2024-10-06 16:02:11'),(128,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','4e6ed2f8c8351178fff43abe35267b63d3f5d3be59f78dd49bc65865f9e5b484','[\"*\"]',NULL,NULL,'2024-10-06 16:02:24','2024-10-06 16:02:24'),(129,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','633f19f6f4c35ab5a544347b7908fa3cda9761e311c374bd3818e74d181593ab','[\"*\"]',NULL,NULL,'2024-10-06 16:02:28','2024-10-06 16:02:28'),(130,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d4c343b184503c9e6b7daa779885c3a8561e1b8c453950c751c43170944f5622','[\"*\"]',NULL,NULL,'2024-10-06 16:02:33','2024-10-06 16:02:33'),(131,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','e90313e95109180efef233ff1a3bbc68f3c1a13d2fd640324311f471366a7fcd','[\"*\"]',NULL,NULL,'2024-10-06 16:02:34','2024-10-06 16:02:34'),(132,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7e98a0dd98c26e41c1c3881af031ae536020ef60f013ec530e8f98083dd9511e','[\"*\"]',NULL,NULL,'2024-10-06 16:02:34','2024-10-06 16:02:34'),(133,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','32e582dca136cd510c20f97b11f0544a6c1471b4c3d112a8e125be8624639c2c','[\"*\"]',NULL,NULL,'2024-10-06 16:02:34','2024-10-06 16:02:34'),(134,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','feff72b0a2ce873d82b436508d780dab7d13fac743a1e2d480e5f327c70e2668','[\"*\"]',NULL,NULL,'2024-10-06 16:02:35','2024-10-06 16:02:35'),(135,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','6aea3f6bb6ed0ccd6a632a4aba0aaa359c6078abbdb84a1dbb005427806af593','[\"*\"]',NULL,NULL,'2024-10-06 16:02:35','2024-10-06 16:02:35'),(136,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','0b63c39e7be9a0ef56b764b33745953efe303611a6043ff48a750d8aab9756d2','[\"*\"]',NULL,NULL,'2024-10-06 16:02:36','2024-10-06 16:02:36'),(137,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7156b4677f32fb12b44156cb0120c572fbad74619f2bacf4842fe08513c4adbc','[\"*\"]',NULL,NULL,'2024-10-06 16:02:36','2024-10-06 16:02:36'),(138,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','b4f917aedc88b7d71e83680f3a0215c0f638c2499f88fa18339a147efa99ce53','[\"*\"]',NULL,NULL,'2024-10-06 16:02:36','2024-10-06 16:02:36'),(139,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','4379cb2e83b0fddad1836904d2127edb238f6eeb35fd3abb720a936adb9a91d3','[\"*\"]',NULL,NULL,'2024-10-06 16:02:37','2024-10-06 16:02:37'),(140,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','8cfd6d4a9b159de34a66bed54d8818d4bb1e0fe50d1209731b487ab47544ba8b','[\"*\"]',NULL,NULL,'2024-10-06 16:02:37','2024-10-06 16:02:37'),(141,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','0dba224c03642f9a138befe1d63fc9c68ff562e95886ea85f7cfccd3e4c8c315','[\"*\"]','2024-10-06 16:02:51',NULL,'2024-10-06 16:02:37','2024-10-06 16:02:51'),(142,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7fbe1496aa85b309446297351bd4616e1f32c72d05672f470cf46a65a67076b0','[\"*\"]','2024-10-06 16:51:52',NULL,'2024-10-06 16:03:06','2024-10-06 16:51:52'),(143,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','0e27576314e7804a2c3f3a9fdaef5b91c2282bf80f6f6077148b53cfdc68a908','[\"*\"]','2024-10-06 18:33:31',NULL,'2024-10-06 16:52:14','2024-10-06 18:33:31'),(144,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','74e8228a29231dd5ddd789e835265cbe72717f31f2cc1e4a68413cc8139e71b5','[\"*\"]','2024-10-06 19:07:06',NULL,'2024-10-06 18:35:06','2024-10-06 19:07:06'),(145,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','60c6dbd250c49b50b2b573e8b47da25982e06474bed5804430ce8970b0ae5910','[\"*\"]','2024-10-07 11:29:18',NULL,'2024-10-06 19:07:27','2024-10-07 11:29:18'),(146,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','a1193bd770a1fb87a1e88f27c774571a5ad6a291690eac549fcd7be9c00f6041','[\"*\"]','2024-10-07 09:53:13',NULL,'2024-10-07 09:20:16','2024-10-07 09:53:13'),(147,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','a21bf8253bbe3b1acb67b015f3d52a46ad42cd935bfbc3504f7fc5e2e056cbc6','[\"*\"]',NULL,NULL,'2024-10-07 09:53:29','2024-10-07 09:53:29'),(148,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','5af5127f3823a8d68ac40768d7310badc5e42076d14ad8985b1765309d477eae','[\"*\"]','2024-10-07 10:03:27',NULL,'2024-10-07 10:00:34','2024-10-07 10:03:27'),(149,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','cb4f04b20d88dbba32eaece3e69dde2444eb889afa0fdceedbcbb8235b22ea69','[\"*\"]','2024-10-07 10:11:16',NULL,'2024-10-07 10:04:07','2024-10-07 10:11:16'),(150,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','80f619a75fddbf3cbb895c3080f02329d108c4c47a8b2fb729aadd88409e840c','[\"*\"]','2024-10-07 10:47:27',NULL,'2024-10-07 10:14:38','2024-10-07 10:47:27'),(151,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','7838e683d7aab15e52739cd8573a9c169e14e8eb0dd0ae0de230320fad4550a3','[\"*\"]','2024-10-07 11:01:53',NULL,'2024-10-07 10:47:42','2024-10-07 11:01:53'),(152,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','98ca348b684dbf0ed87139590b1559613a5489a0adc57dd2837e836b755dac8e','[\"*\"]','2024-10-07 11:17:57',NULL,'2024-10-07 11:05:03','2024-10-07 11:17:57'),(153,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','5801c92aafd48126f9796d0c388fea94c522cef3df5ab3915b8bbc151a2f40ff','[\"*\"]','2024-10-07 11:40:12',NULL,'2024-10-07 11:31:33','2024-10-07 11:40:12'),(154,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','71f582a71063a1a5f9b398445ea56cb97a78e8063c978e1c857ceaa2c7a1efea','[\"*\"]','2024-10-07 11:52:09',NULL,'2024-10-07 11:52:08','2024-10-07 11:52:09'),(155,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','917e889f517fbbc3b179d7458a98fb94e4d5e9bd7125317c754e55ec993cf200','[\"*\"]','2024-10-07 11:52:27',NULL,'2024-10-07 11:52:26','2024-10-07 11:52:27'),(156,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','3ea3b1f5fcb907681212bae47cbaddd4ba8c9fa77db4535e941f0ee526767ad2','[\"*\"]','2024-10-07 12:32:48',NULL,'2024-10-07 11:53:26','2024-10-07 12:32:48'),(157,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','35af0d7ca9c1e3c54f823be073f9d91038620ea642c8e44d64724b4769f568fb','[\"*\"]','2024-10-07 12:34:52',NULL,'2024-10-07 12:34:10','2024-10-07 12:34:52'),(158,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','35cbd94e0254fba7cd647720172991cf67f08aaee69e76f9ffc42922f0741a81','[\"*\"]','2024-10-08 11:41:06',NULL,'2024-10-08 06:38:07','2024-10-08 11:41:06'),(159,'App\\Models\\User',12,'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0','c8a80e2c214e13edb84d8f6b72f336aa46e05de0f505ae078ea07b889657b2c7','[\"*\"]','2024-10-08 08:10:58',NULL,'2024-10-08 08:10:57','2024-10-08 08:10:58'),(160,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','006fb7431332332588e53ed8340331c975e1b29b210f851ac7c520b6d7d558ff','[\"*\"]','2024-10-08 12:00:07',NULL,'2024-10-08 09:09:13','2024-10-08 12:00:07'),(161,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','2af2b777a6df426466a48fb33cf39f961502cb6a52df3ab380b1dc24f871c20e','[\"*\"]','2024-10-08 15:55:59',NULL,'2024-10-08 12:07:22','2024-10-08 15:55:59'),(162,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','bbf5e160e28916afaaa585ce460da3f17a970de166fa155afbf9dc7b04abe4df','[\"*\"]','2024-10-08 15:56:55',NULL,'2024-10-08 15:00:54','2024-10-08 15:56:55'),(163,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','70892be851ae7eea51130d4604c7d24c0cf417d89577221c7e81071c4bc3006d','[\"*\"]','2024-10-08 17:16:41',NULL,'2024-10-08 16:46:53','2024-10-08 17:16:41'),(164,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','d1e139a61c657d1844861239194a96afaf14b55ca17702b617f629609703082f','[\"*\"]','2024-10-08 18:13:37',NULL,'2024-10-08 18:10:54','2024-10-08 18:13:37'),(165,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','a4609e76853c03792c2286605a56fd31e1af7c204f1f9c0265b7a1f8fd6fa685','[\"*\"]','2024-10-09 15:41:18',NULL,'2024-10-08 18:21:54','2024-10-09 15:41:18'),(166,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','5eba24f43fe3f2cdaa85afcf91649e3d381b775424f03c60cbad77f5f481f962','[\"*\"]','2024-10-09 07:04:51',NULL,'2024-10-09 06:06:21','2024-10-09 07:04:51'),(167,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','e60ad3805d0cc62e7cc70806cb5a3b8302fe82daf4cc89ccedea9614c0c6e79a','[\"*\"]','2024-10-09 08:37:43',NULL,'2024-10-09 07:06:22','2024-10-09 08:37:43'),(168,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','596d15cfc4f0b36342c894163cbfedfd8d9a1c9c542f26c245049810db727f8b','[\"*\"]','2024-10-09 11:14:16',NULL,'2024-10-09 10:04:49','2024-10-09 11:14:16'),(169,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','7da422bdac0251b93ab2964dc5fbf9758268d648cd293d9a310191875881ac7c','[\"*\"]','2024-10-09 11:17:22',NULL,'2024-10-09 11:14:29','2024-10-09 11:17:22'),(170,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','5af46cab432eec510944718b29ba89e9a9f8d2f895200b2459b4961e9667b476','[\"*\"]','2024-10-09 11:18:21',NULL,'2024-10-09 11:18:09','2024-10-09 11:18:21'),(171,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','9baf7b9259ef63cf4524ab1cb4a9932563d0823b2ff577551d1dc075842750a4','[\"*\"]','2024-10-09 12:14:53',NULL,'2024-10-09 12:13:44','2024-10-09 12:14:53'),(172,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','b93182bca68c7779ded8c44beae36808fec23da3e3e3638c413828dbc4f71269','[\"*\"]','2024-10-09 12:31:04',NULL,'2024-10-09 12:15:07','2024-10-09 12:31:04'),(173,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','e26ba2d74980fa5e50077df2bef597c154cfec0e80a4822717c013c1163b0fdd','[\"*\"]','2024-10-09 12:31:37',NULL,'2024-10-09 12:31:19','2024-10-09 12:31:37'),(174,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','52f4a6b322ca760bb0f5ab88bac2d61e82a3e9066500c8c40e53181c9aa892d7','[\"*\"]','2024-10-09 12:34:43',NULL,'2024-10-09 12:33:19','2024-10-09 12:34:43'),(175,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','9b164dc5e77cab49c884ba21cb1d3f3b6a3b7f7b1c27661d9412c41532e7ddb0','[\"*\"]','2024-10-09 12:35:43',NULL,'2024-10-09 12:34:53','2024-10-09 12:35:43'),(176,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','f3aa338a6a03587a4dfc2dd95d822c65674f32a81a5994899d4fbdd6d954d0d7','[\"*\"]','2024-10-09 12:37:56',NULL,'2024-10-09 12:36:18','2024-10-09 12:37:56'),(177,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','16bc628d9c2859a426afc6bd57a4d723af263a66e3a81706c74f250bd9e3c56a','[\"*\"]','2024-10-09 12:40:45',NULL,'2024-10-09 12:40:44','2024-10-09 12:40:45'),(178,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','cdddc41b5823259a492161edfdbcb6a1ff436cf1f5a9f151b5735fa8c3774b8e','[\"*\"]','2024-10-09 12:43:03',NULL,'2024-10-09 12:41:17','2024-10-09 12:43:03'),(179,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','b45e10adab5ef864049cd4f1912b8dd06992241099ca6506e4af44b859afd1a6','[\"*\"]','2024-10-09 15:01:29',NULL,'2024-10-09 12:44:50','2024-10-09 15:01:29'),(180,'App\\Models\\User',25,'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0','d29b4307ca048223df629e00f21919954425bf85e71e3dc406cf452b2f5cbffb','[\"*\"]','2024-10-09 14:00:52',NULL,'2024-10-09 13:14:00','2024-10-09 14:00:52'),(181,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','42313444e2d3eeb9a23dcf2493b0c27b25c4eedac8534cd973adcd350380fab6','[\"*\"]','2024-10-09 15:29:28',NULL,'2024-10-09 15:01:49','2024-10-09 15:29:28'),(182,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','cadb06de67cccf600db7adb5054b8e1df37048a6f49d61fe5dd42fcc0880e3ba','[\"*\"]','2024-10-09 16:14:43',NULL,'2024-10-09 15:34:31','2024-10-09 16:14:43'),(183,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','7d927a6a535d4d491ede9880a7d96284feeb455b8cd71cc5d7cc0c267047f571','[\"*\"]','2024-10-10 05:42:03',NULL,'2024-10-09 15:41:30','2024-10-10 05:42:03'),(184,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','2e359800b1b40c8a689a0c56c1af8e757651495a9584dda318200724554aae2a','[\"*\"]','2024-10-09 18:32:56',NULL,'2024-10-09 16:14:54','2024-10-09 18:32:56'),(185,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','9a34a64d6cb3444a77daf91ffaa0142a2dc460e8e191a296a53494aa60d307b3','[\"*\"]','2024-10-09 19:29:28',NULL,'2024-10-09 18:35:06','2024-10-09 19:29:28'),(186,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','1978a502d63607713d53ea2c1e86ffb8593ce3217faa06d78b297a729b18e09f','[\"*\"]','2024-10-10 03:50:06',NULL,'2024-10-09 19:29:46','2024-10-10 03:50:06'),(187,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','9b1a629b3afa0b0dd4fbf03c9d83eaa5bea51b3d23afac63291d5e22119e5082','[\"*\"]','2024-10-10 03:53:04',NULL,'2024-10-10 03:52:13','2024-10-10 03:53:04'),(188,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','98c28cd2cde58a6054adcc4742b40731b5c73f8867e8e11f4710f796590907ce','[\"*\"]','2024-10-10 04:39:55',NULL,'2024-10-10 04:00:28','2024-10-10 04:39:55'),(189,'App\\Models\\User',12,'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0','9912ddb2a5e454dfb7a72fdf78db10b6a5a30cb3ae35ffed18de7e2944bdb5fb','[\"*\"]','2024-10-10 04:34:48',NULL,'2024-10-10 04:27:24','2024-10-10 04:34:48'),(190,'App\\Models\\User',12,'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0','0087a64b3c531b091fae35adc9d4a8f9b212fbf1dcae2f0adadbebbc6eb134ee','[\"*\"]','2024-10-10 06:23:03',NULL,'2024-10-10 04:40:32','2024-10-10 06:23:03'),(191,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','0d5661b97cf5026bc001182038df6234f4ca6e5c8edb327472b1b47b7f90f0cb','[\"*\"]','2024-10-10 05:26:10',NULL,'2024-10-10 04:44:01','2024-10-10 05:26:10'),(192,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','dcffb54633a1b2f68d737639ee7764539c8d709aca8e8774589222ec921fab54','[\"*\"]','2024-10-10 12:32:39',NULL,'2024-10-10 05:27:03','2024-10-10 12:32:39'),(193,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','536b110fd21f544dbf4060d075ab38b30476ed481e58f3363f5626ea466a6b51','[\"*\"]','2024-10-10 05:57:18',NULL,'2024-10-10 05:42:41','2024-10-10 05:57:18'),(194,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','7173e1f4d3e768ab26d7d516303f0169d64b4598c22195da66c4300200602001','[\"*\"]','2024-10-10 05:58:50',NULL,'2024-10-10 05:58:43','2024-10-10 05:58:50'),(195,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','4982fe9e6fc29009aeeb6d7e36bdc15a575e8d8d343bb6aa98021359368c6360','[\"*\"]','2024-10-10 05:59:22',NULL,'2024-10-10 05:59:18','2024-10-10 05:59:22'),(196,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','99bf63915454a7924d0359ad88fb49f9be2174f4f5c4b08ba135f29cb903d22c','[\"*\"]','2024-10-10 06:27:21',NULL,'2024-10-10 06:26:50','2024-10-10 06:27:21'),(197,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','f49397e074909a9f246228fdec554c27b5e78c69e27082e6d13b42dd0cd4c348','[\"*\"]','2024-10-10 06:29:10',NULL,'2024-10-10 06:29:09','2024-10-10 06:29:10'),(198,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','f6282bf7752292b2a49b7998424a632a83b1035f4d83376a672f229dbf0cff67','[\"*\"]','2024-10-10 06:29:36',NULL,'2024-10-10 06:29:30','2024-10-10 06:29:36'),(199,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','bd61483560c3b83bf35417e9abc029fea55ed62e391b44acc9d4c3544d540aeb','[\"*\"]','2024-10-10 06:31:45',NULL,'2024-10-10 06:30:03','2024-10-10 06:31:45'),(200,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','038ff0e9c9ed71de3d382d708f66a982a0318b8d797b863e9092b32705509a10','[\"*\"]','2024-10-10 06:35:22',NULL,'2024-10-10 06:34:51','2024-10-10 06:35:22'),(201,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','0840d21e9baf713d4edc73ea996ffc4f1463f0205451eda8abad1ede78f03aa1','[\"*\"]','2024-10-10 06:46:15',NULL,'2024-10-10 06:44:22','2024-10-10 06:46:15'),(202,'App\\Models\\User',35,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','e35143f5e641aae011031b7333dd47659815033f26b3d6accad32be99924b1a4','[\"*\"]','2024-10-10 07:40:37',NULL,'2024-10-10 07:37:06','2024-10-10 07:40:37'),(203,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','99e8b2766b2b42d9cb5bd2e01adf2393531ac4d2ffc8df16c2cf288002358eaf','[\"*\"]','2024-10-10 07:42:39',NULL,'2024-10-10 07:41:11','2024-10-10 07:42:39'),(204,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','65f006f3f3ad6578b41ba8734d66ae28a84d5d2458b7c35f0c371e21bd0ff801','[\"*\"]','2024-10-10 07:58:25',NULL,'2024-10-10 07:42:57','2024-10-10 07:58:25'),(205,'App\\Models\\User',25,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','d8c53f969306d81a35ed47ab96cdeb606b417c77d00fbd089a18063be8cdde9e','[\"*\"]','2024-10-10 08:07:36',NULL,'2024-10-10 08:01:31','2024-10-10 08:07:36'),(206,'App\\Models\\User',27,'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:131.0) Gecko/20100101 Firefox/131.0','a30cadaf487ec6e95a57852b9b94813706bca43744ab87839e7f751f9714a438','[\"*\"]','2024-10-10 08:04:26',NULL,'2024-10-10 08:02:40','2024-10-10 08:04:26'),(207,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36','60142f3fb2035d86ebcb4e429e05d847b5315007d3baf0ecd452dc85f9301e34','[\"*\"]','2024-10-10 13:02:35',NULL,'2024-10-10 12:33:17','2024-10-10 13:02:35'),(208,'App\\Models\\User',12,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36','351b2ce225e5c4834e5e5a1c905441cdf0734a4a15ca44d892d3fa228a3dfb60','[\"*\"]','2025-02-24 11:39:16',NULL,'2025-02-24 11:37:50','2025-02-24 11:39:16'),(209,'App\\Models\\User',27,'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36','fc884e47e02429182b5886c5fef7dce89140816bfa8bdf2e81e3363b20d476be','[\"*\"]','2025-02-24 11:42:42',NULL,'2025-02-24 11:41:22','2025-02-24 11:42:42');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reports`
--

DROP TABLE IF EXISTS `reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reports` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `recommend` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `over_all_comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `class_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `trainee_id` bigint unsigned NOT NULL,
  `trainer_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reports_class_id_foreign` (`class_id`),
  KEY `reports_trainee_id_foreign` (`trainee_id`),
  KEY `reports_trainer_id_foreign` (`trainer_id`),
  CONSTRAINT `reports_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `gymclass` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reports_trainee_id_foreign` FOREIGN KEY (`trainee_id`) REFERENCES `trainees` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reports_trainer_id_foreign` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reports`
--

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;
INSERT INTO `reports` VALUES (7,'Continue pushing yourself, but be mindful of maintaining proper form to prevent injury.\nGradually incorporate more compound movements to work multiple muscle groups.','You’ve demonstrated consistent dedication and effort in your training sessions, and it’s paying off. Your strength, endurance',48,'2024-10-09 14:00:45','2024-10-09 14:00:45',12,25);
/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `rating` int DEFAULT NULL,
  `comments` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `trainee_id` bigint unsigned NOT NULL,
  `trainer_id` bigint unsigned NOT NULL,
  `class_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reviews_trainee_id_foreign` (`trainee_id`),
  KEY `reviews_trainer_id_foreign` (`trainer_id`),
  KEY `reviews_class_id_foreign` (`class_id`),
  CONSTRAINT `reviews_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `gymclass` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_trainee_id_foreign` FOREIGN KEY (`trainee_id`) REFERENCES `trainees` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reviews_trainer_id_foreign` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (47,5,'very good','2024-10-09 13:50:42','2024-10-09 13:50:42',12,25,48),(48,4,'keep gooing','2024-10-09 13:51:05','2024-10-09 13:51:05',12,25,48),(49,3,'you need to that develop your','2024-10-09 13:52:15','2024-10-09 13:52:15',12,25,48),(50,4,'its good work','2024-10-09 13:57:35','2024-10-09 13:57:35',12,25,48),(51,5,'very good coach','2024-10-10 04:30:34','2024-10-10 04:30:34',12,25,48),(52,4,'comment','2024-10-10 08:05:49','2024-10-10 08:05:49',12,25,48);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedules`
--

DROP TABLE IF EXISTS `schedules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `schedules` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `session_start` time DEFAULT NULL,
  `session_end` time DEFAULT NULL,
  `session_duration` decimal(8,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `class_id` bigint unsigned NOT NULL,
  `nameDay` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `date_day` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `schedules_class_id_foreign` (`class_id`),
  CONSTRAINT `schedules_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `gymclass` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedules`
--

LOCK TABLES `schedules` WRITE;
/*!40000 ALTER TABLE `schedules` DISABLE KEYS */;
INSERT INTO `schedules` VALUES (39,'17:00:00','19:00:00',2.00,'2024-10-09 13:13:01','2024-10-09 13:13:01',48,'Saturday',NULL,'2024-10-12'),(40,'19:00:00','21:00:00',2.00,'2024-10-09 13:13:01','2024-10-09 13:13:01',48,'Monday',NULL,'2024-10-14'),(41,'17:00:00','19:00:00',2.00,'2024-10-09 13:13:01','2024-10-09 13:13:01',48,'Saturday',NULL,'2024-10-19'),(42,'19:00:00','21:00:00',2.00,'2024-10-09 13:13:01','2024-10-09 13:13:01',48,'Monday',NULL,'2024-10-21'),(43,'17:00:00','19:00:00',2.00,'2024-10-09 13:13:01','2024-10-09 13:13:01',48,'Saturday',NULL,'2024-10-26'),(44,'19:00:00','21:00:00',2.00,'2024-10-09 13:13:01','2024-10-09 13:13:01',48,'Monday',NULL,'2024-10-28'),(45,'17:00:00','19:00:00',2.00,'2024-10-09 13:13:01','2024-10-09 13:13:01',48,'Saturday',NULL,'2024-11-02'),(46,'19:00:00','21:00:00',2.00,'2024-10-09 13:13:01','2024-10-09 13:13:01',48,'Monday',NULL,'2024-11-04'),(47,'14:00:00','16:00:00',2.00,'2024-10-09 18:39:55','2024-10-09 18:39:55',49,'Monday',NULL,'2024-10-14'),(48,'13:00:00','15:00:00',2.00,'2024-10-09 18:39:56','2024-10-09 18:39:56',49,'Saturday',NULL,'2024-10-19'),(49,'14:00:00','16:00:00',2.00,'2024-10-09 18:39:56','2024-10-09 18:39:56',49,'Monday',NULL,'2024-10-21'),(50,'13:00:00','15:00:00',2.00,'2024-10-09 18:39:56','2024-10-09 18:39:56',49,'Saturday',NULL,'2024-10-26'),(51,'14:00:00','16:00:00',2.00,'2024-10-09 18:39:56','2024-10-09 18:39:56',49,'Monday',NULL,'2024-10-28'),(52,'13:00:00','15:00:00',2.00,'2024-10-09 18:39:56','2024-10-09 18:39:56',49,'Saturday',NULL,'2024-11-02'),(53,'14:00:00','16:00:00',2.00,'2024-10-09 18:39:56','2024-10-09 18:39:56',49,'Monday',NULL,'2024-11-04'),(54,'13:00:00','15:00:00',2.00,'2024-10-09 18:39:56','2024-10-09 18:39:56',49,'Saturday',NULL,'2024-11-09'),(55,'14:00:00','16:00:00',2.00,'2024-10-09 18:39:56','2024-10-09 18:39:56',49,'Monday',NULL,'2024-11-11'),(56,'13:00:00','15:00:00',2.00,'2024-10-09 18:39:56','2024-10-09 18:39:56',49,'Saturday',NULL,'2024-11-16');
/*!40000 ALTER TABLE `schedules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('4NamPR3wiaQSjSS43utWgfCJE6gAkTaQgjJ99juD',NULL,'172.20.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUHpGd0czdUlCNmFqSWU1a0pDclFUNHlzZGdZdTdDa0ZVT1dIUm9RNSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1728204558),('HydBm9vH9urXpHJN8fZ1t7zJ6PmpRcQFogz73IS6',NULL,'172.20.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoick1iOFluZlc0V0pIbGZqUGlPZ2JTTThIMXBHeTZncGg5U284NmtQcyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly8wLjAuMC4wOjgwMDAvbG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1727277858),('pCcTj3UCkNaWXBuvzhAbHYckt7oPQYIgviNSnsrj',NULL,'172.20.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoibE03enZhTXdGRnB5aEV4dXVCNnpJa1A1Mml2RTE3UjBrYjE5Z1B1SCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjU6Imh0dHA6Ly8wLjAuMC4wOjgwMDAvbG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1728153349),('wR7OPM300kOUr6S0HeiLnnMrBECpQWnRsb1TrqS8',NULL,'172.20.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','YToyOntzOjY6Il90b2tlbiI7czo0MDoiUlpIYTJDMWNPelIzbWxtTlhJNkFmQ3BHR3dMdzhTR1pUN2pHbGFCTCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1728153140),('yU7StNMkUngjpc7FcVcmWsVNjBWitT9HwOjcnXVt',NULL,'172.20.0.1','PostmanRuntime/7.42.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUG1XejhaUHBxMmNaaHdvQVduQVZvUzFFdzAycXdVUGxOU2hSR29WeCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTk6Imh0dHA6Ly8wLjAuMC4wOjgwMDAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1727344075),('Z1u9shtdxuv64bhMxis26BjhKGjAVJs6Q6ooisQu',NULL,'172.20.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoieDNONUtmN0xPOTczaWpLY3JlZWxnM1EwZTdRMlBDTEZiYnZLa0lGQSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=',1728154601);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscriptions`
--

DROP TABLE IF EXISTS `subscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscriptions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `amount` decimal(8,2) NOT NULL DEFAULT '0.00',
  `payment_method` enum('Credit','Bank Transfers','PayPal','Mobile Payments') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subscriptions_user_id_foreign` (`user_id`),
  CONSTRAINT `subscriptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscriptions`
--

LOCK TABLES `subscriptions` WRITE;
/*!40000 ALTER TABLE `subscriptions` DISABLE KEYS */;
INSERT INTO `subscriptions` VALUES (1,300.00,'Credit','2024-10-06 14:47:23','2024-10-06 14:47:23',12),(2,300.00,'Credit','2024-10-06 14:48:35','2024-10-06 14:48:35',12),(3,300.00,'Credit','2024-10-06 14:49:17','2024-10-06 14:49:17',12),(4,300.00,'Credit','2024-10-06 14:49:50','2024-10-06 14:49:50',12),(5,300.00,'Credit','2024-10-06 14:51:40','2024-10-06 14:51:40',12),(6,300.00,'Credit','2024-10-06 14:52:44','2024-10-06 14:52:44',12),(7,300.00,'Credit','2024-10-06 14:53:09','2024-10-06 14:53:09',12),(8,300.00,'Credit','2024-10-06 14:55:39','2024-10-06 14:55:39',12),(9,300.00,'Credit','2024-10-06 18:39:30','2024-10-06 18:39:30',12),(10,300.00,'Credit','2024-10-06 18:41:37','2024-10-06 18:41:37',12),(11,300.00,'Credit','2024-10-06 18:42:46','2024-10-06 18:42:46',12),(12,300.00,'Credit','2024-10-06 18:57:17','2024-10-06 18:57:17',12),(13,300.00,'Credit','2024-10-06 19:07:57','2024-10-06 19:07:57',12),(14,300.00,'Credit','2024-10-06 19:17:07','2024-10-06 19:17:07',12),(15,300.00,'Credit','2024-10-06 19:17:43','2024-10-06 19:17:43',12),(16,300.00,'Credit','2024-10-06 19:19:24','2024-10-06 19:19:24',12),(17,300.00,'Credit','2024-10-06 19:23:19','2024-10-06 19:23:19',12),(18,300.00,'Credit','2024-10-06 19:25:03','2024-10-06 19:25:03',12),(19,300.00,'Credit','2024-10-10 04:28:47','2024-10-10 04:28:47',12),(20,300.00,'Credit','2024-10-10 06:35:21','2024-10-10 06:35:21',12),(21,300.00,'Credit','2024-10-10 07:37:56','2024-10-10 07:37:56',35);
/*!40000 ALTER TABLE `subscriptions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainees`
--

DROP TABLE IF EXISTS `trainees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainees` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `goals` text COLLATE utf8mb4_unicode_ci,
  `no_vouchers` int NOT NULL DEFAULT '0',
  `expiration_date` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `membership_id` bigint unsigned NOT NULL DEFAULT '20',
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `trainees_membership_id_foreign` (`membership_id`),
  KEY `trainees_user_id_foreign` (`user_id`),
  CONSTRAINT `trainees_membership_id_foreign` FOREIGN KEY (`membership_id`) REFERENCES `memberships` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `trainees_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainees`
--

LOCK TABLES `trainees` WRITE;
/*!40000 ALTER TABLE `trainees` DISABLE KEYS */;
INSERT INTO `trainees` VALUES (20,NULL,0,NULL,NULL,NULL,21,16),(21,NULL,0,NULL,NULL,NULL,22,17),(22,NULL,0,NULL,NULL,NULL,23,18),(23,NULL,0,NULL,NULL,NULL,23,19),(24,NULL,0,NULL,NULL,NULL,23,21),(25,NULL,0,NULL,NULL,NULL,24,20),(26,NULL,0,NULL,'2024-09-29 17:16:25','2024-09-29 17:16:25',23,22),(27,'add goals',0,'2024-10-17 06:35:21',NULL,'2024-10-10 07:42:39',24,12),(28,NULL,0,NULL,NULL,NULL,22,23),(30,NULL,0,NULL,'2024-10-07 09:18:11','2024-10-07 09:18:11',20,27),(31,NULL,0,NULL,'2024-10-09 16:37:44','2024-10-09 16:37:44',20,29),(32,NULL,0,NULL,'2024-10-09 16:56:44','2024-10-09 16:56:44',20,30),(33,NULL,0,NULL,'2024-10-09 18:34:46','2024-10-09 18:34:46',20,31),(34,NULL,0,NULL,'2024-10-10 06:05:10','2024-10-10 06:05:10',20,34),(35,NULL,0,'2024-11-09 07:37:56','2024-10-10 07:35:07','2024-10-10 07:37:56',25,35);
/*!40000 ALTER TABLE `trainees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainers`
--

DROP TABLE IF EXISTS `trainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `cv` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `trainers_user_id_foreign` (`user_id`),
  CONSTRAINT `trainers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainers`
--

LOCK TABLES `trainers` WRITE;
/*!40000 ALTER TABLE `trainers` DISABLE KEYS */;
INSERT INTO `trainers` VALUES (1,'cvs/JPNLpHP8Iy23KvGp6DWyaFS2WRbuEe7ELIa1l5Qk.pdf','2024-09-28 05:55:41','2024-09-28 05:55:41',14),(2,'cvs/66XXWxa4mZjpa0yIwUjwcoUUyKxGnzNg2D2jGXKK.pdf','2024-09-28 05:57:14','2024-09-28 05:57:14',15),(3,'cvs/bKk9DkWl2zjvd7rBzUlXqsbNkhpNsZARI2IvhZkE.pdf','2024-09-30 18:02:08','2024-09-30 18:02:08',23),(4,'cvs/4mQMaM6qKJsKwGl40dBSCF3lyX0wg30NkH4iY8zJ.pdf','2024-09-30 18:03:59','2024-09-30 18:03:59',24),(5,'cvs/AHOtIthJuonPfqwLE2Osi9ub6g2se5D7DqyR3x78.pdf','2024-09-30 18:08:18','2024-09-30 18:08:18',25),(6,'cvs/eq34ebakbCfRyBdwmncpu7Rz62XuprcxifoJ23Zd.pdf','2024-10-07 09:25:09','2024-10-07 09:25:09',28),(7,'cvs/eslFqbn1ssFxRWjsZeL00UZCfefnwmSKloId8q1l.pdf','2024-10-09 18:36:11','2024-10-09 18:36:11',32),(8,'cvs/APoNk6ruhvWoP8gcSy291GhhBUjKhKcSr9pJ527U.pdf','2024-10-10 05:44:16','2024-10-10 05:44:16',33);
/*!40000 ALTER TABLE `trainers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_classes`
--

DROP TABLE IF EXISTS `user_classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_classes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `class_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_classes_user_id_foreign` (`user_id`),
  KEY `user_classes_class_id_foreign` (`class_id`),
  CONSTRAINT `user_classes_class_id_foreign` FOREIGN KEY (`class_id`) REFERENCES `gymclass` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_classes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_classes`
--

LOCK TABLES `user_classes` WRITE;
/*!40000 ALTER TABLE `user_classes` DISABLE KEYS */;
INSERT INTO `user_classes` VALUES (18,NULL,NULL,12,48),(19,NULL,NULL,17,48),(20,NULL,NULL,20,48),(21,NULL,NULL,21,48),(22,'2024-10-10 04:29:20','2024-10-10 04:29:20',12,49);
/*!40000 ALTER TABLE `user_classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_equipments`
--

DROP TABLE IF EXISTS `user_equipments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_equipments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  `equipment_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_equipments_user_id_foreign` (`user_id`),
  KEY `user_equipments_equipment_id_foreign` (`equipment_id`),
  CONSTRAINT `user_equipments_equipment_id_foreign` FOREIGN KEY (`equipment_id`) REFERENCES `equipments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_equipments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_equipments`
--

LOCK TABLES `user_equipments` WRITE;
/*!40000 ALTER TABLE `user_equipments` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_equipments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gender` enum('male','female') COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('trainee','trainer','admin') COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timer` timestamp NULL DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_phone_unique` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'gadmohamed','mohamed13gad13@gmail.com','01156235709','assiut',25,NULL,'male','trainee','$2y$12$F3atnA5msFgNfJnncQ4URezlU1CojFP3aQbtVsb5SxdtdvE82m7Pe',NULL,NULL,'2024-09-27 14:18:34',NULL,'2024-09-27 14:18:19','2024-09-27 14:18:34'),(13,'gadmohamed','mohamed113gad13@gmail.com','0109009892','assiut',25,NULL,'male','trainee','$2y$12$culsahnZH4Z2UnWqium9IujrVYxyA.Eq5r9fsORFaC3.v0VageIa.','Odctc6J1Rxexn4hUsJ9nWv3lLsyycMP5bhlCCSGKlSfmkjrB6qhfqe6aKhY7','2024-09-28 05:54:58',NULL,NULL,'2024-09-28 05:54:58','2024-09-28 05:54:58'),(14,'gadmohamed','mohamed13gad13@gmail.com1','0109009893','assiut',25,NULL,'male','trainer','$2y$12$VfyY5hHQJudw3k4N28XaMOyy2JpBbI7hZGF2RG4z2l6ySkcOJP2e6','OvDr7Nr6oecBhp5W2zLu2TQBOYyT6ACnxn9Kt9dsU1yPhOn3TR3GZHqg5SLO','2025-02-24 11:40:00',NULL,NULL,'2024-09-28 05:55:37','2025-02-24 11:40:00'),(15,'gadmohamed','mohamed13gad13@gmail.com11','0109009894','assiut',25,NULL,'male','trainer','$2y$12$ktGt2HL0B26XKEXFoTbfkulghpvGSlIReY28N.sx2Yi9P4s8dBkDW','L1XrrkmXqdD4pjMC9Zye3WJ74aWQiA3LOh4CzTCF8pRE8Po7XxIZd1dkXJPJ','2025-02-24 11:40:35',NULL,NULL,'2024-09-28 05:57:13','2025-02-24 11:40:35'),(16,'ibrahem','ibrahem@gmail.com','0109000894','assiut',25,NULL,'male','trainee','$2y$12$ZmvjDwrKUu2gSs899wMxxeFaqtNZkTdhO.EYojxfszyYi4Tk.cUWG','q2OHvniUOdB82gT9YFqB0FPZTmzPq29xK8ktimjBT9Ycznds344085rURZFa','2024-09-28 18:33:04',NULL,NULL,'2024-09-28 18:33:04','2024-09-28 18:33:04'),(17,'DoaaM','Doaa@gmail.com','0109000897','assiut',25,NULL,'male','trainee','$2y$12$gjzHedMzEAzhSacShmtRXuVXveZkQvQ1rYwmkIefbTDVUm0e7BhJO','2r4ooCT6XLeUD7LdfhNiHjgkjkphIIQH8R8io0AgLTOL7FO5AfxEtE7VTQN0','2024-09-28 18:33:31',NULL,NULL,'2024-09-28 18:33:31','2024-09-28 18:33:31'),(18,'sandy','sandy@gmail.com','0109000899','assiut',25,NULL,'male','trainee','$2y$12$E1JHiaozvwhB1Yhx2f0wUe7XvI7cXaLAeB9oNlrXGw2zGjcoPDBKq','EBkTulfff2jo8BcnLQBJXEm2ryIcjKrktQIVo4Muuz9P43QZGSEGxoEZtuz3','2024-09-28 18:33:51',NULL,NULL,'2024-09-28 18:33:51','2024-09-28 18:33:51'),(19,'Monaa','Monaa@gmail.com','0109000999','assiut',25,NULL,'male','trainee','$2y$12$BlwsiFj1w94Jn8vUJhSbFeoRVH26ld8F6JXDRZla5.eZFbCWauI.S','MZl2g6uAle9PpSo9gYVcWMeXQKkf5bI6MmWPbXFA2LC8a8WcXFwrZw97FzZR','2024-09-28 18:34:13',NULL,NULL,'2024-09-28 18:34:13','2024-09-28 18:34:13'),(20,'Rannea','Rannea@gmail.com','0109001999','assiut',25,NULL,'male','trainee','$2y$12$xYimEpJv1ScjPMJFKxTb9uKexcWX89fXtQQadKXMNalNjh4MJzaNO','HWHyOVBJazMshD8UD5GXmV8IMKxeUPqOqNBWLZYvnwmCpLYWlY6IZnpXlIFM','2024-09-28 18:34:30',NULL,NULL,'2024-09-28 18:34:30','2024-09-28 18:34:30'),(21,'david','davidayman@gmail.com','122345','asuit',25,'images/AbTxg2AZUh0OOCatSSxKDPiL6t79OiaeDGOXGckn.png','male','trainee','$2y$12$Ck/mxDmgeNDJbbqJ/dBXLuwt7mxiffkRGPqRBy/CdIAm8wDDrj1DO','UZCxAazIwxSH5WeApcG3o4zr88BwN53mFmmTONAmdwNXBJzaimrhE4GQWJIL','2024-09-29 15:08:33',NULL,NULL,'2024-09-29 15:08:33','2024-09-29 15:08:33'),(22,'arwaa','arwaa@gmail.com','1223456878','asuit',25,'images/pGcLKn7oVjW3YHhsRbGlKDOdIfOwXkFmmKjIUsl2.png','male','trainee','$2y$12$nYWgB3eCewpIpkieFFnsHOLikIPiCUgBtPN2/U7zEc1GZpqtwL4dS','J3MKFfPKboKVdjcECYkHgawQfpy3k6izOfJ8oDcKPGB8CLHqq3hrZZBJbOk3','2024-09-29 17:16:22',NULL,NULL,'2024-09-29 17:16:22','2024-09-29 17:16:22'),(23,'gadMO','gad@gmail.com','01123232323','asuit',25,'images/67ExivMOSIQQXo7ifZgP46Goxp2uaa3nRhw5eNEv.png','male','trainer','$2y$12$Cjs5emTx3C.12Ra//U4CK.CkFJIApTYJWxCNm7gC8lf3NMquVN8Pm','72lwGFU4mlv1aRuqHZv0CXETAFCKzC1q1aPrT4ZmMyBtrO0gczNDq6gtyeKS','2024-09-30 18:02:08',NULL,NULL,'2024-09-30 18:02:08','2024-09-30 18:02:08'),(24,'gadMO','Mohamedgad@gmail.com','01123232324','asuit',25,'images/8NYOZBAM7Gp0I4G1O1tgiQs2FD6WaD2m0C5g0U0D.png','male','trainer','$2y$12$JWJSzkCKMcXeA0F3QuC6d.A/Tb3lx0I04QtV4KjlyDaI6x5QhVx4.','grJZg59EZU3xbQtb7b9T4OXkHV3iA3F44wbuMEuNbksZEH4zPH7drfAGGP4S','2024-10-04 08:24:12','2024-09-30 18:08:18',NULL,'2024-09-30 18:03:59','2024-10-04 08:24:12'),(25,'gadMO','Mohamed13gad@gmail.com','011232324','asuit',25,'images/0FuE8rNRdgGzwRypinATEkPbbgyx0XqpgqkLY5z1.png','male','trainer','$2y$12$xs9RDoBvt.vQu90s0PqoauOCP9G0K6KSTY5PrN/pA1RjZQsbprQPi','CeLF2P1JtG5L0J3E3143HZYjmwFwzqdPbeIWPFLZ1Mg0TYribJpr6VSmHUqU','2024-09-30 18:08:17','2024-09-30 18:08:18',NULL,'2024-09-30 18:08:17','2024-09-30 18:08:18'),(27,'admin','admin@gmail.com','00090000909','assiut',24,'images/garH8YSe93U0GMLCyynG3fU74kcAPPsVCSM3V57W.png','male','admin','$2y$12$U4wt4rszAELDZCZGnMCxlOHytHUwC7W9kVU2vOwnsTqxMCTsIjnmW','KSfP50fG13YT8m9NMHFTgepod1rNKqWAguSK4FPp47iazODHiBypdX0ORcvX','2024-10-07 09:18:08','2024-10-07 09:18:08',NULL,'2024-10-07 09:18:08','2024-10-07 09:18:08'),(28,'engDoaa','doaa.abdelaal.20@gmail.com','01000193111','Asyut',29,'images/pNWOM1sa5hQaJ5wC0zWybGAmLnS0Ft1k1qisqc0l.png','female','trainer','$2y$12$wRJwBskxlnm6mpa6FyC7zO/DfYc6DvAaduvILLVYPt.X4rF8eyxIm','zGtf1SNCdQTPhWhQwJVwrgLSxYSckwcfqogmx3dSBg7WEKnvDaG9XQY1eELC','2024-10-07 09:25:09','2024-10-07 09:25:09',NULL,'2024-10-07 09:25:09','2024-10-07 09:25:09'),(29,'ibrahem','ibrahem123@gmail.com','1213456754','asyut',22,NULL,'male','trainee','$2y$12$TGfRClx2SvrJDYzIQRmpOOYrxz7IT55.GNdqSxN1tZ0Mts5vHA7Se','jAcbGsvRWBQIPzeyhEbykPDe1n8lNgmNV5DaJNyccHD6FslVHTBJwwZp1GNl','2024-10-09 16:37:40',NULL,NULL,'2024-10-09 16:37:40','2024-10-09 16:37:40'),(30,'ibrahem','ibrahem123@gmail.com223','1213456750','asyut',22,'images/sk42llx74oi1umpo3IirwT1lDMrg4E7XmQCS9EwU.png','male','trainee','$2y$12$JFf.BEQd9NiMLZpNWr2JKe7baP8FJCHc7CKw1XZu0l2RGuo/E.xfi','0GqXVlMTeuC0p9SXoQkTxZiqXen2Hnsrm03kUEoCzNzVhV0D4kztSOjzU2Du','2024-10-09 16:56:42',NULL,NULL,'2024-10-09 16:56:42','2024-10-09 16:56:42'),(31,'ibrahim','ibrahim@gmail.com123','09089989080','asyut',20,'images/ZSFUU45V2rk5JzXMdGHsmUmoP6E1eGI7ArEHgG3r.png','male','trainee','$2y$12$Og1iJplmlhcQLPXnw.WFDuKJEaMqOXlfv3eqy65Mc1O2tk/AMtnrq','9zYa1SppKPn3kgP10nMdTQuzymHXVZ8Hy2UW5oBUZYThlPgd6Ur2wrYPZ5ly','2024-10-09 18:34:43',NULL,NULL,'2024-10-09 18:34:43','2024-10-09 18:34:43'),(32,'Divad','aymandivad850@gmail.com','01212121212','assuit',23,'images/L4mlw9GFtPzh2VwOLoI4zzYlns4DHI6JJ4KU6OBh.jpg','male','trainer','$2y$12$DTZOKGdqKjku5wGffcmTMu7/C69MwuwJ2uuAliVa1AHQz9iX4fAVm','EILg7LOagza7IAYgTTI28xUgrkROWGFxPGrMYHZXYrsWBzmN8ec8XbpvbFBp','2024-10-09 18:36:11','2024-10-09 18:36:11',NULL,'2024-10-09 18:36:11','2024-10-09 18:36:11'),(33,'monaAbdelmohsen','monaAbdelmohsen@gmail.com','08923873837','asuit',23,'images/5VpNH0PTxvhlEsUxbzpfRfapIJ8ozI1Cln6wNlFA.png','female','trainer','$2y$12$uhxGhIGjymsz7DWEtvqSRuZujxg37s4w.o2py9ubTWWx0Je0HnSey','RZ4dYkMycqGziTKjwbSyZJmPasKyJxs5b3nu1hogc14P15ZKXyngS2czKyXa','2024-10-10 05:44:16','2024-10-10 05:44:16',NULL,'2024-10-10 05:44:16','2024-10-10 05:44:16'),(34,'sandy1234','sandyzakher5@gmail.com','84337843874','assiut',23,'images/06S7ZnEB7bvXvxLl1E7pUttAUzWRYZWLT2zG6VxO.png','female','trainee','$2y$12$XUX45Pmr4fsEJ18C0iCJGeOpyfTF/yfAexxM52Zj9tCsJKi.AwJLW','rv7rrgek7W5pTWosi5lQIhwq5yaiStlzyB1mubGyUWG3wUHEkmt2gK4X1ghg','2024-10-10 06:05:06',NULL,NULL,'2024-10-10 06:05:06','2024-10-10 06:05:06');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `method_invite` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `vouchers_user_id_foreign` (`user_id`),
  CONSTRAINT `vouchers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-24 17:01:03
