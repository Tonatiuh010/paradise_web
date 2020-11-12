<?php

    require_once("mysql/connection.php");
    require_once("classes/funciones.php");

    $usuario='solis_emma';
    $contrasenia='pelicula';

    //$usuario='sql';
    //$contrasenia='123456';


    $buscar=JSON_DECODE(get_log_in($usuario,$contrasenia));
    var_dump($buscar);

    $verificada= $buscar->{'id'};
    
    if($verificada=='empty'){

        echo 'Verifique su usuario o contrasenia';
        //return false;

    }else{

        session_start();
        $_SESSION['ID'] = $buscar->{'id'};
        $_SESSION['USER'] = $buscar->{'num_us'};
        $_SESSION['TYPE'] = $buscar->{'tipo'};

        echo 'Sesion iniciada';
        //return true;
    }


//    $obj = json_decode($json);
//print $obj->{'foo-bar'}; // 12345
 
    //$obj=new pre_reservacion();        
    //echo $obj->getAllPreReservaciones(1);

    //echo $_GET['obj'];
?>