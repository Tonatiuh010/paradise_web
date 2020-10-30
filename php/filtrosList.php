<?php

include('config.php');                              //Mandamos a llamar el php con las variables $HOST,$USER,$PASS,$BD que contienen las credenciales
$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD);

            $obbus=  json_decode($_GET['objbuscar']);

            $arrayId=$obbus->esp->arrayId;       //Se extrae el valor del arreglo arrayId

            $b = 0;
            $str = "and Espacio in (";

            while ($b<count($arrayId))
            {


                if ($b+1 >= count($arrayId))
                {
                    $str = $str . $arrayId[$b];
                } else {
                    $str = $str . $arrayId[$b] . ",";
                }

                $b++;     
            }

            $str = $str . ")";

            $obbus->ciudad;  
            $obbus->tipoL;
            if($str == 'and Espacio in ()'){$str='';}
                $precio = $obbus->precios;
            if($precio == 'na'){$precio='';}
                $capacidad= $obbus->capacidad;
            if($capacidad == 'na'){$capacidad ='';}
                $ciudad= $obbus->ciudad;
            if($ciudad == 'na'){$ciudad='';}
                   

            $sql = "select num, Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list where Categoria='".$obbus->tipoL."' ".$ciudad."  ".$capacidad."  ".$str."  ".$precio." ;";

            $resultado = $mysqli->query($sql);
                    

                if ($resultado->num_rows>0) {

                   $cont=0;
                   //$array;

                while ($fila = $resultado->fetch_assoc()) {

                    if($cont==$fila['num'])
                    {
                        $vnumLugar = $fila['num'];
                        $vnuevoURL= "'../php/PHP_MLUGAR.php?id=$vnumLugar'";

                        echo '</br><section class="lista"><table class="tablaList">';
                        echo '<tr><th rowspan="7" width="35%"><img src="../img/sinSalon.png" alt="Logotipo" width="100%" class="logoNav" /></th></tr>';
                        echo '<tr><th rowspan="7"></th></tr>';
                        echo '<tr><th class="nombreLug"><h3>'.$fila['Lugar'].'<h3></th></tr>';
                        echo '<tr><th class="description">'.$fila['Descripcion'].'</th></tr>';
                        echo '<tr><th class="adi">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A partir de $'.$fila['Costo'].'
                                </br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apropiado para '.$fila['Capacidad'].' personas</th></tr>';
                        echo '<tr><th class="thBoton"><input type="button" class="lugBoton" onclick="location.href='.$vnuevoURL.'" value="Consultar Lugar"/></th></tr>';
                        echo '<table/></section></br>';
                    }

                    $cont=$cont+1;
                
                //header('Location: ../html/HTML_MLUGAR.html?id='.$vnumLugar);
            }

            }else{
                echo "Error de BD, no se pudo consultar la base de datos\n";
                echo "Error MySQL: " . mysql_error();
                exit();
            };



?>