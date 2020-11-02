<?php
//sesion.php
session_start();
//verificar si la sesion ya tiene variables, 
//es decir, si está activa o no
if($_SESSION["id"] !='' && $_SESSION['user'] !='' && $_SESSION['type'] !='' )
{
    echo true;
}else
{
    session_destroy();
    echo false;
}

?>