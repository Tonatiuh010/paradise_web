<?php
   
require_once("../classes/lugar.php");

    $ob_lugar= json_decode($_GET['b']);   
    
    
        $obj=new lugar($ob_lugar->numero,$ob_lugar->costo,$ob_lugar->capacidad,$ob_lugar->espacios);    
        $obj->updateLugar();    
   

?>
