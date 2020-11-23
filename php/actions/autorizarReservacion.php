<?php
    require_once("../classes/pre_reservacion.php");    

    

    $estado=json_decode($_GET['b']);
    
    $obj=new pre_reservacion();

    if ($estado->status!="Rechazada"){
        echo $obj->altaReservacion($estado->num,$estado->notas);       
    } else {
        echo $obj->rechazarReservacion($estado->num,$estado->notas);       
    }
        
    

   

?>
