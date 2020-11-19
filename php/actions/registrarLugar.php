<?php
 
require_once("../classes/lugar.php");

    $ob_lugar= json_decode($_GET['b']);
    $obDirec= $ob_lugar->direc->obDirec;  

     if (!mkdir($baseDirec.'/'.$_POST['numeroLugar'],0777,true)){
            echo "Error al momento de crear directorio";
     } 
    
     if ($obDirec!=false) {
        $obj=new lugar($ob_lugar->nombre,$ob_lugar->desc,$ob_lugar->costo,$ob_lugar->capacidad,$ob_lugar->espacios,$ob_lugar->tipoLugar,$obDirec->calle,$obDirec->numIn,$obDirec->numEx,$obDirec->cp,$ob_lugar->estado);    
        $obj->insertLugar();
    } else {
        $obj=new lugar($ob_lugar->nombre,$ob_lugar->desc,$ob_lugar->costo,$ob_lugar->capacidad,$ob_lugar->espacios,$ob_lugar->tipoLugar);    
        $obj->insertLugarSinDireccion();
    }
    
?>
