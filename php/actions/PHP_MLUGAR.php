
<html lang="en">
<head>
    <title>Lugares y Salones - Paradise</title>

    <meta charset="utf-8" />
    <link rel="stylesheet" href="../../css/CSS_CLIENTE_MLUGAR.css" type="text/css">
    <meta meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" href="../../img/Loto_icon.png">


    <script src="../../js/lug_general_Info.js" charset="ISO-8859-1"></script>
    <!--<script src="../../js/error_dialog.js" charset="ISO-8859-1"></script>-->

</head>
<body onload="sesion(0); extract_img();">
    <nav>
        <section><img src="../../img/logoOficial.png" alt="Logotipo" width="30%" class="logoNav" /></section>

        <section class="menu">
            <article><a href="../../index.html" ;>INICIO</a></article>
            <article><a href="../../html/HTML_QUIENES_SOMOS.html" ;>¿QUIÉNES SOMOS?</a></article>
            <article><a href="../../html/HTML_LUGARES.html" ;>LUGARES Y SALONES</a></article>
            <article><a href="../html/HTML_ESTADISTICAS.html" ;>ESTADISTICAS</a></article>
            <article id="log"><a href="../../html/HTML_LOG_IN.html" ;>INICIAR SESION</a></article>

            <article id="login" style="display:none;">
                <article class="login-icon">
                    <a><img src="../../img/Loto_paradise.png" width="40%;" height="100%" id="imgHome" />&nbsp;&nbsp;&nbsp;&nbsp;</a>
                    <a href="session_out.php" ;><img src="../../img/log_out.png" width="30%;" height="100%" /></a>
                </article>
            </article>

        </section>
        <section></section>
        <section class="barraBusqueda">
            <input type="text" id="general-search" class="busqueda" placeholder="¿Qué estás buscando?" />
            <button type="button" id="general-button" class="search-button" onclick="buscador()">Buscar</button>
        </section>

    </nav>
         
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
                            if($calle!=''){
                                if($numExt==''){
                                    $domicilio='Ubicado en '.$calle.' CP '.$cp.' #'.$numInt.' '.$municipio;
                                }else{
                                    $domicilio='Ubicado en '.$calle.' CP '.$cp.' #'.$numInt.'-'.$numExt.' '.$municipio;
                                }
                            }else{
                                $domicilio='';
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
                        echo '<tr><th class="tipol"></br><button id="btnReservar" class="resButton" onclick="abrir_reservacion()">Generar Reservación</button><h3></th></tr>';
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


    </main>

    <script>
        var activada = false;
        var userID = '';
        var typeUser = '';
        var lugID = document.getElementById('numLugar').value;

        //console.log(lugID);
        function scroll() {
            window.scrollTo(0, 0);
        }

        function createDialog(msg) {
            var dialogo = document.createElement('dialog');
            dialogo.setAttribute('id', 'dialog_error');

            var logo = document.createElement('img');
            logo.src = "../../img/logoOficial.png";
            logo.style.width = '40%';

            var mensaje = document.createElement('section');
            mensaje.setAttribute('id', 'mensaje');
            mensaje.innerHTML = '</br >' + msg + '</br></br>';

            var boton = document.createElement('button');
            boton.innerHTML = 'Cerrar';
            boton.setAttribute('id', 'cerrar_error');

            console.log(msg);
            if (msg == true) {
                mensaje.innerHTML = '</br > Registrado inicie sesión para continuar </br></br>';
                boton.addEventListener('click', function () { reloadIndex(); });
            } else {
                boton.addEventListener('click', function () { closeError(); });
            }

            dialogo.appendChild(logo);
            dialogo.appendChild(mensaje);
            dialogo.appendChild(boton);
            document.body.appendChild(dialogo);
    

        }

        function showError(msg) {
            createDialog(msg);
    
            var dialogo = document.getElementById('dialog_error');

            disableScroll();
            dialogo.showModal();
        }
        //backDrop;

        function closeError() {
            var dialogo = document.getElementById('dialog_error');
            enableScroll();
            dialogo.close();
            document.body.removeChild(dialogo);
            location.reload();
        }


        function disableScroll() {
            window.scrollTo(0, 0);
            window.addEventListener('scroll', disableScroll);

        }

        function enableScroll() {
            window.scrollTo(0, 0);
            window.removeEventListener('scroll', disableScroll); 
        }

        function reloadIndex() {
            location.href = "../index.html";
        }

        function scroll() {
            window.scrollTo(0, 0);
        }

        function buscador() {

            var parametro = document.getElementById('general-search').value;

            location.href = 'PHP_BUSCADOR.php?prm=' + parametro;
        }
    </script>



</body>
</html>