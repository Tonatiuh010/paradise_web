<?php
    
include("config.php");

$conn= new mysqli($servername	,$username	,$password	,$dbname);

if ($conn->connect_error){
	die("Conexión Fallida: ".$conn->connect_error);
    exit();
}

    $shc=json_decode($_GET['b']);

$sql="select * from VW_agente_admin where nombre like '".$shc->nombre."%';";
$result=$conn->query($sql);

if ($result->num_rows>0)
{
    $ob_agente=array();
    
    while ($row=$result->fetch_assoc()){
    
        array_push( $ob_agente, array( "nombre" => $row['nombre'], 
                   "apPat"=>$row['apPat'], 
                   "apMat"=>$row['apMat'],
                   "nacimiento"=>$row['nacimiento'], 
                   "genero"=>$row['genero'],
                    "matricula"=>$row['matricula']));

    }

    $response=json_encode(array(
                "type"=>$shc->type,
               "agentesArray"=> $ob_agente
                ));
        
        echo $response;
         
} else {
    echo "No data founded</br>";

    echo "Sentence:".$sql;

    exit();
}




?>