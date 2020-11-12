<?php

require_once("../classes/cliente.php");

    session_start();

    $obj=new cliente($_SESSION['ID']); 
    $cliente= $obj->getJsonObject();  

    echo $cliente;

?>