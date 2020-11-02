<?php
//sesion.php
session_start();
//verificar si la sesion ya tiene variables, 
//es decir, si está activa o no
if($_SESSION["id"] !='' && $_SESSION['user'] !='' && $_SESSION['type'] !='' )
{   
    $ob_user=array('res'=>true,'tipo'=>$_SESSION['type']);
    echo json_encode($ob_user);

}else
{   
    session_destroy();
    $ob_user=array('res'=>false);
    echo json_encode($ob_user);
}

?>