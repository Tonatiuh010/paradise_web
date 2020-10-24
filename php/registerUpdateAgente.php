<?php
   include("config.php");

    $conn= new mysqli($servername	,$username	,$password	,$dbname);

    if ($conn->connect_error){
	    die("Conexión Fallida: ".$conn->connect_error);
        exit();
    }

    $ob_agente=json_decode($_GET['b']);

    $sql=null;

    if ($ob_agente->type==true){

         $sql="call SP_insert_agente('".$ob_agente->nombre."','".$ob_agente->apPat."','".$ob_agente->apMat."','".$ob_agente->date."','".$ob_agente->genre."');";

    } else {

         $sql="call SP_update_agente('".$ob_agente->matricula."','".$ob_agente->nombre."','".$ob_agente->apPat."','".$ob_agente->apMat."','".$ob_agente->date."','".$ob_agente->genre."');";

    }

   

    if ($conn->query($sql)===TRUE){
        echo "Registrado";
    } else {
        echo "Error al momento de registrar:".$sql."-->".$conn->error;
    }
?>