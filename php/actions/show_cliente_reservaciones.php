<?php
require_once("../classes/pre_reservacion.php");

    session_start();
   
    //$p=10;

    $obj=new pre_reservacion(); 
    $reservacion= $obj->getAllPreReservaciones($_SESSION['ID']);   

    echo $reservacion;

?>