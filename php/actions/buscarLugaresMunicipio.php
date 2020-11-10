<?php
    require_once("../classes/lugar.php");

    if (isset($_GET['b'])){
        $obj=new lugar();
        echo $obj->getAllLugaresByMunicipio($_GET['b']);

    }   

?>
