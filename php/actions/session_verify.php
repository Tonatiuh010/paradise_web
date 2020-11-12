<?php
//sesion.php
session_start();
//verificar si la sesion ya tiene variables, 
//es decir, si está activa o no
//($_SESSION['id'] !='' && $_SESSION['user'] !='' && $_SESSION['type'] !='' ) no sirve


if($_SESSION != null)
{   
    $ob_user=array('res'=>true,'tipo'=>$_SESSION['TYPE'],'user'=>$_SESSION['ID']);
    echo json_encode($ob_user);

}else
{   
    session_destroy();
    //header("Location:../index.html");
    $ob_user=array('res'=>false,'tipo'=>'','user'=>'');
    echo json_encode($ob_user);
}

?>