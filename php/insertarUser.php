

<?php
//call SP_insert_userCli ('zuleima05','654321','zuleima@hotmail.com');
//call SP_insert_cliente ('MARTINA','ALTAMIRANO','CALDERON','1999-10-05','6647733123','m.altamiro@gmail.com');


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
$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD);     //Creamos una variable con las credenciales

    if($mysqli)                                     //Intentamos conectar con Mysql
    {
        $bd=mysqli_select_db($mysqli,$BD);          //Creamos una variable con la variable $BD que contiene el nombre de la bd
        if($bd)                                     //Intentamos acceder a la BD
        {
            

            if (empty($vmaterno))                   //Si la variable vmaterno se encuentra vacia
            {                                     
                $insertUser= "call SP_insert_userCli('".$vusuario."','".$vpassword."','".$vcorreo."');";
                    $res2 = mysqli_query($mysqli, $insertUser);
                 $insertCli= "call SP_insert_cliente ('".$vnombre."','".$vpaterno."',null,'".$vnacimiento."','".$vtelefono."','".$vcorreo."');";
                    $res1 = mysqli_query($mysqli, $insertCli);
                    
            }else{

                 $insertUser= "call SP_insert_userCli('".$vusuario."','".$vpassword."','".$vcorreo."');";
                    $res2 = mysqli_query($mysqli, $insertUser);
                 $insertCli= "call SP_insert_cliente ('".$vnombre."','".$vpaterno."','".$vmaterno."','".$vnacimiento."','".$vtelefono."','".$vcorreo."');";
                    $res1 = mysqli_query($mysqli, $insertCli);
                    
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
                $errorCod= mysqli_errno($mysqli);
                if($errorCod==1062)
                {
                    echo '<dialog open id="error2" 
                              style="width:30%; height:10%; align-items:center; margin:auto; 
                              margin-top:-50%; background-color: hsl(0, 0%, 92%); color:black; text-align:center; 
                              padding:4%; font-family:Arial; font-size:larger;  ">
                              <p>No se pudo registrar, utilice otro nombre de usuario o cambie su correo electr&oacute;nico </p><br />
                              <input type="button"  onclick="cerrar()" value="Cerrar" class="errorB"/>
                          </dialog>';

                }


                


                //$error=mysqli_error($mysqli);
                //echo $error;
                //$rest = substr($error, 0, 10);  // devuelve "cde"
                //echo $rest;
               
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
