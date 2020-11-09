<?php
$HOST="localhost";
$USER="root";
$PASS="";
$BD="paradise";


$mysqli= mysqli_connect("localhost","root","","paradise");


    if (mysqli_connect_errno())
    {
        printf("Fallo la conexion: %s\n", mysqli_connect_error());
        exit();
    }else{
        $sql = "update cliente set cliNombre = '".$_GET["nombre"]."', cliApPat = '".$_GET["apPat"]."', cliApMat = '".$_GET["apMat"]."', cliFecNac = '".$_GET["fechaNac"]."' where cliNum = 24";
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
