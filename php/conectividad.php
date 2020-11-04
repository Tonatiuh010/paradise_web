<?php

include('config.php');                              //Mandamos a llamar el php con las variables $HOST,$USER,$PASS,$BD que contienen las credenciales
$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD);     //Creamos una variable con las credenciales


    if($mysqli)                                     //Intentamos conectar con Mysql
    {
        $bd=mysqli_select_db($mysqli,$BD);          //Creamos una variable con la variable $BD que contiene el nombre de la bd
        if($bd)                                     //Intentamos acceder a la BD
        {
                          
                      //$sql       = "call sp_log_in ('".$_GET['cliNombre']."','".$_GET['password']."');";
                    $sql       = "call sp_log_in ('".$_GET['user']."','".$_GET['passwd']."');";
                    $resultado = $mysqli->query($sql);
                    

                    if ($resultado->num_rows>0) {

                        if ($fila = $resultado->fetch_assoc()) {
                            session_start();
                        // Guardar datos de sesión

                        $_SESSION['id'] = $fila['id'];
                        $_SESSION['user'] = $fila['numU'];
                        $_SESSION['type'] = $fila['tipo'];
                        
                
                        //header('Location: ../index.html');
                        //echo $_SESSION["id"],$_SESSION['user'],$_SESSION['type'];
                        echo true;
                        }

                    }else{
                        echo'Verifica tu correo y contrase&#241;a </br>';
                        echo'<input type="button"  onclick="cerrar()" value="Cerrar" class="errorB"/>';
                        //header('Location: ../puente.html');
                        exit();
                    };

        }else
        {
            echo "error con la BD";
        }
    }else
    {
        echo "error con la conexion";
    }
    die();     //Creamos una variable con las credenciales





 












//$sql       = "select * from usuario where usContrasenia = '".$_GET['passwd']."' and (usCorreo='".$_GET['user']."' or usNombre='".$_GET['user']."');";
//$resultado = $mysqli->query($sql);

//if ($resultado->num_rows>0) {

//    while ($fila = $resultado->fetch_assoc()) {
//    //usNum, usNombre,usContraseña,usCorreo,usTipoUs

//    $vNum = $fila['usNum'];
//    $vUserName = $fila['usNombre'];
//    $vPassword = $fila['usContrasenia'];
//    $vEmail = $fila['usCorreo'];
//    $vUserT = $fila['usTipoUs'];
//}

//    if($vUserT='Cliente'){
//        session_start();
//    // Guardar datos de sesión
//    $_SESSION["usuario"] = $vUserName;

//    //$vNewUrl='../html/HTML_PRINCIPAL.html';

//    echo true;

//    }

//}else{
//    echo false;

//    //echo "Error de BD, no se pudo consultar la base de datos\n";
//    //echo "Error MySQL: " . mysql_error();
//    //exit();
//}



?>
