<?php
    require_once("classes/lugar.php");
    require_once("classes/tipoLugar.php");
    require_once("classes/espacios.php");

    $list= $_GET['lista'];
    $obj= new lugar();                    
    echo $obj->getAllLugares($list);

?>