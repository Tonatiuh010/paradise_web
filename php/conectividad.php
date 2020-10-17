<?php
$HOST="localhost";
$USER="root";
$PASS="";
$BD="paradise";


$mysqli= new mysqli("localhost","root","","paradise");

if ($mysqli->connect_error) {
    echo 'No pudo conectarse a mysql';
    exit();
}


$sql       = "select * from usuario where usContrasenia = '".$_GET['passwd']."' and (usCorreo='".$_GET['user']."' or usNombre='".$_GET['user']."');";
$resultado = $mysqli->query($sql);

if ($resultado->num_rows>0) {

    while ($fila = $resultado->fetch_assoc()) {
    //usNum, usNombre,usContraseña,usCorreo,usTipoUs

    $vNum = $fila['usNum'];
    $vUserName = $fila['usNombre'];
    $vPassword = $fila['usContrasenia'];
    $vEmail = $fila['usCorreo'];
    $vUserT = $fila['usTipoUs'];
}

    if($vUserT='Cliente'){
        session_start();
    // Guardar datos de sesión
    $_SESSION["usuario"] = $vUserName;

    //$vNewUrl='../html/HTML_PRINCIPAL.html';

    echo true;

    }

}else{
    echo false;

    //echo "Error de BD, no se pudo consultar la base de datos\n";
    //echo "Error MySQL: " . mysql_error();
    //exit();
}



?>
