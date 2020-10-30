<?php


include('config.php');                              //Mandamos a llamar el php con las variables $HOST,$USER,$PASS,$BD que contienen las credenciales
    $mysqli=@mysqli_connect($servername	,$username	,$password	,$dbname);
    //$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD);  

    if($mysqli)                                     //Intentamos conectar con Mysql
    {
        $bd=mysqli_select_db($mysqli,$dbname);
       // $bd=mysqli_select_db($mysqli,$BD);          //Creamos una variable con la variable $BD que contiene el nombre de la bd
        if($bd)                                     //Intentamos acceder a la BD
        {
                           // echo "Entro a la BD";
                    $sql       = "select * from vw_lugares_basic_list;";
                    $resultado = $mysqli->query($sql);
                    

                    if ($resultado->num_rows>0) {

                   

                        while ($fila = $resultado->fetch_assoc()) {

                        $vnumLugar = $fila['No'];
                        $vnuevoURL= "'../php/PHP_MLUGAR.php?id=$vnumLugar'";

                        echo '</br><section class="lista"><table class="tablaList">';
                        echo '<tr><th rowspan="7" width="35%"><img src="../img/sinSalon.png" alt="Logotipo" width="100%" class="logoNav" /></th></tr>';
                        echo '<tr><th rowspan="7"></th></tr>';
                        echo '<tr><th class="nombreLug"><h3>'.$fila['Lugar'].'<h3></th></tr>';
                        echo '<tr><th class="description">'.$fila['Descripcion'].'</th></tr>';
                        echo '<tr><th class="adi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A partir de $'.$fila['Costo'].'
                                </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apropiado para '.$fila['Capacidad'].' personas</th></tr>';
                        //echo '<tr><th style="background-color:white;">'.$fila['lugCapacidad'].'</th></tr>';
                        echo '<tr><th class="thBoton"><input type="button" class="lugBoton" onclick="location.href='.$vnuevoURL.'" value="Consultar Lugar"/></th></tr>';
                        echo '<table/></section></br>';
                
                        //header('Location: ../html/HTML_MLUGAR.html?id='.$vnumLugar);
                    }

                    }else{
                        echo "Error de BD, no se pudo consultar la base de datos\n";
                        echo "Error MySQL: " . mysql_error();
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
    die();

?>