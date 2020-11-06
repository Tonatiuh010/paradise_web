<?php
    require_once("lugar.php");

    $obj=new lugar();

    echo '<pre>';
    var_dump($obj->getAllLugares('S'));
    echo '</pre>';

?>
