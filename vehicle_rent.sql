-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2022 at 06:36 PM
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
(1, 'Car', '2022-02-13 10:34:25', NULL),
(2, 'Motorbike', '2022-02-13 10:34:40', NULL),
(3, 'Bike', '2022-02-13 10:35:00', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `forgotrequest`
--

CREATE TABLE `forgotrequest` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `code` varchar(6) NOT NULL,
  `isExpired` tinyint(4) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `vehicleId` int(11) DEFAULT NULL,
  `rentStartDate` date NOT NULL,
  `rentEndDate` date NOT NULL,
  `prepayment` int(11) NOT NULL,
  `isReturned` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `image` text DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `username` varchar(80) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `password` varchar(100) NOT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `address` text NOT NULL,
  `phone` varchar(15) NOT NULL,
  `birthdate` date NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `image`, `name`, `email`, `username`, `role`, `password`, `gender`, `address`, `phone`, `birthdate`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'Admin', 'admin@mail.com', 'admin', 'admin', '$2b$10$jLUfQyARjQ08KXjWen8L7eu8b2p1aYxKLfY4SkeVPJt9Fs5gdXloa', NULL, '', '', '0000-00-00', '2022-05-13 17:13:46', '2022-05-13 23:35:16');

-- --------------------------------------------------------

--
-- Table structure for table `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `image` text DEFAULT NULL,
  `name` varchar(35) NOT NULL,
  `color` varchar(35) NOT NULL,
  `loc` varchar(35) NOT NULL,
  `isAvailable` tinyint(1) NOT NULL,
  `isPrepay` tinyint(1) NOT NULL DEFAULT 0,
  `capacity` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `reservationBefore` time NOT NULL,
  `paymentMethod` enum('Cash','Transfer','Excash') NOT NULL DEFAULT 'Cash',
  `price` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `image`, `name`, `color`, `loc`, `isAvailable`, `isPrepay`, `capacity`, `categoryId`, `reservationBefore`, `paymentMethod`, `price`, `stock`, `createdAt`, `updatedAt`) VALUES
(1, 'vehicool/uploads/u4Qn1xW4NB-1652169442990', 'Lamborghini', 'Orange', 'South Jakarta', 1, 0, 2, 1, '13:00:00', 'Cash', 1500000, 10, '2022-05-10 14:57:25', '2022-05-10 15:00:04'),
(2, 'vehicool/uploads/FRfSae0P88-1652169490971', 'Jeep', 'White', 'Yogyakarta', 1, 0, 4, 1, '12:00:00', 'Transfer', 120000, 15, '2022-05-10 14:58:13', '2022-05-10 15:00:36'),
(3, 'vehicool/uploads/uJ3NHg4wPq-1652169549066', 'Jeep', 'Cream', 'Kalimantan', 1, 0, 1, 1, '13:00:00', 'Cash', 245000, 5, '2022-05-10 14:59:11', NULL),
(4, 'vehicool/uploads/bwABiZAU0K-1652169694119', 'Van', 'Green', 'Yogyakarta', 1, 0, 6, 1, '13:00:00', 'Cash', 120000, 5, '2022-05-10 15:01:37', NULL),
(5, 'vehicool/uploads/-UQMEkCLMg-1652169770521', 'Cafe Racer', 'Black', 'South Jakarta', 1, 0, 2, 2, '15:00:00', 'Cash', 250000, 15, '2022-05-10 15:02:53', '2022-05-10 15:05:05'),
(6, 'vehicool/uploads/yBQ3c4pogO-1652169820318', 'Vario', 'Black', 'Yogyakarta', 1, 0, 2, 2, '12:00:00', 'Transfer', 100000, 20, '2022-05-10 15:03:43', '2022-05-10 15:04:51'),
(7, 'vehicool/uploads/UcwJiBBlYg-1652169875823', 'Fixie', 'Silver', 'South Jakarta', 1, 0, 1, 3, '13:00:00', 'Cash', 25000, 5, '2022-05-10 15:04:38', NULL),
(8, 'vehicool/uploads/SaDkMDkVKg-1652169969512', 'Onthel', 'Silver', 'Kalimantan', 1, 0, 1, 3, '13:00:00', 'Cash', 10000, 30, '2022-05-10 15:06:12', NULL),
(9, 'vehicool/uploads/uKG-TK1xBI-1652320764720', 'Vespa', 'White', 'South Jakarta', 1, 0, 2, 2, '10:00:00', 'Transfer', 100000, 20, '2022-05-12 08:59:27', NULL),
(10, 'vehicool/uploads/aCu5ZGmmqz-1652320904437', 'KLX', 'Black White', 'Kalimantan', 1, 0, 2, 2, '12:00:00', 'Cash', 200000, 26, '2022-05-12 09:01:47', NULL),
(11, 'vehicool/uploads/pdJgWTlOJM-1652320966017', 'Mountain Bike', 'White', 'Yogyakarta', 1, 0, 1, 3, '15:00:00', 'Cash', 80000, 10, '2022-05-12 09:02:48', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forgotrequest`
--
ALTER TABLE `forgotrequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`userId`),
  ADD KEY `vehicle_id` (`vehicleId`),
  ADD KEY `userId` (`userId`);

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
  ADD KEY `category_id` (`categoryId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `forgotrequest`
--
ALTER TABLE `forgotrequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `forgotrequest`
--
ALTER TABLE `forgotrequest`
  ADD CONSTRAINT `forgotrequest_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `histories_ibfk_2` FOREIGN KEY (`vehicleId`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `vehicles`
--
ALTER TABLE `vehicles`
  ADD CONSTRAINT `vehicles_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
