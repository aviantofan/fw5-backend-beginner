-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2022 at 04:06 AM
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
  `image` text DEFAULT NULL,
  `name` varchar(35) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `image`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'uploads\\CARS-1644723265851-207114869.jpg', 'Car', '2022-02-13 10:34:25', NULL),
(2, 'uploads\\MOTORBIKE-1644723280351-611253966.jpg', 'Motorbike', '2022-02-13 10:34:40', NULL),
(3, 'uploads\\BIKE-1644723300479-248651813.jpg', 'Bike', '2022-02-13 10:35:00', NULL);

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

--
-- Dumping data for table `forgotrequest`
--

INSERT INTO `forgotrequest` (`id`, `userId`, `code`, `isExpired`, `createdAt`, `updatedAt`) VALUES
(1, 1, '630406', 1, '2022-02-14 11:32:33', '2022-02-14 11:33:48');

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

--
-- Dumping data for table `histories`
--

INSERT INTO `histories` (`id`, `userId`, `vehicleId`, `rentStartDate`, `rentEndDate`, `prepayment`, `isReturned`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, '2021-02-20', '2021-02-28', 100000, 1, '2022-02-27 12:30:30', NULL),
(2, 1, 2, '2021-03-08', '2021-04-01', 100000, 1, '2022-02-27 12:35:17', NULL),
(3, 1, 2, '2021-04-05', '2021-04-20', 100000, 1, '2022-02-27 12:36:02', NULL),
(4, 1, 2, '2021-05-09', '2021-05-11', 100000, 1, '2022-02-27 12:36:31', NULL),
(5, 1, 6, '2021-02-08', '2021-02-11', 100000, 1, '2022-02-27 22:17:17', NULL),
(6, 1, 6, '2021-02-14', '2021-02-16', 100000, 1, '2022-02-27 22:17:35', NULL),
(7, 1, 6, '2021-02-19', '2021-02-25', 100000, 1, '2022-02-27 22:17:46', NULL),
(8, 1, 6, '2021-03-01', '2021-03-05', 100000, 1, '2022-02-27 22:18:03', NULL),
(9, 1, 6, '2021-03-07', '2021-03-10', 100000, 1, '2022-02-27 22:18:29', NULL),
(10, 1, 6, '2021-03-12', '2021-03-13', 100000, 1, '2022-02-27 22:18:41', NULL),
(11, 1, 6, '2021-03-15', '2021-03-25', 100000, 1, '2022-02-27 22:18:51', NULL),
(12, 1, 9, '2021-01-01', '2021-01-02', 100000, 1, '2022-02-27 22:21:43', NULL),
(13, 1, 9, '2021-01-10', '2021-01-12', 100000, 1, '2022-02-27 22:21:53', NULL),
(14, 1, 9, '2021-01-18', '2021-01-22', 100000, 1, '2022-02-27 22:22:06', NULL),
(15, 1, 9, '2021-01-25', '2021-01-27', 100000, 1, '2022-02-27 22:22:18', NULL),
(16, 1, 10, '2021-01-25', '2021-01-27', 100000, 1, '2022-02-27 22:23:16', NULL),
(17, 1, 12, '2021-01-30', '2021-02-03', 100000, 1, '2022-02-27 22:23:42', NULL),
(18, 1, 12, '2021-02-05', '2021-02-08', 100000, 1, '2022-02-27 22:24:01', NULL),
(19, 1, 12, '2021-02-09', '2021-02-15', 100000, 1, '2022-02-27 22:24:20', NULL),
(20, 1, 12, '2021-02-18', '0000-00-00', 100000, 1, '2022-02-27 22:25:26', NULL),
(21, 1, 8, '2021-05-18', '2021-05-20', 100000, 1, '2022-02-27 22:26:51', NULL),
(22, 1, 8, '2021-05-22', '2021-05-24', 100000, 1, '2022-02-27 22:27:03', NULL),
(23, 1, 8, '2021-05-30', '2021-06-04', 100000, 1, '2022-02-27 22:27:18', NULL),
(24, 1, 8, '2021-06-07', '2021-06-08', 100000, 1, '2022-02-27 22:41:24', NULL),
(25, 1, 8, '2021-06-10', '2021-06-12', 100000, 1, '2022-02-27 22:41:44', NULL);

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

INSERT INTO `users` (`id`, `image`, `name`, `email`, `username`, `password`, `gender`, `address`, `phone`, `birthdate`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'felix', 'xasos97671@goonby.com', 'eexxprd', '$2b$10$S9t5kSrm4rks6irtd7JJMOmffzBDnICEo4iise4HXTXWe.TpFxYDy', NULL, '', '', '0000-00-00', '2022-02-14 11:31:53', '2022-02-14 11:33:48');

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
  `isPrepay` tinyint(1) NOT NULL,
  `capacity` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `reservationBefore` time NOT NULL,
  `price` int(11) NOT NULL,
  `qty` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicles`
--

INSERT INTO `vehicles` (`id`, `image`, `name`, `color`, `loc`, `isAvailable`, `isPrepay`, `capacity`, `categoryId`, `reservationBefore`, `price`, `qty`, `createdAt`, `updatedAt`) VALUES
(1, 'uploads\\merapi-1645708427883-330171527.png', 'Van', 'Orange', 'Yogyakarta', 1, 0, 6, 1, '12:00:00', 130000, 14, '2022-02-24 20:13:47', NULL),
(2, 'uploads\\lambo-1645708496375-953593192.png', 'Lamborghini', 'Orange', 'South Jakarta', 1, 0, 2, 1, '12:00:00', 245000, 14, '2022-02-24 20:14:56', '2022-03-06 15:04:38'),
(3, 'uploads\\bromo-1645708560193-959532897.png', 'Jeep', 'Cream', 'Malang', 1, 0, 2, 1, '12:00:00', 120000, 14, '2022-02-24 20:16:00', NULL),
(4, 'uploads\\jeep-white-1645708597802-547812766.png', 'Jeep White', 'White', 'Kalimantan', 1, 0, 2, 1, '12:00:00', 150000, 14, '2022-02-24 20:16:37', NULL),
(5, 'uploads\\vespa-1645708639078-395984186.png', 'Vespa', 'White', 'Yogyakarta', 1, 0, 2, 2, '12:00:00', 170000, 14, '2022-02-24 20:17:19', '2022-02-24 20:22:12'),
(6, 'uploads\\teluk-bogam-1645708684045-579324185.png', 'Honda KLX', 'Silver', 'Kalimantan', 1, 0, 2, 2, '12:00:00', 100000, 14, '2022-02-24 20:18:04', '2022-02-24 20:21:59'),
(7, 'uploads\\honda-1645708750191-405871581.png', 'Honda', 'Black', 'Malang', 1, 0, 2, 2, '12:00:00', 50000, 14, '2022-02-24 20:19:10', '2022-02-24 20:21:41'),
(8, 'uploads\\malioboro-1645708793665-507373267.png', 'Matic Bike', 'Black', 'Yogyakarta', 1, 0, 2, 2, '12:00:00', 25000, 14, '2022-02-24 20:19:53', '2022-02-24 20:21:29'),
(9, 'uploads\\fixie-1645708835113-266981439.png', 'Fixie', 'Black', 'Yogyakarta', 1, 0, 1, 3, '12:00:00', 10000, 14, '2022-02-24 20:20:35', NULL),
(10, 'uploads\\sports-1645708995652-74532490.png', 'Sport Bike', 'Silver', 'Kalimantan', 1, 0, 1, 3, '12:00:00', 25000, 14, '2022-02-24 20:23:15', NULL),
(11, 'uploads\\onthel-1645709036747-872500364.png', 'Onthel', 'Blue', 'Malang', 1, 0, 1, 3, '12:00:00', 25000, 14, '2022-02-24 20:23:56', NULL),
(12, 'uploads\\fixie-white-1645709069489-993152165.png', 'Fixie White', 'White', 'Yogyakarta', 1, 0, 1, 3, '12:00:00', 25000, 14, '2022-02-24 20:24:29', NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `forgotrequest`
--
ALTER TABLE `forgotrequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
