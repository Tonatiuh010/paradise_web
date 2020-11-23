<?php
    require_once("../classes/pre_reservacion.php");    

    session_start();

    $obj=new pre_reservacion();  
    echo $obj->getAllHistorialAgente($_SESSION['ID']);       
  
  
  
        
    

   

?>
