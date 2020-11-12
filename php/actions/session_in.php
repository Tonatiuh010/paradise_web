<?php
 require_once("../classes/funciones.php");

    $usuario= $_GET['user'];
    $contrasenia= $_GET['passwd'];

    $buscar=JSON_DECODE(get_log_in($usuario,$contrasenia));
    //var_dump($verificar);

    $verificada= $buscar->{'id'};
    
    if($verificada=='empty'){

        //echo 'Verifique su usuario o contrasenia';
        return false;

    }else{

        session_start();
        $_SESSION['ID'] = $buscar->{'id'};
        $_SESSION['USER'] = $buscar->{'num_us'};
        $_SESSION['TYPE'] = $buscar->{'tipo'};

        //echo 'Sesion iniciada';
        return true;
    }


?>