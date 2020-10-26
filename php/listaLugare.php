<?php


include('config.php');                              //Mandamos a llamar el php con las variables $HOST,$USER,$PASS,$BD que contienen las credenciales
$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD);     //Creamos una variable con las credenciales

$vcaso=$_GET['caso'];

    if($mysqli)                                     //Intentamos conectar con Mysql
    {
        $bd=mysqli_select_db($mysqli,$BD);          //Creamos una variable con la variable $BD que contiene el nombre de la bd
        if($bd)                                     //Intentamos acceder a la BD
        {
            switch($vcaso)
            {
                case 1:
                           // echo "Entro a la BD";
                   $sql       = "select * from vw_lugares_basic_list;";
                    $resultado = $mysqli->query($sql);

                    if ($resultado->num_rows>0) {

                        while ($fila = $resultado->fetch_assoc()) {

                        $vnumLugar = $fila['No'];

                        echo '</br><section class="lista"><table class="tablaList">';
                        echo '<tr><th rowspan="7" width="35%"><img src="../img/sinSalon.png" alt="Logotipo" width="100%" class="logoNav" /></th></tr>';
                        echo '<tr><th rowspan="7"></th></tr>';
                        echo '<tr><th class="nombreLug"><h3>'.$fila['Lugar'].'<h3></th></tr>';
                        echo '<tr><th class="description">'.$fila['Descripcion'].'</th></tr>';
                        echo '<tr><th class="adi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A partir de $'.$fila['Costo'].'
                                </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apropiado para '.$fila['Capacidad'].' personas</th></tr>';
                        //echo '<tr><th style="background-color:white;">'.$fila['lugCapacidad'].'</th></tr>';
                        echo '<tr><th class="thBoton"><input type="button" class="lugBoton" onclick="mostrarLug('.$vnumLugar.')" value="Consultar Lugar"/></th></tr>';
                        echo '<table/></section></br>';
                

                    }

                    }else{
                        echo "Error de BD, no se pudo consultar la base de datos\n";
                        echo "Error MySQL: " . mysql_error();
                        exit();
                    };
                    break;
                 
                case 2:
                                               // echo "Entro a la BD";
                    $vnum= $_GET['num'];
                    $sql       = "call SP_lugares_complete_list (".$vnum.");";
                    $resultado = $mysqli->query($sql);

                    //echo "Case number 2";

                    if ($resultado->num_rows>0) {
                      echo '</br><section class="lista"><table class="tablaList" border="1">';

                        if($tupla = $resultado->fetch_assoc())
                        {
                            echo '<tr><th class="nombreLug"><h3>'.$tupla['Tipo de Lugar'].'<h3></th></tr>';
                            echo '<tr><th class="nombreLug"><h3>'.$tupla['Lugar'].'<h3></th></tr>';
                            echo '<tr><th class="nombreLug"><h3>'.$tupla['Descripcion'].'<h3></th></tr>';
                            echo '<tr><th class="nombreLug"><h3>'.$tupla['Costo'].'<h3></th></tr>';
                            echo '<tr><th class="nombreLug"><h3>'.$tupla['Capacidad'].'<h3></th></tr>';
                            echo '<tr><th class="nombreLug"><h3>'.$tupla['Domicilio'].'<h3></th></tr>';
                        }

                        while ($fila = $resultado->fetch_assoc()) {

                                echo '<tr><th class="nombreLug"><h3>'.$fila['Espacios'].'<h3></th></tr>';
                        }

                    echo '<table/></section></br>';

                    }else{
                        echo "Error de BD, no se pudo consultar la base de datos\n";
                        echo "Error MySQL: " . mysql_error();
                        exit();
                    };
                    break;

                default:
                    echo "Something is wrong";
                    break;


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