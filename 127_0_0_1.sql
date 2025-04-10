-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2025 at 11:00 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `210381_finalexam_knowledgebase`
--
CREATE DATABASE IF NOT EXISTS `210381_finalexam_knowledgebase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `210381_finalexam_knowledgebase`;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `first_name`, `last_name`) VALUES
(1, 'wendee ', 'postre');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `signatory` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `isbn` varchar(30) NOT NULL,
  `language_id` int(11) NOT NULL,
  `edition` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `publisher_id` int(11) NOT NULL,
  `publication` year(4) NOT NULL,
  `section_id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(100) NOT NULL,
  `category_persian` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `city` varchar(80) NOT NULL,
  `city_persian` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `copies`
--

CREATE TABLE `copies` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deposits`
--

CREATE TABLE `deposits` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `copy_id` int(11) NOT NULL,
  `issue_date` date NOT NULL,
  `due_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ebooks`
--

CREATE TABLE `ebooks` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `extension` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

CREATE TABLE `faculties` (
  `id` int(11) NOT NULL,
  `faculty` varchar(50) NOT NULL,
  `faculty_persian` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `genders`
--

CREATE TABLE `genders` (
  `id` int(11) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `gender_persian` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` int(11) NOT NULL,
  `language` varchar(70) NOT NULL,
  `language_persian` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `libraries`
--

CREATE TABLE `libraries` (
  `id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `content_persian` text NOT NULL,
  `privacy` text NOT NULL,
  `privacy_persian` text NOT NULL,
  `services` text NOT NULL,
  `services_persian` text NOT NULL,
  `email` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `news_title` varchar(255) NOT NULL,
  `news_summary` text NOT NULL,
  `news_details` text NOT NULL,
  `news_ref` varchar(255) NOT NULL,
  `news_title_persian` varchar(255) NOT NULL,
  `news_summary_persian` varchar(255) NOT NULL,
  `news_details_persian` varchar(255) NOT NULL,
  `news_ref_persian` varchar(255) NOT NULL,
  `news_date` date NOT NULL,
  `fileext` char(3) NOT NULL,
  `faculties_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `publishers`
--

CREATE TABLE `publishers` (
  `id` int(11) NOT NULL,
  `publisher` varchar(50) NOT NULL,
  `location` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role` varchar(50) NOT NULL,
  `role_persian` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sections`
--

CREATE TABLE `sections` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `section` varchar(100) NOT NULL,
  `section_persian` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semesters`
--

CREATE TABLE `semesters` (
  `id` int(11) NOT NULL,
  `semester` varchar(30) NOT NULL,
  `semester_persian` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name_` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `father_name` varchar(50) NOT NULL,
  `gender_id` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL,
  `semester_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact_no` char(14) NOT NULL,
  `identification_no` int(11) NOT NULL,
  `registration_no` int(11) NOT NULL,
  `page_no` int(11) NOT NULL,
  `orginal_address` varchar(50) NOT NULL,
  `current_address` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `roll_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `signature` varchar(255) NOT NULL,
  `city_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorConnect` (`author_id`),
  ADD KEY `languageConnect` (`language_id`),
  ADD KEY `publisherConnect` (`publisher_id`),
  ADD KEY `faculties` (`faculty_id`),
  ADD KEY `sectionConnect` (`section_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `copies`
--
ALTER TABLE `copies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookConnectt` (`book_id`);

--
-- Indexes for table `deposits`
--
ALTER TABLE `deposits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userConnect` (`user_id`),
  ADD KEY `copyConnect` (`copy_id`);

--
-- Indexes for table `ebooks`
--
ALTER TABLE `ebooks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookConnect` (`book_id`);

--
-- Indexes for table `faculties`
--
ALTER TABLE `faculties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `libraries`
--
ALTER TABLE `libraries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facultyConnectt` (`faculty_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `facultyConnect` (`faculties_id`);

--
-- Indexes for table `publishers`
--
ALTER TABLE `publishers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryConnect` (`category_id`);

--
-- Indexes for table `semesters`
--
ALTER TABLE `semesters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gender_ID` (`gender_id`),
  ADD KEY `semesterConnect` (`semester_id`),
  ADD KEY `rollConnect` (`roll_id`),
  ADD KEY `facultyConnecttt` (`faculty_id`),
  ADD KEY `cityConnect` (`city_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `authorConnect` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `faculties` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `languageConnect` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publisherConnect` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sectionConnect` FOREIGN KEY (`section_id`) REFERENCES `sections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `copies`
--
ALTER TABLE `copies`
  ADD CONSTRAINT `bookConnectt` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

--
-- Constraints for table `deposits`
--
ALTER TABLE `deposits`
  ADD CONSTRAINT `copyConnect` FOREIGN KEY (`copy_id`) REFERENCES `copies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userConnect` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ebooks`
--
ALTER TABLE `ebooks`
  ADD CONSTRAINT `bookConnect` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `libraries`
--
ALTER TABLE `libraries`
  ADD CONSTRAINT `facultyConnectt` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `facultyConnect` FOREIGN KEY (`faculties_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sections`
--
ALTER TABLE `sections`
  ADD CONSTRAINT `categoryConnect` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `cityConnect` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `facultyConnecttt` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `gender_ID` FOREIGN KEY (`gender_id`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `rollConnect` FOREIGN KEY (`roll_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `semesterConnect` FOREIGN KEY (`semester_id`) REFERENCES `semesters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Database: `chis`
--
CREATE DATABASE IF NOT EXISTS `chis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `chis`;

-- --------------------------------------------------------

--
-- Table structure for table `dental_record`
--

CREATE TABLE `dental_record` (
  `dentalID` int(11) NOT NULL,
  `dental_patientID` int(11) NOT NULL,
  `dental_caries` varchar(255) NOT NULL,
  `dental_Gingivitis` varchar(255) NOT NULL,
  `dental_Debris` varchar(255) NOT NULL,
  `dental_Calculus` varchar(255) NOT NULL,
  `dental_AbGrowth` varchar(255) NOT NULL,
  `dental_CleftLip` varchar(255) NOT NULL,
  `dental_teethPresent` int(11) NOT NULL,
  `dental_soundTeeth` int(11) NOT NULL,
  `dental_decayedTeeth` int(11) NOT NULL,
  `dental_missingTeeth` int(11) NOT NULL,
  `dental_filledTeeth` int(11) NOT NULL,
  `dental_workerName` varchar(255) NOT NULL,
  `dental_date` date NOT NULL,
  `dental_tri` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `dental_record`
--

INSERT INTO `dental_record` (`dentalID`, `dental_patientID`, `dental_caries`, `dental_Gingivitis`, `dental_Debris`, `dental_Calculus`, `dental_AbGrowth`, `dental_CleftLip`, `dental_teethPresent`, `dental_soundTeeth`, `dental_decayedTeeth`, `dental_missingTeeth`, `dental_filledTeeth`, `dental_workerName`, `dental_date`, `dental_tri`) VALUES
(37, 1, 'Absent', 'Absent', 'Absent', 'Present', 'Absent', 'Present', 2, 2, 2, 2, 2, 'Dentist', '2023-12-11', 'First'),
(38, 1, 'Present', 'Present', 'Absent', 'Absent', 'Absent', 'Present', 3, 3, 3, 3, 3, 'Dentist', '2023-12-12', 'Second'),
(39, 6, 'Present', 'Absent', 'Present', 'Absent', 'Present', 'Absent', 1, 1, 1, 1, 1, 'Dentist', '2023-12-16', 'First');

-- --------------------------------------------------------

--
-- Table structure for table `lab_record`
--

CREATE TABLE `lab_record` (
  `lab_recordID` int(11) NOT NULL,
  `lab_patientID` int(11) NOT NULL,
  `lab_testDone` varchar(255) NOT NULL,
  `lab_testResult` varchar(255) NOT NULL,
  `lab_STI` varchar(255) NOT NULL,
  `lab_STIResult` varchar(255) NOT NULL,
  `lab_testDate` date NOT NULL,
  `lab_providerName` varchar(255) NOT NULL,
  `trimester` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lab_record`
--

INSERT INTO `lab_record` (`lab_recordID`, `lab_patientID`, `lab_testDone`, `lab_testResult`, `lab_STI`, `lab_STIResult`, `lab_testDate`, `lab_providerName`, `trimester`) VALUES
(1, 1, 'Urinalysis', 'sample result', 'Syphilis', 'negative', '2023-12-12', 'Kris', 'First'),
(2, 2, 'Hemoglobin Count', 'sample result', 'HIV', 'negative', '2023-12-12', 'Kris', 'First'),
(3, 1, 'Complete Blood Count', 'sample result', 'Hepatitis B', 'negative', '2023-12-12', 'Kris', 'Second'),
(4, 3, 'Complete Blood Count, Gestational Diabetes', 'sample result', 'Hepatitis B', 'positive', '2023-12-16', 'Kris', 'First');

-- --------------------------------------------------------

--
-- Table structure for table `postnatal_record`
--

CREATE TABLE `postnatal_record` (
  `postnatalID` int(11) NOT NULL,
  `postnatal_patientID` int(11) NOT NULL,
  `DateofVisit` date NOT NULL,
  `post_weight` float NOT NULL,
  `post_height` float NOT NULL,
  `post_BMI` varchar(255) NOT NULL,
  `post_BP` varchar(255) NOT NULL,
  `post_pagsusuri` varchar(255) NOT NULL,
  `post_payo` varchar(255) NOT NULL,
  `post_folicAcid` varchar(100) NOT NULL,
  `post_vitA` varchar(100) NOT NULL,
  `post_FP` varchar(255) NOT NULL,
  `post_NextVisit` date NOT NULL,
  `post_Provider` varchar(255) NOT NULL,
  `post_Notes` varchar(255) NOT NULL,
  `post_NumVisit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `postnatal_record`
--

INSERT INTO `postnatal_record` (`postnatalID`, `postnatal_patientID`, `DateofVisit`, `post_weight`, `post_height`, `post_BMI`, `post_BP`, `post_pagsusuri`, `post_payo`, `post_folicAcid`, `post_vitA`, `post_FP`, `post_NextVisit`, `post_Provider`, `post_Notes`, `post_NumVisit`) VALUES
(1, 1, '2023-12-16', 50, 152, 'Normal', '120/90', 'sample', 'sample', 'Yes', 'Yes', 'Pills', '2023-12-19', 'Nurse Anne', 'sample notess', 1),
(2, 1, '2023-12-26', 57, 153, 'Normal', '120/90', 'sample', 'sample', 'Yes', 'Yes', 'Condom', '2024-01-05', 'Nurse Anne', 'samplee', 2),
(3, 7, '2023-12-16', 50, 149, 'Normal', '120/90', 'sample', 'sample', 'Yes', 'Yes', 'Pills', '2024-01-17', 'Nurse Anne', 'samplee', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pregnant`
--

CREATE TABLE `pregnant` (
  `patientID` int(11) NOT NULL,
  `barangay` varchar(255) NOT NULL,
  `motherFname` varchar(255) NOT NULL,
  `motherMname` varchar(255) NOT NULL,
  `motherLname` varchar(255) NOT NULL,
  `motherDob` date NOT NULL,
  `motherPhoneNo` varchar(100) NOT NULL,
  `motherBT` varchar(100) NOT NULL,
  `motherOccupation` varchar(255) NOT NULL,
  `fatherFname` varchar(255) NOT NULL,
  `fatherMname` varchar(255) NOT NULL,
  `fatherLname` varchar(255) NOT NULL,
  `fatherDob` date NOT NULL,
  `fatherPhoneNum` varchar(100) NOT NULL,
  `fatherBT` varchar(100) NOT NULL,
  `fatherOccupation` varchar(255) NOT NULL,
  `NumChild` int(11) NOT NULL,
  `ChildName` varchar(255) NOT NULL,
  `childBdate` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `worker_id` int(11) NOT NULL,
  `dateAdded` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pregnant`
--

INSERT INTO `pregnant` (`patientID`, `barangay`, `motherFname`, `motherMname`, `motherLname`, `motherDob`, `motherPhoneNo`, `motherBT`, `motherOccupation`, `fatherFname`, `fatherMname`, `fatherLname`, `fatherDob`, `fatherPhoneNum`, `fatherBT`, `fatherOccupation`, `NumChild`, `ChildName`, `childBdate`, `address`, `worker_id`, `dateAdded`) VALUES
(1, 'Asdum', 'Leah', 'Magana', 'Calvario', '1978-01-24', '2147483647', 'O+', 'housewife', 'Juan', 'Mortega', 'Calvario', '1978-12-09', '09108694631', 'O+', 'Vendor', 2, 'Ahleah Magana Calvario,Ryzell Magana Calvario', '2014-10-22,1999-08-01', 'Purok 5, Asdum San Vicente', 10, '2023-12-09'),
(2, 'Asdum', 'Rissa', 'Magana', 'Magana', '1989-07-09', '09108694620', 'A+', 'Housewife', 'Raymond', 'Mortega', 'Magana', '1982-07-09', '09108694451', 'B+', 'Vendor', 2, 'Chloe Magana,Coline Magana', '2023-12-18,2023-05-15', 'Purok 5, Calabagas San Vicente', 10, '2023-12-09'),
(3, 'Asdum', 'Lilibeth', 'Sayno', 'Magana', '1986-07-09', '09108694640', 'B+', 'Housewife', 'Reynaldo', '', 'Magana', '1982-10-20', '09108694451', 'A-', 'Vendor', 2, 'Nitoy Magana,Totoy Magana', '2023-12-19,2023-12-12', 'Purok 5, Asdum San Vicente', 10, '2023-12-09'),
(4, 'Asdum', 'Gina', 's', 'Magana', '1970-06-09', '09108694620', 'A-', 'Housewife', 'Ronnie', '', 'Magana', '1966-12-09', '09108694451', 'B-', 'Vendor', 1, 'Anton Magana', '2023-12-13', 'Purok 5, Asdum San Vicente', 10, '2023-12-09'),
(5, 'Asdum', 'Cecil', '', 'Ornido', '1987-07-16', '09108694640', 'A-', 'Housewife', 'Jan', '', 'Ornido', '1985-07-16', '09108694620', 'B-', 'Military', 1, 'Shin Shin', '2023-12-12', 'purok4 brgy cobangbang', 10, '2023-12-16'),
(6, 'Asdum', 'apple', 'magana', 'calvario', '1992-07-16', '09108694640', 'A-', 'Housewife', 'Kian', '', 'Calvario', '2023-11-29', '09108694620', 'AB-', 'Military', 1, 'sample name', '2023-12-12', 'purok4 brgy cobangbang', 10, '2023-12-16'),
(7, 'Cabanbanan', 'alexandra', 'Lorica', 'Monteagudo', '2023-11-27', '09108694648', 'O+', 'Housewife', 'MJ', '', 'Chuhuness', '2023-09-06', '09108694620', 'A-', 'Student', 1, 'sandrawr', '2023-11-28', 'purok4 brgy cabanbanan', 11, '2023-12-16'),
(198, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(199, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(200, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(201, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(202, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(203, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(204, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(205, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(206, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(207, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(208, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(209, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(210, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(211, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(212, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00'),
(213, 'Asdum', 'Arriana', '', 'Malubay', '2003-03-30', '+63893729564', '0', '', '', '', '', '0000-00-00', '', '', '', 0, '', '', 'Brgy. Cabanbanan, San Vicente, Camarines Norte', 12, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `prenatal_first_trimetser`
--

CREATE TABLE `prenatal_first_trimetser` (
  `firstTri_ID` int(11) NOT NULL,
  `firstTri_patientID` int(11) NOT NULL,
  `DateofCheckUp` date NOT NULL,
  `age` int(11) NOT NULL,
  `weight` float NOT NULL,
  `height` float NOT NULL,
  `BMI_stat` varchar(255) NOT NULL,
  `DateofLastMens` date NOT NULL,
  `DateofED` date NOT NULL,
  `NumPrevBirth` int(11) NOT NULL,
  `PrevDateofDelivery` varchar(255) NOT NULL,
  `PrevTypeofDelivery` varchar(255) NOT NULL,
  `PrevBirthOutcome` varchar(255) NOT NULL,
  `PrevNumChildDel` varchar(255) NOT NULL,
  `PrevPIH` varchar(255) NOT NULL,
  `PrevPE/E` varchar(255) NOT NULL,
  `PrevBleeding` varchar(255) NOT NULL,
  `AgeofGestation` int(11) NOT NULL,
  `BloodPressure` varchar(255) NOT NULL,
  `BirthPlan` varchar(255) NOT NULL,
  `RequestDental` varchar(100) NOT NULL,
  `LaboratoryReqs` varchar(100) NOT NULL,
  `AcidWash` varchar(255) NOT NULL,
  `TetanusVac` date NOT NULL,
  `treatmentsGiven` varchar(255) NOT NULL,
  `servicesGiven` varchar(255) NOT NULL,
  `DateofNextVisit` date NOT NULL,
  `ProviderName` varchar(255) NOT NULL,
  `referralHosp` varchar(255) NOT NULL,
  `atbp` varchar(255) NOT NULL,
  `NumVisit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prenatal_first_trimetser`
--

INSERT INTO `prenatal_first_trimetser` (`firstTri_ID`, `firstTri_patientID`, `DateofCheckUp`, `age`, `weight`, `height`, `BMI_stat`, `DateofLastMens`, `DateofED`, `NumPrevBirth`, `PrevDateofDelivery`, `PrevTypeofDelivery`, `PrevBirthOutcome`, `PrevNumChildDel`, `PrevPIH`, `PrevPE/E`, `PrevBleeding`, `AgeofGestation`, `BloodPressure`, `BirthPlan`, `RequestDental`, `LaboratoryReqs`, `AcidWash`, `TetanusVac`, `treatmentsGiven`, `servicesGiven`, `DateofNextVisit`, `ProviderName`, `referralHosp`, `atbp`, `NumVisit`) VALUES
(1, 1, '2023-12-09', 45, 58, 153, 'Normal', '2023-11-01', '2024-08-01', 1, '1999-08-01', 'Normal Delivery', 'Alive', 'Single', 'No', 'No', 'Yes', 6, '120/90', 'sample', 'Yes', 'Yes', 'sample', '2023-12-09', 'Syphilis, Anemia', 'alcohol, food', '0000-00-00', 'Nurse Anne', 'sample', 'sample', 1),
(2, 1, '2024-01-11', 25, 60, 153, 'Overweight', '0000-00-00', '0000-00-00', 0, '', '', '', '', '', '', '', 8, '120/90', 'sample', 'No', 'No', 'samplee', '2024-01-11', 'Syphilis', 'safeSex, birthplan', '0000-00-00', 'Nurse Anne', 'samplee', 'sample', 2),
(3, 2, '2023-12-09', 35, 55, 152, 'Normal', '2023-10-05', '2024-09-18', 2, '2020-02-12, 2010-02-11', 'Normal Delivery, Normal Delivery', 'Alive, Alive', 'Single, Single', 'No, No', 'No, Yes', 'Yes, Yes', 6, '110/80', 'sample', 'Yes', 'Yes', 'sample', '2023-12-09', 'Syphilis', 'alcohol, food', '0000-00-00', 'Nurse Anne', 'sample', 'sampleee', 1),
(4, 3, '2023-12-11', 43, 50, 148, 'Normal', '2023-11-26', '2024-08-14', 2, '2023-08-16, 2022-08-23', 'Normal Delivery, Normal Delivery', 'Alive, Alive', 'Single, Single', 'No, No', 'No, Yes', 'Yes, Yes', 10, '120/90', 'sample', 'Yes', 'Yes', 'sample', '2023-12-11', 'Syphilis', 'Pagpapayo tungkol sa tamang pagkain., Pagpapayo tungkol sa safe sex.', '2024-01-11', 'Nurse Anne', 'samplee', 'sample', 1),
(5, 4, '2023-12-16', 35, 45, 147, 'Underweight', '2023-11-26', '2024-01-05', 1, '2022-05-11', 'Cesarean Delivery', 'Alive', 'Single', 'No', 'No', 'No', 5, '120/90', 'sample', 'Yes', 'Yes', 'sample', '2023-12-16', 'Syphilis, Anemia', 'Pag-iwas sa alcohol, tobacco at ilegal na droga, Paggamit ng mga insecticide-treated na kulambo.', '2024-01-03', 'Nurse Anne', 'sample', 'samplee', 1),
(6, 6, '2023-12-16', 20, 40, 152, 'Underweight', '2023-09-06', '2024-05-14', 0, '', '', '', '', '', '', '', 6, '110/80', 'sample', 'Yes', 'Yes', 'sample', '2023-12-16', 'Syphilis, Anemia', 'Paggamit ng mga insecticide-treated na kulambo.', '2024-01-05', 'Nurse Anne', '', '', 1),
(7, 7, '2023-12-16', 20, 40, 148, 'Normal', '2023-11-09', '2024-05-30', 1, '2023-06-07', 'Normal Delivery', 'Alive', 'Single', 'Yes', 'No', 'No', 8, '120/90', 'sample', 'Yes', 'Yes', 'sample', '2023-12-26', 'Syphilis, Bacteriuria', 'Paggamit ng mga insecticide-treated na kulambo.', '2023-12-26', 'Nurse Anne', 'sample', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `prenatal_last_trimester`
--

CREATE TABLE `prenatal_last_trimester` (
  `lastTri_ID` int(11) NOT NULL,
  `lastTri_patientID` int(11) NOT NULL,
  `last_DateofCheckUp` date NOT NULL,
  `last_weight` float NOT NULL,
  `last_height` float NOT NULL,
  `last_BMIStat` varchar(255) NOT NULL,
  `last_ageofGest` int(11) NOT NULL,
  `last_BP` varchar(255) NOT NULL,
  `last_pagsusuri` varchar(255) NOT NULL,
  `last_payo` varchar(255) NOT NULL,
  `last_birthPlan` varchar(255) NOT NULL,
  `last_dental` varchar(100) NOT NULL,
  `last_laboratory` varchar(100) NOT NULL,
  `last_treatments` varchar(255) NOT NULL,
  `last_serbisyo` varchar(255) NOT NULL,
  `last_NextVisit` date NOT NULL,
  `last_ProviderName` varchar(255) NOT NULL,
  `last_Notes` varchar(255) NOT NULL,
  `last_NumVisit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prenatal_last_trimester`
--

INSERT INTO `prenatal_last_trimester` (`lastTri_ID`, `lastTri_patientID`, `last_DateofCheckUp`, `last_weight`, `last_height`, `last_BMIStat`, `last_ageofGest`, `last_BP`, `last_pagsusuri`, `last_payo`, `last_birthPlan`, `last_dental`, `last_laboratory`, `last_treatments`, `last_serbisyo`, `last_NextVisit`, `last_ProviderName`, `last_Notes`, `last_NumVisit`) VALUES
(1, 1, '2024-02-08', 55, 152, 'Normal', 18, '120/90', 'sample1', 'sample1', 'sample1', 'No', 'Yes', 'Bacteriuria', 'Pagapapayo sa Postpartum at postnatal care., Pagfollow-up ng Tetanus-Containing Vaccine.', '2024-03-14', 'Nurse Anne', 'samplee', 1),
(2, 7, '2024-02-14', 45, 149, 'Normal', 4, '130/90', 'sample', 'sample', 'sample', 'No', 'No', 'Antiretroviral (ARV)', 'Pagfollow-up ng Tetanus-Containing Vaccine.', '2024-03-08', 'Nurse Anne', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `prenatal_second_trimester`
--

CREATE TABLE `prenatal_second_trimester` (
  `secondTri_ID` int(11) NOT NULL,
  `secondTri_patientID` int(11) NOT NULL,
  `second_DateofCheckUp` date NOT NULL,
  `second_weight` float NOT NULL,
  `second_height` float NOT NULL,
  `second_BMIStat` varchar(255) NOT NULL,
  `second_ageofGest` int(11) NOT NULL,
  `second_BP` varchar(255) NOT NULL,
  `second_pagsusuri` varchar(255) NOT NULL,
  `second_payo` varchar(255) NOT NULL,
  `second_birthPlan` varchar(255) NOT NULL,
  `second_dental` varchar(100) NOT NULL,
  `second_laboratory` varchar(100) NOT NULL,
  `second_treatments` varchar(255) NOT NULL,
  `second_serbisyo` varchar(255) NOT NULL,
  `second_Nextvisit` date NOT NULL,
  `second_ProviderName` varchar(255) NOT NULL,
  `second_notes` varchar(255) NOT NULL,
  `second_NumVisit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prenatal_second_trimester`
--

INSERT INTO `prenatal_second_trimester` (`secondTri_ID`, `secondTri_patientID`, `second_DateofCheckUp`, `second_weight`, `second_height`, `second_BMIStat`, `second_ageofGest`, `second_BP`, `second_pagsusuri`, `second_payo`, `second_birthPlan`, `second_dental`, `second_laboratory`, `second_treatments`, `second_serbisyo`, `second_Nextvisit`, `second_ProviderName`, `second_notes`, `second_NumVisit`) VALUES
(1, 1, '2024-01-11', 55, 156, 'Normal', 9, '120/90', 'sample', 'sample', 'sample', 'No', 'Yes', 'Deworming', 'alcohol', '2024-02-07', 'Nurse Anne', 'sample', 1),
(2, 1, '2024-02-06', 59, 153, 'Overweight', 10, '120/90', 'sample', 'sample', 'sample', 'No', 'No', 'Anemia', 'Pagpapaalala ng nakaraang tinalakay.', '2024-03-12', 'Nurse Anne', 'sampleeeee', 2),
(3, 2, '2023-12-11', 50, 152, 'Normal', 8, '110/80', 'sample', 'sample', 'sample', 'No', 'Yes', 'Deworming', 'Pagpapaalala ng nakaraang tinalakay.', '2024-01-17', 'Nurse Anne', 'samplee', 1),
(4, 1, '2023-12-12', 56, 152, 'Normal', 9, '120/90', 'sample', 'sample', 'sample', 'Yes', 'Yes', 'Bacteriuria', 'Pagpapaalala ng nakaraang tinalakay.', '2024-01-31', 'Nurse Anne', 'sampleeeee', 3),
(5, 7, '2023-12-18', 40, 148, 'Normal', 5, '120/80', 'sample', 'sample', 'sample', 'No', 'No', 'Deworming', 'Pagpapaalala ng nakaraang tinalakay.', '2024-02-01', 'Nurse Anne', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `worker_list`
--

CREATE TABLE `worker_list` (
  `worker_id` int(5) NOT NULL,
  `worker_fname` varchar(30) NOT NULL,
  `worker_mname` varchar(30) NOT NULL,
  `worker_lname` varchar(30) NOT NULL,
  `worker_bdate` date NOT NULL,
  `worker_gender` varchar(10) NOT NULL,
  `worker_position` varchar(30) NOT NULL,
  `worker_username` varchar(20) NOT NULL,
  `worker_password` varchar(20) NOT NULL,
  `barangay` varchar(255) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `date_added` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `worker_list`
--

INSERT INTO `worker_list` (`worker_id`, `worker_fname`, `worker_mname`, `worker_lname`, `worker_bdate`, `worker_gender`, `worker_position`, `worker_username`, `worker_password`, `barangay`, `user_type`, `date_added`) VALUES
(9, 'Municipal', 'Health', 'Worker', '2018-07-04', 'Female', 'Nurse', '@samplemhw', 'samplemhw', '', 'mhw', '2023-12-04'),
(10, 'Barangay', 'Health', 'Worker', '2023-11-26', 'Female', 'BHW', '@samplebhw', 'samplebhw', 'Asdum', 'bhw', '2023-12-04'),
(11, 'apple', 'magana', 'calvario', '2023-12-12', 'Female', 'BHW', 'apple', 'apple', 'Cabanbanan', 'bhw', '2023-12-16'),
(12, 'Arriana', 'Vargas', 'Malubay', '2003-03-30', 'Female', 'Nurse', 'Arima', 'Arima123!', 'Asdum', 'bhw', '2024-05-19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dental_record`
--
ALTER TABLE `dental_record`
  ADD PRIMARY KEY (`dentalID`);

--
-- Indexes for table `lab_record`
--
ALTER TABLE `lab_record`
  ADD PRIMARY KEY (`lab_recordID`);

--
-- Indexes for table `postnatal_record`
--
ALTER TABLE `postnatal_record`
  ADD PRIMARY KEY (`postnatalID`);

--
-- Indexes for table `pregnant`
--
ALTER TABLE `pregnant`
  ADD PRIMARY KEY (`patientID`);

--
-- Indexes for table `prenatal_first_trimetser`
--
ALTER TABLE `prenatal_first_trimetser`
  ADD PRIMARY KEY (`firstTri_ID`);

--
-- Indexes for table `prenatal_last_trimester`
--
ALTER TABLE `prenatal_last_trimester`
  ADD PRIMARY KEY (`lastTri_ID`);

--
-- Indexes for table `prenatal_second_trimester`
--
ALTER TABLE `prenatal_second_trimester`
  ADD PRIMARY KEY (`secondTri_ID`);

--
-- Indexes for table `worker_list`
--
ALTER TABLE `worker_list`
  ADD PRIMARY KEY (`worker_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dental_record`
--
ALTER TABLE `dental_record`
  MODIFY `dentalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `lab_record`
--
ALTER TABLE `lab_record`
  MODIFY `lab_recordID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `postnatal_record`
--
ALTER TABLE `postnatal_record`
  MODIFY `postnatalID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pregnant`
--
ALTER TABLE `pregnant`
  MODIFY `patientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=214;

--
-- AUTO_INCREMENT for table `prenatal_first_trimetser`
--
ALTER TABLE `prenatal_first_trimetser`
  MODIFY `firstTri_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `prenatal_last_trimester`
--
ALTER TABLE `prenatal_last_trimester`
  MODIFY `lastTri_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `prenatal_second_trimester`
--
ALTER TABLE `prenatal_second_trimester`
  MODIFY `secondTri_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `worker_list`
--
ALTER TABLE `worker_list`
  MODIFY `worker_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Database: `citiserv`
--
CREATE DATABASE IF NOT EXISTS `citiserv` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `citiserv`;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_date`
--

CREATE TABLE `appointment_date` (
  `appointment_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_ticket`
--

CREATE TABLE `appointment_ticket` (
  `reference_num` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone_number` int(11) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `office_events`
--

CREATE TABLE `office_events` (
  `event_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `description` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `office_feedback`
--

CREATE TABLE `office_feedback` (
  `office_feed_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `office_rating` int(1) NOT NULL,
  `details` varchar(300) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(6) NOT NULL,
  `client_id` int(6) NOT NULL,
  `context` varchar(15) NOT NULL,
  `purpose` varchar(15) NOT NULL,
  `description` varchar(150) NOT NULL,
  `request_datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `position` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_feedback`
--

CREATE TABLE `system_feedback` (
  `system_feed_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `system_rating` int(5) NOT NULL,
  `details` varchar(300) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment_date`
--
ALTER TABLE `appointment_date`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `AppointDateConToService` (`service_id`),
  ADD KEY `AppointDateConToClient` (`client_id`);

--
-- Indexes for table `appointment_ticket`
--
ALTER TABLE `appointment_ticket`
  ADD PRIMARY KEY (`reference_num`),
  ADD KEY `AppointTixConnectToAppointDate` (`appointment_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `office_events`
--
ALTER TABLE `office_events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `office_feedback`
--
ALTER TABLE `office_feedback`
  ADD PRIMARY KEY (`office_feed_id`),
  ADD KEY `OfficeFeedConnectToClient` (`client_id`),
  ADD KEY `OfficeFeedConnectToService` (`service_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `ServiceConnectToClient` (`client_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `system_feedback`
--
ALTER TABLE `system_feedback`
  ADD PRIMARY KEY (`system_feed_id`),
  ADD KEY `SysFeedConnectToClient` (`client_id`),
  ADD KEY `SysFeedConnectToSeervice` (`service_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment_date`
--
ALTER TABLE `appointment_date`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointment_ticket`
--
ALTER TABLE `appointment_ticket`
  MODIFY `reference_num` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `office_events`
--
ALTER TABLE `office_events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `office_feedback`
--
ALTER TABLE `office_feedback`
  MODIFY `office_feed_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_feedback`
--
ALTER TABLE `system_feedback`
  MODIFY `system_feed_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment_date`
--
ALTER TABLE `appointment_date`
  ADD CONSTRAINT `AppointDateConToClient` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `AppointDateConToService` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`);

--
-- Constraints for table `appointment_ticket`
--
ALTER TABLE `appointment_ticket`
  ADD CONSTRAINT `AppointTixConnectToAppointDate` FOREIGN KEY (`appointment_id`) REFERENCES `appointment_date` (`appointment_id`);

--
-- Constraints for table `office_feedback`
--
ALTER TABLE `office_feedback`
  ADD CONSTRAINT `OfficeFeedConnectToClient` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `OfficeFeedConnectToService` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`);

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `ServiceConnectToClient` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`);

--
-- Constraints for table `system_feedback`
--
ALTER TABLE `system_feedback`
  ADD CONSTRAINT `SysFeedConnectToClient` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `SysFeedConnectToSeervice` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`);
--
-- Database: `citiserv-3`
--
CREATE DATABASE IF NOT EXISTS `citiserv-3` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `citiserv-3`;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_date`
--

CREATE TABLE `appointment_date` (
  `appointment_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `appointment_ticket`
--

CREATE TABLE `appointment_ticket` (
  `reference_num` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `client_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `address` varchar(500) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(250) NOT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0,
  `birthday` date DEFAULT NULL,
  `disabilities` tinyint(1) NOT NULL DEFAULT 0,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`client_id`, `name`, `address`, `phone_number`, `email`, `password`, `isVerified`, `birthday`, `disabilities`, `deleted_at`) VALUES
(3, 'test', 'Daet, Camarines Norte', '09915096710', 'test@gmail.com', '$2y$10$q2mpHREcdLCX9Zldq3L6UeHkgu8TXZv2bFmS3UJ8f9XmOFhJhu9g.', 0, NULL, 0, '2023-11-17 19:17:31'),
(4, 'test1', 'Basud', '09123456789', 't1@gmail.com', '$2y$10$j1qUOYjYSRIdsHVrUfewMuCOYsYwt30ezCy1.xlsuutK8.luJGkxy', 0, NULL, 0, NULL),
(5, 'test3', 'as', '12345678910', 'test@l.com', '$2y$10$8j.sFEOlBPFCq0Y2v6yp3.A0q1.dDlpN23Rkf9PaGwxDGDoJMOsYy', 0, NULL, 0, NULL),
(6, 'angelica', 'Basud', '09915096710', 'test@gmail.com', '$2y$10$.l1GlYZ1KAotZ7ILtNMSTejkZatQSJ9NooY6SUdWO0l5UV0dzlHbS', 0, NULL, 0, NULL),
(7, 'Christine Toral', 'Brgy. Magang, Daet, Camarines Norte', '09092045678', 'trlchrstn@gmail.com', '$2y$10$P/vF5WNjnbF2Svr3MkYVTOq3sCyaQ9i3w9AURFmiN4mc3TKojml5e', 0, NULL, 0, NULL),
(8, 'fred', 'adfadf', '09506939818', 'fred@gmail.com', '$2y$10$LwLQ5xL6S29gj4TMTWHknue4PiAjwrh4pwP5nrBPD2aegosTtzdVS', 0, NULL, 0, NULL),
(9, 'christina', 'Daet, Camarines Norte', '09212527119', 'wer@wa', '$2y$10$eSm5kQoZmhvDixrE44E9qOuar7rB8hJezZazUmnT6gGr6m4TnUG2C', 0, NULL, 0, NULL),
(10, 'dummy', 'Mercedes', '09301496000', 'dummy@gmail.com', '$2y$10$UvRUWkSGgg6bAs2KEqEy8OYKrAQBE3mzGbess9VJ7zYcQBsh9JGjK', 0, NULL, 0, NULL),
(11, 'dion', 'Magang', '09094581710', 'dion@abaiz', '$2y$10$6Db6CIV12fps4K/LZro3JuSptYPLG26Jl4O2m9KwqpmaIoZtQUauW', 0, NULL, 0, NULL),
(12, 'Bruno', 'Purok 5', '09999390507', 'qwe@gmail.com', '$2y$10$4XJGjPbPfbBNven27jUf4O5PHN43FcmxnJOhFYW2mXxz6/7Ps0edW', 0, '2023-11-18', 1, '2023-11-17 19:15:21'),
(13, 'trial', 'Purok 5, Daet, Camarines Norte', '09874123659', 'trial@gmail.com', '$2y$10$ZI8YTfk1t2rnPXLFYqDdtODnkUVIMeANqGzZ5NdUZTsK7BwGvua0K', 0, '2002-05-19', 0, NULL),
(14, 'paul aldwin lieag', 'san Vicente camarines norte', '09267440442', 'paulliwag17@GMAIL.COM', '$2y$10$WMWVYPFtDCy24R.APlR/me8rVXYz6hyoXvGhXV2e4r1NTlmN9.S9m', 0, '1990-02-07', 0, NULL),
(15, 'Christine Toral', 'Purok 5', '09099196750', 'toralchristine@gmail.com', '$2y$10$PxvyCD9pDpB2fO1Cq71LwOP0EXn/sVClW3UeHzf/B9jQ65wPan76y', 0, '2002-05-29', 0, NULL),
(17, 'Renze Meinard Mortiga', '386, Purok 3, Barangay Talobatib, Labo, Camarines Norte', '09778562131', 'renzemeinard@gmail.com', '$2y$10$XyJpfj37bCSIs1iaw1C97eRaGe4ZOfWAF5c6/tI8Rpi63IHzza5fC', 0, '2003-01-12', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_11_04_071423_modify_client_table', 2),
(6, '2023_11_11_095738_modify_client_table', 3),
(7, '2023_11_11_101226_phone_number', 4),
(8, '2023_11_17_175231_add_birthday_and_disabilities_to_clients_table', 5),
(9, '2023_11_18_025913_add_deleted_at_to_clients_table', 6),
(10, '2023_11_19_214134_add-reference_number', 7),
(11, '2023_11_21_144714_add_status_to_services_table', 8);

-- --------------------------------------------------------

--
-- Table structure for table `office_events`
--

CREATE TABLE `office_events` (
  `event_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `description` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `office_feedback`
--

CREATE TABLE `office_feedback` (
  `office_feed_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `office_rating` int(1) NOT NULL,
  `details` varchar(300) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(6) NOT NULL,
  `client_id` int(6) NOT NULL,
  `context` varchar(50) NOT NULL,
  `purpose` varchar(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `request_datetime` datetime NOT NULL,
  `reference_number` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `client_id`, `context`, `purpose`, `description`, `request_datetime`, `reference_number`, `status`) VALUES
(1, 13, 'Personal', 'Letter Submission', 'asdadasd', '2023-11-20 03:24:00', NULL, 'pending'),
(2, 13, 'Education Institution', 'Letter Submission', 'hiiiiii', '2023-11-20 06:08:00', 'CTSRV-20231119220819IC5E2S', 'pending'),
(3, 13, 'Personal', 'Request Approval', 'dfghj', '2023-11-20 06:37:00', 'CTSRV-20231119223703WACSBU', 'pending'),
(4, 13, 'Personal', 'Meeting with Mayor', 'hiiiiiii', '2023-11-23 06:38:00', 'CTSRV-20231119223900FJ5K7R', 'pending'),
(5, 13, 'Personal', 'Request Approval', '6565', '2023-11-20 06:54:00', 'CTSRV-20231119225450WHAVIF', 'pending'),
(6, 13, 'Personal', 'Request Approval', 'asdadasd', '2023-11-20 07:01:00', 'CTSRV-20231119230200IKZMST', 'pending'),
(7, 13, 'Personal', 'Letter Submission', '454', '2023-11-20 07:04:00', 'CTSRV-202311192304210OYKXY', 'pending'),
(8, 13, 'Personal', 'Request Approval', 'asdasd', '2023-11-20 07:05:00', 'CTSRV-20231119230512WJFCHQ', 'pending'),
(9, 13, 'Personal', 'Request Approval', 'qwqw', '2023-11-20 07:07:00', 'CTSRV-20231119230737EOMBF6', 'pending'),
(10, 13, 'Personal', 'Request Approval', 'sdasda', '2023-11-20 07:12:00', 'CTSRV-20231119231222TNNJBJ', 'pending'),
(11, 13, 'Personal', 'Request Approval', 'asdfadf', '2023-11-20 07:50:00', 'CTSRV-20231119235053HDMQD7', 'pending'),
(12, 13, 'Personal', 'Request Approval', 'dadasd', '2023-11-20 07:54:00', 'CTSRV-20231119235417WMXBJX', 'pending'),
(13, 13, 'Personal', 'Request Approval', 'kdadfadf', '2023-11-20 07:59:00', 'CTSRV-202311200000003RS4J1', 'pending'),
(14, 13, 'Personal', 'Request Approval', 'This is Personal', '2023-11-21 22:29:00', 'CTSRV-202311211429474I8IEZ', 'pending'),
(15, 13, 'Personal', 'Request Approval', 'Hi', '2023-11-21 23:14:00', 'CTSRV-20231121151449RZYZDI', 'pending'),
(16, 13, 'Personal', 'Request Approval', 'Meeting with the Mayor', '2023-11-22 00:57:00', 'CTSRV-CGB6PQ', 'pending'),
(17, 13, 'Personal', 'Request Approval', 'asdasd', '2023-11-22 01:03:00', 'CTSRV-B2DBFO', 'pending'),
(18, 13, 'Personal', 'Request Approval', 'asdsad', '2023-11-22 03:55:00', 'CTSRV-FXUOWN', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `position` varchar(25) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_feedback`
--

CREATE TABLE `system_feedback` (
  `system_feed_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `system_rating` int(5) NOT NULL,
  `details` varchar(300) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment_date`
--
ALTER TABLE `appointment_date`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `AppointDateConToService` (`service_id`),
  ADD KEY `AppointDateConToClient` (`client_id`);

--
-- Indexes for table `appointment_ticket`
--
ALTER TABLE `appointment_ticket`
  ADD PRIMARY KEY (`reference_num`),
  ADD KEY `AppointTixConnectToAppointDate` (`appointment_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `office_events`
--
ALTER TABLE `office_events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `office_feedback`
--
ALTER TABLE `office_feedback`
  ADD PRIMARY KEY (`office_feed_id`),
  ADD KEY `OfficeFeedConnectToClient` (`client_id`),
  ADD KEY `OfficeFeedConnectToService` (`service_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`),
  ADD UNIQUE KEY `service_reference_number_unique` (`reference_number`),
  ADD KEY `ServiceConnectToClient` (`client_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- Indexes for table `system_feedback`
--
ALTER TABLE `system_feedback`
  ADD PRIMARY KEY (`system_feed_id`),
  ADD KEY `SysFeedConnectToClient` (`client_id`),
  ADD KEY `SysFeedConnectToSeervice` (`service_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment_date`
--
ALTER TABLE `appointment_date`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `appointment_ticket`
--
ALTER TABLE `appointment_ticket`
  MODIFY `reference_num` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `office_events`
--
ALTER TABLE `office_events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `office_feedback`
--
ALTER TABLE `office_feedback`
  MODIFY `office_feed_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_feedback`
--
ALTER TABLE `system_feedback`
  MODIFY `system_feed_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment_date`
--
ALTER TABLE `appointment_date`
  ADD CONSTRAINT `AppointDateConToClient` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `AppointDateConToService` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`);

--
-- Constraints for table `appointment_ticket`
--
ALTER TABLE `appointment_ticket`
  ADD CONSTRAINT `AppointTixConnectToAppointDate` FOREIGN KEY (`appointment_id`) REFERENCES `appointment_date` (`appointment_id`);

--
-- Constraints for table `office_feedback`
--
ALTER TABLE `office_feedback`
  ADD CONSTRAINT `OfficeFeedConnectToClient` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `OfficeFeedConnectToService` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`);

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `ServiceConnectToClient` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`);

--
-- Constraints for table `system_feedback`
--
ALTER TABLE `system_feedback`
  ADD CONSTRAINT `SysFeedConnectToClient` FOREIGN KEY (`client_id`) REFERENCES `client` (`client_id`),
  ADD CONSTRAINT `SysFeedConnectToSeervice` FOREIGN KEY (`service_id`) REFERENCES `service` (`service_id`);
--
-- Database: `ims_db`
--
CREATE DATABASE IF NOT EXISTS `ims_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ims_db`;

-- --------------------------------------------------------

--
-- Table structure for table `api_account`
--

CREATE TABLE `api_account` (
  `id` bigint(20) NOT NULL,
  `accountEmail` varchar(100) NOT NULL,
  `accountPassword` varchar(100) NOT NULL,
  `accountRole` varchar(20) NOT NULL,
  `date_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_account_customuser`
--

CREATE TABLE `api_account_customuser` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `email` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_account_customuser_groups`
--

CREATE TABLE `api_account_customuser_groups` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_account_customuser_user_permissions`
--

CREATE TABLE `api_account_customuser_user_permissions` (
  `id` bigint(20) NOT NULL,
  `customuser_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_appointment`
--

CREATE TABLE `api_appointment` (
  `id` bigint(20) NOT NULL,
  `appointmentDate` date NOT NULL,
  `appointmentTime` time(6) NOT NULL,
  `appointmentServices_id` bigint(20) NOT NULL,
  `customerNotes` varchar(200) DEFAULT NULL,
  `appointmentStatus` varchar(40) NOT NULL,
  `customersName_id` bigint(20) NOT NULL,
  `appointmentQty` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_appointmentquery`
--

CREATE TABLE `api_appointmentquery` (
  `id` bigint(20) NOT NULL,
  `date_added` date NOT NULL,
  `message` varchar(500) NOT NULL,
  `userFeedback` varchar(100) NOT NULL,
  `appointmentName_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_customer`
--

CREATE TABLE `api_customer` (
  `id` bigint(20) NOT NULL,
  `customerFname` varchar(100) NOT NULL,
  `customerMname` varchar(100) NOT NULL,
  `customerLname` varchar(100) NOT NULL,
  `customerGender` varchar(20) NOT NULL,
  `customerPhone` varchar(50) NOT NULL,
  `customerEmail` varchar(254) NOT NULL,
  `customerBirthdate` date NOT NULL,
  `customerAddress` varchar(500) NOT NULL,
  `date_added` date NOT NULL,
  `accountToken` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_necessaryitems`
--

CREATE TABLE `api_necessaryitems` (
  `id` bigint(20) NOT NULL,
  `productQty` int(11) NOT NULL,
  `appointmentName_id` bigint(20) NOT NULL,
  `productName_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_services`
--

CREATE TABLE `api_services` (
  `id` bigint(20) NOT NULL,
  `clothPrice` int(11) NOT NULL,
  `date_added` date NOT NULL,
  `clothOffered` varchar(500) NOT NULL,
  `clothforSchool` varchar(500) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `clothNotes` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `api_supply`
--

CREATE TABLE `api_supply` (
  `id` bigint(20) NOT NULL,
  `productName` varchar(100) NOT NULL,
  `productQty` int(11) NOT NULL,
  `productUnit` varchar(100) NOT NULL,
  `productPrice` int(11) NOT NULL,
  `productDescp` varchar(500) DEFAULT NULL,
  `date_added` date NOT NULL,
  `productCategory` varchar(250) NOT NULL,
  `supplierName` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `authtoken_token`
--

CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add user', 6, 'add_customuser'),
(22, 'Can change user', 6, 'change_customuser'),
(23, 'Can delete user', 6, 'delete_customuser'),
(24, 'Can view user', 6, 'view_customuser'),
(25, 'Can add Token', 7, 'add_token'),
(26, 'Can change Token', 7, 'change_token'),
(27, 'Can delete Token', 7, 'delete_token'),
(28, 'Can view Token', 7, 'view_token'),
(29, 'Can add Token', 8, 'add_tokenproxy'),
(30, 'Can change Token', 8, 'change_tokenproxy'),
(31, 'Can delete Token', 8, 'delete_tokenproxy'),
(32, 'Can view Token', 8, 'view_tokenproxy'),
(33, 'Can add account', 9, 'add_account'),
(34, 'Can change account', 9, 'change_account'),
(35, 'Can delete account', 9, 'delete_account'),
(36, 'Can view account', 9, 'view_account'),
(37, 'Can add category', 10, 'add_category'),
(38, 'Can change category', 10, 'change_category'),
(39, 'Can delete category', 10, 'delete_category'),
(40, 'Can view category', 10, 'view_category'),
(41, 'Can add customer', 11, 'add_customer'),
(42, 'Can change customer', 11, 'change_customer'),
(43, 'Can delete customer', 11, 'delete_customer'),
(44, 'Can view customer', 11, 'view_customer'),
(45, 'Can add supplier', 12, 'add_supplier'),
(46, 'Can change supplier', 12, 'change_supplier'),
(47, 'Can delete supplier', 12, 'delete_supplier'),
(48, 'Can view supplier', 12, 'view_supplier'),
(49, 'Can add appointment', 13, 'add_appointment'),
(50, 'Can change appointment', 13, 'change_appointment'),
(51, 'Can delete appointment', 13, 'delete_appointment'),
(52, 'Can view appointment', 13, 'view_appointment'),
(53, 'Can add necessary items', 14, 'add_necessaryitems'),
(54, 'Can change necessary items', 14, 'change_necessaryitems'),
(55, 'Can delete necessary items', 14, 'delete_necessaryitems'),
(56, 'Can view necessary items', 14, 'view_necessaryitems'),
(57, 'Can add supply', 15, 'add_supply'),
(58, 'Can change supply', 15, 'change_supply'),
(59, 'Can delete supply', 15, 'delete_supply'),
(60, 'Can view supply', 15, 'view_supply'),
(61, 'Can add services', 16, 'add_services'),
(62, 'Can change services', 16, 'change_services'),
(63, 'Can delete services', 16, 'delete_services'),
(64, 'Can view services', 16, 'view_services'),
(65, 'Can add appointment query', 17, 'add_appointmentquery'),
(66, 'Can change appointment query', 17, 'change_appointmentquery'),
(67, 'Can delete appointment query', 17, 'delete_appointmentquery'),
(68, 'Can view appointment query', 17, 'view_appointmentquery'),
(69, 'Can add emma product list', 18, 'add_emmaproductlist'),
(70, 'Can change emma product list', 18, 'change_emmaproductlist'),
(71, 'Can delete emma product list', 18, 'delete_emmaproductlist'),
(72, 'Can view emma product list', 18, 'view_emmaproductlist'),
(73, 'Can add emma request supply', 19, 'add_emmarequestsupply'),
(74, 'Can change emma request supply', 19, 'change_emmarequestsupply'),
(75, 'Can delete emma request supply', 19, 'delete_emmarequestsupply'),
(76, 'Can view emma request supply', 19, 'view_emmarequestsupply'),
(77, 'Can add emma request status', 20, 'add_emmarequeststatus'),
(78, 'Can change emma request status', 20, 'change_emmarequeststatus'),
(79, 'Can delete emma request status', 20, 'delete_emmarequeststatus'),
(80, 'Can view emma request status', 20, 'view_emmarequeststatus'),
(81, 'Can add request queries', 21, 'add_requestqueries'),
(82, 'Can change request queries', 21, 'change_requestqueries'),
(83, 'Can delete request queries', 21, 'delete_requestqueries'),
(84, 'Can view request queries', 21, 'view_requestqueries');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(9, 'api', 'account'),
(13, 'api', 'appointment'),
(17, 'api', 'appointmentquery'),
(10, 'api', 'category'),
(11, 'api', 'customer'),
(18, 'api', 'emmaproductlist'),
(20, 'api', 'emmarequeststatus'),
(19, 'api', 'emmarequestsupply'),
(14, 'api', 'necessaryitems'),
(21, 'api', 'requestqueries'),
(16, 'api', 'services'),
(12, 'api', 'supplier'),
(15, 'api', 'supply'),
(6, 'api_account', 'customuser'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(7, 'authtoken', 'token'),
(8, 'authtoken', 'tokenproxy'),
(4, 'contenttypes', 'contenttype'),
(5, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-07-08 17:42:46.743702'),
(2, 'contenttypes', '0002_remove_content_type_name', '2024-07-08 17:42:46.816713'),
(3, 'auth', '0001_initial', '2024-07-08 17:42:47.178066'),
(4, 'auth', '0002_alter_permission_name_max_length', '2024-07-08 17:42:47.243265'),
(5, 'auth', '0003_alter_user_email_max_length', '2024-07-08 17:42:47.251695'),
(6, 'auth', '0004_alter_user_username_opts', '2024-07-08 17:42:47.261695'),
(7, 'auth', '0005_alter_user_last_login_null', '2024-07-08 17:42:47.268221'),
(8, 'auth', '0006_require_contenttypes_0002', '2024-07-08 17:42:47.271307'),
(9, 'auth', '0007_alter_validators_add_error_messages', '2024-07-08 17:42:47.278279'),
(10, 'auth', '0008_alter_user_username_max_length', '2024-07-08 17:42:47.284673'),
(11, 'auth', '0009_alter_user_last_name_max_length', '2024-07-08 17:42:47.298366'),
(12, 'auth', '0010_alter_group_name_max_length', '2024-07-08 17:42:47.309959'),
(13, 'auth', '0011_update_proxy_permissions', '2024-07-08 17:42:47.318026'),
(14, 'auth', '0012_alter_user_first_name_max_length', '2024-07-08 17:42:47.326307'),
(15, 'api_account', '0001_initial', '2024-07-08 17:42:47.612877'),
(16, 'admin', '0001_initial', '2024-07-08 17:42:47.744262'),
(17, 'admin', '0002_logentry_remove_auto_add', '2024-07-08 17:42:47.752435'),
(18, 'admin', '0003_logentry_add_action_flag_choices', '2024-07-08 17:42:47.768527'),
(19, 'api', '0001_initial', '2024-07-08 17:42:48.167287'),
(20, 'api', '0002_supplier_supplieraddress', '2024-07-08 17:42:48.189035'),
(21, 'api', '0003_rename_product_supply', '2024-07-08 17:42:48.658331'),
(22, 'api', '0004_services', '2024-07-08 17:42:48.723273'),
(23, 'api', '0005_alter_services_servicesname', '2024-07-08 17:42:49.379523'),
(24, 'api', '0006_alter_appointment_appointmentcloth', '2024-07-08 17:42:49.493765'),
(25, 'api', '0007_rename_appointmentcloth_appointment_appointmentservices', '2024-07-08 17:42:49.916888'),
(26, 'api', '0008_services_servicesschool', '2024-07-08 17:42:49.936872'),
(27, 'api', '0009_rename_servicesname_services_productname_and_more', '2024-07-08 17:42:49.970173'),
(28, 'api', '0010_rename_productname_services_servicesoffered_and_more', '2024-07-08 17:42:50.002259'),
(29, 'api', '0011_rename_servicesoffered_services_clothoffered_and_more', '2024-07-08 17:42:50.035733'),
(30, 'api', '0012_services_image', '2024-07-08 17:42:50.052065'),
(31, 'api', '0013_appointment_appointmentqty_services_clothnotes', '2024-07-08 17:42:50.087360'),
(32, 'api', '0014_alter_appointment_appointmentqty', '2024-07-08 17:42:50.142933'),
(33, 'api', '0015_appointmentquery', '2024-07-08 17:42:50.216647'),
(34, 'api', '0016_remove_services_clothsize', '2024-07-08 17:42:50.226200'),
(35, 'authtoken', '0001_initial', '2024-07-08 17:42:50.323338'),
(36, 'authtoken', '0002_auto_20160226_1747', '2024-07-08 17:42:50.356462'),
(37, 'authtoken', '0003_tokenproxy', '2024-07-08 17:42:50.365040'),
(38, 'authtoken', '0004_alter_tokenproxy_options', '2024-07-08 17:42:50.365040'),
(39, 'sessions', '0001_initial', '2024-07-08 17:42:50.407717'),
(40, 'api', '0017_emmaproductlist_emmarequestsupply', '2024-07-09 05:20:12.464312'),
(41, 'api', '0018_emmarequeststatus', '2024-07-09 08:12:05.031687'),
(42, 'api', '0019_requestqueries', '2024-07-09 10:19:38.485636'),
(43, 'api', '0020_alter_supply_productcategory_and_more', '2024-07-09 17:52:38.783005');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ims_brand`
--

CREATE TABLE `ims_brand` (
  `id` int(11) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `bname` varchar(250) NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ims_brand`
--

INSERT INTO `ims_brand` (`id`, `categoryid`, `bname`, `status`) VALUES
(15, 11, 'Kentucky', 'active'),
(16, 11, 'Blue Corner', 'active'),
(17, 12, 'CNNHS', 'active'),
(18, 12, 'Moreno Integrated School', 'active'),
(19, 12, 'Mabini Colleges', 'active'),
(20, 13, 'JHB International', 'active'),
(21, 15, 'Clover', 'active'),
(22, 16, 'Coats & Clark', 'active'),
(23, 14, 'Tex Corp', 'active'),
(24, 17, 'Red Heart', 'active'),
(25, 21, 'M&B', 'active'),
(26, 22, 'Blue Corner', 'active'),
(27, 22, 'M&B', 'active'),
(28, 22, 'Kentucky', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `ims_category`
--

CREATE TABLE `ims_category` (
  `categoryid` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ims_category`
--

INSERT INTO `ims_category` (`categoryid`, `name`, `status`) VALUES
(12, 'Patches', 'active'),
(13, 'Buttons', 'active'),
(14, 'Zipper', 'active'),
(15, 'Needle', 'active'),
(16, 'Thread', 'active'),
(17, 'Yarn', 'active'),
(18, 'Ribbon', 'active'),
(22, 'Fabric', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `ims_customer`
--

CREATE TABLE `ims_customer` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` text NOT NULL,
  `mobile` int(50) NOT NULL,
  `balance` double(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ims_customer`
--

INSERT INTO `ims_customer` (`id`, `name`, `address`, `mobile`, `balance`) VALUES
(1, 'Zai Totanes', 'Mercedes', 2147483647, 25000.00),
(2, 'Hyrum Bravo', 'Ecology\r\n', 2147483647, 35000.00);

-- --------------------------------------------------------

--
-- Table structure for table `ims_order`
--

CREATE TABLE `ims_order` (
  `order_id` int(11) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `total_shipped` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ims_product`
--

CREATE TABLE `ims_product` (
  `pid` int(11) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `brandid` int(11) NOT NULL,
  `pname` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` varchar(150) NOT NULL,
  `base_price` double(10,2) NOT NULL,
  `minimum_order` double(10,2) NOT NULL,
  `supplier` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ims_product`
--

INSERT INTO `ims_product` (`pid`, `categoryid`, `brandid`, `pname`, `description`, `quantity`, `unit`, `base_price`, `minimum_order`, `supplier`, `status`, `date`) VALUES
(10, 11, 16, 'White Fabric', 'Secret', 20, 'Meter', 50.00, 1.00, 5, 'active', '0000-00-00'),
(11, 12, 17, 'CNNHS Patches', 'For cn only', 79, 'Pcs', 35.00, 1.00, 4, 'active', '0000-00-00'),
(12, 13, 20, 'Black Buttons', '', 500, 'Dozens', 10.00, 1.00, 4, 'active', '0000-00-00'),
(13, 15, 21, 'Long Needle', '', 500, 'Packet', 20.00, 1.00, 4, 'active', '0000-00-00'),
(14, 16, 22, 'Assorted Thread', '', 500, 'Packet', 60.00, 1.00, 5, 'active', '0000-00-00'),
(15, 14, 23, 'Steel Zipper', '', 500, 'Pcs', 8.00, 1.00, 5, 'active', '0000-00-00'),
(17, 22, 27, 'Polyester Fabric', '', 500, 'Meter', 100.00, 1.00, 6, 'active', '0000-00-00'),
(18, 22, 27, 'Denim Fabric', '', 500, 'Meter', 120.00, 1.00, 6, 'active', '0000-00-00'),
(19, 22, 26, 'Cotton Fabric', '', 500, 'Meter', 100.00, 1.00, 4, 'active', '0000-00-00'),
(20, 22, 27, 'Nylon Fabric', '', 500, 'Meter', 100.00, 1.00, 6, 'active', '0000-00-00'),
(21, 22, 28, 'Silk Fabric', '', 500, 'Meter', 100.00, 1.00, 4, 'active', '0000-00-00'),
(23, 12, 19, 'Mabini Colleges Patches', '', 0, 'Pcs', 15.00, 1.00, 4, 'active', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `ims_purchase`
--

CREATE TABLE `ims_purchase` (
  `purchase_id` int(11) NOT NULL,
  `supplier_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `purchase_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ims_supplier`
--

CREATE TABLE `ims_supplier` (
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(200) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ims_supplier`
--

INSERT INTO `ims_supplier` (`supplier_id`, `supplier_name`, `mobile`, `address`, `status`) VALUES
(4, 'Bicol Garments', '09126992952', 'Daet, Camarines Norte', 'active'),
(5, 'R&B', '090878956442', 'Daet, Camarines Norte', 'active'),
(6, 'Whiny Clothing', '09384619998', 'Daet, Camarines Norte', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `ims_user`
--

CREATE TABLE `ims_user` (
  `userid` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `type` enum('admin','member') NOT NULL,
  `status` enum('Active','Inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `ims_user`
--

INSERT INTO `ims_user` (`userid`, `email`, `password`, `name`, `type`, `status`) VALUES
(1, 'admin@mail.com', '0192023a7bbd73250516f069df18b500', 'Administrator', 'admin', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `request_queries`
--

CREATE TABLE `request_queries` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `date_added` date NOT NULL,
  `user_level` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_queries`
--

INSERT INTO `request_queries` (`id`, `request_id`, `message`, `date_added`, `user_level`) VALUES
(14, 0, 'whyyy', '2024-07-11', 'Customer'),
(15, 1, 'thanks for accepting my order', '2024-07-11', 'Customer'),
(16, 0, 'ayaw ko lang po', '2024-07-11', 'Admin'),
(17, 4, 'Hey! Jan Christian King!', '2024-07-11', 'Customer'),
(18, 4, 'wassup homie', '2024-07-11', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `request_status`
--

CREATE TABLE `request_status` (
  `id` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `status` varchar(150) NOT NULL,
  `date_requested` date NOT NULL,
  `date_pickup` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_status`
--

INSERT INTO `request_status` (`id`, `request_id`, `status`, `date_requested`, `date_pickup`) VALUES
(9, 1, 'Accepted', '2024-07-11', '2024-07-18'),
(10, 2, 'Accepted', '2024-07-11', '2024-07-15'),
(11, 3, 'Accepted', '2024-07-11', '2024-07-25'),
(12, 4, 'Accepted', '2024-07-11', '2024-07-18');

-- --------------------------------------------------------

--
-- Table structure for table `request_supply`
--

CREATE TABLE `request_supply` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `total_price` int(11) NOT NULL,
  `request_id` int(11) NOT NULL,
  `date_requested` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request_supply`
--

INSERT INTO `request_supply` (`id`, `product_id`, `quantity`, `unit`, `total_price`, `request_id`, `date_requested`) VALUES
(29, 10, 50, 'Meter', 2500, 1, '2024-07-11'),
(30, 11, 20, 'Pcs', 700, 1, '2024-07-11'),
(31, 12, 30, 'Dozens', 300, 1, '2024-07-11'),
(32, 13, 30, 'Packet', 600, 1, '2024-07-11'),
(33, 14, 100, 'Packet', 6000, 1, '2024-07-11'),
(34, 15, 100, 'Pcs', 800, 1, '2024-07-11'),
(35, 10, 12, 'Meter', 600, 2, '2024-07-11'),
(36, 11, 1, 'Pcs', 35, 2, '2024-07-11'),
(37, 12, 2, 'Dozens', 20, 2, '2024-07-11'),
(38, 10, 3, 'Meter', 150, 3, '2024-07-11'),
(39, 14, 10, 'Packet', 600, 4, '2024-07-11'),
(40, 15, 20, 'Pcs', 160, 4, '2024-07-11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_account`
--
ALTER TABLE `api_account`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_account_customuser`
--
ALTER TABLE `api_account_customuser`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `api_account_customuser_groups`
--
ALTER TABLE `api_account_customuser_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_account_customuser_g_customuser_id_group_id_ebf086a3_uniq` (`customuser_id`,`group_id`),
  ADD KEY `api_account_customuser_groups_group_id_a65a3edc_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `api_account_customuser_user_permissions`
--
ALTER TABLE `api_account_customuser_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_account_customuser_u_customuser_id_permission_6301c6e2_uniq` (`customuser_id`,`permission_id`),
  ADD KEY `api_account_customus_permission_id_8f54e80c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `api_appointment`
--
ALTER TABLE `api_appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `api_appointment_customersName_id_e2d919e9_fk_api_customer_id` (`customersName_id`),
  ADD KEY `api_appointment_appointmentCloth_id_6ff2b937` (`appointmentServices_id`);

--
-- Indexes for table `api_appointmentquery`
--
ALTER TABLE `api_appointmentquery`
  ADD PRIMARY KEY (`id`),
  ADD KEY `api_appointmentquery_appointmentName_id_c90fa432_fk_api_appoi` (`appointmentName_id`);

--
-- Indexes for table `api_customer`
--
ALTER TABLE `api_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_necessaryitems`
--
ALTER TABLE `api_necessaryitems`
  ADD PRIMARY KEY (`id`),
  ADD KEY `api_necessaryitems_appointmentName_id_5d72ec37_fk_api_appoi` (`appointmentName_id`),
  ADD KEY `api_necessaryitems_productName_id_b6028bfe_fk_api_supply_id` (`productName_id`);

--
-- Indexes for table `api_services`
--
ALTER TABLE `api_services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `api_supply`
--
ALTER TABLE `api_supply`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD PRIMARY KEY (`key`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_api_account_customuser_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `ims_brand`
--
ALTER TABLE `ims_brand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ims_category`
--
ALTER TABLE `ims_category`
  ADD PRIMARY KEY (`categoryid`);

--
-- Indexes for table `ims_customer`
--
ALTER TABLE `ims_customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ims_order`
--
ALTER TABLE `ims_order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `ims_product`
--
ALTER TABLE `ims_product`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `ims_purchase`
--
ALTER TABLE `ims_purchase`
  ADD PRIMARY KEY (`purchase_id`);

--
-- Indexes for table `ims_supplier`
--
ALTER TABLE `ims_supplier`
  ADD PRIMARY KEY (`supplier_id`);

--
-- Indexes for table `ims_user`
--
ALTER TABLE `ims_user`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `request_queries`
--
ALTER TABLE `request_queries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request_status`
--
ALTER TABLE `request_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `request_supply`
--
ALTER TABLE `request_supply`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_account`
--
ALTER TABLE `api_account`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_account_customuser`
--
ALTER TABLE `api_account_customuser`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_account_customuser_groups`
--
ALTER TABLE `api_account_customuser_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_account_customuser_user_permissions`
--
ALTER TABLE `api_account_customuser_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_appointment`
--
ALTER TABLE `api_appointment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_appointmentquery`
--
ALTER TABLE `api_appointmentquery`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_customer`
--
ALTER TABLE `api_customer`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_necessaryitems`
--
ALTER TABLE `api_necessaryitems`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_services`
--
ALTER TABLE `api_services`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `api_supply`
--
ALTER TABLE `api_supply`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `ims_brand`
--
ALTER TABLE `ims_brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `ims_category`
--
ALTER TABLE `ims_category`
  MODIFY `categoryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `ims_customer`
--
ALTER TABLE `ims_customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ims_order`
--
ALTER TABLE `ims_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `ims_product`
--
ALTER TABLE `ims_product`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `ims_purchase`
--
ALTER TABLE `ims_purchase`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ims_supplier`
--
ALTER TABLE `ims_supplier`
  MODIFY `supplier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `ims_user`
--
ALTER TABLE `ims_user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `request_queries`
--
ALTER TABLE `request_queries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `request_status`
--
ALTER TABLE `request_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `request_supply`
--
ALTER TABLE `request_supply`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `api_account_customuser_groups`
--
ALTER TABLE `api_account_customuser_groups`
  ADD CONSTRAINT `api_account_customus_customuser_id_83b7b687_fk_api_accou` FOREIGN KEY (`customuser_id`) REFERENCES `api_account_customuser` (`id`),
  ADD CONSTRAINT `api_account_customuser_groups_group_id_a65a3edc_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `api_account_customuser_user_permissions`
--
ALTER TABLE `api_account_customuser_user_permissions`
  ADD CONSTRAINT `api_account_customus_customuser_id_7c927bc4_fk_api_accou` FOREIGN KEY (`customuser_id`) REFERENCES `api_account_customuser` (`id`),
  ADD CONSTRAINT `api_account_customus_permission_id_8f54e80c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);

--
-- Constraints for table `api_appointment`
--
ALTER TABLE `api_appointment`
  ADD CONSTRAINT `api_appointment_appointmentServices__420a05e4_fk_api_servi` FOREIGN KEY (`appointmentServices_id`) REFERENCES `api_services` (`id`),
  ADD CONSTRAINT `api_appointment_customersName_id_e2d919e9_fk_api_customer_id` FOREIGN KEY (`customersName_id`) REFERENCES `api_customer` (`id`);

--
-- Constraints for table `api_appointmentquery`
--
ALTER TABLE `api_appointmentquery`
  ADD CONSTRAINT `api_appointmentquery_appointmentName_id_c90fa432_fk_api_appoi` FOREIGN KEY (`appointmentName_id`) REFERENCES `api_appointment` (`id`);

--
-- Constraints for table `api_necessaryitems`
--
ALTER TABLE `api_necessaryitems`
  ADD CONSTRAINT `api_necessaryitems_appointmentName_id_5d72ec37_fk_api_appoi` FOREIGN KEY (`appointmentName_id`) REFERENCES `api_appointment` (`id`),
  ADD CONSTRAINT `api_necessaryitems_productName_id_b6028bfe_fk_api_supply_id` FOREIGN KEY (`productName_id`) REFERENCES `api_supply` (`id`);

--
-- Constraints for table `authtoken_token`
--
ALTER TABLE `authtoken_token`
  ADD CONSTRAINT `authtoken_token_user_id_35299eff_fk_api_account_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `api_account_customuser` (`id`);

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_api_account_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `api_account_customuser` (`id`);
--
-- Database: `manlimonsito e.s`
--
CREATE DATABASE IF NOT EXISTS `manlimonsito e.s` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `manlimonsito e.s`;

-- --------------------------------------------------------

--
-- Table structure for table `inspectorate`
--

CREATE TABLE `inspectorate` (
  `inspectorate_id` int(10) NOT NULL,
  `ins_fname` varchar(25) NOT NULL,
  `ins_MIt` varchar(2) NOT NULL,
  `ins_lname` varchar(15) NOT NULL,
  `ins_position` varchar(10) NOT NULL,
  `ins_contact` varchar(11) NOT NULL,
  `ins_address` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inspectorate`
--

INSERT INTO `inspectorate` (`inspectorate_id`, `ins_fname`, `ins_MIt`, `ins_lname`, `ins_position`, `ins_contact`, `ins_address`) VALUES
(1, 'Desiree', 'D', 'Postre', 'Teacher II', '09208044510', 'Pamorangon,Daet'),
(1234568, 'ferdinand', 'd', 'postre', 'das', '0912115132', 'daet');

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `inspectorate_id` int(10) NOT NULL,
  `stock_item_name` varchar(30) NOT NULL,
  `purchase_date` datetime(6) NOT NULL,
  `purchase_total_payment` int(6) NOT NULL,
  `purchase_ornum` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stocks`
--

CREATE TABLE `stocks` (
  `stock_item_name` varchar(20) NOT NULL,
  `stock_item_type` varchar(20) NOT NULL,
  `stock_price` varchar(10) NOT NULL,
  `stock_qty` varchar(3) NOT NULL,
  `stock_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stocks`
--

INSERT INTO `stocks` (`stock_item_name`, `stock_item_type`, `stock_price`, `stock_qty`, `stock_status`) VALUES
('Black Ink ', 'Office Essential', '200', '2', 'Full'),
('fan', 'appliance', 'asa', '1', 'ok');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_ID` int(10) NOT NULL,
  `stud_fname` varchar(25) NOT NULL,
  `stud_MIt` varchar(3) NOT NULL,
  `stud_lname` varchar(25) NOT NULL,
  `stud_yr_lvl` varchar(10) NOT NULL,
  `stud_guardian` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `supplier_ID` varchar(10) NOT NULL,
  `supp_name` varchar(30) NOT NULL,
  `supp_company` varchar(25) NOT NULL,
  `supp_contact` varchar(11) NOT NULL,
  `supp_location` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`supplier_ID`, `supp_name`, `supp_company`, `supp_contact`, `supp_location`) VALUES
('1', 'ivan ', 'sm', '09132456789', 'Daet'),
('2', 'Jose Santos', 'Will&Sons Trading', '09208044510', 'Daet');

-- --------------------------------------------------------

--
-- Table structure for table `supplies`
--

CREATE TABLE `supplies` (
  `supplier_ID` int(10) NOT NULL,
  `stock_item_name` varchar(30) NOT NULL,
  `supply_qty` int(3) NOT NULL,
  `supply_deliverydate` date NOT NULL,
  `supply_totalcost` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplies`
--

INSERT INTO `supplies` (`supplier_ID`, `stock_item_name`, `supply_qty`, `supply_deliverydate`, `supply_totalcost`) VALUES
(0, '', 0, '0000-00-00', ''),
(1, 'black ink', 2, '0000-00-00', '200'),
(3, 'Fan', 1, '0000-00-00', '1000');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `teacher_id` int(10) NOT NULL,
  `teacher_fname` varchar(30) NOT NULL,
  `teacher_MIt` varchar(3) NOT NULL,
  `teacher_lname` varchar(25) NOT NULL,
  `teacher_position` varchar(15) NOT NULL,
  `yr_lvl_handle` varchar(10) NOT NULL,
  `teacher_contact` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`teacher_id`, `teacher_fname`, `teacher_MIt`, `teacher_lname`, `teacher_position`, `yr_lvl_handle`, `teacher_contact`) VALUES
(1, 'Desiree', 'D', 'Postre', 'Teacher III', 'Grade 6', '09208044510');

-- --------------------------------------------------------

--
-- Table structure for table `used_by_students`
--

CREATE TABLE `used_by_students` (
  `stock_item_name` varchar(30) NOT NULL,
  `student_ID` int(10) NOT NULL,
  `item_used` varchar(30) NOT NULL,
  `item_used_qty` int(5) NOT NULL,
  `item_date_used` date NOT NULL,
  `item_purpose` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `used_by_teachers`
--

CREATE TABLE `used_by_teachers` (
  `stock_item_name` varchar(20) NOT NULL,
  `teacher_ID` int(10) NOT NULL,
  `item_used` varchar(25) NOT NULL,
  `item_used_qty` int(3) NOT NULL,
  `item_date_used` date NOT NULL,
  `item_purpose` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inspectorate`
--
ALTER TABLE `inspectorate`
  ADD PRIMARY KEY (`inspectorate_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`inspectorate_id`,`stock_item_name`);

--
-- Indexes for table `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`stock_item_name`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_ID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`supplier_ID`);

--
-- Indexes for table `supplies`
--
ALTER TABLE `supplies`
  ADD PRIMARY KEY (`supplier_ID`,`stock_item_name`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`teacher_id`);

--
-- Indexes for table `used_by_students`
--
ALTER TABLE `used_by_students`
  ADD PRIMARY KEY (`stock_item_name`,`student_ID`);
--
-- Database: `pgcn`
--
CREATE DATABASE IF NOT EXISTS `pgcn` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pgcn`;

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `account_id` int(11) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `user_level` varchar(250) NOT NULL,
  `date_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `email`, `password`, `user_level`, `date_added`) VALUES
(2, 'johnerwinalbos@gmail.com', '$2b$10$bMpolTsXtnWratg6jW11Buf9SDd97bLJCXV939I2.2Ysg00hKzmFW', 'Admin', '2025-02-27');

-- --------------------------------------------------------

--
-- Table structure for table `alay_pagdamay`
--

CREATE TABLE `alay_pagdamay` (
  `burial_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `deceased_fname` varchar(250) NOT NULL,
  `deceased_mname` varchar(250) NOT NULL,
  `deceased_lname` varchar(250) NOT NULL,
  `deceased_ext_name` varchar(250) NOT NULL,
  `deceased_purok` varchar(250) NOT NULL,
  `deceased_barangay` varchar(500) NOT NULL,
  `deceased_municipality` varchar(500) NOT NULL,
  `deceased_province` varchar(500) NOT NULL,
  `deceased_gender` varchar(250) NOT NULL,
  `deceased_deathdate` date NOT NULL,
  `death_certificate` mediumblob DEFAULT NULL,
  `contact_fname` varchar(250) NOT NULL,
  `contact_mname` varchar(250) NOT NULL,
  `contact_lname` varchar(250) NOT NULL,
  `contact_ext_name` varchar(250) NOT NULL,
  `contact_number` varchar(250) DEFAULT NULL,
  `contact_service_covered` varchar(250) NOT NULL,
  `contact_funeral_service` varchar(250) NOT NULL,
  `contact_person_encoded` varchar(250) NOT NULL,
  `check_barangay_indigency` varchar(250) DEFAULT NULL,
  `check_death_certificate` varchar(250) DEFAULT NULL,
  `check_funeral_contract` varchar(250) DEFAULT NULL,
  `check_valid_id` varchar(250) DEFAULT NULL,
  `burial_status` varchar(250) DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL,
  `savedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alay_pagdamay`
--

INSERT INTO `alay_pagdamay` (`burial_id`, `account_id`, `deceased_fname`, `deceased_mname`, `deceased_lname`, `deceased_ext_name`, `deceased_purok`, `deceased_barangay`, `deceased_municipality`, `deceased_province`, `deceased_gender`, `deceased_deathdate`, `death_certificate`, `contact_fname`, `contact_mname`, `contact_lname`, `contact_ext_name`, `contact_number`, `contact_service_covered`, `contact_funeral_service`, `contact_person_encoded`, `check_barangay_indigency`, `check_death_certificate`, `check_funeral_contract`, `check_valid_id`, `burial_status`, `remarks`, `savedAt`) VALUES
(6, 2, 'Juan', 'Dela', 'Cruz', 'Jr', '1', 'Angas', 'Basud', 'Camarines Norte', 'Male', '2025-03-23', 0xffd8ffe000104a46494600010100000100010000ffdb008400090607131312151213131515131517181a171815171717171a1a171717161a1d181a1d1d2820181b251d181a223121252a2d2e302e181f3338332c37282d2e2b010a0a0a0e0d0e1b10101b2d2520262d352f2d2d2f2d2d2d2f302d2d2d2d2d2d2f2d2d2d2d2b2d2d2f2d2d2d2d2d2f2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2d2dffc000110800e100e103011100021101031101ffc4001c0001000202030100000000000000000000000607040501020308ffc40048100002010202070603060307020309000001020300110421050612314151610713223271814291a1145292b1c1d16272821523a2b2c2e1f016733343f11724253444536383d2ffc4001b01010003010101010000000000000000000003040502010607ffc4003b110002010302030408050304020300000000010203041121311241510513617122328191a1b1d1f0061442c1e13362f1152352721682243443ffda000c03010002110311003f00bc680500a0140280500a0140704d0118d33aff0080c3dc19848e3e187c67d2e3c20fa9ae5cd22bcee69c3990ad27db0486e30f86551c1a562c7f0adadf88d70ea3e4559dfbfd288d63bb43d2327ff51b03946aabf5b6d7d6b9e2915e57755f3354ba57193b8513e22476dcbde48c4f1c85ea3a95234e2e73785d5b388caad4970c5b6cf53abb8d6ccc329fe6ff007354df6a5a2fff00444ff90ba7fa19d26d5fc5c403344ca0b2a83b4b72cc6c064d7ccd7b4fb4ad6a3c4279d33cf65bf23c958dc4165c71cb9733d711fda1871b4cd8a894657124817e60daa4a37b42b3c539a6fa67f615295cd159926919383d7dd231eec4b30e520571f3617fad5be27d4e2375557324ba37b5e9d6c2782390738c98cfc8ed027e55d2a8c9e37f2fd4899687ed27013d83486063c261b23f18bafcc8ae94d16a1774e5cf04ba290300ca4329cc106e0fa1e35d9653c9da80500a0140280500a0140280500a0140280500a0386600124d80de4eea0203acfda8e1e0ba6187da241f1036881fe6f8ff00a72eb51ba8b914eade423a475655fa735a3198dbf7b2314de634056303aa8de3ab5ea294ff00e4ca13ad56ae4ebaabab726364d84f0a2f9db9741cce47e5556e6e7bac462b327b2f9b6f925cd9dda5a3aef7c25bbfbe64ae7d1da1f0addd4acd2483cc6eed6f5d9161f206b2635af6bfa506dafed518af63965bf3d0d4951b1a0f867bf8e5bf6e34444758e2c39958e111fb8502ede22b7278139819819f1ad3b295650c5c3f49b785a671e38d33e466de42971e682f456ef964c0d1d8e78245963b075bdae2e3305777a1a9ebd0857a6e9cf67fe4af46b4a8cd4e3ba2deeccb4c4b88827695b6981617b019055232007deac874616b52b53a4b09d272df3aacacea6fda579d7a6a53df8b1f2201269ac4498b585e42d18c52d9485cb665cb3b5f2aed5950a766eac2389776f5d79c75294aeeb4ee55393d38ff007261db0e22d87823e6549f656ff6a92dd66e29ac7ab497bdbfe0b1da52c507e32f91dfb2ac127d8a57914302ec45f76e0a3eaa7e750de4294eb569d459e082c6ad6af2f97b0efb3938d08a5faa4ff646a353b4043a427c5bc8a3bbdaf06cdd42817cc588e1b3f3a9146b45d2b784f85a8b949b59db1be7c5b21a34e956954a928e5670b9110d67c1450e25e28599952c096209dade40b0190c87ceae5856a95a8aa9531aed858d393c6bbee675ed2a74aab84397cceba174fe270a6f04cc9cd6f743ea8723eb6bd5d4f1b1053ad387aacb3b567b578dec98c4ee9bff00b897319fe65cd93ea3d2a4553a9a34af62f49e858f87c4248a1d195d185c3290548e84646a42ea69aca3d287a280500a0140280500a0140280500a034facbacb87c147b733666fb08b9bb91f7472ea7215e39244556ac69acc8a5359f5c715a41fbb175889b2c31dcdf96d1dee7e9d2abd4a8927293c2465d4af52b4b863ee46a319a0313179e0900e606d0f9adc554a57f6d55e2335f2f98a9655e9fad07f3f9165f67df67c4e0648046ab2852ae06f6cad73ccb0e3cefcab2abdb375aa2965cfd6a6f3d35714b6fe19b5675213a092585b497ee74ecb8ac5f69c2390b2abb0b9cae08500fa1b7d473a96a54855a9c6de23569f0c5f47d3dbfb60e2ca3ddc654f9c6597e2ba91ad2dd9fe30e21f6541567660e4dbcc49cf8df3de2f53d2be54a92854849492c6145bdba3db1ed2a56ecea93aae516b0de739f9f3261ac8918d1cd87964884fb17c8850c54022d73f780ac9b674e2e12847d35535c2e2f45e561c969959ebf1356e22dd29426d7abe5aae88a6abea8f94271a81ad70e0e29565dabb936d917c8aa8ff004d65ddd0aeeb39d38a69c1c3578dde7a335ec2ea953a5c3378f4b3b1183a402e2ce2145d44e6400e448db2c01e46d5655bb95a2a127af0f0bf3c60a4eba573dec76e2cfc49fe9bd3ba3b48a20964789d06570548cb9d8afd4eeacba9f9ea5355214f5c28bc61c5a5b3c65491af2ab69710e194b1ae7a35f347b4fac382c268f6c3e1a5ef1c82173b9b9b9b9b7537e1c870a53a75aba709c1e6724e6dac2c4764b56dec753af42de9e2124f09a4b39797cd99dd9fe1becfa31a40b779016d91bced6ef9a85a5cd74ff3134f5d29af05fa9f96bf03bb2a5c1461a6f997d0a8f1f1c81d8caacaec4b1da054dc9b9dfd4d6d50953704a934d25858d4f9ead1a8a6dd44d36583aa1a918738618bc61f0b0da02e4002d71b88be59dc9b566d7ba9c9ca4a5c108be1d16652974499ad6b634d414aa2cb6b3be125e2767d5dd158a2530b2ec4bc2cc4dfd98e63d2deb559dddcd169be2c7f7a4bd9c51d9ffd96095da5a56ca8359f07fb3dfd847f0ba471ba2310630de1bdca35cc520dd7b7c27a8b1cab6adae5558f14746b469ee9f4666cd55b49f0bdbe0d16eea8eb961f1cb653b130176898f887553f1af51ee055d8c932f51b88d55a6fd0925744e280500a0140280500a0140280896bd6bb47815d85b498961e14e0a3ef3f21c86f3f51c4a782b5c5c2a4bc4a56418ac74ad210f3487cc780e43928e432aa75ee69515c556497999b1a75ae6598a6cdc6af77da36759711011135959880db373bee2f6ea388f6acdb8a946f638a324e5179e17b3c7269fda2f5b46ad9cf8aac7117a67a7b4b5b59b4d347875c4c512cd18176195edc483637b0cf8657ae6eabfe67bb715151969e9473897fc5ecd7860d46fba8ca5abc6ba3c69d57523da035e347349de14ee6522c4b0b5fd5b316ccef3ed5cd2a12b5a8aa4a9378db824da59d3d596bee6431bca15738961beab1f1442b5f34a40f8b13e12421ade22b7162375986fc8db2cac0559b2a2e509c6a43106f3152c670f74d72d7633efeb47bc8ce94bd24b0dafa9ad7d6ec695d93886b74080fcc2dfeb522ecbb45fa3d9978f767042fb4ae5ac717c17d0c7c1689c5628ed4714d313bdeccc0fab9cbe66af420a2b860b0bc0afc156abceacdfe13b31d22fbe38e3ffb922ffa76abbe0912c6caabdf4365176438bf8a6c38f43237e682bdeed9dab09f368e64ec8717f0cf01f5ef07fa4d3bb67aec27c9a30315d96e904dcb149fc927ff00d85af3824712b2a8b6d48f692d5bc5c1732e1e54037b6c92bf896e3eb5e61a209d0a91dd1e7a3b4ee221b77533803e1bed2fe1371552b595bd7d6704df5d9fbd6a494af2bd2d2327e5cbdc6e7486bac93e1da19228cbb641c0dc389d937f15b8dea8d2ec88d2ad1a9093c2e5cfdeb195e792e54ed4954a4e128acbe7fc12bd038a5c7e8b3830e166450b63d000bec6c3fc42abd7e2b7abc2d67d3e38f8e7d68ffd9672ba97ade51b8b7e14f0f8785f86367e4c89e8ad52c6ae2631dd152aea76ae2c0039dac6e72e156ebf685b55a52a6b56d63870f39e982850b0b885552c6127be74257db061d7630ca05e6b85b0cc9bad88eb9ec7d2b9b65dd5c624f554e3c7ff0065b67c719f616bb4929d28e16bc5a793fe7046f49ea662b071478b4637550cc54ecb211bca9e207cfa5aa5a3da1c525c7071527e83e4fa67a37baea8ab57b3e74a3c70965add74fa93decfbb405c55b0f8821711f0b6e597d3eebf4dc78721af19e746776d73de7a32dc9fd485c140280500a014028050112d7fd725c0c7b2966c4c83c0a7728ddb6dd390e27d0db89cb056b8b85497894d683d1d263f16159d999c9691ce6d6b8b9f5cc01c05c72aa1775dd18662b326f09756fef3e450b6a2ee6ae24fc5bf0269a775b1347b0c260e34bc63c4c770273f524efbdf88dfc326ced6a566eb71e35c7161714b1bb4de7863d12f69ab75790b6c52847d9c97d5f537fa2f4b8d23a3a569d0020153f91b1faf43e94bb94e319a9be29d37170973f49e30f1f6c9e84a35e9a78c296535e5cc846ac6bd7d9f08f048864b5bbb1c2c7813c2def9103855abab1a939ca34da519fad9e4d738f8bfe4cfb5ed08d3a789a6dc76f15d190d90ed31216db4d92adec2e72038f415a715c3149bcf899527c526d2df9137d5becc3153d9e73f678cf0617948fe4f87fa8dfa54aa0d96e9594e5acb42cad09a8581c35888448e3e39ace6fcc03e15f602a45048bf0b6a70d912602d5d139cd00a0140280501a1d35a9d82c4dcc902873f1a781fd495f37bdeb9714c867429cf7456fac7d944d1ddf0afdf2fdc6b2c83d0f95fe9e86a3706b628d5b16b583c9024925c3c996dc52a1b119ab03c883f91a82ad28558b84d657465484e74a598b69928c3f6938e55d9da46ea435fe8c07caa9ab0e1d21526974e2f96536bde5f5da9531ac62df9126d48d152625ffb471afb56178c1dc01e20733c3e7bed5466a82e3a49e29c75a8f39727ca3d5e79fb917eda352a355ea7acfd55c92ea6ff0019a6931d82c584036136d011b8d96c6dcc78b7d2bddd5a91c558a8f0b84a2ba272c61f893c542719703ce8d3f714d68cd0f3cc8f2c48488ac49191beff000f361bf2fdab56bde51a338c2a3c37f797d1674c9f3f46d6ad58b9c16df7a16df66baf3f6a030d886ffde147818ffe6a81fe7037f319f3abd0967465eb6b9e3f465b9605485c140280500a014069f5ab4fc782c3b4ef99dc8b7b1773b80fcc9e001af24f088ead554e3c4cf9df4963e5c4ccd2c84bc921b9b7c8051c001901d2abb7cd987294aa4b3cd92decc31230d8cb4ca63322d976c15b90770bfadfdab32eeac14a9d74f3184bd2c6b84d359d3a1a7d9c9c252a7358725a674d8916b2767893e20ceb880a8f62c3227200659e46c391fd2ab42bbb4a7c1094250fd2f8f1a6f86b56f1e05caf631b8a9c6db4f9ac7cba1a5d6ad3b0e1b0dfd9f8437e123037b6fb8bf16373f33bb2039b3b6a95e7ded4db3c5aac7135b69ca31e59d5bd48af2e69d0a7dcd2df18f25cfdac8a6ae6af4f8d97ba856f6f339c9107363f90de6b7d26f631e9519547845ddaa3a8f87c080c07793db39586639ec0f807d79935346291ad46de14f6dc9333daba2c1add27a720805e69523beeda6009f41bcfb57329463bb27a36d5abbc528b7e48d27fed0b017b77fefb125bfcb5cf7b0ea5eff44bec67bbf8afa9b8d1bac1879fff000a547e61585c7a8de3deba538cb6652ad6b5a83c548b5e68daa383baba2b9da80f2796d40687486b960e1255f109b4378525c8f5d906d5c3a905ccbf47b32eeaacc29bc78e9f3c18f86d7ec0b9b0c428fe60ca3e6c00af3bd875249f63dec165d37ecc3f9324185c7a380cacaca77152083e846faef2674a1283c49619aed65d56c36392d2a78c0f0c8b93afbf11d0dc57928a641568c2a2f48a435b75467c03da41b7131f04aa0ec9e87eeb743ec4d42e2d1915ade549ebb1adc26989a389e149088dc588fcf67eedf71b555ab6746a548d5947d25f7af5c1d53bbab4e9ba717a3fbd0b1fb22c3f7b86c4457b0663f947546e683b8ba9524f0dd34fdaa79357b365c3433fddfb1b6d2da5b0ba2b0e30f1287908b051bc9ebefbcf3e7b844a0e7c74a0d4a52fea4dad17f6a5cf1d39732c4eac2de1178c63d58addf8b2a4c7c9389bed0c8d0b97db5211a301af7056fc78d69daba5182a74e7c5c3e29b30abf7bc6ea4a3c397d305e7a81ad431d05dac278ec2551f4703eeb7d0822b4232ca34adeb77b1cf32515d160500a014070cc00b9c80de4d01f3f6be6b1363f1768ee6243b10a8e37362deac7e9b355aa4d24e4de88c6af51d6a9c31f246ff0047be1744a29957bdc538b9005ec3a662cbc37e763bf87cd46ad6ed1a8e508a705b716787cda5ac9f86c8d78c68d84171bf4def8dfd9d17cc91e231386d2980919502b283c002ac377a11707d0f5a92a354732e050a90c3f47d5945bc3fb7aa64e9c6e69e8f3179df74d2c94f3e949d9764cd295e45d88f95eb695ad08cb894239eb847cf3b9acd61cde3cd9b5d4dd55971f2ec2f8625b77925b251c87363c07bd5849b62850755f817ee85d110e162586140a8bf363c598f1279d4e9636366108c16226648d6af4ecaff005d75be447385c2e72fc6fbc25f80e6df97e55ead6c7a31dcdfecbecb8548f7f71eaf25d7f8f990a4d559a426494b333664b1249f5273aafc327a9f41fea34a9ae0a6924ba1d4eaa75b579c2cf7fd45f430f19a02782d24649b66190d88f715eeab527a77946b2e09adf93257a9baf2e584539bb706ddb5d0ff0017e7f9cf4eaf267cff006af634692ef68fabcd74f2f0f91643e95411195982a282589dc00ab1949659f391a529cd422b2dec533addaeb362d8a2131e1f70519171cdcffa777ad549d472f23eebb37b1e95aa539eb3ebd3cbea452a3364501b0d0fa666c336d44e473539a9f51faefaf63271d8a9776546ea3c3517b79af696fea96b82cea2f91dcc0f03fa8eb56a15388f85bfece9dad4e17b727d512dc561a39e368e450f1b8b32b6608ff9c6a5dccc9453586515afda94f817db4bbe19cf858e6509f85ff43c7d6a094784c8b9b674de56c69f57b5866c1b3344726041537b5ed6072e22a9dcda46be1e5a6b9ad1e39af69e5b5dce8671aa7c9ec4cfb2dc2ae2269b17883b6ebb89e195cdb97002db80238d51b8a746128506b14e31726973c6347d7abea69587154e2ad2d64de1781b6c6ebe606495b0d2443bb2760bec8d8df6ccdf31d48b7e75054a152a41558d18c56eb85e26bdab46ff00b7d858fced1e374a526f93cfabf7e24671d13e88c7478886ed03f0e686db684fd413c471b1abfd9d7aeb47127992e7d53d9fd572650b9a1f94aaa70f55fc3aafa175e0716934692c67691d4329e608bd6ca792ea69aca3de87a28050101ed77587b8c30c321b4988b836de231e6fc5e5f42dcaa3a8f4c14ef2af0c3856ec83f6598181f13de4aea0a79109cc92336b7d3dcd63768d48f1429d4d29b7e93c69a6d1f0cbdfc0f3b2e9a6e53fd4b65f364875eb5024959b1303ed92335272200b0d93f0fe5e95cd1e2b28631c74b7528eeb2f9a5bf9a2c5dda7e625c71789747fb74350ec74768e6898db1188bf86fe5b800fe1007b915461277f7adc57a114b2faa4f2bdef5f2474ff00f856987eb3cfc74f82f8910d5fd0d262e748221e26399e0aa3ccc7a0fd871afa54b3a1874a9ba92e147d15a034345848160885957793bd98ef66e64fec370a9d2c1b94e9a847851b1af4ecd2eb4692fb3e1e4946f55f083c598eca8fc445733970c5b2cd9dbf7f5e34fabd7cb77f0231a95aba0277d2789dced1277927324f526ab52a7cd9b3da57cf8bbb8689684874846154e552c960cea3272656bac9a5954900d559bcbc23e9ecad9c964d268bd6678dfc5e28cef079516517abf67c671f47466cf583422b20c5e1b779881f3b8ea2bd6b4ca2ada5db52742bf91df4b6976c46123404aa101a63bb306c1473cc13f86bd9d46e2922b5958ab6ba949eaf68f93e7eed3de42db7e5bab93e8d671a9c50f4500a0365abf8e314a08393647f4fad7517866776a5baaf6efaad57eff02f1d53d25dec7627315722f28fcfeb43859b9c7e0d268da2954346e2cca788fd0f5ae9ac904a2a4b0cf9eb5d3569f0388319bb46d7689fef2f23fc4371f63c6abb586625c5174a58e467f671a6c418831b9b4730d9bf26cc0f9dc8f5b56576a51728778b9269f8c64b0fddbaf22ef65dc2854707cf6f35b7bf6323496a0ce712eb1dbba219d5cee00dcecdb7efe3badf2a82976ac69d14a69b925ae39a5fab3d31f1d096af65ce559f0e917d7af438d37a7219747261dc918980a82181bdd6c8d63bbef71be74b6b7ab0ba538af41f134d3e52c34b1e0f5f69edc5c539daf049fa6b1a3eab47f0245d8c6b0f9f02e775de1bf2f8d47bf8bddab7e9be44163574e07ec2d5a94d014009a03e70d75d35f6bc64b30374bec47fc8992dbd736fea355dbcbc98571538ea3668d4db31bc578f0f4214dad5132d56ed0b118621652658fae6e3dcf9bdf3eb59f2b39527c76af85f38fe97ece5e68d3a1da2d2e1acb8975e6bebed343acda69b178879989b5ec80f051bbdcef3eb535a50ee69e24f327ac9f56f7fa2f02b5ddc77f532b6d92f02e4ecc3563ec986ef5d6d3ce0335f7aaef54e9ccf53d0568423845fb5a3ddc32f764cebb2d0a021fda27ff2c01dddec7fe6a86bfa86af63ff00f67ff57f237ba1940852dc85770d8a972df7af26ab5b25d9898f4a8ea3c22e58478aa245198f98bbb13ceaaa3ef28c14609231abd2525ba8da6365fecee7c0fe5bf03cbdeba8bc3c18fda96bc51ef63ba3135ba45493ecd1e488496b716637fa035cbd193767c652877d3ddfc91a0963d936af13c9a119712c9d2bd3a140706bd47927a1db0c7c43d47e746432d612f22deecfa63b4455b81f9e5d22c5a90a46835db57571d8668b2122f8a263c1c0cbd8ee3ebd2b99472886bd2552183e759632ac55810ca486077820d883d41a80c369a7864ff41f68cd060fbb6da92604a8beed9e04b7bdb893b3d6f597f95b8a75250a2d469cb5eb87cd4578efd1723629f68535453a99725a79f4cbfb641f4a63da795a570a19b785161bad576de846de9aa716f0ba9995eb4ab54736b7e876d11a45b0f3c73a79a360c3adb78f422e3dea7f138a737092923e99c0e29658d254374915594f46171f9d584f3a9be9a6b28f7af4f48e6bfe3da2c14823b9966b43181912d2f872e442ed1bf4ae64f422aedf034b77a10ad59d49812dde7772becb6df7b92ab78940456c987958310d7b6e506a3f421eb344746ce315aacb37d89d58c3bded2e15ec2db06383657c40e561b5c0aef06c4e75d39431ab4587493d1c7e0575ad7aac220d2442c17ce9b5b42d61768cef20715cec3c57d93972d26b31d8cebab4515c50f71e7d9be82fb5e35030bc517f7925f71d923654fab5b2e40d79159657b4a5c73d7647d07539b428050118d7dc2193072db7a0120b7ff8d839fa0351d55983343b2aaaa7750cecf4f7e877d4dd2025c3ae79815cd2966277da541d3acce35b20da85874a555947b613e1a88a1f1b1ecbb0eb5516c7dfd2966099e15e921d91c8208c88cc50f1a4d6199025324bb4d996624fe75e3d88dc553a7c2b9238d207c67a5791d851f50c6ae894501d2435d222a8cc8d1f1ddd475bfcb3a6ec82e27ddd094bc3e65b5d9dc26e5aad40f81bb7ae0b16a4290a0294ed8740f73895c4a0b2623cd6dc245dff008858fa86a866b0f2655ed2c4b8973341aadabc27bcb312b025ee79dbfd37b036cee72e914e6a0b8a5b13f66f673b97c52dbe7e1e185ab64af01a430e16d1e1d161526f23f8435c6c9f29048b03bcb71ceb98aaf3c7a29279c65f4dfa63de6b46bda427ddd08f13dbd18e5786ad36df8a4b2664dab784c7425e1d9ef05d894f390401cae6dbec41be62e0daa450aa92738e33cf74fdab6f26717142deb4e54e6b864b4d1630d755a27d32b6241d97cceb877c249e7c3b784e7e28a5fef23617e06ed6f4b70a969bd0a94612a79a53de2f04cea426215ae3880f8b860bf921790d8d8832ba61d483c0ecb4a2ff00c42b9e6479cd4c7446b75ab146160a915c2611641ff89e372ec3bb50b1b6677df872ac6ed2ecfa3735632a95941e31878eaf5d648d1b6a9284748e7521ba1a658a58a4489b6f1bb67137ef088184f26ced01193b9829dd9a1bdb3a96fbb3e956b7a74e559454168f4f4b45b7a4ba679ee770ab2529351c93cc1b193049234654992489d54125e312b2f150c519549b5864dd33b5614214682a70929259d573d7cdf96e54af2729b6d60ebd8f687ee70f2ca73692565079ac44a0ff0016dd58a6b050b5a7c09f9fc89fd485a140280f1c447714056ba39db47631b0ed7ee5fc5113bb649ddeabb8fb1e354ffa53c723ea278bfb65557acb4979f5f6ee4e314c248cdb3045587aa3129a74e652bae3a3cc72936caa9358960fb8ecdaea74f0476bd3485019181f38af25b11d5f519d3147c6deb45b1ed3f551e55e9d826878de0f2199aef6205e948de685c193636cdb21e9cebd82cea6376bdd2fe92e5bf99766a868eeea21ceadc51f1d567c522435e910a0235da2e89fb4e026502ef18ef139ed47739752bb43deb99aca20b8871d368acf4b029a3f070a86549d941bdc5ee9192572dc4bb7ef54da52ab08cb6dfe4bf72c559f73d9c94319924b4feee26d7b7091bf934440659702f78f68c2ea596eb22445449dcc837657568f814bee26d77b42aaee1567eaadfc13ebe1b6bf42cf65cff2734e0b5c35ed6bea67617421827efd59036d06dbdb01a51b3e3896251b202a82458923673b824d436572aa4729e54bc73ecd34d0bb7738dc524b0f31e58db5f59c9eadbd9e893f81b1867ee74aaa1dd3acc82fb59ec7773ae6722176e516190b9e35d2d2464dc4a2a74df371d76e4fef7267529e14d69fd3a89a71da52442bb10b116ba8011f6b31b84999e80d45c58999eeb28dcebb6c4d7494264d92be75451dddd4bec9bb2f9490580362013bae2e0d62f6d76754af8ab4f569631f4376d6bc61e8c88ee8b5777d81762a25cbbd0fb37c44be65b0ee465b89fcaa0ed0b5ab5adada9c23ae3dda2dc969d48c2739366eb4f63530983db92ecaa1bbb2ac02b4d70545afb4cbbc5ec4595c9b0b5f6ace87e56de34dbce3f77933aeabacba8c90ea8e0cc382c3c67cc224dafe661b4dfe226ad456111d3588236f5d1d8a014008a0341ad5a0171516c9f0bae71b8deadcfa83b88e55c4e0a6b0cb965792b5a9c6b55cd755f7b111d07a66485ce1b10365d7e44702a78a9e755a32717c3236ee2da9d782af4754fef0fc4e9ae1815950b0cf2af2aacea893b3ab3a72c32ae9a32a483c2a34f27d5c64a4b28e95e9e9ed83f3ad792d8e2afaace3143c6deb48ec29faa8f2af4ece8e785748866f3a233b46e076b33e5fcfa57a971328dede2b68f0c7d67f0fbe4599a99abc59848c3d2acc227c5dcd7cbc16544814002a4281de80501c117c8d0144634b377d8092423ecaefdc97392ac66c856c2f6d9dfc6c4117b5ab3eacdc2a454bd5d9783f1f07f329c3d3a72a3cd7edb3fdbc98c76b2c914b1ca0cb1cacd7c445259f0ac76760c9158dc1604dcaf5b1cf3b309a95b3b7ab1cac633cf87c7abff3e5d4ef9c1af470fefde6df44e9d0276c40418890aec89a40f1a2aeeb4687cab6bdf7ef398bd9aac3bbb5a6ba2585d7c978bfbc1ad3ed3efade3429e7acb4c26fabe6fc39258dcd11d67924d258799a56748e650a4eed96601c81c01cfdad53529d49462ea6e7cfd4ac9d75c2f45f6cbfaad9a87ccdacd36de3312fce797e5b6d6fa5aabbdcc1acf3525e665687d67961014a89140b2dc95751c95c67b3fc2c08c8580b0af549a27a379282c3d51ba9b5fae8ca213b4c41dadb504585ad7540585b9e7d6baef3c09df682e48d1c189931b8a82392d67951765459006650d61cedbc9b936df95719727a955d5956a8948fa46ac1b4280500a01407045011dd68d5b4c4a7dd917c8e37a9fd54f11fae751d4a6a6b52ed95eced6795aa7baebfcf895fb62e5818e1f102cc371f8587353c4554798e923e9610a75e3ded17a7c5783235a7f0a2fb6b5c6ccd6b4a8f1c2cd1d745f3d206b303d6bc7b1ccd662ce712f76268b63ca6b1148f1635d247b2960ccd1da3cb9b9ddf53e9d2ba4b2655e5f4682e18eb2f97df42c6d55d582e4330b01b8558840f90b9b9726f52ccc2615635000a94cf6f27bd0f0500a0140503da941dde93948cb6bbb7046563b0a2e3add6f504d2cb4cc7bbcc2b651a74d60986fd87e659733b80bd88bdad5515ac62b10728ae89e874afaa7ea4998d8dd2b2cb7b9d953f0a0d95cf9f13ee4d770b7845e777d5eafefc88eaddd4a8b1b2e88c2b9198de3754ccacb73e87ff00a9854f9377bc3e7ec5c9b523b7de663f324d40624de64d9e343914048fb3a8c3692c283f7c9fc28cc3ea2bd8fac8b16bfd547d13560db140280500a0140704501a4d63d5f8b15194719ef561e653cd4ffcbd713829ac32d5a5dd4b6a9c74df9ae4fcca6f4fe026c23f7530ba9f238f2b0fd0f31ffad519d371783edecae295dc38e968f9ae6befa91c6df957a6b2d8e280135ee0f1bc19fa37471620b0f41cff00dabb51c98b7fda0a9e6107af37d3f92cbd54d562d6771ed56231c1f237172dbd0b130d87541602a428b793da80500a0140280a3fb665ff00e20bd604ff003482a19fac64df7f5179103ae0a4280501bdff00a81b99af7259fcc334f894d9765e4c47c8915e15e4b0da3ca87828091f67726ce92c29fe323f1232feb5ec77458b5feaa3e89ab06d8a0140280500a01400d01a8d3da122c4c6d1c8b753f307810781ae651525864f6d7352dea2a94de1afbd4a2b59f57e4c1cbddbe6a6e51f830fd08e22a9ca0e2f0cfd07b3efe9de53e28e8d6eba7f1d0d39af0bccd8e8cd1e588622f7f28e7d4f4aee31c989da3da1c19a707af37d3c0b4354b55f73b8ab318e0f90af5f3a227f0c414580aeca67a500a0140280500a028ded91efa42df7618c7d5cfeb50cfd6322fbfa9ec20b5c14c500a036bfd8af5ee09bb96796b0c5b38ac42fdd9e51f2918578735962a3f335f4231406c357f15dd62a096f6092c6c7d038bfd2f5eadc9294b8669f89f4e55837c500a0140280500a01400d01a0d6dd1104f0324eca8bbc3b10bb0c37302721fb5ebc9438d60b5677752d6aaa94fddd57428ec168b06574db8df60d86c3ab07eab639af1bf5aaee84e3eb2c1f5d75daf4dd25dd3d64bdde7e3fe4b2353b56ee7bc7152c627ca5c57ce88b1618828b0a90a469b59b5b30b815bcf278c8f0c6be291bd1780ea6c3ad4b4a8cea3f451ea4d955693ed8718cf78228628c1c8383231fe620803d00f735a31b0825e936d922822dad52d30d8bc2438964eeda45b95de32245c1fba6d71d0d66d58284dc53d88dac3c1b7a8cf0500a01407cf5da562bbcd25883c159507f422a9fadea096ecc5bb966ab2315c958500347b045f9ff004b74153e0dceecaa7b49c2f77a4b1038332b8feb5563f5bd452dd999771c556466b92b0a004501f4beaae91fb460e09af72f1aed7f301b2dfe206ac45e564dfa52e2826626b36b9e0f0394f28ef2d711a78a43ea0794756b0a9e95bd4a9eaa26516cadb4c76c93b1230d04718e0d293235bf95480a7ddaaf42c22bd67ee3b505cc8ce2bb44d26fbf16cbd112351f45bfd6a756b457e9f99d70a31d35e74903718c9bdf64fd0ad75f96a5ff00143857436781ed4b4947e696394729635fcd364d472b3a4f963dbfe4f381127c176d397f7b83cf9c72e47d9972f99a825d9fd25f039eecf59fb694b78306e4ff001caaa3e8a6bc5d9ef9c87764734b76b38f96e23eea05fe05db7fc4f71f25153c2ca9adf53d5044331fa4259db6e695e56e72316b7a5f77b5598c231588ac1dad0dd6a0e8c93138f81501b238773c1514dcdfd7cbef55eedc634de79872c23e85c5e2e0c2c46496448a31bd98803d0733d06759118393c45106acaaf5bbb5b66bc5805d85dc6671e23ff6d0f97d5b3e837d68d1b14b5a9ee3b50ea55d889d9d9a49199dd8dd99892c4f324e66b41249611213aecffb3b9316cb36214c786198072697a0e4bd7e554ae2ed43d186ff0023894b1b17bc112a2845015540000dc00c8015924477a0140280f3c4cea88cec6ca8a598f20a2e7e82878de164f9771b8932c8f2b79a47673eaec58fe7558f9f9cb8a4d9e34391406c757309dee2f0f1fdf96307d3685fe97af56e49463c5512f13e9bab06f94df6db80d9c4433f0923287d636bfe4e3e550d4dccbbf8fa4a456f5c140500a0247a375f71185c136121b2b176225de51580baa0dd7dab9dae17e798d6b2b3cae2a9b725f5372c69c953f4bd87b6af68cee5ccf3bc6d89d869951cb4ce06cda391b643067791e30031040b917245add59f12e18edb74f67b8bad98f8ed04e201878423776ea6463e69243b28446d6b145ef736242d85c5cab93ec6aa72e297f85f6bef409eb923fa47464b0b88e45b3b2860067936ef7b58dba8bd8dc0b119c64b28f53c99d8cd5a92357632c07bb525c2bb1219582b2793cc0b26fb0f1ae77617e235949a587a8c9d740931acb88081d8010c2a503933cbe52a0820b22ab36ede507c54a9e9351f6bf25f53d367a57404b2bdd1159c2c7b7206554251184adb206776563b438477b1db52638558c56afd9f2fbf1f0394d18116abcc42b3bc512952cc64665d800a8f1f87224b0dd7b5981b116aedd78e70b2cf728d2c7196ddfb7e7baa56f1b9e99d84c1c37bcf3845fbb1299643d05ad18f76ae25397e95efd3f93c24f86d7e5c24461d1d865841f34b31ef2563cc81e107a663a540ed78e5c55659f2d8f3873b919c5e967c43f798b79676e17902d87f08d9217d0002a750e1588617b0f7c8df6ae681c163dfb88a59f0f882a4a89424b1b585cd99429197303dea1a956ad25c52c35ee678db4583a9fd95c30112e2889e506e1403dd2f23639b1f5f9552ad7929e91d11c39b658c05b21baa99c1cd00a01402808576b5a63b8c0b460f8f107bb1fcbbdcfa5bc3fd62b8a8f42addd4e1a78ea5115098c28050136ec8747f79a415ed9428efd2e477607f889fe9aea0bd22e59433533d0bdaa735c8576b7a2fbec0338176818483d3caded66bff004d71516855bb87153f2288a84c61407495ec2af595bf7b3ccb645db2b7ef67c52d918c456f1bc6c06989848f28602490adc8032d87491428dc0298d001bacb6ae3bb8e12e4860dd6adeb0b21769e72553c4b1d80690b17da01d576864cca05c01de9b1001061ab453c28afbfbf91cb5d0d1e234bccf3fda59ef2ed6d0361619dc00a45b6472b5b7f33532a7151e15b1d6391de7d373ba3c6d25d243765d94b5ee872b2e56d85b0190b65bcdca94134d23cc2187d31224422408b66760e17fbd0645557d96bd96e1145c0dab657b51d34de5ff0306ddf4f18b06228a62d2cc14b9175ee9422a14516014da38d6e2e6c8c6e368545dd7154cb5a2f89e63535388d3b887575792e24b6d78506e20e565f05c8b9d9b5ce66e49a91528269a47b846baa43d140280dbeaeeace271adb30464af173946beadfa0cea2ab5e14fd67ec3c6d22f5d49d4b8747216b879d878e5397b2fdd5ac6b9bae3f4a6f091136e4cdd4fa6235c85d8f4ddf3af9eb9fc416b49e23993f0dbdff004c93c2d672df430a4d38fc1547adcfed59153f13567ea412f3cbfa13ab38f3679ff6ccbfc3f2aaff00f91de7f6fbbf93afca53f13d23d38fc554fa5c7ef56297e26acbfa904fcb2bea72ece3c999f86d2d1b647c27aeef9d6d5a76e5ad77c2df0bf1faedf22bceda71d7733eb64ae7cffda56b07daf18db26f14378d391b1f1b0f53f4515049e598d77578e7a6c889d7255140280ba3b16d15b18593104673bd97f923baff0098bfcaa5a6b4c9ad630c438ba9625485d3cb15875911a37174752ac39861623e46878d26b0cf9974d68e6c34f2c0fbe372b7e63e13ee2c7deab631a181521c127130abd4b2709674315dae6be96de97754d47dfe67d2d0a5dd5351fbc9c54c4c280ea5c7315ee18c0ef0731f3a619ee18db1cc7ce98630ce6f5e1e02680f5c3c0f21b468ce7922963f415e4a4a3bbc0243a3b50748cde5c33283c642107d73fa5412bba51e7ee39e244b345f6353358e23108838ac6a5cfe2361f4aad2ed05fa63effbfdce5d4e84c345f66fa370f6674ef587199ae3f0e4bf4aa35fb45c56673515e691e27296c4824d27146bb1128b0dc146ca8ff9d2be72f3f10dbd24d52f4e5f0f7fd09a16b296fa1a8c4e299cdd8dfa701e82be42eefebdd4b3565ece4bd9f6cbf0a7182d0f1aa676280eca84ee04fa0a9214a73f562df923c6d2dceb519e8a018e9e638796189f659d19549f8491c0f0adaeceed9ab6be84fd2874e6bcbe9f22adcdb77917c3a328dc6611e2731c8a55d7220ffccc75afb3a3561560a70794cf8fab4a54e4e335867854846280f7c0e11a5912241779182afab1b0f6a1d422e52491f4d689c02c10c70279634551d6c2d73d4eff007ab096160df8c545248cbaf4e850153f6d1a0334c6a0cb28e5b7f818fd56ff00cb51545cccebea5fad1544c72ab3614f8eb27d3521b1a7c7553e9a9e0aa49000249c8002e49e8389adf37cb0f55fb28c44e049896fb3c6772800ca47a1c93def546adf463a435f91c39f42c5d17d9be8e840fee0487ef4a4b9f96e1f2aa52baab2e7eed0e1c9920834361d05920897d2351fa540e4deece4ef2240b91118e8428aaf52ea8527c352714fc5a474a127aa4753a3b0efff0095130fe443fa54d0a8a4b3179f23c69adcc39b55302de6c2407ffd69fb548aacd6cdfbc659ce1f55b0499ae12007fedafed47526f76fde32cf2d303bb2aa80225be11b39fb7b57c97e23b8b8a7282836a0d72e6fc7d85cb48c5e5bdcd56d1e75f25de4f7cb2ee10da3cebd7526f9bf78c238a8cf4f6583c25b75ad61cf3b55c85a4a542559bc6365d75c7c3f8ea70e7e9289d678b64daf736cfa1e55c5cdbf71251ce5e35f07d0f612e2593a28be42a08c5c9f0c5659d3783bc90902e72cedf2a9eadad4a51e29ac6b8f71ca9a6f08cb87cbb1bb2076b916b01d371fceb56dd629aa39c689f17472c24ba6cfcf7c35a904b7e2f87903864b16dc00e77cec2dea6e7fc27dbd9595ba84aa3d125d73ae34f3797d757178d1bc1549e52fbfbfa9c361d2c4df70f84dc9b13fb0fc5d2b99d95ab8b7c5b2e4f2de33fb259c69e9781eaa93cedf7f7f2306b08b068b5af5797151e561328f0373fe16e87e87defa9d99da32b4a9aeb07bafdd78fcca37d64ae61a7acb67fb1534d1323156055949041de08df5f7709c671528bca67c8ce0e127196e8e95d1c965f633abfb72b635c7862ba477e2e4788fb29b7f574aee0b2f26858d2d78d970d4c698a014062e94c0262217824174914a9f7e23910730798af1acac1cca2a4b0cf9a74ee85961c5360ca96955b65428f3ed66a40ea083d2fd2b4bb3e0a14e5397da4476541d252cf5f8172f679d9fc7835134e03e288f558efc17af36a82e2e5d5785b16252c93baaa7228050117d218674625ae413e6e07fdfa57e79dab617146b4aa4f2d379e2faf4fbc1a946ac651497b8c656233048f4cab3215674de60da7e0f04cd27b9951693957e2bfae7fef5a747b72f69febcf9acff003f12195bd37c8cb8f4e9f8907b1b56ad1fc4d2daa53cf93fd9e7e6432b35c99eb2e9589c6cbab5bdbe99d59abdb9655a2e9d684b1d1a5f53856d522f3166b658e2f85d87465fd456156a5d9b279a55251f071cfd3f72cc5d55ba5ef31987237aa13a7417ab36ff00f5fe4953974f89da1b5c6d6ee35cd1eefbd5c7eaf3fb4ff712ce34dccc8f140ef0a2c4585b828247d6df5e75b14afe9ce399a8c526b0b1ca29b5d5ef8f8f5209526b6cbfe4e511185cf0cc9cf90ff7b0f4aea9d3b6ad1e39eb8d5bd7a2f96a925e1beb9f1b9c74462a4c0316b73b0dd6bffb7e75974ee614ebcaa28e9ae16d8cff00195e19d3626706e38c9d6498b000db2fd80fd05475aea5562a324b4fa25af9e11d460a2f284933358124f2a4ebd7b8c45b6fa2fe10518c7532c40ec8aaa8dccdc5871dd7dfbff2e55b3fe9f755ade14a9d36b9bce16baf8e79f4e8b915fbd8466e4d9cae8897901ea7f6bd23f86eeffe515ed7f40eee1e2757d1528f86fe847eb5154fc3b79159587e4feb83a5754d98924654d98107a8b56557b5ad41e2ac5af3268ce32d9907ed07406dafdaa31e251fde01c547c5ea38f4f4adcec2ed0e097e5e6f47eaf83e9edf9f998fdad67c71efa1badfcbafb084686d1926266482217790d872038b1e805c9f4afaddf43e7a9c1ce4a28fa474268b4c3411c118f046b6ea4ef24f526e4fad584b0b06f420a115146757a74280500a0215aadaba1b1b8ad2532dde49596007e18e3b441fd5820b74f5ab356afa11a6b65bf9eff03a6f4c135aac72280500a038617c8e628d641813e888db75d4f4ddf2fdab22e7b12d2bebc3c2faad3e1b7c09e17138f3c986741b5fce36789b1bfcab2bff00185de2ff0073d1e7a6bf426fce69b6a6162cec31555d9039f98f527f419566768d6a96d51d1a51eee2bdf2f172ddfbf04d4a2a6b8a4f2fef918b58adb6f2cb02bc0280500a039dacad7cbe95da9cf1c09bc74fe0616e7b61f06efe5536e6721f33fa568db763ddd7da385d5e9fcfb910cebc23ccda61f418f8dafd1721f3dff957d15afe1ba10d6b3727d365f5f895677727eae86ca0c2a279540ebc7e7beb7a8dbd2a2b14e297922b4a4e5bb3daa639140280eb24618598023ae75cce119ae192caf13d4dad51a7c7e8504129eea7307d2ff91af9abff00c3d197fb96da3e9cbd8f97cbc8b74eeb94cd46a16aa438469a419c8cc40b8ce34c8851efbcf1b0e59eb766d7956a5fee2c4d6925e3fcee50fca428cdb8ecf6f22635a276280500a01400500a0140280500a0140280f39a056166507d7fe6551d5a34eac786a4535e2b27aa4e3aa3064d0b19dc597d0dff003ac9abf87eca7b26bc9fd724eaeaa23cbfb097efb7c8556ffc66dbfe52f87d0eff00373e88e46824fbedf4fdaba5f86ed16ee5ef5f43cfcdcfc0ee34247cd8fb8fdaa78fe1fb25bc5bf6b3977550f55d1310f849f527f7ab10ec7b286d4d7b72fe793975ea3e66445848d7ca8a0f3b0bfceae53b7a54bfa714bc92446e527bb3daa639140280500a0140280501d3ba1b5b5c6d6f51d6b8e08f171e35d8f72f183bd7678280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a0140280500a03ffd9, 'Juan', 'Juan', 'Juan', 'Jr', '09126992952', 'Full Service', 'SAAVEDRA FUNERAL', 'DENNIS', 'true', 'true', 'true', 'true', 'true', 'Test', '2025-03-28 05:03:10'),
(7, 2, 'Joseph', 'Step', 'Man', 'Jr', '', 'Angas', 'Basud', 'Camarines Norte', 'Male', '2025-03-27', NULL, 'Juan', 'Dela', 'Cruz', 'Jr', '09126992952', 'Full Service', 'SAAVEDRA FUNERAL', 'DENNIS', '', 'false', 'false', 'false', 'false', '', '2025-03-28 05:03:31');

-- --------------------------------------------------------

--
-- Table structure for table `basic_information`
--

CREATE TABLE `basic_information` (
  `basic_info_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `fname` varchar(250) NOT NULL,
  `mname` varchar(250) NOT NULL,
  `lname` varchar(250) NOT NULL,
  `ext` varchar(250) NOT NULL,
  `gender` varchar(250) NOT NULL,
  `bdate` date NOT NULL,
  `phoneNumber` varchar(250) NOT NULL,
  `address` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `basic_information`
--

INSERT INTO `basic_information` (`basic_info_id`, `account_id`, `fname`, `mname`, `lname`, `ext`, `gender`, `bdate`, `phoneNumber`, `address`) VALUES
(1, 2, 'John Erwin', 'Sayno', 'Albos', '', 'male', '2003-06-05', '09126992952', 0);

-- --------------------------------------------------------

--
-- Table structure for table `burial_assistance`
--

CREATE TABLE `burial_assistance` (
  `burial_assistance_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `client_fname` varchar(250) NOT NULL,
  `client_mname` varchar(250) NOT NULL,
  `client_lname` varchar(250) NOT NULL,
  `client_ext_name` varchar(250) NOT NULL,
  `client_province` varchar(250) NOT NULL,
  `client_municipality` varchar(250) NOT NULL,
  `client_barangay` varchar(250) NOT NULL,
  `client_purok` varchar(250) NOT NULL,
  `client_relationship` varchar(250) NOT NULL,
  `client_contact_num` varchar(250) NOT NULL,
  `client_gender` varchar(100) NOT NULL,
  `client_age` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `type_assistance` varchar(250) NOT NULL,
  `status_remarks` varchar(250) NOT NULL,
  `status_application` varchar(250) NOT NULL,
  `interviewer` varchar(250) NOT NULL,
  `savedAt` date NOT NULL,
  `burial_status` varchar(250) NOT NULL,
  `check_barangay_indigency` varchar(250) NOT NULL,
  `check_death_certificate` varchar(250) NOT NULL,
  `check_funeral_contract` varchar(250) NOT NULL,
  `check_valid_id` varchar(250) NOT NULL,
  `remarks` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `burial_assistance`
--

INSERT INTO `burial_assistance` (`burial_assistance_id`, `account_id`, `client_fname`, `client_mname`, `client_lname`, `client_ext_name`, `client_province`, `client_municipality`, `client_barangay`, `client_purok`, `client_relationship`, `client_contact_num`, `client_gender`, `client_age`, `amount`, `type_assistance`, `status_remarks`, `status_application`, `interviewer`, `savedAt`, `burial_status`, `check_barangay_indigency`, `check_death_certificate`, `check_funeral_contract`, `check_valid_id`, `remarks`) VALUES
(2, 2, 'Juan123', 'Juan', 'Juan', 'Jr', 'Camarines Norte', 'Basud', 'Angas', '2', 'Parent', '09126992952', 'Male', 20, 15000, 'Medical Assistance / Hospital Bill', 'Refer to PSWDO', 'Claimed / Released / Payout Governors Office', 'Dennis S. Ballosa', '2025-03-28', 'Pending', '1', '0', '0', '0', 'Test');

-- --------------------------------------------------------

--
-- Table structure for table `family_composition`
--

CREATE TABLE `family_composition` (
  `family_id` int(11) NOT NULL,
  `pswdo_interview_id` int(11) NOT NULL,
  `family_member_name` varchar(250) NOT NULL,
  `relationship` varchar(250) NOT NULL,
  `age` int(11) NOT NULL,
  `civil_status` varchar(250) NOT NULL,
  `occupation` varchar(250) NOT NULL,
  `monthly_income` int(11) NOT NULL,
  `savedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `family_composition`
--

INSERT INTO `family_composition` (`family_id`, `pswdo_interview_id`, `family_member_name`, `relationship`, `age`, `civil_status`, `occupation`, `monthly_income`, `savedAt`) VALUES
(17, 1, 'Juan Dela Cruz', 'Father', 21, 'Single', 'Laborer', 15000, '0000-00-00'),
(18, 1, 'Stephen', 'Brother', 21, 'Single', 'Basketball Player', 2000, '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `hospital_bill`
--

CREATE TABLE `hospital_bill` (
  `hospital_bill_id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `patient_fname` varchar(250) NOT NULL,
  `patient_mname` varchar(250) NOT NULL,
  `patient_lname` varchar(250) NOT NULL,
  `patient_ext_name` varchar(250) NOT NULL,
  `patient_purok` varchar(250) NOT NULL,
  `patient_barangay` varchar(250) NOT NULL,
  `patient_municipality` varchar(250) NOT NULL,
  `patient_province` varchar(250) NOT NULL,
  `patient_hospital` varchar(250) NOT NULL,
  `claimant_fname` varchar(250) NOT NULL,
  `claimant_mname` varchar(250) NOT NULL,
  `claimant_lname` varchar(250) NOT NULL,
  `claimant_extname` varchar(250) NOT NULL,
  `claimant_relationship` varchar(250) NOT NULL,
  `claimant_contact` varchar(250) NOT NULL,
  `claimant_amount` varchar(250) NOT NULL,
  `hospital_bill_status` varchar(250) NOT NULL,
  `check_barangay_indigency` varchar(250) NOT NULL,
  `check_med_certificate` varchar(250) NOT NULL,
  `check_hospital_bill` varchar(250) NOT NULL,
  `check_valid_id` varchar(250) NOT NULL,
  `remarks` varchar(500) NOT NULL,
  `datetime_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospital_bill`
--

INSERT INTO `hospital_bill` (`hospital_bill_id`, `account_id`, `patient_fname`, `patient_mname`, `patient_lname`, `patient_ext_name`, `patient_purok`, `patient_barangay`, `patient_municipality`, `patient_province`, `patient_hospital`, `claimant_fname`, `claimant_mname`, `claimant_lname`, `claimant_extname`, `claimant_relationship`, `claimant_contact`, `claimant_amount`, `hospital_bill_status`, `check_barangay_indigency`, `check_med_certificate`, `check_hospital_bill`, `check_valid_id`, `remarks`, `datetime_added`) VALUES
(1, 2, 'John', 'Erwin', 'Albos', '', '1', 'Camambugan', 'Daet', 'Camarines Norte', 'LEON D. HERNANDEZ MEMORIAL HOSPITAL', 'John Erwin', 'Sayno', 'Albos', '', 'Mother', '09126992952', '15000', 'Completed', '1', '1', '1', '1', 'Test 123', '2025-04-10'),
(2, 2, 'Kirby Ann', 'Aycardo', 'De Los Reyes', '', '', 'Barangay VII', 'Daet', '', 'DAET DOCTORS HOSPITAL', 'Wendee', 'Davillo', 'Postre', '', 'Sibling', '09126992952', '15000', '', '', '', '', '', '', '2025-02-27'),
(6, 2, 'Wendee', 'Davillo', 'Postre', '', '12', 'Daculang Bolo', 'San Lorenzo Ruiz', 'Camarines Norte', 'OUR LADY OF LOURDES HOSPITAL', 'Kirby Ann', 'Aycardo', 'De Los Reyes', '', 'Sibling', '09126992952', '15000', '', '1', '1', '1', '1', '', '2025-04-04'),
(8, 2, 'Juan', 'Dela', 'Cruz', 'jR', '2', 'Borabod', 'Daet', 'Camarines Norte', 'RACELIS TIONGSON MEDICAL CLINIC', 'ASFSA', 'AFSF', 'FSAF', 'SAF', 'Mother', '09126992952', '15000', '', '', '1', '1', '1', '0', '2025-04-04'),
(9, 2, 'JUAN', 'JUAN', 'JUAN', 'JR', '1', 'Camambugan', 'Daet', 'Camarines Norte', 'LEON D. HERNANDEZ MEMORIAL HOSPITAL', 'PALAGING', 'NANGHIHINGI', 'TULONG', '', 'Mother', '09126992952', '150000', '', '', '', '', '', '', '2025-02-27'),
(10, 2, 'John123', 'Erwin123', 'Albos', '', '1', 'Camambugan', 'Daet', 'Camarines Norte', 'LEON D. HERNANDEZ MEMORIAL HOSPITAL', 'Kirby Ann', 'Aycardo', 'De Los Reys', '', 'Mother', '09126992952', '15000', 'Pending', '0', '0', '0', '0', 'Test', '2025-03-28');

-- --------------------------------------------------------

--
-- Table structure for table `pswdo_interview`
--

CREATE TABLE `pswdo_interview` (
  `pswdo_interview_id` int(11) NOT NULL,
  `hospital_bill_id` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `civil_status` varchar(250) NOT NULL,
  `occupation` varchar(250) NOT NULL,
  `monthly_income` int(250) NOT NULL,
  `gender` varchar(250) NOT NULL,
  `mobile_num` varchar(250) NOT NULL,
  `petty_amount` int(11) NOT NULL,
  `province` varchar(250) NOT NULL,
  `municipality` varchar(250) NOT NULL,
  `barangay` varchar(250) NOT NULL,
  `purok` varchar(250) NOT NULL,
  `transaction_name` varchar(250) NOT NULL,
  `savedAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pswdo_interview`
--

INSERT INTO `pswdo_interview` (`pswdo_interview_id`, `hospital_bill_id`, `age`, `civil_status`, `occupation`, `monthly_income`, `gender`, `mobile_num`, `petty_amount`, `province`, `municipality`, `barangay`, `purok`, `transaction_name`, `savedAt`) VALUES
(1, 1, 30, 'Single', 'Farmer', 15000, 'Male', '09126992952', 15000, 'Camarines Norte', 'Basud', 'Angas', '5', 'Hospital Bill', '0000-00-00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `alay_pagdamay`
--
ALTER TABLE `alay_pagdamay`
  ADD PRIMARY KEY (`burial_id`),
  ADD KEY `burial_id` (`account_id`);

--
-- Indexes for table `basic_information`
--
ALTER TABLE `basic_information`
  ADD PRIMARY KEY (`basic_info_id`),
  ADD KEY `account_id` (`account_id`);

--
-- Indexes for table `burial_assistance`
--
ALTER TABLE `burial_assistance`
  ADD PRIMARY KEY (`burial_assistance_id`),
  ADD KEY `burial_assistance_id` (`account_id`);

--
-- Indexes for table `family_composition`
--
ALTER TABLE `family_composition`
  ADD PRIMARY KEY (`family_id`),
  ADD KEY `pswdo_interview_id` (`pswdo_interview_id`);

--
-- Indexes for table `hospital_bill`
--
ALTER TABLE `hospital_bill`
  ADD PRIMARY KEY (`hospital_bill_id`),
  ADD KEY `hospital_id` (`account_id`);

--
-- Indexes for table `pswdo_interview`
--
ALTER TABLE `pswdo_interview`
  ADD PRIMARY KEY (`pswdo_interview_id`),
  ADD KEY `hospital_bill_id` (`hospital_bill_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `alay_pagdamay`
--
ALTER TABLE `alay_pagdamay`
  MODIFY `burial_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `basic_information`
--
ALTER TABLE `basic_information`
  MODIFY `basic_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `burial_assistance`
--
ALTER TABLE `burial_assistance`
  MODIFY `burial_assistance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `family_composition`
--
ALTER TABLE `family_composition`
  MODIFY `family_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `hospital_bill`
--
ALTER TABLE `hospital_bill`
  MODIFY `hospital_bill_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `pswdo_interview`
--
ALTER TABLE `pswdo_interview`
  MODIFY `pswdo_interview_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alay_pagdamay`
--
ALTER TABLE `alay_pagdamay`
  ADD CONSTRAINT `burial_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `basic_information`
--
ALTER TABLE `basic_information`
  ADD CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `burial_assistance`
--
ALTER TABLE `burial_assistance`
  ADD CONSTRAINT `burial_assistance_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `family_composition`
--
ALTER TABLE `family_composition`
  ADD CONSTRAINT `pswdo_interview_id` FOREIGN KEY (`pswdo_interview_id`) REFERENCES `pswdo_interview` (`pswdo_interview_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `hospital_bill`
--
ALTER TABLE `hospital_bill`
  ADD CONSTRAINT `hospital_id` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pswdo_interview`
--
ALTER TABLE `pswdo_interview`
  ADD CONSTRAINT `hospital_bill_id` FOREIGN KEY (`hospital_bill_id`) REFERENCES `hospital_bill` (`hospital_bill_id`) ON DELETE CASCADE ON UPDATE CASCADE;
--
-- Database: `pharmacy`
--
CREATE DATABASE IF NOT EXISTS `pharmacy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pharmacy`;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add customer', 7, 'add_customer'),
(26, 'Can change customer', 7, 'change_customer'),
(27, 'Can delete customer', 7, 'delete_customer'),
(28, 'Can view customer', 7, 'view_customer'),
(29, 'Can add med bought', 8, 'add_medbought'),
(30, 'Can change med bought', 8, 'change_medbought'),
(31, 'Can delete med bought', 8, 'delete_medbought'),
(32, 'Can view med bought', 8, 'view_medbought'),
(33, 'Can add medicine', 9, 'add_medicine'),
(34, 'Can change medicine', 9, 'change_medicine'),
(35, 'Can delete medicine', 9, 'delete_medicine'),
(36, 'Can view medicine', 9, 'view_medicine'),
(37, 'Can add med return', 10, 'add_medreturn'),
(38, 'Can change med return', 10, 'change_medreturn'),
(39, 'Can delete med return', 10, 'delete_medreturn'),
(40, 'Can view med return', 10, 'view_medreturn'),
(41, 'Can add med stored', 11, 'add_medstored'),
(42, 'Can change med stored', 11, 'change_medstored'),
(43, 'Can delete med stored', 11, 'delete_medstored'),
(44, 'Can view med stored', 11, 'view_medstored'),
(45, 'Can add med supply', 12, 'add_medsupply'),
(46, 'Can change med supply', 12, 'change_medsupply'),
(47, 'Can delete med supply', 12, 'delete_medsupply'),
(48, 'Can view med supply', 12, 'view_medsupply'),
(49, 'Can add order supply', 13, 'add_ordersupply'),
(50, 'Can change order supply', 13, 'change_ordersupply'),
(51, 'Can delete order supply', 13, 'delete_ordersupply'),
(52, 'Can view order supply', 13, 'view_ordersupply'),
(53, 'Can add pharmacists', 14, 'add_pharmacists'),
(54, 'Can change pharmacists', 14, 'change_pharmacists'),
(55, 'Can delete pharmacists', 14, 'delete_pharmacists'),
(56, 'Can view pharmacists', 14, 'view_pharmacists'),
(57, 'Can add served customer', 15, 'add_servedcustomer'),
(58, 'Can change served customer', 15, 'change_servedcustomer'),
(59, 'Can delete served customer', 15, 'delete_servedcustomer'),
(60, 'Can view served customer', 15, 'view_servedcustomer'),
(61, 'Can add store', 16, 'add_store'),
(62, 'Can change store', 16, 'change_store'),
(63, 'Can delete store', 16, 'delete_store'),
(64, 'Can view store', 16, 'view_store'),
(65, 'Can add store sales', 17, 'add_storesales'),
(66, 'Can change store sales', 17, 'change_storesales'),
(67, 'Can delete store sales', 17, 'delete_storesales'),
(68, 'Can view store sales', 17, 'view_storesales'),
(69, 'Can add supplier', 18, 'add_supplier'),
(70, 'Can change supplier', 18, 'change_supplier'),
(71, 'Can delete supplier', 18, 'delete_supplier'),
(72, 'Can view supplier', 18, 'view_supplier'),
(73, 'Can add supply return', 19, 'add_supplyreturn'),
(74, 'Can change supply return', 19, 'change_supplyreturn'),
(75, 'Can delete supply return', 19, 'delete_supplyreturn'),
(76, 'Can view supply return', 19, 'view_supplyreturn'),
(77, 'Can add cart', 20, 'add_cart'),
(78, 'Can change cart', 20, 'change_cart'),
(79, 'Can delete cart', 20, 'delete_cart'),
(80, 'Can view cart', 20, 'view_cart');

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `cart_name` varchar(255) NOT NULL,
  `cart_price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `cust_id` int(11) NOT NULL,
  `cart_image` varchar(255) NOT NULL,
  `medID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `CustID` int(11) NOT NULL,
  `CustFname` varchar(20) NOT NULL,
  `CustLname` varchar(20) NOT NULL,
  `CustAge` tinyint(3) NOT NULL,
  `CustGender` varchar(6) NOT NULL,
  `CustCpNo` varchar(11) NOT NULL,
  `CustOrder` varchar(20) NOT NULL,
  `Cust_Uname` varchar(255) NOT NULL,
  `Cust_Pass` varchar(255) NOT NULL,
  `last_login` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`CustID`, `CustFname`, `CustLname`, `CustAge`, `CustGender`, `CustCpNo`, `CustOrder`, `Cust_Uname`, `Cust_Pass`, `last_login`) VALUES
(10, 'Apple', 'Calvario', 0, '', '', '', 'applek', '123', '2024-05-20 03:59:06'),
(11, 'Kim', 'Calvar', 0, '', '', '', 'sample', 'sample', '2024-05-20 03:59:51');

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(20, 'AppPharmacy', 'cart'),
(7, 'AppPharmacy', 'customer'),
(8, 'AppPharmacy', 'medbought'),
(9, 'AppPharmacy', 'medicine'),
(10, 'AppPharmacy', 'medreturn'),
(11, 'AppPharmacy', 'medstored'),
(12, 'AppPharmacy', 'medsupply'),
(13, 'AppPharmacy', 'ordersupply'),
(14, 'AppPharmacy', 'pharmacists'),
(15, 'AppPharmacy', 'servedcustomer'),
(16, 'AppPharmacy', 'store'),
(17, 'AppPharmacy', 'storesales'),
(18, 'AppPharmacy', 'supplier'),
(19, 'AppPharmacy', 'supplyreturn'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-05-18 07:47:19.061636'),
(2, 'auth', '0001_initial', '2024-05-18 07:47:19.321308'),
(3, 'admin', '0001_initial', '2024-05-18 07:47:19.414410'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-05-18 07:47:19.416940'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-05-18 07:47:19.424718'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-05-18 07:47:19.464580'),
(7, 'auth', '0002_alter_permission_name_max_length', '2024-05-18 07:47:19.495058'),
(8, 'auth', '0003_alter_user_email_max_length', '2024-05-18 07:47:19.515969'),
(9, 'auth', '0004_alter_user_username_opts', '2024-05-18 07:47:19.527437'),
(10, 'auth', '0005_alter_user_last_login_null', '2024-05-18 07:47:19.584400'),
(11, 'auth', '0006_require_contenttypes_0002', '2024-05-18 07:47:19.584400'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2024-05-18 07:47:19.594551'),
(13, 'auth', '0008_alter_user_username_max_length', '2024-05-18 07:47:19.617028'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2024-05-18 07:47:19.628479'),
(15, 'auth', '0010_alter_group_name_max_length', '2024-05-18 07:47:19.636413'),
(16, 'auth', '0011_update_proxy_permissions', '2024-05-18 07:47:19.645267'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2024-05-18 07:47:19.653887'),
(18, 'sessions', '0001_initial', '2024-05-18 07:47:19.677391'),
(19, 'AppPharmacy', '0001_initial', '2024-05-18 09:12:36.488168'),
(20, 'AppPharmacy', '0002_delete_medbought_delete_medreturn_delete_medstored_and_more', '2024-05-18 15:02:32.216039'),
(21, 'AppPharmacy', '0003_cart_medbought', '2024-05-19 11:26:17.778083');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('2z4jy6xw00jqhur51lzoijgwzgaqm5np', 'eyJsb2dnZWRfaW5fY3VzdG9tZXJfaWQiOjEwfQ:1s90wO:iRXcO_SyQ_U2Emup5aBwSqw6UFtKRBUb-rmZaCRsTbY', '2024-06-03 11:12:28.943235'),
('42wqbphav0du9xzdihs53on8irygxfpu', 'e30:1s8Yr0:escPmz2HPPH8AmQuAyQDGbmt-OSdpzNlFUVR1rh8RJ0', '2024-06-02 05:13:02.676712'),
('4t5viqi6og3f41x1l0xozjgfb3vwrqki', 'e30:1s8YFJ:Zs5Q1LVakI28tmmYa9z8BRoEALNDQIFiVmNIbYedqME', '2024-06-02 04:34:05.543824'),
('573iuyl856yzwr5qq4g7lmu4qz6shmb4', 'e30:1s8Ypa:4CC0FOkk0sGnUulQqpgvum8GLfGYG4oe7imM5GFiywo', '2024-06-02 05:11:34.954715'),
('5dmm8z5w9xz5rtueheu9p06tiq6yfbp8', 'e30:1s8YBU:MlqZESt9PzU50s3A4Y4jYvcV7CIb6RQeeqYBqfid25Y', '2024-06-02 04:30:08.845749'),
('8ecargiom0ipn2ziggvhg9prw6hk3ym6', 'e30:1s8H2F:0uQEzz3hzNgWBNnA4P2M-xfSy06Rl-8ruMaKAUDYhYE', '2024-06-01 10:11:27.332301'),
('8imljqh97vvgcyd1m00idzvgenkdybcd', 'e30:1s8Gsw:DRoBurBcfQDD3OXJZuBBzXG1S_oxvPin3TWnJhwKuPo', '2024-06-01 10:01:50.752424'),
('9ncmrlnmt9ek523cqeqfjicvg18v1cml', 'e30:1s8YMA:JstZMDFK1qbtLkfjwDC5Fks5Tf-fFjHz6jUw59aaV7c', '2024-06-02 04:41:10.339934'),
('9ywd7azmn5x0bql7vc8809omtabcygj2', 'e30:1s8Ya5:7egSOUfFip7AtgTa-fvUmtfG0GI4ZLUmMnbQw0HpNhw', '2024-06-02 04:55:33.520227'),
('bf3kg928rhs2cwcjzs9ecwqfiwswcz7a', 'e30:1s8YlD:Wb-4t78vd-J4eLsWWSoL7kvLPl3hZz4MCKQaIiCiA2E', '2024-06-02 05:07:03.448531'),
('bjcs4g0vyvr4a2law0ja314ej7xy0awv', 'e30:1s8Ybv:d4JTAmR2JcgDmtPLq6ENFglPKbRQMv1dYElrcOwGNHw', '2024-06-02 04:57:27.237871'),
('exnic0w8ihn2ykor6rjyr3ykoxhv6g4a', 'e30:1s8GwU:wZ2hX0i8_pLGLp99KCOxNC2Rzr7RVtdeBKJz42E4JJY', '2024-06-01 10:05:30.989072'),
('fa7skas4v1strxg2lt3q37tpb1daukci', 'e30:1s8Gre:TnQo7dM7dllCNxMqQkMbKnNqilz-yDXmdP0nyv-Cgo0', '2024-06-01 10:00:30.080609'),
('morksazter7mzr75l3p0v0g8p2v1n1qb', 'eyJsb2dnZWRfaW5fY3VzdG9tZXJfaWQiOjEwfQ:1s8xjF:JTT9XfAzAPipSvMuDlPXY0fm7kR-xH99fmYR_p2UP70', '2024-06-03 07:46:41.302052'),
('noi5ny85re66jb4vfgf8ftrbpzi91g7c', 'e30:1s8Y7Q:kB5_WnPEBZXvKMuy95PNiZfgQgn2D-vBB_ZILQHq9qc', '2024-06-02 04:25:56.533286'),
('r49vwo6q3i5wl0miecttl1aa039086y3', 'e30:1s8YvD:Q9ccvLedTQlUmb0rckUrlMdt2t5Jd0HOMxebs6Grmfk', '2024-06-02 05:17:23.401790'),
('t1k8ynzbkpasv26rvydj0vnvvpiftwdo', 'e30:1s8Y9z:tuXm1fxme3Q7Veim_kiHgUpO4Ni4KigZQvy-RT5bypE', '2024-06-02 04:28:35.949467'),
('toij5hvk33d1j0ndopgsdmrcme6v2wy7', 'e30:1s8YbP:11kCX8ZxKmG-Tf-CcsIjGIuuVqlzKP-TTrq2qANGMRc', '2024-06-02 04:56:55.361925'),
('xu7nnyals1ocz0t97so6ga9q7n5p5ry1', 'e30:1s8Yus:rQB4Hm6elahbR9fSIc-jJBNuPSbI5o6KeUFFha2nU_Q', '2024-06-02 05:17:02.094092'),
('y4b9u1h4pgmnqp9ep81gvyfb4qnbzdxw', 'e30:1s8YLJ:_hmwUgr4O1o7uIjbaEydlO_eanxyAvLPmqsMdew38D8', '2024-06-02 04:40:17.977779'),
('ygv0fgoxe7pyco4zemgoj5yy9j8d3gyv', 'e30:1s8YsQ:5X1Vemr6Lygz6p7NtytW0G656OtTrZaTw7dqrUdzhQQ', '2024-06-02 05:14:30.825832');

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `MedID` int(10) NOT NULL,
  `MedName` varchar(30) NOT NULL,
  `MedType` varchar(20) NOT NULL,
  `MedCategory` varchar(20) NOT NULL,
  `MedDesc` varchar(50) NOT NULL,
  `MedStock` int(11) NOT NULL,
  `MedExp` date NOT NULL,
  `MedPrice` int(100) NOT NULL,
  `PharID` int(7) NOT NULL,
  `medImg` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`MedID`, `MedName`, `MedType`, `MedCategory`, `MedDesc`, `MedStock`, `MedExp`, `MedPrice`, `PharID`, `medImg`) VALUES
(1002, 'Stresstabs', 'Capsule', 'Antihistamines', 'sample', 187, '2024-06-06', 20, 52784, 'Stresstab.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `medicinecateg`
--

CREATE TABLE `medicinecateg` (
  `categId` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicinecateg`
--

INSERT INTO `medicinecateg` (`categId`, `category`, `type`) VALUES
(1, 'Painkillers', 'Tablet'),
(2, 'Antibiotics', 'Capsule'),
(3, 'Analgesics', 'Liquid'),
(4, 'Antipyretics', 'Cream'),
(5, 'Antihistamines', 'Injection');

-- --------------------------------------------------------

--
-- Table structure for table `med_bought`
--

CREATE TABLE `med_bought` (
  `Cust_ord_ID` tinyint(3) NOT NULL,
  `Med_ord_ID` int(10) NOT NULL,
  `Date_bought` date NOT NULL,
  `Qty_bought` int(30) NOT NULL,
  `price` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `cus_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `med_stored`
--

CREATE TABLE `med_stored` (
  `Stored_No` tinyint(3) NOT NULL,
  `Med_st_ID` int(7) NOT NULL,
  `Store_st_Id` tinyint(5) NOT NULL,
  `Date_of_Stored` date NOT NULL,
  `Qty_of_Stored` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `med_supply`
--

CREATE TABLE `med_supply` (
  `Supply_ID` int(3) NOT NULL,
  `Supplier_ID` tinyint(5) NOT NULL,
  `Med_Id` int(7) NOT NULL,
  `Date_Sup` date NOT NULL,
  `Qty_Sup` int(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_supply`
--

CREATE TABLE `order_supply` (
  `Order_ID` tinyint(3) NOT NULL,
  `Phar_ord_ID` int(7) NOT NULL,
  `Sup_ord_ID` tinyint(5) NOT NULL,
  `OrderDate` date NOT NULL,
  `OrderQty` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pharmacists`
--

CREATE TABLE `pharmacists` (
  `PharID` int(7) NOT NULL,
  `PharFname` varchar(20) NOT NULL,
  `PharLname` varchar(20) NOT NULL,
  `PharCpNo` varchar(11) NOT NULL,
  `PharUsername` varchar(20) NOT NULL,
  `PharPass` varchar(20) NOT NULL,
  `St_Id` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pharmacists`
--

INSERT INTO `pharmacists` (`PharID`, `PharFname`, `PharLname`, `PharCpNo`, `PharUsername`, `PharPass`, `St_Id`) VALUES
(51234, 'Ana', 'Garcia', '9888345212', 'store2', 'store2', 2),
(52784, 'Katrina', 'Abella', '9993425023', 'store1', 'store1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `StId` tinyint(3) NOT NULL,
  `StName` varchar(20) NOT NULL,
  `StLocation` varchar(30) NOT NULL,
  `StCpNo` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`StId`, `StName`, `StLocation`, `StCpNo`) VALUES
(1, 'Doctors Generics Pha', '4X84+H3V, J. Lukban St, Daet C', '9510887651'),
(2, 'Doctors Generics Pha', 'No.1 Block E, Daet Public Mark', '9109590365'),
(3, 'Doctors Generics Pha', 'Vinzons Ave, 4600, Daet Cam No', '9067444980');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `SupID` tinyint(5) NOT NULL,
  `SupName` varchar(30) NOT NULL,
  `SupCpNo` varchar(11) NOT NULL,
  `SupLocation` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`SupID`, `SupName`, `SupCpNo`, `SupLocation`) VALUES
(111, 'Valu AJ', '9685367451', '1553 Maria Clara St, Sta Cruz '),
(112, 'MedShoppe Trading', '9183332546', '1424 Oroquieta Rd. Sta Cruz, M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`CustID`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`MedID`);

--
-- Indexes for table `medicinecateg`
--
ALTER TABLE `medicinecateg`
  ADD PRIMARY KEY (`categId`);

--
-- Indexes for table `med_bought`
--
ALTER TABLE `med_bought`
  ADD PRIMARY KEY (`Cust_ord_ID`);

--
-- Indexes for table `med_stored`
--
ALTER TABLE `med_stored`
  ADD PRIMARY KEY (`Stored_No`);

--
-- Indexes for table `med_supply`
--
ALTER TABLE `med_supply`
  ADD PRIMARY KEY (`Supply_ID`);

--
-- Indexes for table `order_supply`
--
ALTER TABLE `order_supply`
  ADD PRIMARY KEY (`Order_ID`);

--
-- Indexes for table `pharmacists`
--
ALTER TABLE `pharmacists`
  ADD PRIMARY KEY (`PharID`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`StId`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`SupID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `CustID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `MedID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1018;

--
-- AUTO_INCREMENT for table `medicinecateg`
--
ALTER TABLE `medicinecateg`
  MODIFY `categId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `med_bought`
--
ALTER TABLE `med_bought`
  MODIFY `Cust_ord_ID` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `med_stored`
--
ALTER TABLE `med_stored`
  MODIFY `Stored_No` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `med_supply`
--
ALTER TABLE `med_supply`
  MODIFY `Supply_ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `order_supply`
--
ALTER TABLE `order_supply`
  MODIFY `Order_ID` tinyint(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) NOT NULL DEFAULT '',
  `user` varchar(255) NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `query` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) NOT NULL,
  `col_name` varchar(64) NOT NULL,
  `col_type` varchar(64) NOT NULL,
  `col_length` text DEFAULT NULL,
  `col_collation` varchar(64) NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) DEFAULT '',
  `col_default` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `column_name` varchar(64) NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `transformation` varchar(255) NOT NULL DEFAULT '',
  `transformation_options` varchar(255) NOT NULL DEFAULT '',
  `input_transformation` varchar(255) NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) NOT NULL,
  `settings_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL,
  `export_type` varchar(10) NOT NULL,
  `template_name` varchar(64) NOT NULL,
  `template_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

--
-- Dumping data for table `pma__export_templates`
--

INSERT INTO `pma__export_templates` (`id`, `username`, `export_type`, `template_name`, `template_data`) VALUES
(1, 'root', 'database', 'manlimonsito e.s', '{\"quick_or_custom\":\"quick\",\"what\":\"sql\",\"structure_or_data_forced\":\"0\",\"table_select[]\":[\"inspectorate\",\"purchases\",\"stocks\",\"students\",\"supplier\",\"supplies\",\"teachers\",\"used_by_students\",\"used_by_teachers\"],\"table_structure[]\":[\"inspectorate\",\"purchases\",\"stocks\",\"students\",\"supplier\",\"supplies\",\"teachers\",\"used_by_students\",\"used_by_teachers\"],\"table_data[]\":[\"inspectorate\",\"purchases\",\"stocks\",\"students\",\"supplier\",\"supplies\",\"teachers\",\"used_by_students\",\"used_by_teachers\"],\"aliases_new\":\"\",\"output_format\":\"sendit\",\"filename_template\":\"@DATABASE@\",\"remember_template\":\"on\",\"charset\":\"utf-8\",\"compression\":\"none\",\"maxsize\":\"\",\"codegen_structure_or_data\":\"data\",\"codegen_format\":\"0\",\"csv_separator\":\",\",\"csv_enclosed\":\"\\\"\",\"csv_escaped\":\"\\\"\",\"csv_terminated\":\"AUTO\",\"csv_null\":\"NULL\",\"csv_columns\":\"something\",\"csv_structure_or_data\":\"data\",\"excel_null\":\"NULL\",\"excel_columns\":\"something\",\"excel_edition\":\"win\",\"excel_structure_or_data\":\"data\",\"json_structure_or_data\":\"data\",\"json_unicode\":\"something\",\"latex_caption\":\"something\",\"latex_structure_or_data\":\"structure_and_data\",\"latex_structure_caption\":\"Structure of table @TABLE@\",\"latex_structure_continued_caption\":\"Structure of table @TABLE@ (continued)\",\"latex_structure_label\":\"tab:@TABLE@-structure\",\"latex_relation\":\"something\",\"latex_comments\":\"something\",\"latex_mime\":\"something\",\"latex_columns\":\"something\",\"latex_data_caption\":\"Content of table @TABLE@\",\"latex_data_continued_caption\":\"Content of table @TABLE@ (continued)\",\"latex_data_label\":\"tab:@TABLE@-data\",\"latex_null\":\"\\\\textit{NULL}\",\"mediawiki_structure_or_data\":\"structure_and_data\",\"mediawiki_caption\":\"something\",\"mediawiki_headers\":\"something\",\"htmlword_structure_or_data\":\"structure_and_data\",\"htmlword_null\":\"NULL\",\"ods_null\":\"NULL\",\"ods_structure_or_data\":\"data\",\"odt_structure_or_data\":\"structure_and_data\",\"odt_relation\":\"something\",\"odt_comments\":\"something\",\"odt_mime\":\"something\",\"odt_columns\":\"something\",\"odt_null\":\"NULL\",\"pdf_report_title\":\"\",\"pdf_structure_or_data\":\"structure_and_data\",\"phparray_structure_or_data\":\"data\",\"sql_include_comments\":\"something\",\"sql_header_comment\":\"\",\"sql_use_transaction\":\"something\",\"sql_compatibility\":\"NONE\",\"sql_structure_or_data\":\"structure_and_data\",\"sql_create_table\":\"something\",\"sql_auto_increment\":\"something\",\"sql_create_view\":\"something\",\"sql_procedure_function\":\"something\",\"sql_create_trigger\":\"something\",\"sql_backquotes\":\"something\",\"sql_type\":\"INSERT\",\"sql_insert_syntax\":\"both\",\"sql_max_query_size\":\"50000\",\"sql_hex_for_binary\":\"something\",\"sql_utc_time\":\"something\",\"texytext_structure_or_data\":\"structure_and_data\",\"texytext_null\":\"NULL\",\"xml_structure_or_data\":\"data\",\"xml_export_events\":\"something\",\"xml_export_functions\":\"something\",\"xml_export_procedures\":\"something\",\"xml_export_tables\":\"something\",\"xml_export_triggers\":\"something\",\"xml_export_views\":\"something\",\"xml_export_contents\":\"something\",\"yaml_structure_or_data\":\"data\",\"\":null,\"lock_tables\":null,\"as_separate_files\":null,\"csv_removeCRLF\":null,\"excel_removeCRLF\":null,\"json_pretty_print\":null,\"htmlword_columns\":null,\"ods_columns\":null,\"sql_dates\":null,\"sql_relation\":null,\"sql_mime\":null,\"sql_disable_fk\":null,\"sql_views_as_tables\":null,\"sql_metadata\":null,\"sql_create_database\":null,\"sql_drop_table\":null,\"sql_if_not_exists\":null,\"sql_simple_view_export\":null,\"sql_view_current_user\":null,\"sql_or_replace_view\":null,\"sql_truncate\":null,\"sql_delayed\":null,\"sql_ignore\":null,\"texytext_columns\":null}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db` varchar(64) NOT NULL DEFAULT '',
  `table` varchar(64) NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) NOT NULL,
  `item_name` varchar(64) NOT NULL,
  `item_type` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) NOT NULL,
  `tables` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"manlimonsito e.s\",\"table\":\"purchases\"},{\"db\":\"manlimonsito e.s\",\"table\":\"supplier\"},{\"db\":\"manlimonsito e.s\",\"table\":\"teachers\"},{\"db\":\"manlimonsito e.s\",\"table\":\"inspectorate\"},{\"db\":\"manlimonsito e.s\",\"table\":\"supplies\"},{\"db\":\"manlimonsito e.s\",\"table\":\"stocks\"},{\"db\":\"manlimonsito e.s\",\"table\":\"students\"},{\"db\":\"manlimonsito e.s\",\"table\":\"used_by_students\"},{\"db\":\"manlimonsito e.s\",\"table\":\"used_by_teachers\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) NOT NULL DEFAULT '',
  `master_table` varchar(64) NOT NULL DEFAULT '',
  `master_field` varchar(64) NOT NULL DEFAULT '',
  `foreign_db` varchar(64) NOT NULL DEFAULT '',
  `foreign_table` varchar(64) NOT NULL DEFAULT '',
  `foreign_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) NOT NULL DEFAULT '',
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `search_name` varchar(64) NOT NULL DEFAULT '',
  `search_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) NOT NULL DEFAULT '',
  `table_name` varchar(64) NOT NULL DEFAULT '',
  `display_field` varchar(64) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) NOT NULL,
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `prefs` text NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) NOT NULL,
  `table_name` varchar(64) NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text NOT NULL,
  `schema_sql` text DEFAULT NULL,
  `data_sql` longtext DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2023-05-18 01:58:55', '{\"Console\\/Mode\":\"collapse\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) NOT NULL,
  `tab` varchar(64) NOT NULL,
  `allowed` enum('Y','N') NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) NOT NULL,
  `usergroup` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `resateadb`
--
CREATE DATABASE IF NOT EXISTS `resateadb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `resateadb`;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `adm_id` int(222) NOT NULL,
  `username` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `code` varchar(222) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`adm_id`, `username`, `password`, `email`, `code`, `date`) VALUES
(1, 'admin', '3e010d40e2644662ecc81fc395c38cef', 'admin@mail.com', '', '2023-01-31 11:11:57');

-- --------------------------------------------------------

--
-- Table structure for table `dishes`
--

CREATE TABLE `dishes` (
  `d_id` int(222) NOT NULL,
  `rs_id` int(222) NOT NULL,
  `title` varchar(222) NOT NULL,
  `slogan` varchar(222) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `dishes`
--

INSERT INTO `dishes` (`d_id`, `rs_id`, `title`, `slogan`, `price`, `img`) VALUES
(1, 1, 'Yorkshire Lamb Patties', 'Lamb patties which melt in your mouth, and are quick and easy to make. Served hot with a crisp salad.', 14.00, '62908867a48e4.jpg'),
(2, 1, 'Lobster Thermidor', 'Lobster Thermidor is a French dish of lobster meat cooked in a rich wine sauce, stuffed back into a lobster shell, and browned.', 36.00, '629089fee52b9.jpg'),
(3, 4, 'Chicken Madeira', 'Chicken Madeira, like Chicken Marsala, is made with chicken, mushrooms, and a special fortified wine. But, the wines are different;', 23.00, '62908bdf2f581.jpg'),
(4, 1, 'Stuffed Jacket Potatoes', 'Deep fry whole potatoes in oil for 8-10 minutes or coat each potato with little oil. Mix the onions, garlic, tomatoes and mushrooms. Add yoghurt, ginger, garlic, chillies, coriander', 8.00, '62908d393465b.jpg'),
(5, 2, 'Pink Spaghetti Gamberoni', 'Spaghetti with prawns in a fresh tomato sauce. This dish originates from Southern Italy and with the combination of prawns, garlic, chilli and pasta. Garnish each with remaining tablespoon parsley.', 21.00, '606d7491a9d13.jpg'),
(6, 2, 'Cheesy Mashed Potato', 'Deliciously Cheesy Mashed Potato. The ultimate mash for your Thanksgiving table or the perfect accompaniment to vegan sausage casserole. Everyone will love it\'s fluffy, cheesy.', 5.00, '606d74c416da5.jpg'),
(7, 2, 'Crispy Chicken Strips', 'Fried chicken strips, served with special honey mustard sauce.', 8.00, '606d74f6ecbbb.jpg'),
(8, 2, 'Lemon Grilled Chicken And Pasta', 'Marinated rosemary grilled chicken breast served with mashed potatoes and your choice of pasta.', 11.00, '606d752a209c3.jpg'),
(9, 3, 'Vegetable Fried Rice', 'Chinese rice wok with cabbage, beans, carrots, and spring onions.', 5.00, '606d7575798fb.jpg'),
(10, 3, 'Prawn Crackers', '12 pieces deep-fried prawn crackers', 7.00, '606d75a7e21ec.jpg'),
(11, 3, 'Spring Rolls', 'Lightly seasoned shredded cabbage, onion and carrots, wrapped in house made spring roll wrappers, deep fried to golden brown.', 6.00, '606d75ce105d0.jpg'),
(12, 3, 'Manchurian Chicken', 'Chicken pieces slow cooked with spring onions in our house made manchurian style sauce.', 11.00, '606d7600dc54c.jpg'),
(13, 4, ' Buffalo Wings', 'Fried chicken wings tossed in spicy Buffalo sauce served with crisp celery sticks and Blue cheese dip.', 11.00, '606d765f69a19.jpg'),
(14, 4, 'Mac N Cheese Bites', 'Served with our traditional spicy queso and marinara sauce.', 9.00, '606d768a1b2a1.jpg'),
(15, 4, 'Signature Potato Twisters', 'Spiral sliced potatoes, topped with our traditional spicy queso, Monterey Jack cheese, pico de gallo, sour cream and fresh cilantro.', 6.00, '606d76ad0c0cb.jpg'),
(16, 4, 'Meatballs Penne Pasta', 'Garlic-herb beef meatballs tossed in our house-made marinara sauce and penne pasta topped with fresh parsley.', 10.00, '606d76eedbb99.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `remark`
--

CREATE TABLE `remark` (
  `id` int(11) NOT NULL,
  `frm_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `remark` mediumtext NOT NULL,
  `remarkDate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `remark`
--

INSERT INTO `remark` (`id`, `frm_id`, `status`, `remark`, `remarkDate`) VALUES
(1, 2, 'in process', 'none', '2022-05-01 05:17:49'),
(2, 3, 'in process', 'none', '2022-05-27 11:01:30'),
(3, 2, 'closed', 'thank you for your order!', '2022-05-27 11:11:41'),
(4, 3, 'closed', 'none', '2022-05-27 11:42:35'),
(5, 4, 'in process', 'none', '2022-05-27 11:42:55'),
(6, 1, 'rejected', 'none', '2022-05-27 11:43:26'),
(7, 7, 'in process', 'none', '2022-05-27 13:03:24'),
(8, 8, 'in process', 'none', '2022-05-27 13:03:38'),
(9, 9, 'rejected', 'thank you', '2022-05-27 13:03:53'),
(10, 7, 'closed', 'thank you for your ordering with us', '2022-05-27 13:04:33'),
(11, 8, 'closed', 'thanks ', '2022-05-27 13:05:24'),
(12, 5, 'closed', 'none', '2022-05-27 13:18:03'),
(13, 10, 'closed', 'we done', '2023-01-31 10:58:27'),
(14, 11, 'in process', 'ok', '2023-02-01 16:52:23'),
(15, 11, 'closed', 'ok-', '2023-02-01 16:52:43'),
(16, 11, 'rejected', 'ok', '2023-02-01 16:52:57');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `rs_id` int(222) NOT NULL,
  `c_id` int(222) NOT NULL,
  `title` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `phone` varchar(222) NOT NULL,
  `url` varchar(222) NOT NULL,
  `o_hr` varchar(222) NOT NULL,
  `c_hr` varchar(222) NOT NULL,
  `o_days` varchar(222) NOT NULL,
  `address` text NOT NULL,
  `image` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`rs_id`, `c_id`, `title`, `email`, `phone`, `url`, `o_hr`, `c_hr`, `o_days`, `address`, `image`, `date`) VALUES
(1, 1, 'North Street Tavern', 'nthavern@mail.com', '3547854700', 'www.northstreettavern.com', '8am', '8pm', 'mon-sat', '1128 North St, White Plains', '6290877b473ce.jpg', '2022-05-27 08:10:35'),
(2, 2, 'Eataly', 'eataly@gmail.com', '0557426406', 'www.eataly.com', '11am', '9pm', 'Mon-Sat', '800 Boylston St, Boston', '606d720b5fc71.jpg', '2022-05-27 08:06:41'),
(3, 3, 'Nan Xiang Xiao Long Bao', 'nanxiangbao45@mail.com', '1458745855', 'www.nanxiangbao45.com', '9am', '8pm', 'mon-sat', 'Queens, New York', '6290860e72d1e.jpg', '2022-05-27 08:04:30'),
(4, 4, 'Highlands Bar & Grill', 'hbg@mail.com', '6545687458', 'www.hbg.com', '7am', '8pm', 'mon-sat', '812 Walter Street', '6290af6f81887.jpg', '2022-05-27 11:01:03');

-- --------------------------------------------------------

--
-- Table structure for table `res_category`
--

CREATE TABLE `res_category` (
  `c_id` int(222) NOT NULL,
  `c_name` varchar(222) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `res_category`
--

INSERT INTO `res_category` (`c_id`, `c_name`, `date`) VALUES
(1, 'Continental', '2022-05-27 08:07:35'),
(2, 'Italian', '2021-04-07 08:45:23'),
(3, 'Chinese', '2021-04-07 08:45:25'),
(4, 'American', '2021-04-07 08:45:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(222) NOT NULL,
  `username` varchar(222) NOT NULL,
  `f_name` varchar(222) NOT NULL,
  `l_name` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `phone` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `address` text NOT NULL,
  `status` int(222) NOT NULL DEFAULT 1,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `username`, `f_name`, `l_name`, `email`, `phone`, `password`, `address`, `status`, `date`) VALUES
(7, 'user1', 'z', 'Prince', 'user1@mail.com', '+8801111111111', '25f9e794323b453885f5181f1b624d0b', 'Dhaka', 1, '2023-01-31 10:52:08');

-- --------------------------------------------------------

--
-- Table structure for table `users_orders`
--

CREATE TABLE `users_orders` (
  `o_id` int(222) NOT NULL,
  `u_id` int(222) NOT NULL,
  `title` varchar(222) NOT NULL,
  `quantity` int(222) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(222) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `users_orders`
--

INSERT INTO `users_orders` (`o_id`, `u_id`, `title`, `quantity`, `price`, `status`, `date`) VALUES
(1, 4, 'Spring Rolls', 2, 6.00, 'rejected', '2022-05-27 11:43:26'),
(2, 4, 'Prawn Crackers', 1, 7.00, 'closed', '2022-05-27 11:11:41'),
(3, 5, 'Chicken Madeira', 1, 23.00, 'closed', '2022-05-27 11:42:35'),
(4, 5, 'Cheesy Mashed Potato', 1, 5.00, 'in process', '2022-05-27 11:42:55'),
(5, 5, 'Meatballs Penne Pasta', 1, 10.00, 'closed', '2022-05-27 13:18:03'),
(6, 5, 'Yorkshire Lamb Patties', 1, 14.00, NULL, '2022-05-27 11:40:51'),
(7, 6, 'Yorkshire Lamb Patties', 1, 14.00, 'closed', '2022-05-27 13:04:33'),
(8, 6, 'Lobster Thermidor', 1, 36.00, 'closed', '2022-05-27 13:05:24'),
(9, 6, 'Stuffed Jacket Potatoes', 1, 8.00, 'rejected', '2022-05-27 13:03:53'),
(11, 7, 'Yorkshire Lamb Patties', 2, 14.00, 'rejected', '2023-02-01 16:52:57'),
(12, 7, 'Stuffed Jacket Potatoes', 1, 8.00, NULL, '2023-02-01 16:50:51'),
(13, 7, 'Lobster Thermidor', 1, 36.00, NULL, '2023-02-01 16:50:51');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`adm_id`);

--
-- Indexes for table `dishes`
--
ALTER TABLE `dishes`
  ADD PRIMARY KEY (`d_id`);

--
-- Indexes for table `remark`
--
ALTER TABLE `remark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`rs_id`);

--
-- Indexes for table `res_category`
--
ALTER TABLE `res_category`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`);

--
-- Indexes for table `users_orders`
--
ALTER TABLE `users_orders`
  ADD PRIMARY KEY (`o_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `adm_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dishes`
--
ALTER TABLE `dishes`
  MODIFY `d_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `remark`
--
ALTER TABLE `remark`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `rs_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `res_category`
--
ALTER TABLE `res_category`
  MODIFY `c_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users_orders`
--
ALTER TABLE `users_orders`
  MODIFY `o_id` int(222) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
--
-- Database: `vidmed_db`
--
CREATE DATABASE IF NOT EXISTS `vidmed_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vidmed_db`;

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `birthdate` varchar(255) NOT NULL,
  `civil_status` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `religion` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `height` varchar(255) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `service` varchar(255) NOT NULL,
  `appointment_date` varchar(255) NOT NULL,
  `appointment_time` varchar(255) NOT NULL,
  `complaint` text DEFAULT NULL,
  `illness_history` text DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `profile_img` varchar(255) DEFAULT NULL,
  `reason_declining` varchar(255) DEFAULT NULL,
  `reason_reschedule` varchar(255) DEFAULT NULL,
  `reason_refer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `patient_message` text DEFAULT NULL,
  `doctor_message` text DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `office_id` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthdate` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `otp_code` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Not Verified',
  `civil_status` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `workplace` varchar(255) DEFAULT NULL,
  `specialization` text DEFAULT NULL,
  `education` text DEFAULT NULL,
  `prescription` varchar(255) NOT NULL DEFAULT 'No'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medical_records`
--

CREATE TABLE `medical_records` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `document_date` varchar(255) NOT NULL,
  `images` varchar(255) NOT NULL,
  `types` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mho`
--

CREATE TABLE `mho` (
  `id` int(11) NOT NULL,
  `office_id` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthdate` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `otp_code` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Not Verified',
  `civil_status` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `medical_history` text DEFAULT NULL,
  `personal_history` text DEFAULT NULL,
  `complaint` text DEFAULT NULL,
  `illness_history` text DEFAULT NULL,
  `profile_img` varchar(255) NOT NULL,
  `workplace` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `patient_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `types` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `message` text DEFAULT NULL,
  `referred_doctor` varchar(255) DEFAULT NULL,
  `referred_doctor_id` int(11) DEFAULT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prescription`
--

CREATE TABLE `prescription` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `patient_name` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `age` varchar(255) NOT NULL,
  `prescribe` text NOT NULL,
  `license` varchar(255) NOT NULL,
  `date_uploaded` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

CREATE TABLE `referrals` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `initial_doctor` int(11) NOT NULL,
  `referred_doctor` int(11) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reschedule`
--

CREATE TABLE `reschedule` (
  `id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `initial_appointment` varchar(255) NOT NULL,
  `rescheduled_appointment` varchar(255) NOT NULL,
  `date_added` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(255) NOT NULL DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedule`
--

CREATE TABLE `schedule` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `date` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  `is_available` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `test`
--

CREATE TABLE `test` (
  `id` int(11) NOT NULL,
  `otp` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `birthdate` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp(),
  `otp_code` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `civil_status` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `complaint` text DEFAULT NULL,
  `illness_history` text DEFAULT NULL,
  `profile_img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medical_records`
--
ALTER TABLE `medical_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mho`
--
ALTER TABLE `mho`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prescription`
--
ALTER TABLE `prescription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `referrals`
--
ALTER TABLE `referrals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reschedule`
--
ALTER TABLE `reschedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `medical_records`
--
ALTER TABLE `medical_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mho`
--
ALTER TABLE `mho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `prescription`
--
ALTER TABLE `prescription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referrals`
--
ALTER TABLE `referrals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reschedule`
--
ALTER TABLE `reschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedule`
--
ALTER TABLE `schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `test`
--
ALTER TABLE `test`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
