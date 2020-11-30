<?php

require_once("../classes/pre_reservacion.php");
require_once("../classes/cliente.php");


$ob=new pre_reservacion();    
$ob->setNum($_GET['res']);
$respuesta=$ob->cliente_cancelarPR();

if($respuesta==true){
    $mensaje='La reservaci&oacute;n fue cancelada';
    echo $mensaje;
}else{
    $mensaje='Se ha presentado un problema, vuelva a intentarlo más tarde';
    echo $mensaje;
}
                


?>