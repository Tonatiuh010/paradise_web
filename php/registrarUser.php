<?php
    require_once("classes/cliente.php");

    $ob_cli= json_decode($_GET['obj']);

    $obj=new cliente($ob_cli->nombre,$ob_cli->paterno,$ob_cli->materno,$ob_cli->nacimiento,$ob_cli->telefono,$ob_cli->usuario,$ob_cli->contrasenia,$ob_cli->correo);    
    $obj->insertarCli();

    //var_dump($obj->getJsonObject());
    //$obj->insertLugar();


    //newUserObj = {
    //            nombre: d1,
    //            paterno: d2,
    //            materno: d3,
    //            nacimiento: d4,
    //            telefono: d5,
    //            correo: d6,
    //            usuario: d7,
    //            contrasenia: d8
    //        }

?>