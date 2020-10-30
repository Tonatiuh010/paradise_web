

<?php
//call SP_insert_cliente ('Nombre(s)','Apellido Paterno','Apellido Materno','Fecha de nacimiento','Telefono');
//call SP_insert_userCli('UserName','Contraseña','Correo','Nombre(s)','Apellido Paterno','Apellido Materno');


$vnombre = $_GET['txtNombre'];
$vpaterno = $_GET['txtApPat'];
$vmaterno = $_GET['txtApMat'];
$vnacimiento = $_GET['txtFecNac'];
$vtelefono = $_GET['txtTelefono'];
$vusuario = $_GET['txtUsuario'];
$vpassword = $_GET['txtPass'];
$vcorreo = $_GET['txtCorreo'];

//echo $vnombre. '</br>';
//echo $vpaterno. '</br>';
//echo $vmaterno. '</br>';
//echo $vnacimiento. '</br>';
//echo $vtelefono. '</br>';
//echo $vusuario. '</br>';
//echo $vpassword. '</br>';
//echo $vcorreo. '</br>';


include('config.php');                              //Mandamos a llamar el php con las variables $HOST,$USER,$PASS,$BD que contienen las credenciales
 $mysqli=@mysqli_connect($servername	,$username	,$password	,$dbname);
    //$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD);  
    if($mysqli)                                     //Intentamos conectar con Mysql
    {
        $bd=mysqli_select_db($mysqli,$bdname);          //Creamos una variable con la variable $BD que contiene el nombre de la bd
        //$bd=mysqli_select_db($mysqli,$BD);
        if($bd)                                     //Intentamos acceder a la BD
        {
            if (empty($vmaterno))
            {                                       //Si la variable vmaterno se encuentra vacia
			     $insertCli= "call SP_insert_cliente ('".$vnombre."','".$vpaterno."',null,'".$vnacimiento."','".$vtelefono."');";
                    $res1 = mysqli_query($mysqli, $insertCli);
                 $insertUser= "call SP_insert_userCli('".$vusuario."','".$vpassword."','".$vcorreo."','".$vnombre."','".$vpaterno."',null);";
                    $res2 = mysqli_query($mysqli, $insertUser);
                    
			}else{

				 $insertCli= "call SP_insert_cliente ('".$vnombre."','".$vpaterno."','".$vmaterno."','".$vnacimiento."','".$vtelefono."');";
                    $res1 = mysqli_query($mysqli, $insertCli);
                 $insertUser= "call SP_insert_userCli('".$vusuario."','".$vpassword."','".$vcorreo."','".$vnombre."','".$vpaterno."','".$vmaterno."');";
                    $res2 = mysqli_query($mysqli, $insertUser);
                    
			}

            if($res1 === TRUE and $res2 === TRUE)
            {
                 echo '<dialog open id="exito" 
                            style="width:30%; height:10%; align-items:center; margin:auto; 
                             margin-top:-50%; background-color:rgb(3,95,108); color:white; text-align:center; 
                             padding:4%; font-family:Arial; font-size:larger;  ">
                            <p>Registrado exitosamente, ya puedes iniciar sesi&oacute;n</p><br />
                            <p><a href="../index.html">Cerrar</a></p>
                      </dialog>';

                //echo '<h1>Fue registrado exitosamente</h1>';
            }else
            {
                echo '<dialog open id="error2" 
                             style="width:30%; height:10%; align-items:center; margin:auto; 
                             margin-top:-50%; background-color:rgb(3,95,108); color:white; text-align:center; 
                             padding:4%; font-family:Arial; font-size:larger;  ">
                        <p>No se pudo registrar error: %s\n'. mysqli_error($mysqli).'</p><br />
                         <input type="button"  onclick="cerrar()" value="Cerrar"/>
                      </dialog>';
                
               
            }
            
                //echo "Entro a la BD";
        }else
        {
            echo "error con la BD";
        }
    }else
    {
        echo "error con la conexion";
    }
    die();


            

?>
