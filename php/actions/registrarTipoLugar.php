<?php
 
require_once("../classes/tipoLugar.php");

        $obj=new tipoLugar();   
        $obj->setNombre($_GET['b']);         
        $obj->insertTL();       
?>
