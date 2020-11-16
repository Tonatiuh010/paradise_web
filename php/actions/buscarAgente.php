<?php
    require_once("../classes/agente.php");

    

    if (isset($_GET['b'])){

    
    $obj=new agente();        
    echo $obj->getAllAgentes($_GET['b']);

   }

   

?>
