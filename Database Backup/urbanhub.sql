-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 03, 2025 at 08:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `urbanhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `blog_titile` varchar(255) NOT NULL COMMENT 'title',
  `blog_content` mediumtext NOT NULL,
  `posted_date` date NOT NULL,
  `created_by` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_by` bigint(20) UNSIGNED DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_reviews`
--

CREATE TABLE `blog_reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `blog_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `review` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
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

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\UserDetailsModel', 2, 'API Token', 'b1e9ff0664bd4e50038d2a31760470e059f3c01b7a35179e98498e14ab62df96', '[\"*\"]', NULL, NULL, '2025-10-01 09:55:36', '2025-10-01 09:55:36'),
(2, 'App\\Models\\UserDetailsModel', 2, 'API Token', '1cd4ebc7c1b54a34466edecf14c99793359a66276b32a6856101e1fd08a5b254', '[\"*\"]', '2025-10-01 09:58:16', NULL, '2025-10-01 09:57:45', '2025-10-01 09:58:16'),
(3, 'App\\Models\\UserDetailsModel', 3, 'API Token', '22aef87dff8e0bff551dd3dfaae880580f1291d87f929c5808e7befa8c0c0924', '[\"*\"]', NULL, NULL, '2025-10-01 11:34:16', '2025-10-01 11:34:16'),
(4, 'App\\Models\\UserDetailsModel', 3, 'API Token', '13d2913c40eb98f0033c5e33177b151e4a896bf531a2ecbc7f50ae86e5b7fd62', '[\"*\"]', NULL, NULL, '2025-10-01 11:37:17', '2025-10-01 11:37:17'),
(5, 'App\\Models\\UserDetailsModel', 3, 'API Token', 'cf161000b545b2267db2a6c64f55f6a94b36ce2af4bf751b7088bf18ae34b433', '[\"*\"]', NULL, NULL, '2025-10-01 11:41:34', '2025-10-01 11:41:34'),
(6, 'App\\Models\\UserDetailsModel', 3, 'API Token', '194821d2a14046f6b0cd5dd5f1fb49ebfcafb027add0d69004b396c614d5e273', '[\"*\"]', NULL, NULL, '2025-10-01 11:41:55', '2025-10-01 11:41:55'),
(7, 'App\\Models\\UserDetailsModel', 3, 'API Token', 'ab289a554bef38fdb7d36bf1bd467c3d3a420cc9957894bd5be842c89a7f8d43', '[\"*\"]', NULL, NULL, '2025-10-01 11:44:17', '2025-10-01 11:44:17'),
(8, 'App\\Models\\UserDetailsModel', 3, 'API Token', '90e44c1738bd646993791e6db396a6039aec8bb312d3d5460f388b633ac2dc66', '[\"*\"]', NULL, NULL, '2025-10-01 11:45:25', '2025-10-01 11:45:25'),
(9, 'App\\Models\\UserDetailsModel', 5, 'API Token', '39208bbeb3fbfaf52ce1facc116b9b3185d1c2645fd2a5626214fce10f73da4d', '[\"*\"]', '2025-10-02 00:37:59', NULL, '2025-10-02 00:16:33', '2025-10-02 00:37:59'),
(10, 'App\\Models\\UserDetailsModel', 4, 'API Token', '022bbbd208e9c38394dfd6ca47b21f33db91999cee828c854fde8f0b689415bd', '[\"*\"]', '2025-10-02 13:11:02', NULL, '2025-10-02 13:10:06', '2025-10-02 13:11:02'),
(11, 'App\\Models\\UserDetailsModel', 6, 'API Token', '8c90414aa9daa42350a09e0b7a861ec3c5ca97746bcf9d2e7285ce4866daeec9', '[\"*\"]', '2025-10-03 03:41:42', NULL, '2025-10-03 03:41:19', '2025-10-03 03:41:42'),
(12, 'App\\Models\\UserDetailsModel', 6, 'API Token', 'c676a42a6db578cd9403ff5704d5adb4c92d7869d4311b323923828e28e3070e', '[\"*\"]', '2025-10-03 05:02:25', NULL, '2025-10-03 05:02:14', '2025-10-03 05:02:25'),
(13, 'App\\Models\\UserDetailsModel', 6, 'API Token', '8b70b077a83feac985e9abbe77785aa73e57646ef793d1db9add84e2a80a8db2', '[\"*\"]', NULL, NULL, '2025-10-03 05:02:49', '2025-10-03 05:02:49'),
(14, 'App\\Models\\UserDetailsModel', 6, 'API Token', 'f4f2a680c77cbabb547c2e1f2ab1c472ad994e6d18133f3d65e55100337dd06f', '[\"*\"]', NULL, NULL, '2025-10-03 06:39:32', '2025-10-03 06:39:32'),
(15, 'App\\Models\\UserDetailsModel', 6, 'API Token', '7a8cd03485404f1d7b4fa75cb84cbb8c69f0b3055a1f4752285c7d594ece1166', '[\"*\"]', '2025-10-03 12:41:02', NULL, '2025-10-03 10:57:46', '2025-10-03 12:41:02'),
(19, 'App\\Models\\UserDetailsModel', 9, 'API Token', '4a66eb63775f674ac64aaf633dfece2f025f25e0ce60c4d49afc4fd3553a4cfc', '[\"*\"]', '2025-10-03 13:15:11', NULL, '2025-10-03 13:15:07', '2025-10-03 13:15:11');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('ezRv6uclSm7zhXrwZRJoLRuPwevCgxwpJYmDpcj8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoielR0WE9EZ0lPdWpOTFJFN2FXSGxkbFR3a3o4d1JXdU1RQ0dvWVMzOCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9ibG9ncyI7fX0=', 1759517203);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `name`, `user_name`, `password`, `created_at`, `updated_at`) VALUES
(3, 'Test User', 'test@example.com', '$2y$12$bGj/5YuEV9gCB1vcBwO2jui7MH8ii1f5uo1EBKC6ZG/yN5cg0B3fm', '2025-10-01 15:23:03', '2025-10-01 15:23:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blogs_created_by_foreign` (`created_by`),
  ADD KEY `blogs_updated_by_foreign` (`updated_by`);

--
-- Indexes for table `blog_reviews`
--
ALTER TABLE `blog_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `blog_reviews_blog_id_foreign` (`blog_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_details_user_name_unique` (`user_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `blog_reviews`
--
ALTER TABLE `blog_reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `user_details` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blogs_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `user_details` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_reviews`
--
ALTER TABLE `blog_reviews`
  ADD CONSTRAINT `blog_reviews_blog_id_foreign` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
