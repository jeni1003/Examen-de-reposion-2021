-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-12-2021 a las 22:13:13
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_parque_vehicular_aviles_jenifer`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `campo`
--

CREATE TABLE `campo` (
  `idVehiculo` int(10) NOT NULL,
  `Marca` text NOT NULL,
  `Modelo` text NOT NULL,
  `year` int(4) NOT NULL,
  `num_motor` char(25) NOT NULL,
  `Num_chasis` char(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `campo`
--

INSERT INTO `campo` (`idVehiculo`, `Marca`, `Modelo`, `year`, `num_motor`, `Num_chasis`) VALUES
(0, 'TOY', 'toy0', 2020, 'To01567982', 'Toyo971456'),
(1, 'TOY', 'toy0', 2020, 'To01567982', 'Toyo971456');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
