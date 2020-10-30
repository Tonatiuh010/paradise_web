<?php

include('config.php');                              //Mandamos a llamar el php con las variables $HOST,$USER,$PASS,$BD que contienen las credenciales
 $mysqli=@mysqli_connect($servername	,$username	,$password	,$dbname);
    //$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD); 
$vcase= $_GET['caso'];

    if($mysqli)                                     //Intentamos conectar con Mysql
    {
        $bd=mysqli_select_db($mysqli,$dbname);          //Creamos una variable con la variable $BD que contiene el nombre de la bd
        //$bd=mysqli_select_db($mysqli,$BD);          

        if($bd)                                     //Intentamos acceder a la BD
        {
            switch($vcase)
            {
                case 1:
                    $sql = "select * from VW_espacios_admim;";
                    $resultado = $mysqli->query($sql);

                if ($resultado->num_rows>0) 
                {

                    $ob_esp=array();  //Espacios de un lugar

                    while ($fila = $resultado->fetch_assoc())
                    {
    
                        array_push( $ob_esp ,array( "num" => $fila['numero'], 
                                   "nombre"=>$fila['nombre']
                                   ));
                    }

                    $response=json_encode($ob_esp);
        
                    echo $response;



                }else{
                    echo "Error de BD, no se pudo consultar la base de datos\n";
                    echo "Error MySQL: " . mysql_error();
                    exit();
                }
                break;


                case 2:
                    $sql = "select * from VW_tipolugares_admin;";
                    $resultado = $mysqli->query($sql);

                if ($resultado->num_rows>0)
                {
                    $ob_tl=array();  //Tipo de lugar


                    while ($fila = $resultado->fetch_assoc())
                    {
    
                        array_push( $ob_tl ,array( "num" => $fila['numero'], 
                                   "nombre"=>$fila['nombre']
                                   ));
                    }

                    $response=json_encode($ob_tl);
        
                    echo $response;

                }else{
                    echo "Error de BD, no se pudo consultar la base de datos\n";
                    echo "Error MySQL: " . mysql_error();
                    exit();
                }
                break; 

                case 3:
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

                    //$obbus->ciudad;  
                    //$obbus->tipoL;
                    if($str == 'in ()'){$str='';}
                        $precio = $obbus->precios;
                    if($precio == 'na'){$precio='';}
                        $capacidad= $obbus->capacidad;
                    if($capacidad == 'na'){$capacidad ='';}
                   


                    $sql = "select 'No', Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list where Municipio='".$obbus->ciudad. "' and Categoria='".$obbus->tipoL."' ".$capacidad."  ".$str."  ".$precio." ;";
                    
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