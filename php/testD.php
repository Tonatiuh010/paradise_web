<?php

require_once("classes/cliente.php");

    session_start();
    //$id=$_SESSION['ID'];

    $obj=new cliente(); 
    echo $obj->getAllClientes($_SESSION['ID']);  
    
    //echo $obj->getAllPreReservaciones(1);

    //echo $_GET['obj'];
?>