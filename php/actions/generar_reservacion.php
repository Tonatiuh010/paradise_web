
<?php
session_start();
 require_once("../classes/pre_reservacion.php");
 require_once("../classes/cliente.php");

 $obj= json_decode($_GET['obj']);

 

    $ob=new pre_reservacion();    
    $resultado=json_decode($ob->insertReservacion($obj->fecInic,$obj->fecFin,$obj->lugar,$_SESSION['ID']));

                if($resultado->res==true){
                    echo 1;
                }else{
                    echo 'Lo sentimos, las fechas solicitadas ya se encuentran apartadas';
                }


    //$caso=$_GET['caso'];
    //$obj= json_decode($_GET['obj']);
    //switch($caso){
    //    case 1:
    //        session_start();

    //            $ob=new pre_reservacion();    
    //            $resultado=json_decode($ob->insertReservacion($obj->fecInic,$obj->fecFin,$obj->lugar,$_SESSION['ID']));

    //            if($resultado->res==true){
    //                echo 1;
    //            }else{
    //                echo 'Lo sentimos, las fechas solicitadas ya se encuentran apartadas';
    //            }
    //        break;
    //    case 2:
    //        $obj_clie=new cliente($obj->nombre,$obj->paterno,$obj->materno,$obj->nacimiento,$obj->telefono,'',$obj->contrasenia,$obj->correo); 
    //        //$obj=new cliente('Pedros','Jimeneces','Rueca','1997-02-02','','','pancrasio','pancrasios150@gmail.com');       
    //        $respuesta =$obj_clie->insertarCli();
    //        $res= json_decode($respuesta);
    //        //var_dump($intento->res);

    //        $nombre=$obj->nombre;
    //        $correo=$obj->correo;
    
    //        if($res->res==true){
    //            $cli= new cliente($nombre,$correo);
    //            $cliente=$cli->getNum();

    //            $ob=new pre_reservacion();    
    //            //$resultado=json_encode($ob->insertReservacion($obj->fecInic,$obj->fecFin,$obj->lugar,$cliente));

    //            $resultado=json_decode($ob->insertReservacion($obj->fecInic,$obj->fecFin,$obj->lugar,$cliente));
                

    //            if($resultado->res==true){
    //                echo 1;
    //            }else{
    //                $borrar=new cliente();
    //                $finalizar=$borrar->deleteCliente($obj->correo);

    //                if($resultado->error==''){
    //                    echo 'Lo sentimos, las fechas solicitadas ya se encuentran apartadas';
    //                }else{
    //                    echo $resultado->error;
    //                }
                    
    //            }
    //        }else{
    //            echo $res->error;
    //        }
    //        break;
    //}




















    //GUARDO ORIGINAL
    //$ob_cli= json_decode($_GET['obj']);

    //$obj=new cliente($ob_cli->nombre,$ob_cli->paterno,$ob_cli->materno,$ob_cli->nacimiento,$ob_cli->telefono,'',$ob_cli->contrasenia,$ob_cli->correo); 
    ////$obj=new cliente('Pedros','Jimeneces','Rueca','1997-02-02','','','pancrasio','pancrasios150@gmail.com');       
    //$respuesta =$obj->insertarCli();
    ////echo $respuesta;
   
    ////echo $cliente;
    
    //if($respuesta=='Registrado'){
    //    $cli= new cliente('Pedros','pancrasios150@gmail.com');
    //    $cliente=$cli->getNum();

    //    $inicio='2020-11-25';
    //    $fin='2020-11-27';
    //    $lugar=2;

    //    $ob=new pre_reservacion();    
    //    $resultado=$ob->insertReservacion($inicio,$fin,$lugar,$cliente);

    //    if($resultado==true){
    //        echo 'Reservacion Registrada';
    //    }else{
    //        $borrar=new cliente();
    //        $finalizar=$borrar->deleteCliente($cliente);
    //        echo 'Lo sentimos, las fechas solicitadas ya se encuentran apartadas';
    //    }
    //}else{
    //    echo $respuesta;
    //}


?>