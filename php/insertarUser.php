

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

echo $vnombre. '</br>';
echo $vpaterno. '</br>';
echo $vmaterno. '</br>';
echo $vnacimiento. '</br>';
echo $vtelefono. '</br>';
echo $vusuario. '</br>';
echo $vpassword. '</br>';
echo $vcorreo. '</br>';


include('config.php');                              //Mandamos a llamar el php con las variables $HOST,$USER,$PASS,$BD que contienen las credenciales
$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD);     //Creamos una variable con las credenciales

    if($mysqli)                                     //Intentamos conectar con Mysql
    {
        $bd=mysqli_select_db($mysqli,$BD);          //Creamos una variable con la variable $BD que contiene el nombre de la bd
        if($bd)                                     //Intentamos acceder a la BD
        {
            echo "Entro a la BD";
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
