<?php
    include("config.php");

$conn= new mysqli($servername	,$username	,$password	,$dbname);

if ($conn->connect_error){
	die("Conexión Fallida: ".$conn->connect_error);
    exit();
}

$shc=json_decode($_GET['b']);

$sql="select * from VW_lugar_admin where nombre like '".$shc->search."%';";
$result=$conn->query($sql);

if ($result->num_rows>0){
    $ob_lugar=array();

    while ($row=$result->fetch_assoc()){

   array_push( $ob_lugar ,array(
                "nombre"=>$row['nombre'], 
               "desc"=>$row['_desc'], 
               "costo"=>$row['costo'],
               "capacidad"=>$row['capacidad'], 
               "numero"=>$row['numero'],
                "tipoLugar"=>$row['tipoLugar'],
                "calle"=>$row['calle'],
                "numInt"=>$row['numInterior'],
                "numExt"=>$row['numExterior'],
                "CP"=>$row['CP']));     


    
    
        //$sqlEspacios="select * from VW_lugar_admin where num like '".$shc->search."%';";
        //$resultEsp=$conn->query($sqlEspacios);

        //if ($resultEspacios->num_rows>0){
        //    while ($rowsEsp=$resultEspacios->fetch_assoc()){
                
        //    }
        //}

    }
        $response=json_encode(array("obLugar"=>$ob_lugar,"type"=>$shc->type));       
        echo $response;
} else {
    echo "No data founded</br>";

    echo "Sentence:".$sql;
}
?>
