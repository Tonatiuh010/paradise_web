<?php


include('config.php');                              //Mandamos a llamar el php con las variables $HOST,$USER,$PASS,$BD que contienen las credenciales
$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD);     //Creamos una variable con las credenciales

    if($mysqli)                                     //Intentamos conectar con Mysql
    {
        $bd=mysqli_select_db($mysqli,$BD);          //Creamos una variable con la variable $BD que contiene el nombre de la bd
        if($bd)                                     //Intentamos acceder a la BD
        {
           // echo "Entro a la BD";
           $sql       = "select * from lugar;";
            $resultado = $mysqli->query($sql);

            if ($resultado->num_rows>0) {

                while ($fila = $resultado->fetch_assoc()) {
                echo '</br><section class="lista"><table class="tablaList">';
                echo '<tr><th rowspan="7"><img src="../img/sinSalon.png" alt="Logotipo" width="100%" class="logoNav" /></th></tr>';
                echo '<tr><th rowspan="7"></th></tr>';
                echo "<tr><th>".$fila['lugNombre']."</th></tr>";
                echo '<tr><th class="description">'.$fila['lugDescripcion'].'</th></tr>';
                echo "<tr><th>".$fila['lugCosto']."</th></tr>";
                echo "<tr><th>".$fila['lugCapacidad']."</th></tr>";
                echo '<tr><th><input type="button" id="searchterm" class="busqueda" value="Proximo Boton" /></th></tr>';
                echo '<table/></section></br>';
            }

            }else{
                echo "Error de BD, no se pudo consultar la base de datos\n";
                echo "Error MySQL: " . mysql_error();
                exit();
            }
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