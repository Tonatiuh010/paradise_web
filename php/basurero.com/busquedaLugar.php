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

     $sqlEspacios="select * from vw_lugEspacios where numLugar = ".$row['numero'].";";
        $resultEsp=$conn->query($sqlEspacios);

        $obEsp=array();

        if ($resultEsp->num_rows>0){
            while ($rowsEsp=$resultEsp->fetch_assoc()){
                array_push($obEsp, array("nombre"=>$rowsEsp['nombre'],
                                          "num"=>$rowsEsp['numEsp']));
            }
        }

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
                "CP"=>$row['CP'],
                "espacios"=>$obEsp));            

    }

    

        $response=json_encode($ob_lugar);       
        echo $response;
} else {
    echo "No data founded</br>";

    echo "Sentence:".$sql;
}
?>
