<?php
//sesion.php
//verificar si la sesion ya tiene variables, 
//es decir, si está activa o no
//($_SESSION['id'] !='' && $_SESSION['user'] !='' && $_SESSION['type'] !='' ) no sirve

/*Permissions Users*/
 
// 0 - Everyone
// 1 - Client
// 2 - Agent
// 3 - Admin

session_start();


$type=$_GET['b'];

  
    
    switch ($type){
        
        case 0:            

            if($_SESSION != null){ 
                
                    $ob_user=array('res'=>true,'tipo'=>$_SESSION['TYPE'],'user'=>$_SESSION['ID'],'index'=>$_SESSION['INDEX']);
                    echo json_encode($ob_user);                
                
            }else{   
                session_destroy();    
                $ob_user=array('res'=>false,'tipo'=>'','user'=>'','index'=>'');
                echo json_encode($ob_user);
            }
        break;

        case 1:

            if($_SESSION != null){ 

               if ($_SESSION['TYPE']!='Cliente'){
                    $ob_user=array('res'=>false,'tipo'=>$_SESSION['TYPE'],'user'=>$_SESSION['ID'],'index'=>$_SESSION['INDEX']);
                    echo json_encode($ob_user);
                } else {
                     $ob_user=array('res'=>true,'tipo'=>$_SESSION['TYPE'],'user'=>$_SESSION['ID'],'index'=>$_SESSION['INDEX']);
                     echo json_encode($ob_user);
                }
                
            }else{
                session_destroy();  
                $ob_user=array('res'=>false,'tipo'=>'','user'=>'','index'=>'index.html');
                echo json_encode($ob_user);
            }

        break;

        case 2:
            if($_SESSION != null){ 

               if ($_SESSION['TYPE']!='Agente'){
                    $ob_user=array('res'=>false,'tipo'=>$_SESSION['TYPE'],'user'=>$_SESSION['ID'],'index'=>$_SESSION['INDEX']);
                    echo json_encode($ob_user);
                } else {
                     $ob_user=array('res'=>true,'tipo'=>$_SESSION['TYPE'],'user'=>$_SESSION['ID'],'index'=>$_SESSION['INDEX']);
                     echo json_encode($ob_user);
                }
                
            }else{
                session_destroy();  
                $ob_user=array('res'=>false,'tipo'=>'','user'=>'','index'=>'index.html');
                echo json_encode($ob_user);
            }
        break;

        case 3:
            if($_SESSION != null){ 

               if ($_SESSION['TYPE']!='Administrador'){
                    $ob_user=array('res'=>false,'tipo'=>$_SESSION['TYPE'],'user'=>$_SESSION['ID'],'index'=>$_SESSION['INDEX']);
                    echo json_encode($ob_user);
                } else {
                     $ob_user=array('res'=>true,'tipo'=>$_SESSION['TYPE'],'user'=>$_SESSION['ID'],'index'=>$_SESSION['INDEX']);
                     echo json_encode($ob_user);
                }
                
            }else{
                session_destroy();  
                $ob_user=array('res'=>false,'tipo'=>'','user'=>'','index'=>'index.html');
                echo json_encode($ob_user);
            }
        break;

        default:
            session_destroy();    
            $ob_user=array('res'=>false,'tipo'=>'','user'=>'','index'=>'index.html');
            echo json_encode($ob_user);
        break;
    }    

?>