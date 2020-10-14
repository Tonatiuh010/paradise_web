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

    $sql="update salon set salNombre='".$_GET['nombre']."', salDesc='".$_GET['desc']."', salCosto=".$_GET['costo'].",
    salCapacidad=".$_GET['capacidad']." where salNum=".$_GET['num'].";";//SQL Sentence



    if ($conn->query($sql)===TRUE){

	    echo "Registrado!";

    } else {

	    echo "Error al momento de registrar:".$sql."-->".$conn->error;
    }

?>