<?php
    
    require_once("classes/espacios.php");
    require_once("classes/tipoLugar.php");


    $espacios=new espacios();
    $tipoLugar=new tipoLugar();

    echo 
     json_encode(array("espacios"=>json_decode($espacios->getAllEspacios()),
                        "tipoLugar"=>json_decode($tipoLugar->getAllTipoLugar())));
     
?>