<?php
    require_once("classes/agente.php");
    require_once("classes/cliente.php");
    require_once("classes/pre_reservacion.php");

 
    $obj=new pre_reservacion();        
    echo $obj->getAllPreReservaciones(1);

    //echo $_GET['obj'];
?>