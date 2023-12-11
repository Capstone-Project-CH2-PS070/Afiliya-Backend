-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 09:07 AM
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
-- Database: `db_afiliya`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_comments`
--

CREATE TABLE `tb_comments` (
  `comment_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `image` varchar(50) NOT NULL,
  `createAt` date NOT NULL DEFAULT current_timestamp(),
  `updateAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_orders`
--

CREATE TABLE `tb_orders` (
  `order_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `shop_id` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `refferal` varchar(8) DEFAULT NULL,
  `delivery_service_id` int(10) NOT NULL,
  `payment_method_id` int(10) NOT NULL,
  `address_id` int(10) NOT NULL,
  `amount` int(100) NOT NULL,
  `price` int(255) NOT NULL,
  `cost` int(255) NOT NULL,
  `total_payment` int(255) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Menunggu Pembayaran',
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_payments`
--

CREATE TABLE `tb_payments` (
  `payment_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `delivery_service_id` int(11) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `address_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `refferal` varchar(8) NOT NULL,
  `price` int(255) NOT NULL,
  `cost` int(255) NOT NULL,
  `total_payment` int(255) NOT NULL,
  `createAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_products`
--

CREATE TABLE `tb_products` (
  `product_id` varchar(255) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_price` int(50) NOT NULL,
  `product_image` varchar(255) NOT NULL,
  `product_stock` int(255) NOT NULL,
  `product_ctg` varchar(100) NOT NULL,
  `weight` int(11) NOT NULL,
  `size` varchar(100) NOT NULL,
  `height` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `description` text NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_shops`
--

CREATE TABLE `tb_shops` (
  `shop_id` varchar(255) NOT NULL,
  `user_id` varchar(225) NOT NULL,
  `shop_name` varchar(50) NOT NULL,
  `shop_ctg` varchar(50) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `address` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp(),
  `shop_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_shops_history`
--

CREATE TABLE `tb_shops_history` (
  `history_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `user_id` varchar(255) NOT NULL,
  `fullname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isVerification` int(1) NOT NULL DEFAULT 0,
  `telephone` varchar(20) NOT NULL,
  `gender` varchar(50) NOT NULL,
  `birthplace` varchar(50) NOT NULL,
  `birthdate` date NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isAffiliator` int(1) NOT NULL DEFAULT 0,
  `isShop` int(1) NOT NULL DEFAULT 0,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_users_history`
--

CREATE TABLE `tb_users_history` (
  `history_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_address`
--

CREATE TABLE `tb_user_address` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `province` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `sub_district` varchar(50) NOT NULL,
  `address_details` text NOT NULL,
  `placename` varchar(50) NOT NULL,
  `recipient_info` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_verification`
--

CREATE TABLE `tb_user_verification` (
  `user_ver_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `verification_code` int(4) NOT NULL,
  `start_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `end_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_comments`
--
ALTER TABLE `tb_comments`
  ADD PRIMARY KEY (`comment_id`);

--
-- Indexes for table `tb_orders`
--
ALTER TABLE `tb_orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `tb_payments`
--
ALTER TABLE `tb_payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `tb_products`
--
ALTER TABLE `tb_products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `tb_shops`
--
ALTER TABLE `tb_shops`
  ADD PRIMARY KEY (`shop_id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tb_user_address`
--
ALTER TABLE `tb_user_address`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `tb_user_verification`
--
ALTER TABLE `tb_user_verification`
  ADD PRIMARY KEY (`user_ver_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_comments`
--
ALTER TABLE `tb_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_payments`
--
ALTER TABLE `tb_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_user_address`
--
ALTER TABLE `tb_user_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_user_verification`
--
ALTER TABLE `tb_user_verification`
  MODIFY `user_ver_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
