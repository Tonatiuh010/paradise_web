<?php
    require_once("../classes/pre_reservacion.php");
    
        $obj=new pre_reservacion();
        echo $obj->getAllReservacionesByEstado($_GET['b']);

?>
