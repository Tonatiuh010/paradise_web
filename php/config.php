

<?php
$HOST="localhost";
$USER="root";
$PASS="";
$BD="paradise";

$Qproductoras="select * from salon;";

$mysqli= mysqli_connect("localhost","root","","paradise");


    if (mysqli_connect_errno())
    {
        printf("Fallo la conexion: %s\n", mysqli_connect_error());
        exit();
    }else{
        $sql = "INSERT INTO cliente(cliNombre,cliApPat,cliApMat,cliFecNac) VALUES('".$_GET["nombre"]."','".$_GET["apPat"]."','".$_GET["apMat"]."','".$_GET["fechaNac"]."');";
        $res = mysqli_query($mysqli, $sql);

            if($res === TRUE)
            {
                echo '<h1>Fue registrado exitosamente</h1>';
            }else{
                printf("No se pudo insertar: %s\n", mysqli_error($mysqli));
            }

            mysqli_close($mysqli);
    }
            

?>
