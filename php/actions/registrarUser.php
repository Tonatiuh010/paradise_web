<?php
    require_once("../classes/cliente.php");
    require_once("../classes/agente.php");

    //$ob_ag= json_decode($_GET['obj']);
    //$obj=new agente($ob_ag->nombre,$ob_ag->paterno,$ob_ag->materno,$ob_ag->nacimiento,$ob_ag->genero,$ob_ag->telefono,$ob_ag->usuario,$ob_ag->contrasenia,$ob_ag->correo);    
    //$obj->insertarAgente();

    $ob_cli= json_decode($_GET['obj']);

    $obj=new cliente($ob_cli->nombre,$ob_cli->paterno,$ob_cli->materno,$ob_cli->nacimiento,$ob_cli->telefono,$ob_cli->usuario,$ob_cli->contrasenia,$ob_cli->correo); 
    //$obj=new cliente('Pedro','Jimenez','Rieta','1997-02-02','','','pancrasio','pancrasioLT@gmail.com');       
    $respuesta =json_decode($obj->insertarCli());

    if($respuesta->res==true){
        echo 1;
    }else{
        echo $respuesta->error;
    }

    

?>