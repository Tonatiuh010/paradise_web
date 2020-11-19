<?php
 
require_once("../classes/imagenes.php");
       

        $baseDirec="../../img/lugares";
       
             
        $currentDirec=$baseDirec.'/'.$_POST['numeroLugar'];

            foreach ($_FILES['files']['tmp_name'] as $key => $tmp_name){
                if ($_FILES['files']['name'][$key]){
                    
                    move_uploaded_file($_FILES['files']['tmp_name'][$key],$currentDirec."/".basename($_FILES['files']['name'][$key]));

                    echo "<br>".$_FILES['files']['name'][$key];

                    $obj=new imagenes();
                    $obj->setNombre($_FILES['files']['name'][$key]);  
                    $obj->insertImagen($_POST['numeroLugar']);
                                      
                }
            }                                  
        

       header("Location:../../html/HTML_ADMIN_LUGARES.html");
        
        
?>
