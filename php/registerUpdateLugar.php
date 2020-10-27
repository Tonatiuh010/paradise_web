<?php

include("config.php");


$conn= new mysqli($servername	,$username	,$password	,$dbname);

if ($conn->connect_error){
	die("Conexión Fallida: ".$conn->connect_error);
    exit();
}
$ob_lugar=json_decode($_GET['b']);

$sql=null;



if (($ob_lugar->type)==true){
    $obDirec= $ob_lugar->direc->obDirec;
    
    ////////////SP_insert_lugar(
    ////////////in nombre varchar(30),
    ////////////in descripcion text,
    ////////////in costo decimal(12,2),
    ////////////in capacidad int,
    ////////////in tipoLug int,
    ////////////in municipio char(3),
    ////////////# in proveedor char(5),
    
    ////////////in calle varchar(40),
    ////////////in numInt varchar(25),
    ////////////in numExt varchar(25),
    ////////////in cp char(5)
    ////////////)


    if ($obDirec!=false) {
        $sql="call SP_insert_lugar('".$ob_lugar->nombre."','".$ob_lugar->desc."',".$ob_lugar->costo.",".$ob_lugar->capacidad.",'".$ob_lugar->tipoLugar."','".$ob_lugar->estado."','".$obDirec->calle."');";//SQL Sentence
    } else {
        $sql="call SP_insert_lugar('".$ob_lugar->nombre."','".$ob_lugar->desc."',".$ob_lugar->costo.",".$ob_lugar->capacidad.");";//SQL Sentence
    }

    

} else {
    $sql="call SP_update_lugar(".$ob_lugar->numero.",'".$ob_lugar->nombre."','".$ob_lugar->desc."',".$ob_lugar->costo.",".$ob_lugar->capacidad.");";//SQL Sentence

}


if ($conn->query($sql)===TRUE){

    echo "Registrado!";

} else {
    echo "Error al momento de registrar: ".$sql." ---> ".$conn->error;
    
}




?>