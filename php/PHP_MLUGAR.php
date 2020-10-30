
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../css/CSS_CLIENTE_MLUGAR.css" type="text/css">
    <meta meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Lugares y Salones - Paradise</title>
</head>
<body>
    <nav class="NavOficial">
        <img src="../img/logoOficial.png" alt="Logotipo" width="30%" class="logoNav" />

        <section class="pruebaMenu">
            <article class="pMT"><a href="../index.html" ;>INICIO</a></article>
            <article class="pMTx"><a href="../html/construccion.html" ;>¿QUIÉNES SOMOS?</a></article>
            <article class="pMT3"><a href="../html/HTML_LUGARES.html" ;>LUGARES Y SALONES</a></article>
            <article class="pMT2"><a href="../html/construccion.html" ;>PROMOCIONES</a></article>
            <article class="pMTxt"><a href="../html/HTML_SIGN_IN.html" ;>INICIAR SESION</a></article>
        </section>
        <br />
        <section class="barraBusqueda">
            <input type="text" id="searchterm" class="busqueda" placeholder="¿Qué estás buscando?" />
            <button type="button" id="search" class="boton">Buscar</button>
        </section>
        <br />

    </nav>
    <br />
         
    <main>
        <section class="lugar" id="lugar">
            <?php
                include('config.php');                              //Mandamos a llamar el php con las variables $HOST,$USER,$PASS,$BD que contienen las credenciales
                $mysqli=@mysqli_connect($servername	,$username	,$password	,$dbname);
                //$mysqli=@mysqli_connect($HOST,$USER,$PASS,$BD);     //Creamos una variable con las credenciales

                $vnum= $_GET['id'];

            if($mysqli)                                     //Intentamos conectar con Mysql
            {
                //$bd=mysqli_select_db($mysqli,$BD);          //Creamos una variable con la variable $BD que contiene el nombre de la bd
                $bd=mysqli_select_db($mysqli,$dbname);                
                if($bd)                                     //Intentamos acceder a la BD
                {
                 
                                                       // echo "Entro a la BD";
                            $sql       = "call SP_lugares_complete_list (".$vnum.");";
                            $resultado = $mysqli->query($sql);

                            //echo "Case number 2";

                            echo $sql;

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
        </section>
    </main>

   


</body>
</html>