<?php
   
require_once("../classes/pre_reservacion.php");

    $ob_get= json_decode($_GET['b']);   
    
    
        $obj=new pre_reservacion();       
        echo $obj->updateAgentePR($ob_get->matricula,$ob_get->pr);    
   

?>
