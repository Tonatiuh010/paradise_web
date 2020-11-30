<?php
require_once("../classes/agente.php");

    session_start();

    $obj=new agente(); 
    $agente= $obj->updateAgente($_SESSION['ID'],$_GET['txtTelefono'],$_GET['txtUsuario'],$_GET['pass']);  

    //$telefono='';
    //$usuario='emma_solis';
    //$contra='';
    //$cliente= $obj->updateCliente($_SESSION['ID'],$telefono,$usuario,$contra);  

    echo $agente;


?>