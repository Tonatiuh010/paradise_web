<?php
include('config.php');                              
$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD); 


    if($mysqli)                   
    {
        $bd=mysqli_select_db($mysqli,$BD);     
        if($bd)                                   
        {
                          
                    session_start();  

                    $sql       = "call sp_perfil_cliente (".$_SESSION['id'].");";
                    //echo $sql;
                    $resultado = $mysqli->query($sql);
                                

                    if ($resultado->num_rows>0) {

                        while ($fila = $resultado->fetch_assoc()) {
                        echo'<table class="usr_data" border="1">
                                <tr><th>'.$fila['Nombre'].'</th></tr>
                                <tr><th>'.$fila['FN'].'</th></tr>
                                <tr><th>'.$fila['Edad'].'</th></tr>';

                                if($fila['Telefono']!=null){
                                    echo '<tr><th>'.$fila['Telefono'].'</th></tr>';
                                }

                        echo    '<tr><th>'.$fila['usuario'].'</th></tr>
                                <tr><th>'.$fila['Contrasenia'].'</th></tr>
                                <tr><th>'.$fila['Email'].'</th></tr>
                            </table>';
                        echo '<button class="editar" onclick="configurar()">Historial</button>';
                        }

                    }else{
                        //header('Location: ../puente.html');
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
    die();     //Creamos una variable con las credenciales
?>