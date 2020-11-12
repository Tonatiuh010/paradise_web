<?php
    require_once("../classes/lugar.php");


    $list= $_GET['lista'];
    $obj= new lugar();                    
    echo $obj->getAllLugares($list);

?>