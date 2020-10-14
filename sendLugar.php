<?php

$servername="localhost";
$username="root";
$password="losseisbastardos12";
$dbname="paradise";
// Credentials


$conn= new mysqli($servername	,$username	,$password	,$dbname);

if ($conn->connect_error){
	die("Conexión Fallida: ".$conn->connect_error);
    exit();
}

$sql="insert into salon (salNombre,salDesc,salCosto,salCapacidad) 
values ('".$_GET['nombre']."','".$_GET['desc']."',".$_GET['costo'].",".$_GET['capacidad'].");";//SQL Sentence



if ($conn->query($sql)===TRUE){

	echo "Registrado!";

} else {

	echo "Error al momento de registrar:".$sql."-->".$conn->error;
}




?>