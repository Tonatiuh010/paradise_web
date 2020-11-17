<?php
    require_once("../classes/cliente.php");

    
   // $obj=new cliente();        
   //echo $obj->getAllClientes('');

    if (isset($_GET['b'])){
    
    $obj=new cliente();        
    echo $obj->getAllClientes($_GET['b']);
   }

   

?>
