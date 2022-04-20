-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 20, 2022 at 09:00 AM
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
(1, 'uploads/Tofan-1650101142287-57177357.jpg', 'Admin', 'Administrator@mail.com', 'GM', 'admin', '$2b$10$Ien.I2FBL7YGLZogT9Z/oOtIWQ9KAz4TYTpsZfJ4wQRf.SxZnE0dq', 'Male', 'MARS', '09098877866', '1999-06-05', '2022-04-12 00:01:55', '2022-04-16 23:02:24'),
(2, 'uploads\\rn_image_picker_lib_temp_813aec70-7c7e-4b20-b7cc-76de0de2bd78-1649734761653-138825056.jpg', 'Mogaf', 'Mogafo6584@carsik.com', '', 'user', '$2b$10$xVHdaTTu1ABivsQJ57O1s.e97nr78BOR0Xq/PxKRhwkv7uIU4lzs.', 'Male', 'Jakarta', '07966186007', '1999-12-12', '2022-04-12 10:36:34', '2022-04-12 10:39:26'),
(3, NULL, 'Roki', 'uni@mail.com', '', 'user', '$2b$10$NkGsCmP.al/DwFZlPCTwKOTekdUrf9FGqQizaBYBoyEowlu4Pym.i', NULL, '', '', '0000-00-00', '2022-04-14 12:04:56', NULL),
(4, NULL, 'Roki', 'roki@mail.com', '', 'user', '$2b$10$ewj0PGahqKEK5jCITk.FceE1pTtZ/I4ajOkkllufMKgvAmbP9VzwG', NULL, '', '', '0000-00-00', '2022-04-16 23:21:09', NULL);

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
(22, NULL, 'Fixie White', 'White', 'Yogyakarta', 1, 0, 1, 3, '12:00:00', 25000, 14, '2022-04-16 23:45:39', NULL),
(23, NULL, 'fix', 'White', 'Yogyakarta', 0, 0, 1, 3, '12:00:00', 25000, 15, '2022-04-16 23:54:47', NULL);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

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
