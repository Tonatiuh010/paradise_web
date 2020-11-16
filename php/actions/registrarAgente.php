<?php
 
require_once("../classes/agente.php");

    $ob_agente= json_decode($_GET['b']);          
     
    $obj=new agente($ob_agente->nombre,$ob_agente->apPat,$ob_agente->apMat,$ob_agente->fecNac,$ob_agente->genero,$ob_agente->telefono,$ob_agente->usuario->nameUser,$ob_agente->usuario->passwd->passContent,$ob_agente->usuario->correo);    
     //$obj=new agente('pepeGrillo','pepeAp','Apppp','2001-12-12','Masculino','','User0998','123','maijsl@megaMail.com');    
    $obj->insertarAgente();
    
    
?>
