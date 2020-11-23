<?php
    require_once("../classes/pre_reservacion.php");
    
        session_start();
        $matricula=$_SESSION['ID'];    

        $obj=new pre_reservacion();
        echo $obj->getAllReservacionesByAgente($matricula);

?>
