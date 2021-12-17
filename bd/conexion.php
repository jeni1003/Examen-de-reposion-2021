<?php 
class Conexion{	  
    public static function Conectar() {        
        define('servidor', 'localhost');
        define('db_parque_vehicular_aviles_jenifer', 'campo');
        define('usuario', 'root');
        define('status', '');					        
        $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');			
        try{
            $conexion = new PDO("mysql:host=".servidor."; dbname=".db_parque_vehicular_aviles_jenifer, usuario, status, $opciones);			
            return $conexion;
        }catch (Exception $e){
            die("El error de Conexión es: ". $e->getMessage());
        }
    }
}