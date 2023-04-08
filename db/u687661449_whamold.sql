-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 04, 2023 at 02:25 PM
-- Server version: 10.6.11-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u687661449_whamold`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `uid` varchar(161) NOT NULL,
  `email` varchar(161) NOT NULL,
  `password` varchar(161) NOT NULL,
  `role` varchar(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `uid`, `email`, `password`, `role`, `createdAt`) VALUES
(5, 's8FzkHZXINi2bYfOyfW0LV6n0olPnnAO1658474098896', 'admin@admin.com', '$2b$10$f/Yxm.BVmCJRdOJoSEit3.U01MjalqEoX4RQ0im1N/iSzOuKoAOeG', 'admin', '2022-07-22 07:14:58');

-- --------------------------------------------------------

--
-- Table structure for table `bot_campaign`
--

CREATE TABLE `bot_campaign` (
  `id` int(11) NOT NULL,
  `reply` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `uid` varchar(255) NOT NULL,
  `unique_id` int(255) DEFAULT NULL,
  `login_status` int(255) NOT NULL DEFAULT 0,
  `qr_code` varchar(1000) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `campaign`
--

CREATE TABLE `campaign` (
  `id` int(11) NOT NULL,
  `login_status` int(255) NOT NULL DEFAULT 0,
  `qr_code` varchar(255) DEFAULT NULL,
  `unique_id` int(255) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `total_msg` int(100) DEFAULT NULL,
  `sent_msg` int(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `campaign`
--

INSERT INTO `campaign` (`id`, `login_status`, `qr_code`, `unique_id`, `uid`, `status`, `total_msg`, `sent_msg`, `created_at`) VALUES
(1, 0, '2@Q1/jHGCjnWb4uCZfbRJ/Xq6jSXgQAUeonNb2SVdAsf86YnMoFOlRldjrJWXFyrHHX2Ay/G3ykgKbSg==,/hYexmyIWFAq/XigiyoJORJoEKsvfvO4GbMMbBCfYTo=,nLcy054CR+QMMQtPvzZL6XJ+Gt0gXBwUSMlblJQHSB8=,MrAUWVfw/IKP1IDPaBIDiWbqtTf1EfTQVv+Cn8Uqwek=', 1669540905, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 2, NULL, '2022-11-27 09:21:45'),
(2, 1, '2@+NpwakOa8b8S++BanaAt2rO21AYSUHZ7emnoAPDQCO9k+zDWKkcnY6u6YnW10oKtmoZMpqvOx8E2tA==,/3VUSRj3F6oY20UDLiUdihUQl4N3hQ0jkZtcr4ZuoS0=,gdh3P9xC+ORYKw/nP220kyyzcrqsgQt9cd0R5/tweVI=,YbW03XanWg4kWoWSF629dQyTMWTQXnYMCYbW0P09lFo=', 1669541056, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 2, 2, '2022-11-27 09:24:16'),
(3, 1, '2@KK2rHhM7mLfio4/EUTUPylo5BW7ReD+1wXRHFVKCO3Zka5Oz7Y+yi50vjw5GEk7B/4zqorRiTUPMoA==,Djbn7WLtqO+6xw5X+QpLQtUWvkNNg7GHCBz9YaIjFSs=,EWkJKf84s28cq+WxCAsZu6m0pXu8H3OE1Si69+256As=,RBwCgrN8Ow6IG6Sge8OavFqHVFBnuxBIliTv9I4KM+8=', 1669542452, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 41, NULL, '2022-11-27 09:47:32'),
(4, 0, '2@1BnFHywNk0ZKRD2gLWmvySvKWcpm5oWAy51+ieDMDv7RaZSNMaRgaFy8sDa677fjtqB+y5a/4oQG1Q==,8qM7ulR4/cXXuLTwPWlFrDmaa7qNgt/C0ubOPhirU2I=,YuxA6FCw5ktwxtHaJTBjlvH3VHYV9tETQ0gcKrL4jTc=,FUHvX7QLGA5fYy0+lC+QKEOrRdGhF1sVe4uO6PPE1kI=', 1669739088, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:24:48'),
(5, 0, NULL, 1669739144, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:25:44'),
(6, 0, NULL, 1669739181, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:26:21'),
(7, 0, NULL, 1669739226, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:27:06'),
(8, 0, NULL, 1669739411, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:30:11'),
(9, 0, NULL, 1669739662, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 2, NULL, '2022-11-29 16:34:22'),
(10, 0, NULL, 1669739703, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 1, NULL, '2022-11-29 16:35:03'),
(11, 0, NULL, 1669739809, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 2, NULL, '2022-11-29 16:36:49'),
(12, 0, NULL, 1669739814, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 2, NULL, '2022-11-29 16:36:54'),
(13, 0, NULL, 1669739870, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 2, NULL, '2022-11-29 16:37:50'),
(14, 0, '2@/PfEf3DD8S+RM/pRcG/xfdj6PmZ7jJIRJD2X3cvjIe5/ebB4/KBzOZrrUL7TPx0hTAcpGs2wNbHxxw==,muhUuJgEEyTGf+R524yMz4kDZ6slhvDkVTIyivvTn1Y=,3Ikokrzslz3azUsHVTBOIq7wO4VndlivL/NF6NJKvkk=,OQgyQ/e2FCnK4OfVAsVFNOW+Lz/DBVvdHBsmqZxozIM=', 1669739947, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 2, NULL, '2022-11-29 16:39:07'),
(15, 0, '2@jc/9juTssV703ckgMteCYvBOzNsauYrAxnftf/0K05DKESY7YB4ijXC66vz/3pUNyYpXc8fwNRJsNg==,2/1td5TsvKEdxumuKKRv2uHz64qGGQln8cwGNoLzthA=,sqrWkLiHDDRlqlJ1vA+Y+O8UTs5ydojv7ONiBtvAZlM=,tlgb4TBOWmchECKIWWNVMgX18Fw1zckzIX50z6xBT7k=', 1669740321, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 1, NULL, '2022-11-29 16:45:21'),
(16, 0, '2@XIKjNYhxYa2l7LgSp8YBvMVxwoTK2tGvoj12KRSRBL0uDxWYQUzBB5eYhe69VkY+lWv29CCBRQTCyA==,HNv38GY8mJAmghsmN0R6QM5oCMIB6osbqL5hzbT/CS4=,3DQzuxMCARJoBiiwtGJLmFAfh8tHb6rHzJPzBst7iCE=,yCzkWBJgnd2fGHNCxsQNwrLJA7pHyldp/a/ypX1rNMM=', 1669740509, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:48:29'),
(17, 0, NULL, 1669740578, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:49:38'),
(18, 0, NULL, 1669740700, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:51:40'),
(19, 0, NULL, 1669740862, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:54:22'),
(20, 0, '2@w/C5uq06CHRm8EiHYkvUON/nFP//Dpj3QImkVrdiA7qRh3UWd2WmHW6TR7D1QfpZEp76CAAA+7ehlg==,6AgRBur6SLgpWbUToDmoC6MRu5V2ZKrsyWkEvHhswlM=,VisTpf/n5ctZMNwtU7VINgEcPVSmlZIYpEp0gOJ4x1k=,v7tjK5GkbmwsMeechYefJAE7mu7JpqvmJlhMKXPMI9k=', 1669741179, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', NULL, 3, NULL, '2022-11-29 16:59:39'),
(21, 1, '2@oLySlXc4uWEqzpGRvUEWP2xGPWQpQePjkyewa8fQwFjvwJ3R524sZPwf11sloILwfPBWeZhGQRU8Sw==,XECdUA29dA0n3Q+CzvYEq1E/e8f143XPmLB7IJah3jc=,/Aias+x3Jiu6seItfcamKyowfWJvN2/TIwUMMAMz+iU=,XqklK3LOyX5X1vDczoqY+MTMLZXnfuWeRiFzFmEofR0=', 1669741816, 'S4sAtWgkqiiUQgQgCBjtRWQkbX7Ih6yw1669738773424', 'Completed', 3, 3, '2022-11-29 17:10:16'),
(22, 1, '2@eJqNBe1BqCfZ4Ru+7BzUjlI09WDcPmzF6n+iY5dgnjFRbFDp81t1IoU+jYKVHkVgP4uWg4MfDkYs3g==,JmE9pgse3V0Jbupta1NmqLt9YzQhkOLIiU/OaLKT80I=,JfSz0suGNrcsTWx2e7PfC3RQvIUD7V9HlfBeKidpQEA=,FHx24Z2dHAbrmXCuvmM38DktAI7dlzaLAgK3TKz8J1w=', 1670053020, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 3, 3, '2022-12-03 07:37:00'),
(23, 0, NULL, 1672059744, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 10, NULL, '2022-12-26 13:02:24'),
(24, 1, '2@NaZ8RJU2w3pmYHJSc+CQaRwwTVxqUAra+j6y0ljIgYsDruJ5mFSgvWFGJWvbzub4yVwwPS4oEwPXKA==,4G8iVWC8InWnr4dOyZA91hn2uI/nZTDycfpYR6yeo14=,FMLyMH/KH9PW7E8q3DImB8bzT/14mnFBXQMQ6IbGqhE=,aXB4EVAeM9bG9vfuf+5iaGifKNIGLAWw9FB0d0yKIEI=', 1672059937, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 10, 10, '2022-12-26 13:05:37'),
(25, 1, '2@JWRq/w2w62H5aOciiVzIG0PX+dhbn3vrxupWz0eP2cJWoAKvnWmdyAxuky4hFZdtpmUGCyoy37GDbg==,y33DK34Y9zkXLx0QeemMJTU/OlUS8gMyX5Z1wTf/ZDE=,XjVUoXRYCFDq1J/PSarD3v7eazOq0kiPcCntPDahTG0=,wqm6Afuz0dL5Co8sNwwq4RRFfa7b6qjNAyFFn9dnq1I=', 1672060223, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 6, 6, '2022-12-26 13:10:23'),
(26, 1, '2@OnfxKN5KK5H4r9DBexVmAVPF0quCRZemI3TTMXEnMx7fUW0qmgcIcDK6WvW5BsPXafU2zTfukR8pMA==,fAv/qdWavxyX+Khz9FX4A62NwIdfM0fZuXYLUzkwxAg=,rHRE41dUC5SrJV/C88G9THnQ3A6AkunvonZ8uh9VbAE=,PCpWY0oZNbIWTC61PH8KY4N0CsdeoO4FseaBYLDSSgA=', 1672060481, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 6, 2, '2022-12-26 13:14:41'),
(27, 1, '2@itkGhz10l94h0Am0V0FXzL3K6OOG+qgZI+dFI+lGysEwe4jy7ejGoXxEpSSCSlij5O+YkrJ9cqjuhw==,P3QJJGbz7Kyyd/13sPRvge61ilJsZT7yZlEI04XXf34=,oqi8klncbnZQ0VvOpaKSOmMytWJVZRqC3EIwk0X1Sj8=,h+4ZDVHDOoKb8yLOLoOrmjFpaGKzAHV0YWVMXidRYkM=', 1672060644, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 6, 3, '2022-12-26 13:17:24'),
(28, 1, '2@h1WZaMix0/fl9SAEsEHGE45AxDQFHkoteLLngNGOHZriufrzF6xjl/4m0MSgDq0k6NX+d1dsZAbB1A==,SnK7i2+zDA8eKooQkaosaOHOGTlqpKP3S3Gd46S15Xo=,nSicJ0AehvtoCWu+/NpBBWzP8DlM0c7+7j8xKobeU2M=,gH3Yx4TcY7zRtMataGYHLap2jF4lwQT6kVeFeqgovdc=', 1672146036, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 12, 12, '2022-12-27 13:00:36'),
(29, 0, '2@5C0cmFr1OJgsV2wi+gZcydW9PyxZz6xDBPoLp9tYYfa+aiJeJB84nuiFcfnApx/cdR6j1I96lFqhLQ==,jJmpky+jth39XmhDv39+pRizL0boxoSuzCLLdU8DMUs=,2/WSpcnLBuMMdt9ZUwVcxoe9pGWGFhfyuPeCj+7XXGw=,4k6duvUW+9p84COAb5aCwjLt5kKU5ilEuH7d29DietI=', 1673357780, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 1, NULL, '2023-01-10 13:36:20'),
(30, 0, '2@aOqJAqCLDzIMnR9zc60g+YJUoKEYO7mAoLeffndOdKhaWMKKKxiTfHSRetC6zIsFyFT+/bMXpX4/Ow==,BREJE5lnW+sgnOAq6+qZPMHsPsnTheRMWaA1IhtYC1o=,I39lzJjmt0hOQLLX6oPdIgCZLvctVsWziOgvcijlK3g=,5LAcHou8TMmS9F7sCfCIXixuMNqx8CaFB9/XV+sJRZM=', 1673686198, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 2, NULL, '2023-01-14 08:49:58'),
(31, 0, '2@4WHdYAL5KVHJbjdx0Q5zhGg73V3RgbfKg3r/hud9PU3OtUpMo9A7y9U+EVBw1rLd+brvOr4grH2NSw==,BxsubYCYuJjARRdQRNnfIoDhcxQsaHHw/XTcs37DYjE=,fy2oO8BXS6ypGgZI5XleM8tLy5eA7PRhxbzQE2e3/A4=,hP7gmRWEbH6Ic/z1kGMf+FvLZmatFuruNpde31+AnF8=', 1673686329, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 1, NULL, '2023-01-14 08:52:09'),
(32, 1, '2@mxPIGyTxrc8uhefQ60tuo+vttPpLPx3yof5ogGASpZkyAR7bQoSstevHKhgCEOij4vZB4udPMHNdEw==,CBjoznfN4xBK70GviIN/TdnMnU/o0eazypsvycmvP3k=,7eex4t0SZM1B3I2DZjDAD6bbuCXJI9cfa/2Ug5yeVm0=,/KfbkgWBg8qhICBPLA243VN/w0LxlVACE5eVEoBiwqE=', 1675605343, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 1, NULL, '2023-02-05 13:55:43'),
(33, 1, '2@jfPK7RXxfXmuNAwJrOf6jDZdX9srSBidJ/Wwy6M+RQM5bvx9xNqAoXMTTNFxqYZQJgIfN2InVpalRw==,erOnoAzcAnS9x4fKJPt8YbVV0bkl0imSwOui//uvPRA=,TRm+1+AsFttyVy58tx+u1fR4UP7wbXXx0qBYBdE+XEc=,eFMbf48EojOFUgx6WReaJD9BzO7PXhRM01nZZzyHa14=', 1675606163, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 2, 2, '2023-02-05 14:09:23'),
(34, 0, NULL, 1679497791, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', NULL, 1, NULL, '2023-03-22 15:09:51'),
(35, 1, '2@pAwQnZ8TZ0ePCjlcJDIh0/673Kzu7ort6OMibTJp/Lf2DGg3bOJMvxydTnPQcEvQZcHT5lxqGvIB5Q==,wJh6/c6Dd4o5XB9+m3priC3iMMbZSLo71OaXBmzCaWo=,BbyNpEU63b6cBoItlT96Ood8ar1fUr406WiQejARkAc=,l0dg12AEQgjfvY6Z/s6MxDzlL2iBJp5jx2IF8zS6raw=', 1679497999, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 2, 2, '2023-03-22 15:13:19'),
(36, 1, '2@8BJXo+JEbvAGm5cXKz/EqvLtI22pPwhOP4xZEfPOGME0LMAX9PcpAbHpbq4jTcnOsUtM1yfDMwvDWg==,1+CtVnRJHTfOQtVTiGyKJJjYX6HeUHlkigRmo77O5nI=,pfEVNcf5eR7c/Z8qCLnqWLJFh1njVJoCzebmrFhvOnE=,4ocTW9AKEnTk67imm1S9jTnwB1RMrIbrz51+YsicJXg=', 1679556386, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 1, 1, '2023-03-23 07:26:26'),
(37, 1, '2@o4I/8TaowbG/7ZW+4/g1eT5dYekzvqB7IvQNGWot33/WoPxf5pYMKYhPuODG3ERi39+Jt2ViIHXbNQ==,kfD7cIKp+o0/Jk3FtUJavfLZxL0IN7UXIMXiKZCsHyU=,u22/gKcUg6sD7+3tk0kMY3LRhO607ZiHoWqqeU5seyk=,0MXe+PIbnFk/DYT87z4mgjT1wZ0E9nWCztCDq2Lkhpw=', 1679556753, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 1, 1, '2023-03-23 07:32:33'),
(38, 1, '2@nrZmJOIk8CUQX0j7Y7YPgCnq+TMx84euSh7Uj+fkr6c4Ax4p51rRVWsMjahhmht7ieXIrxWahrPS6Q==,d76gAoK4+9CW406BVAMwG8kyzTQbZxiEOgpeastvaCc=,GKPdLD3r8cSDHZkNdmU7PDtcFobuITy4RBg7vuC2q0s=,41ezMTb7tUc50LEWPo2wbth8obG/a3xS0/f8VTIJ4B4=', 1679556922, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 2, 2, '2023-03-23 07:35:22'),
(39, 1, '2@cu2KB2fbGXns7EHni7qkGunP/rW7+3htzflyUtk9x8OFxh4MSwGuBEotGhG277yip4u1dIYb82L1oQ==,Sqx2QQ+9uy5Vs5fo98hdYZapDldLSQYnBM7V5Fyb0RY=,miU9tpR+C1a7WEs6TrzU3gJkHt4mt1DIZh0ZyXIHVU4=,6Gd20/ArQPcVzmSbMVNaDsNw0PePV9F2PFoB1YNkNXA=', 1680602598, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Completed', 1, 1, '2023-04-04 10:03:19');

-- --------------------------------------------------------

--
-- Table structure for table `instance`
--

CREATE TABLE `instance` (
  `id` int(11) NOT NULL,
  `uid` varchar(999) DEFAULT NULL,
  `qr` varchar(999) DEFAULT NULL,
  `client_id` varchar(999) DEFAULT NULL,
  `mobile` varchar(999) DEFAULT NULL,
  `status` varchar(999) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `instance`
--

INSERT INTO `instance` (`id`, `uid`, `qr`, `client_id`, `mobile`, `status`, `createdAt`) VALUES
(4, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '2@mpSAPEYI15mmIxlCzhhkxe5Ndh5S+nQqHuBQYhS2P8y4XMid46fiTqFdpOIKHDXcRayj9vr+ssfNdw==,4xEMU32op9OSj5VCImpTE94spgUVQmt0xpC0zfRf8A0=,OnW6qv70p1HACmWRosDmKHw2UbLU4e+TuZEYds/mX3c=,/dALBGgQkpftdKKwpOljJ0/Z3sG/5c/Kqf5TLvzVPdg=', '1680595498059', '919690309316', 'ready', '2023-04-04 08:04:59'),
(6, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '2@PKGGFs+8B/OFbB5JTj3UFyD054TYiCeuC5Ak2hwi8HxMbIoolZqUooiWJvc3pbnlKKgDk++y/y+wVA==,wDet8wJOSLhvLXJ1WSEqddYXnu1B//E40o7NNV7pRDg=,H5ft3urjFncvS/+FnSjgj4JIggXAwsatf0h4EznBeV8=,9JG90CLkzC+yjL5IwSHkURKRhiJLf9DvoQ9BUN5ePsI=', '1680596907845', '919690309316', 'ready', '2023-04-04 08:31:14');

-- --------------------------------------------------------

--
-- Table structure for table `mention_group`
--

CREATE TABLE `mention_group` (
  `id` int(11) NOT NULL,
  `uid` varchar(566) DEFAULT NULL,
  `unique_id` varchar(2999) DEFAULT NULL,
  `qr_code` varchar(999) DEFAULT NULL,
  `login_status` int(1) NOT NULL DEFAULT 0,
  `group_name` varchar(999) DEFAULT NULL,
  `sent_msg` mediumtext DEFAULT NULL,
  `group_found` int(1) NOT NULL DEFAULT 0,
  `media_url` varchar(2999) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `transaction` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `order_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_data`, `transaction`, `order_type`, `created_at`) VALUES
(1, '{\"uid\":\"ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177\",\"email\":\"user@user.com\",\"role\":\"user\",\"password\":\"$2b$10$QzRKu5DrLC9U2hVaP/.bi.8BQoW48qD.sOmzZN..B5YL6u4dfAp8O\",\"iat\":1669540185}', '{\"id\":\"pay_Kl0alIPaylfF73\",\"entity\":\"payment\",\"amount\":160000,\"currency\":\"INR\",\"status\":\"captured\",\"order_id\":null,\"invoice_id\":null,\"international\":false,\"method\":\"netbanking\",\"amount_refunded\":0,\"refund_status\":null,\"captured\":true,\"description\":\"100% secured payment\",\"card_id\":null,\"bank\":\"HDFC\",\"wallet\":null,\"vpa\":null,\"email\":\"tirkeneltu@enayu.com\",\"contact\":\"+919999999999\",\"notes\":[],\"fee\":3776,\"tax\":576,\"error_code\":null,\"error_description\":null,\"acquirer_data\":{\"bank_transaction_id\":\"6430991\"},\"created_at\":1669540204}', 'Razorpay', '2022-11-27 09:10:08');

-- --------------------------------------------------------

--
-- Table structure for table `ping`
--

CREATE TABLE `ping` (
  `id` int(11) NOT NULL,
  `uid` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `admin_response` varchar(1000) DEFAULT NULL,
  `user_email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ping`
--

INSERT INTO `ping` (`id`, `uid`, `message`, `admin_response`, `user_email`) VALUES
(1, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'Hi this is testing', 'Hi this is test reply', 'user@user.com');

-- --------------------------------------------------------

--
-- Table structure for table `plan`
--

CREATE TABLE `plan` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `message_limit` int(200) NOT NULL,
  `cost` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `plan`
--

INSERT INTO `plan` (`id`, `name`, `message_limit`, `cost`) VALUES
(1, 'Test Plan', 90000, 20),
(2, 'test plan 3', 1000, 20),
(7, 'diamond', 1000, 4000);

-- --------------------------------------------------------

--
-- Table structure for table `send_logs`
--

CREATE TABLE `send_logs` (
  `id` int(11) NOT NULL,
  `unique_id` int(11) DEFAULT NULL,
  `uid` varchar(999) DEFAULT NULL,
  `sender` varchar(999) DEFAULT NULL,
  `receiver` varchar(999) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` varchar(999) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `send_logs`
--

INSERT INTO `send_logs` (`id`, `unique_id`, `uid`, `sender`, `receiver`, `message`, `status`, `createdAt`) VALUES
(1, NULL, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello from the other side', 'starting', '2023-04-04 09:43:06'),
(2, NULL, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello from other other side', 'starting', '2023-04-04 09:43:53'),
(3, NULL, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'helo', 'starting', '2023-04-04 09:44:32'),
(4, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello ji', 'starting', '2023-04-04 09:47:19'),
(5, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello ji', 'starting', '2023-04-04 09:49:18'),
(6, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello ji', 'starting', '2023-04-04 09:50:15'),
(7, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello with image', 'starting', '2023-04-04 09:54:20'),
(8, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello with image', 'starting', '2023-04-04 09:55:17'),
(9, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello', 'starting', '2023-04-04 09:55:58'),
(10, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello', 'starting', '2023-04-04 09:57:46'),
(11, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello', 'starting', '2023-04-04 10:00:02'),
(12, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello', 'starting', '2023-04-04 10:02:19'),
(13, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello dear', 'starting', '2023-04-04 10:23:04'),
(16, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello dear', 'done', '2023-04-04 10:31:43'),
(17, 2147483647, 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', '919690309316', '918430088300', 'hello dear', 'done', '2023-04-04 10:32:10');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(161) NOT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'user',
  `uid` varchar(161) NOT NULL,
  `name` varchar(161) NOT NULL,
  `email` varchar(299) NOT NULL,
  `plan` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`plan`)),
  `left_msg` int(255) NOT NULL DEFAULT 0,
  `mobile` varchar(100) DEFAULT NULL,
  `password` varchar(161) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 1,
  `message_limit` int(200) NOT NULL DEFAULT 0,
  `login_status` varchar(200) DEFAULT 'Idle' COMMENT '0 no 1 yes',
  `qr_bot` varchar(1000) DEFAULT NULL,
  `qr_bulk` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `role`, `uid`, `name`, `email`, `plan`, `left_msg`, `mobile`, `password`, `active`, `message_limit`, `login_status`, `qr_bot`, `qr_bulk`, `createdAt`) VALUES
(1, 'user', 'ixZspsvBaPlJ25I6eFB5HsyPjFDvkjNi1669540176177', 'user', 'user@user.com', '{\"id\":7,\"name\":\"diamond\",\"message_limit\":1000,\"cost\":4000}', 999, '919999999999', '$2b$10$hYRN1uAdvfSCoA0qlYHOue3L/A3GgJj/wik.II7djUdaD0ej1Uwpq', 1, 0, 'Idle', NULL, 'NULL', '2022-11-27 09:09:36');

-- --------------------------------------------------------

--
-- Table structure for table `web`
--

CREATE TABLE `web` (
  `id` int(11) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `app_name` varchar(100) NOT NULL,
  `theme_color` varchar(100) NOT NULL,
  `rz_is_is_active` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=no 1=yes',
  `rz_key` varchar(100) NOT NULL,
  `rz_id` varchar(100) NOT NULL,
  `offline_is_active` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=no 1=yes',
  `offline_msg` varchar(300) NOT NULL,
  `paypal_is_active` tinyint(4) NOT NULL DEFAULT 0 COMMENT '0=no 1=yes',
  `paypal_client_id` varchar(100) NOT NULL,
  `paypal_client_secret` varchar(100) NOT NULL,
  `currency_symbol` varchar(10) DEFAULT NULL,
  `exchange_rate` varchar(100) NOT NULL,
  `smtp_host` varchar(100) NOT NULL,
  `smtp_port` varchar(100) NOT NULL,
  `smtp_email` varchar(100) NOT NULL,
  `smtp_password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `web`
--

INSERT INTO `web` (`id`, `logo`, `app_name`, `theme_color`, `rz_is_is_active`, `rz_key`, `rz_id`, `offline_is_active`, `offline_msg`, `paypal_is_active`, `paypal_client_id`, `paypal_client_secret`, `currency_symbol`, `exchange_rate`, `smtp_host`, `smtp_port`, `smtp_email`, `smtp_password`) VALUES
(2, '000481667807168956logo_512x512.png', 'WhatsHam', 'undefined', 1, 'Mo4iDsTUlTyStl2RFrIoqArY', 'rzp_test_HtqEHVKOeTMAOC', 1, 'Conta 00099', 1, 'AQpKVGLUNAgnb6zAzUD-HhAqh6a3IQIaoPY1FU4QH5RwPRfToQ9-raHCXfYgLww14DbwzZcplyAw2XdH', 'EIvQxdwa4KmYSUPXgVuTZ0u-fGNKgTd5_pXTs42AEuaYDTb8nAAHIjVb5TNNZZ3JFiMZJav1acF_keTs', '$', '1', 'smtp.domain.com', '587', 'info@codeyon.com', 'password');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bot_campaign`
--
ALTER TABLE `bot_campaign`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`);

--
-- Indexes for table `campaign`
--
ALTER TABLE `campaign`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `instance`
--
ALTER TABLE `instance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mention_group`
--
ALTER TABLE `mention_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ping`
--
ALTER TABLE `ping`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `send_logs`
--
ALTER TABLE `send_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `web`
--
ALTER TABLE `web`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `bot_campaign`
--
ALTER TABLE `bot_campaign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `campaign`
--
ALTER TABLE `campaign`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `instance`
--
ALTER TABLE `instance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `mention_group`
--
ALTER TABLE `mention_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ping`
--
ALTER TABLE `ping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `send_logs`
--
ALTER TABLE `send_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(161) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `web`
--
ALTER TABLE `web`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
