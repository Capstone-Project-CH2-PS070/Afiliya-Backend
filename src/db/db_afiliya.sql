-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 17, 2023 at 12:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

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
  `product_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
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
-- Table structure for table `tb_otp_email`
--

CREATE TABLE `tb_otp_email` (
  `user_id_otp_email` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email` varchar(50) NOT NULL,
  `otp` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `expiredAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_otp_telephones`
--

CREATE TABLE `tb_otp_telephones` (
  `user_id_otp_telephone` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `otp` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `expiredAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tb_otp_telephones`
--

INSERT INTO `tb_otp_telephones` (`user_id_otp_telephone`, `telephone`, `otp`, `createdAt`, `expiredAt`) VALUES
('130b44caab6be8680d2adcc7f2986090', '6281386176365@c.us', '$2b$10$OJv', '2023-12-16', '2023-12-16'),
('184e1f1304b78dd1c37344d6e36e3992', '6282361484992@c.us', '$2b$10$.TS', '2023-12-16', '2023-12-16');

-- --------------------------------------------------------

--
-- Table structure for table `tb_payments`
--

CREATE TABLE `tb_payments` (
  `payment_id` varchar(225) NOT NULL,
  `order_id` varchar(225) NOT NULL,
  `delivery_service_id` int(11) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `user_id` varchar(225) NOT NULL,
  `address_id` varchar(225) NOT NULL,
  `shop_id` varchar(225) NOT NULL,
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
  `shop_id` varchar(255) NOT NULL,
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
-- Table structure for table `tb_sessions`
--

CREATE TABLE `tb_sessions` (
  `user_id` varchar(225) NOT NULL,
  `session` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `expiredAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

--
-- Dumping data for table `tb_shops`
--

INSERT INTO `tb_shops` (`shop_id`, `user_id`, `shop_name`, `shop_ctg`, `telephone`, `address`, `description`, `createdAt`, `updatedAt`, `shop_image`) VALUES
('555bc7c18457014fbbfd625091f80eda', '1496ea328966df8c6e96d30cb7128d8e', 'Clothing', 'bali', '0858112233', 'Bali, Gianyar', 'Selamat datang di \"Clothing\", destinasi online yang memeluk keindahan dan kekayaan budaya Bali melalui koleksi batik yang memukau. Mempersembahkan batik khas pulau ini dengan harmoni warna dan motif yang memikat.\"Clothing\" bukan sekadar toko online, melainkan jendela virtual ke keindahan seni tradisional Bali. Koleksi batik kami dipilih dengan cermat untuk mencerminkan keunikan dan keanggunan warisan budaya, menciptakan pengalaman berbelanja yang membawa Anda jauh melampaui transaksi biasa.Setiap helai batik yang kami tawarkan merupakan karya seni teliti dari para pengrajin Bali yang berbakat. Dengan setiap pembelian di \"Clothing\", Anda tidak hanya memperoleh produk berkualitas tinggi, tetapi juga mendukung keberlanjutan dan pertumbuhan komunitas pengrajin lokal.Melalui layanan pengiriman yang andal, batik pilihan Anda akan tiba di depan pintu Anda dengan aman dan tepat waktu. \"Clothing\" membawa keindahan Bali ke dalam kehidupan Anda, menghadirkan nuansa pulau dewata melalui kain-kain batik yang berkilau.', '2023-12-16', '2023-12-16', 'https://storage.googleapis.com/shops-bucket-afiliya/f453762020e9087347bb8c510433c85d.jpeg'),
('f8be2d3602ef106a37cd935b5bfae9ac', 'ff783dc6450d3aaa07c46e9b42be663d', 'The Culture', 'dki jakarta', '0858112233', 'Dki Jakarta, Jakarta Selatan', 'Selamat datang di \"The Culture\", destinasi online eksklusif yang mempersembahkan keindahan batik khas daerah DKI Jakarta langsung ke layar perangkat Anda. Di dalam toko online ini, Anda akan menemukan koleksi batik yang memikat, merefleksikan kekayaan warisan budaya dan seni dari ibukota Indonesia.Setiap helai batik yang dipamerkan di \"The Culture\" menghadirkan cerita yang kaya dan motif yang unik, mencerminkan keindahan tradisi dan kreativitas dari masyarakat Jakarta. Desain situs yang elegan dan user-friendly memudahkan Anda untuk menjelajahi koleksi kami dengan detail yang sempurna, memberikan tampilan yang mendalam pada setiap corak dan warna yang memikat.Dengan \"The Culture\", Anda dapat merasakan pengalaman berbelanja batik yang lebih dari sekadar transaksi. Kami tidak hanya menjual pakaian, tetapi juga berbagi cerita dan makna di setiap motif batik yang kami hadirkan. Setiap kain dihasilkan dengan teliti oleh pengrajin lokal, menjaga keaslian dan kualitas batik khas Jakarta yang telah diakui secara internasional.Melalui layanan pengiriman yang andal, batik pilihan Anda akan tiba dengan aman dan tepat waktu di depan pintu Anda. \"The Culture\" berkomitmen untuk tidak hanya mempersembahkan keindahan batik, tetapi juga mendukung keberlanjutan dan pertumbuhan ekonomi bagi komunitas pengrajin lokal.Jelajahi \"The Culture\" dan temukan pesona batik khas DKI Jakarta dalam genggaman Anda. Dengan setiap pembelian, Anda tidak hanya menambah koleksi batik berkualitas tinggi, tetapi juga menjadi bagian dari perjalanan untuk melestarikan dan mempromosikan keindahan budaya yang membanggakan dari ibukota Indonesia.', '2023-12-16', '2023-12-16', 'https://storage.googleapis.com/shops-bucket-afiliya/ce67647151c2cac53059b6f4b7df218b.jpeg'),
('ff1ffb4c4accdd54e6e7ceefe33da70c', '24beb5e522d0b285a69ebee97848dfae', 'Creative', 'Kalimatan Barat', '0858112233', 'Kalimatan Barat', 'Selamat datang di \"Creative\" – toko online yang merayakan keunikan dan kekayaan seni batik khas daerah Kalimantan Barat. Di sini, kami menghadirkan sentuhan inovatif dan keindahan tradisional dalam setiap helai batik, menjadikan produk kami sebagai perwakilan nyata dari warisan budaya yang kaya dari daerah ini.\"Creative\" bukan hanya toko online biasa, melainkan platform yang memadukan keindahan dan kreativitas. Koleksi batik kami dipilih dengan cermat untuk memperlihatkan kekayaan motif dan corak khas Kalimantan Barat, menciptakan pengalaman berbelanja yang membawa Anda menembus pintu ke dalam dunia yang penuh dengan warna dan makna.Melalui \"Creative,\" Anda tidak hanya berbelanja, tetapi juga turut serta dalam memelihara keberlanjutan dan pertumbuhan komunitas pengrajin lokal. Setiap pembelian Anda tidak hanya memberikan penghormatan pada keindahan batik Kalimantan Barat, tetapi juga mendukung para seniman lokal yang menciptakannya.Layanan pengiriman kami yang handal akan membawa batik pilihan Anda langsung ke pintu Anda dengan aman dan cepat. \"Creative\" tidak hanya menawarkan produk, tetapi juga sebuah pengalaman belanja yang mendalam dan bermakna, memperkaya koleksi pribadi Anda dengan keindahan dan kreativitas dari Kalimantan Barat.Jelajahi karya seni batik Kalimantan Barat melalui \"Creative\" dan biarkan diri Anda terinspirasi oleh keindahan dan kerajinan setiap helai batik. Dengan setiap pembelian, Anda tidak hanya menjadi pemilik produk yang unik, tetapi juga pelayan dan pelindung kebudayaan yang indah dari daerah ini.', '2023-12-16', '2023-12-16', 'https://storage.googleapis.com/shops-bucket-afiliya/95d7e64a73a81b48d22515db4e820f7d.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `tb_shops_histories`
--

CREATE TABLE `tb_shops_histories` (
  `history_id` varchar(255) NOT NULL,
  `shop_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
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

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`user_id`, `fullname`, `email`, `password`, `isVerification`, `telephone`, `gender`, `birthplace`, `birthdate`, `image`, `isAffiliator`, `isShop`, `token`, `createdAt`, `updatedAt`) VALUES
('1496ea328966df8c6e96d30cb7128d8e', 'I Made Irawan', 'irawan@gmail.com', '12345', 0, '0858112255', 'laki-laki', 'bali', '2023-10-11', NULL, 0, 0, NULL, '2023-12-16', '2023-12-16'),
('24beb5e522d0b285a69ebee97848dfae', 'Caca Cahyani', 'caca@gmail.com', '12345', 0, '0858112266', 'perempuan', 'kalimatan barat', '2023-10-11', NULL, 0, 0, NULL, '2023-12-16', '2023-12-16'),
('7a25853969c78eca530c0bb9abb3c47a', 'Dodi Ferdiansyah', 'dodi@gmail.com', '12345', 0, '0858112277', 'laki-laki', 'jambi', '2023-10-11', NULL, 0, 0, NULL, '2023-12-16', '2023-12-16'),
('ac37d9dac3423953cd4006f93d38bcba', 'Budi Santoso', 'budi@gmail.com', '12345', 0, '0858112244', 'laki-laki', 'pekalongan', '2023-10-11', NULL, 0, 0, NULL, '2023-12-16', '2023-12-16'),
('ff783dc6450d3aaa07c46e9b42be663d', 'Asep Setiawan', 'asep@gmail.com', '12345', 0, '0858112233', 'laki-laki', 'jakarta', '2023-10-11', 'https://storage.googleapis.com/users-bucket-afiliya/8e06a8924766cf0e63f3e567e06ac5f4.jpeg', 0, 0, NULL, '2023-12-16', '2023-12-16');

-- --------------------------------------------------------

--
-- Table structure for table `tb_users_histories`
--

CREATE TABLE `tb_users_histories` (
  `history_id` varchar(255) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `order_id` varchar(255) NOT NULL,
  `createdAt` date NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_user_address`
--

CREATE TABLE `tb_user_address` (
  `address_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `province` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `sub_district` varchar(50) NOT NULL,
  `address_details` text NOT NULL,
  `placename` varchar(50) NOT NULL,
  `recipient_info` varchar(50) NOT NULL
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
-- Indexes for table `tb_otp_email`
--
ALTER TABLE `tb_otp_email`
  ADD PRIMARY KEY (`user_id_otp_email`);

--
-- Indexes for table `tb_otp_telephones`
--
ALTER TABLE `tb_otp_telephones`
  ADD PRIMARY KEY (`user_id_otp_telephone`);

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
-- Indexes for table `tb_sessions`
--
ALTER TABLE `tb_sessions`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tb_shops`
--
ALTER TABLE `tb_shops`
  ADD PRIMARY KEY (`shop_id`);

--
-- Indexes for table `tb_shops_histories`
--
ALTER TABLE `tb_shops_histories`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `tb_users_histories`
--
ALTER TABLE `tb_users_histories`
  ADD PRIMARY KEY (`history_id`);

--
-- Indexes for table `tb_user_address`
--
ALTER TABLE `tb_user_address`
  ADD PRIMARY KEY (`address_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_comments`
--
ALTER TABLE `tb_comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_user_address`
--
ALTER TABLE `tb_user_address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
