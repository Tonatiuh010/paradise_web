<?php

require_once("../classes/pre_reservacion.php");

    session_start();
   
    //$p=10;

    $obj=new pre_reservacion(); 
    $obj->setCliente($_SESSION['ID']);
    $reservacion= $obj->getAllReservacionesByEstadoAndCliente($_GET['status']);   

    echo $reservacion;

?>