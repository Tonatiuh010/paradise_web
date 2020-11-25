<?php

require_once("../classes/funciones.php");

    //$usuario='solis_emma';
    //$contrasenia='pelicula';

    //$usuario='sql';
    //$contrasenia='123456';

    //$usuario='tonatiuh';
    //$contrasenia='sandwich';

    $usuario= $_GET['user'];
    $contrasenia= $_GET['passwd'];

    $buscar=JSON_DECODE(get_log_in($usuario,$contrasenia));

    $verificada= $buscar->{'id'};

    
    if($verificada=='empty'){

        //echo 'Verifique su usuario o contrasenia';
        $obj= array( "res" => false, "tipo" => '');

        echo json_encode($obj);

    }else{

        session_start();
        $_SESSION['ID'] = $buscar->{'id'};
        $_SESSION['USER'] = $buscar->{'num_us'};
        $_SESSION['TYPE'] = $buscar->{'tipo'};


        if ($buscar->{'tipo'}=='Agente'){
            $_SESSION['INDEX']="html/HTML_AGEN_RESERVACIONES.html";
        } else if ($buscar->{'tipo'}=='Administrador'){
            $_SESSION['INDEX']="html/HTML_ADMIN_RESERVACIONES.html";
        } else if ($buscar->{'tipo'}=='Cliente'){
            $_SESSION['INDEX']="html/HTML_PERFIL_USUARIO.html";
        }

        

        $obj= array( "res" => true, "tipo" => $buscar->{'tipo'});
        //echo 'Sesion iniciada';
        echo json_encode($obj);
    }

?>
