<?php
 
require_once("../classes/imagenes.php");

                   

        $baseDirec="../../img/lugares";
        if (!mkdir($baseDirec.'/'.$_POST['numeroLugar'],0777,true)){
            echo "Error al momento de crear directorio";
        } else {

        $count=0;
        $currentDirec=$baseDirec.'/'.$_POST['numeroLugar'];

            foreach ($_FILES['files']['tmp_name'] as $key => $tmp_name){
                if ($_FILES['files']['name'][$key]){
                    $extension=explode('/',$_FILES['files']['type'][$key]);// [1]== Extension
                    move_uploaded_file($_FILES['files']['tmp_name'][$key],$currentDirec."/img".$count.".".$extension[1]);

                    $obj=new imagenes();
                    $obj->setNombre("img".$count.".".$extension[1]);  
                    $obj->insertImagen($_POST['numeroLugar']);

                    $count+=1;                    
                }
            }                                  
        }

        header("Location:../../html/HTML_ADMIN_LUGARES.html");
        
        //$obj->setNombre($_GET['b']);         
        //$obj->insertEspacios();       
?>
