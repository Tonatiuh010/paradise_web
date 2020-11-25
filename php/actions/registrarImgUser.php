<?php 
require_once("../classes/imagenes.php");             

    session_start();       

    $baseDirec="../../img/usuario";
    $currentDirec=$baseDirec.'/'. $_SESSION['USER'];    

   $c= array_map('unlink', glob($currentDirec."/*"));

   for ($x=0;$x<count($c);$x++){
        if (!$c[$x]){
            echo false;
            die;
        }
   }
   var_dump($_FILES);

   if (isset($_FILES['files'])){        
                    
        move_uploaded_file($_FILES['files']['tmp_name'],$currentDirec."/".basename($_FILES['files']['name']));

        echo "<br>".$_FILES['files']['name'];

        $obj=new imagenes();
        $obj->setNombre($_FILES['files']['name']);  
        $obj->insertImagenUser($_SESSION['USER']);
        
        header("Location:../../".$_SESSION['INDEX']);                                      
        
    } else {
        echo "Error";

        header("Location:../../html/HTML_AGEN_CONFIGURACION.html");                                      
    }


    
    

?>