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