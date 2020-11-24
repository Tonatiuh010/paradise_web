<?php
 
require_once("../classes/agTelefono.php");              

       $obj= new agTelefono();
       $obj->setNum($_GET['b']);    
    
       echo $obj->deleteTelefono();
                        
?>
