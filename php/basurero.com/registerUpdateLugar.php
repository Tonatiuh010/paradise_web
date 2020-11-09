<?php
include("config.php");


$conn= new mysqli($servername,$username,$password,$dbname);

if ($conn->connect_error){
	die("Conexión Fallida: ".$conn->connect_error);
    exit();
}
$ob_lugar=json_decode($_GET['b']);

$sql=null;

if (($ob_lugar->type)==true){
    $obDirec= $ob_lugar->direc->obDirec;    
    //out numLug int,    
    //in nombre varchar(30),
    //in descripcion text,
    //in costo decimal(12,2),
    //in capacidad int,
    //in tipoLug int,
    //# in proveedor char(5),
    
    //in calle varchar(40),
    //in numInt varchar(25),
    //in numExt varchar(25),
    //in cp char(5),
    //in municipio char(3)

    $conn->query("set @numLug=0;");
    if ($obDirec!=false) {
        $sql="call SP_insert_lugar(@numLug,'".$ob_lugar->nombre."','".$ob_lugar->desc."',".$ob_lugar->costo.",".$ob_lugar->capacidad.",".$ob_lugar->tipoLugar.",'".$obDirec->calle."','".$obDirec->numIn."','".$obDirec->numEx."','".$obDirec->cp."','".$ob_lugar->estado."');";//SQL Sentence
    } else {
        $sql="call SP_insert_lugar(@numLug,'".$ob_lugar->nombre."','".$ob_lugar->desc."',".$ob_lugar->costo.",".$ob_lugar->capacidad.",".$ob_lugar->tipoLugar.",null,null,null,null,'".$ob_lugar->estado."');";//SQL Sentence
    }

    
} else {
    $sql="call SP_update_lugar(".$ob_lugar->numero.",'".$ob_lugar->nombre."','".$ob_lugar->desc."',".$ob_lugar->costo.",".$ob_lugar->capacidad.");";//SQL Sentence

}
    if ($conn->query($sql)===TRUE){
        if (($ob_lugar->type)==true) {
                $arrayEsp=$ob_lugar->espacios->arrayId;

                $resLug=$conn->query("select @numLug as num;");
    
                $numLug=$resLug->fetch_assoc();
       
                for ($x=0; $x<count($arrayEsp);$x++){
                     $sqlInsEspacios="call SP_insertar_EspLug(".$arrayEsp[$x].",".$numLug['num'].");";
                     $conn->query($sqlInsEspacios);         
                }
            }
            echo "Registrado";
} else {
    echo "Error al momento de registrar: ".$sql." ---> ".$conn->error;
}
?>