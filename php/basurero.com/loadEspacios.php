<?php
    
include('config.php');


//$conn=@mysqli_connect($HOST,$USER,$PASS,$BD);
$conn= new mysqli($servername,$username	,$password,$dbname);

if ($conn->connect_error){
	die("Conexión Fallida: ".$conn->connect_error);
    exit();
}


$sql="select * from VW_espacios_admim;";
$result=$conn->query($sql);

if ($result->num_rows>0)
{
    $ob_Es=array();
    
    while ($row=$result->fetch_assoc()){
    
        array_push( $ob_Es ,array( "num" => $row['numero'], 
                   "nombre"=>$row['nombre']
                   ));

    }

    $response=json_encode($ob_Es);
        
        echo $response;
         
} else {
    echo "No data founded</br>";

    echo "Sentence:".$sql;

    exit();
}




?>