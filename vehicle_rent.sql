-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2022 at 01:59 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vehicle_rent`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(35) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Cars', '2022-02-03 09:36:32', NULL),
(2, 'Motorbike', '2022-02-03 09:36:54', NULL),
(3, 'Bike', '2022-02-03 09:36:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `vehicle_id` int(11) DEFAULT NULL,
  `rentStartDate` date NOT NULL,
  `rentEndDate` date NOT NULL,
  `prepayment` int(11) NOT NULL,
  `isReturned` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `user_id`, `vehicle_id`, `rentStartDate`, `rentEndDate`, `prepayment`, `isReturned`, `createdAt`, `updatedAt`) VALUES
(1, 1, 4, '2022-02-02', '2022-02-28', 1200000, 0, '2022-02-03 03:11:22', NULL),
(2, 2, 4, '2022-02-02', '2022-02-10', 600000, 0, '2022-02-03 03:11:41', NULL),
(3, 3, 2, '2022-02-02', '2022-02-15', 6000, 0, '2022-02-03 03:12:44', NULL),
(4, 4, 1, '2022-01-01', '2022-02-15', 1000000, 0, '2022-02-03 03:13:03', NULL),
(5, 5, 4, '2022-01-15', '2022-02-02', 900000, 1, '2022-02-03 03:13:34', NULL),
(6, 6, 3, '2022-03-01', '2022-03-10', 800000, 0, '2022-02-03 03:14:57', NULL),
(7, 7, 4, '2022-02-28', '2022-03-10', 9000000, 0, '2022-02-03 03:15:22', NULL),
(8, 8, 3, '2022-02-28', '2022-03-10', 9000000, 0, '2022-02-03 03:16:01', NULL),
(9, 9, 3, '2022-02-15', '2022-02-20', 200000, 0, '2022-02-03 03:16:20', NULL),
(10, 10, 3, '2022-02-20', '2022-02-28', 100000, 0, '2022-02-03 03:16:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `address` varchar(30) NOT NULL,
  `birthdate` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `gender`, `address`, `birthdate`, `createdAt`, `updatedAt`) VALUES
(1, 'Rahmat Aulia', 'raul@gmail.com', 'Male', 'Jl. hijau', '1997-05-12', '2022-02-03 03:00:53', NULL),
(2, 'Renita Sellia', 'sell@gmail.com', 'Female', 'Jl. kita masih panjang', '1998-12-04', '2022-02-03 03:01:40', NULL),
(3, 'Kirigaya Rikito', 'kito@gmail.com', 'Male', 'Jl. jalan aja', '2000-01-02', '2022-02-03 03:02:39', NULL),
(4, 'Gambler Shindo', 'gashin@gmail.com', 'Male', 'Jl. bagus', '1998-09-15', '2022-02-03 03:03:40', NULL),
(5, 'Ryuguchi Susanoo', 'ryusan@gmail.com', 'Male', 'Jl. tokyo', '1995-12-01', '2022-02-03 03:04:46', NULL),
(6, 'Firda Susanti', 'firda@gmail.com', 'Female', 'Jl. itu sempit', '1990-04-01', '2022-02-03 03:05:48', NULL),
(7, 'Roki Si Batu', 'rsb@gmail.com', 'Male', 'Jl. bikini bottom', '2003-05-02', '2022-02-03 03:06:32', NULL),
(8, 'Spongebob Stars Tentacle', 'bocahgabung@gmail.com', 'Male', 'Jl. bikini bottom', '2007-07-07', '2022-02-03 03:07:09', NULL),
(9, 'Reza Himawan', 'rezhi@gmail.com', 'Male', 'Jl. nya udah ujung', '2001-02-08', '2022-02-03 03:07:54', NULL),
(10, 'Kirigaya Nezuko', 'kinezu@gmail.com', 'Male', 'Jl. wibu indah', '1999-09-19', '2022-02-03 03:09:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `name` varchar(35) NOT NULL,
  `color` varchar(10) NOT NULL,
  `loc` varchar(25) NOT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `isPrepay` tinyint(1) NOT NULL,
  `capacity` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `reservationBefore` time NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `name`, `color`, `loc`, `isAvailable`, `isPrepay`, `capacity`, `category_id`, `reservationBefore`, `price`, `qty`, `createdAt`, `updatedAt`) VALUES
(1, 'Wimcycle ', 'Red black', 'Jakarta Barat', 1, 1, 1, 3, '15:00:00', 300000, 27, '2022-02-03 02:45:15', '2022-02-03 09:38:15'),
(2, 'Ontel', 'Dark silve', 'Jakarta Selatan', 1, 1, 1, 3, '10:00:00', 30000, 15, '2022-02-03 02:46:07', '2022-02-03 09:38:15'),
(3, 'Fixie', 'Mate black', 'Tangerang Selatan', 1, 0, 1, 3, '08:00:00', 190000, 14, '2022-02-03 02:47:14', '2022-02-03 09:38:15'),
(4, 'Fixie Special Edition', 'Gold luxur', 'Jakarta TImur', 1, 0, 1, 3, '12:00:00', 2400000, 3, '2022-02-03 02:48:28', '2022-02-03 09:38:15'),
(5, 'Brompton', 'Dark red', 'Tangerang Kota', 1, 0, 1, 3, '18:00:00', 2500000, 9, '2022-02-03 02:49:35', '2022-02-03 09:38:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
