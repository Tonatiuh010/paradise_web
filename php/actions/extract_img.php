<?php

require_once("../classes/imagenes.php");


$imagenes = new imagenes();
$img=$imagenes->getAllImagenesByLugar($_GET['lug']);
//var_dump($res);
echo $img;

?>