<?php
require_once("../classes/cliente.php");

    session_start();

    $obj=new cliente(); 
    $cliente= $obj->updateCliente($_SESSION['ID'],$_GET['txtTelefono'],$_GET['txtUsuario'],$_GET['txtPass']);  

    //$telefono='';
    //$usuario='emma_solis';
    //$contra='';
    //$cliente= $obj->updateCliente($_SESSION['ID'],$telefono,$usuario,$contra);  

    echo $cliente;


?>