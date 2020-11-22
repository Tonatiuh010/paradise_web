
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../../css/CSS_CLIENTE_MLUGAR.css" type="text/css">
    <meta meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Lugares y Salones - Paradise</title>
    <script src="../../js/lug_general_Info.js" charset="ISO-8859-1"></script>
</head>
<body onload="sesion(); extract_img();">
    <nav class="NavOficial">
        <img src="../../img/logoOficial.png" alt="Logotipo" width="30%" class="logoNav" />

        <section class="pruebaMenu">
            <article class="pMT"><a href="../../index.html" ;>INICIO</a></article>
            <article class="pMTx"><a href="../../html/HTML_QUIENES_SOMOS.html" ;>¿QUIÉNES SOMOS?</a></article>
            <article class="pMT3"><a href="../../html/HTML_LUGARES.html" ;>LUGARES Y SALONES</a></article>
            <article class="pMT2"><a href="../../html/construccion.html" ;>PROMOCIONES</a></article>
            <article class="pMTxt" id="log"><a href="../../html/HTML_LOG_IN.html" ;>INICIAR SESION</a></article>

            <article class="pMTxt1" id="login" style="display:none;">
                <a href="../../html/construccion.html" ;><img src="../../img/Loto_paradise.png" width="45%;" />&nbsp;&nbsp;&nbsp;&nbsp;</a>
                <a href="session_out.php" ;><img src="../../img/log_out.png" width="25%;" /></a>
            </article>
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
        <!--<section class="imglug">
                
        </section>-->
        <section id="lugar">
            <section class="imglug" id="imglug"></section>

            <section>
                <?php

                    require_once("../classes/lugar.php");
                    require_once("../classes/cliente.php");

                        $obj=new lugar($_GET['id']); 
                        $lugar= $obj->getJsonObject();  

                        $decLug= JSON_DECODE($lugar);

                        $nombre=$decLug->nombre;
                        $descripcion=$decLug->desc;
                        $costo=$decLug->costo;
                        $capacidad=$decLug->capacidad;
                            //objetos-array
                        $tipo=$decLug->tipoLugar->nombre;
                                //domicilio
                                //Ubicado en Matamoros CP 22245 #7545-5 Tijuana
                            $calle=$decLug->direccion->calle;
                            $cp=$decLug->direccion->CP;
                            $numInt=$decLug->direccion->NI;
                            $numExt=$decLug->direccion->NE;
                            $municipio=$decLug->direccion->municipio->nombre;
                            if($numExt==''){
                                $domicilio='Ubicado en '.$calle.' CP '.$cp.' #'.$numInt.' '.$municipio;
                            }else{
                                $domicilio='Ubicado en '.$calle.' CP '.$cp.' #'.$numInt.'-'.$numExt.' '.$municipio;
                            }
                        $espacio=$decLug->espacios;

                        echo '</br><section><table class="tablelug" >';
                        echo '<tr><th class="tipol"><h3>'.$tipo.'<h3></th></tr>';
                        echo '<tr><th class="nombreLug">'.$nombre.'</th></tr>';
                        echo '<tr><th class="tipol"><h3>'.$descripcion.'<h3></th></tr>';
                        echo '<tr><th class="tipol"><h3>A partir de $'.$costo.'<h3></th></tr>';
                        echo '<tr><th class="tipol"><h3>Máximo de '.$capacidad.' personas<h3></th></tr>';
                        echo '<tr><th class="tipol"><h3>'.$domicilio.'<h3></th></tr>';
                        echo '<tr><th class="tipol"><h3>Cuenta con:<h3></th></tr>';
                        echo '<tr><th class="tipol">';
                            for($x=0; $x<count($espacio);$x++){
                                echo '<li>'.$espacio[$x]->nombre.'</li>';
                                //echo $espacio[$x]->nombre;
                            }
                        echo '</th></tr>';
                        echo '<tr><th class="tipol"></br><button class="resButton" onclick="abrir_reservacion()">Generar Reservación</button><h3></th></tr>';
                        echo '<table/></section></br>';


                ?>

            </section>

            <section class="publicidad">
                <a href="https://www.zankyou.com.mx/">
                <img src="../../img/anuncios/anuncio_floral1.jpg" alt="Arreglos Florales" class="imgAnuncio"/>
                <p>¿BUSCAS ARREGLOS FLORALES?</p>
                <img src="../../img/anuncios/anuncio_floral2.jpg" alt="Arreglos Florales" class="imgAnuncio"/>
                </a>
            </section>
        </section>

        <input type="text" id="numLugar" value="<?php echo $_GET['id']; ?>" disabled style="display:none">

        <dialog id="reservacion">
            <section class="complete_section">
                <section class="child">
                    <label>Lugar:</label>
                    <input type="text" id="txtlugar" value="<?php echo $nombre; ?>" disabled>
                </section>
                <section class="child">
                    <label>Nombre: </label>
                    <input type="text" id="txtNombre"/>
                </section>
                <section class="child">
                    <label>Fecha del evento:&nbsp;</label>
                    <input type="date" id="evenInic">
                </section>
                <section class="child3">
                    <label>Apellido Paterno: </label>
                    <label>Apellido Materno: </label>
                    <input type="text" id="txtPaterno"/>
                    <input type="text" id="txtMaterno"/>
                </section>
                <section class="child">
                    <label>Su evento finaliza:&nbsp;</label>
                    <input  type="date" id="evenFin">
                </section>
                <section class="child3">
                    <label>Fecha de nacimiento:&nbsp;</label>
                    <label>Número de Teléfono: </label>
                    <input type="date" id="txtFecNac">
                    <input type="tel" id="txtTel"/>
                </section>
                <section></section>
                <section class="child">
                    <label>Correo Electrónico: </label>
                    <input type="email" maxlength="30" id="txtCorreo"/>
                </section>
                <section><img src="../../img/logoOficial.png" width="100%"/></section>
                <section class="child3">
                    <label>Contraseña:&nbsp;</label>
                    <label>Confirmar Contraseña:&nbsp;</label>
                    <input type="password" id="txtPass">
                    <input type="password" id="txtConfiPass">
                </section>
                <button class="chButton" onclick="reservar()">Enviar</button>
                <button class="chButton" onclick="cerrar_reservacion()">cancelar</button>
            </section>
        </dialog>

        <dialog id="error" 
                style="width:30%; height:10%; align-items:center; margin:auto; 
                margin-top:-50%; background-color:rgb(3,95,108); color:white; text-align:center; 
                padding:4%; font-family:Arial; font-size:larger;  ">
            <p id="mensaje"></p><br />
            <input type="button"  onclick="cerrar_reservacion()" value="Cerrar"/>
        </dialog>

    </main>

    <script>
        var activada = false;
        var userID = '';
        var typeUser = '';
        var lugID = document.getElementById('numLugar').value;

        //console.log(lugID);

    </script>



</body>
</html>