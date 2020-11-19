<?php
 
require_once("../classes/imagenes.php");
       
       $imgObj=json_decode($_GET['b']);

       $obj= new imagenes();
       $obj->setNum($imgObj->imagenes->num);    
    
       if ($obj->deleteImagen()){
                 unlink("../../img/lugares/".$imgObj->lugar."/".$imgObj->imagenes->nombre);
       }

       

       
        

       
        
        
?>
