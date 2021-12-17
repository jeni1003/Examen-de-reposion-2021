<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$Marca = (isset($_POST['Marca'])) ? $_POST['Marca'] : '';
$Modelo = (isset($_POST['Modelo'])) ? $_POST['Modelo'] : '';
$Marca = (isset($_POST['Marca'])) ? $_POST['Marca'] : '';
$year = (isset($_POST['year'])) ? $_POST['year'] : '';
$num_motor = (isset($_POST['num_motor'])) ? $_POST['num_motor'] : '';
$Num_Chasis = (isset($_POST['Num_Chasis'])) ? $_POST['Num_Chasis'] : '';
$Status = (isset($_POST['Status'])) ? $_POST['Status'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idVehiculo = (isset($_POST['idVehiculo'])) ? $_POST['idVehiculo'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO campo (Marca, Modelo, Marca, year, num_motor, Num_Chasis) VALUES('$Marca', '$Modelo', '$Marca', '$year', '$num_motor', '$Num_Chasis') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM campo ORDER BY idVehiculo DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE campo SET Marca='$Marca', Modelo='$Modelo', Marca='$Marca', year='$year', num_motor='$num_motor', Num_Chasis='$Num_Chasis' WHERE idVehiculo='$idVehiculo' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM campo WHERE idVehiculo='$idVehiculo' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM campo WHERE idVehiculo='$idVehiculo' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM campo";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;