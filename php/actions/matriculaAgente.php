<?php
    require_once("../classes/agente.php");

    session_start();
    $matricula=$_SESSION['ID'];//"mudamuda";

    $obj=new agente($matricula);

    echo $obj->getJsonObject();
?>
