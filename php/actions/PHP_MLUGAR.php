
<html lang="en">
<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="../../css/CSS_CLIENTE_MLUGAR.css" type="text/css">
    <meta meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Lugares y Salones - Paradise</title>
</head>
<body onload="sesion(); setLugar();">
    <nav class="NavOficial">
        <img src="../../img/logoOficial.png" alt="Logotipo" width="30%" class="logoNav" />

        <section class="pruebaMenu">
            <article class="pMT"><a href="../../index.html" ;>INICIO</a></article>
            <article class="pMTx"><a href="../../html/HTML_QUIENES_SOMOS.html" ;>¿QUIÉNES SOMOS?</a></article>
            <article class="pMT3"><a href="../../html/HTML_LUGARES.html" ;>LUGARES Y SALONES</a></article>
            <article class="pMT2"><a href="../../html/construccion.html" ;>PROMOCIONES</a></article>
            <article class="pMTxt" id="log"><a href="../../html/HTML_LOG_IN.html" ;>INICIAR SESION</a></article>

            <article class="pMTxt1" id="login" style="display:none;"><a href="HTML_SIGN_IN.html";>
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
            <section class="imglug">
                Inserte imagen del lugar aquí.
                Ira con un carousel
            </section>

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

                session_start();
				if($_SESSION == NULL){
					$_SESSION['ID']='';
				}
                $ob=new cliente($_SESSION['ID']); 
                $cliente= $ob->getJsonObject();  
                $decCliente= JSON_DECODE($cliente);

                ?>

            </section>

            <!--<section class="publicidad">
                Anuncio
            </section>-->
        </section>

        <!--call SP_PRE_RESERVACION_REGISTRO('2020-12-20','2020-12-23',2,10);-->

        <dialog id="reservacion">
            <section class="complete_section">
                <section class="child">
                    <label>Lugar:</label>
                    <input type="text" id="txtlugar">
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

        function abrir_reservacion() {
            var dialogo = document.getElementById('reservacion');
            dialogo.showModal();
        }

        function cerrar_reservacion() {
            document.getElementById('error').close();
            document.getElementById('reservacion').close();
            location.reload();
        }

        function sesion() {

            var ajax = new XMLHttpRequest();

            ajax.onreadystatechange = function () {
                if (ajax.status == 200 && ajax.readyState == 4) {
                    var obj_user = JSON.parse(ajax.responseText);
                    var respuesta = obj_user.res;

                    if (respuesta == true) {
                        document.getElementById('login').style.display = "block";
                        document.getElementById('log').style.display = "none";
                        setForm();
                        activada = true;
                    }


                }
            }

            ajax.open("GET", "session_verify.php?", true);
            ajax.send();
        }

        function reservar() {

            fecInic = document.getElementById('evenInic').value;
            fecFin = document.getElementById('evenFin').value;
            lugar = document.getElementById('lugar').value;

            if (activada == true) {
                var ajax = new XMLHttpRequest();
                caso = 1;

                obj =
                {
                    fecInic: document.getElementById('evenInic').value,
                    fecFin: document.getElementById('evenFin').value,
                    lugar: <?php echo $_GET['id'] ?>
                };

                ajax.onreadystatechange = function () {
                    if (ajax.status == 200 && ajax.readyState == 4) {
                        console.log(ajax.responseText);
                    }
                };

                ajax.open("get", "generar_reservacion.php?caso=" + caso + "&obj=" + JSON.stringify(obj), true);
                ajax.send();
            } else {
                var ajax = new XMLHttpRequest();
                caso = 2;

                obj = verifyForm();

                if (obj != '') {

                        ajax.onreadystatechange = function () {
                        if (ajax.status == 200 && ajax.readyState == 4) {
                            console.log(ajax.responseText);
                        }
                        };

                    ajax.open("get", "generar_reservacion.php?caso=" + caso + "&obj=" + JSON.stringify(obj), true);
                    ajax.send();
                }
                
                
            }
            

        }

        function verifyForm(){
            var snEspacio = /\s/;
            //Variable que me autoriza si todo se encuentra correcto
            var confirmar = true;
            //Variable con el id del dialogo de error
            var dialogo = document.getElementById('error');
            
            var dato1 = document.getElementById('txtNombre').value;
            var dato2 = document.getElementById('txtPaterno').value;
            var dato3 = document.getElementById('txtMaterno').value;         
            var dato4 = document.getElementById('txtFecNac').value;
            var dato5 = document.getElementById('txtTel').value;       
            var dato6 = document.getElementById('txtCorreo').value;
            var dato7 = document.getElementById('txtPass').value;
            var dato8 = document.getElementById('txtConfiPass').value;


            if (dato8=='' || snEspacio.test(dato8) || dato8.length < 8)
            {
                confirmar = false;
                document.getElementById('mensaje').innerHTML = '';
                document.getElementById('mensaje').innerHTML = 'Favor de confirmar su contraseña';}

            if (dato7=='' || snEspacio.test(dato7) || dato7.length < 8)
            {
                confirmar = false;
                document.getElementById('mensaje').innerHTML = '';
                document.getElementById('mensaje').innerHTML = 'Favor de colocar su constraseña, sin espacios, con al menos 8 caracteres';}

            if (dato7 != dato8) {
                confirmar = false;
                document.getElementById('mensaje').innerHTML = '';
                document.getElementById('mensaje').innerHTML = 'Verifique que las contraseñas coincidan';}

            if (dato6 == '' || snEspacio.test(dato6))
            {
                confirmar = false;
                document.getElementById('mensaje').innerHTML = '';
                document.getElementById('mensaje').innerHTML = 'Favor de colocar su correo electrónico sin espacios';}

            if (dato4=='')
            {
                confirmar = false;
                document.getElementById('mensaje').innerHTML = '';
                document.getElementById('mensaje').innerHTML = 'Favor de colocar su fecha de nacimiento';}

            if (dato2 == '' || dato2.length < 2 || isNaN(dato2) == false) //
            {
                confirmar = false;
                document.getElementById('mensaje').innerHTML = '';
                document.getElementById('mensaje').innerHTML = 'Favor de llenar el campo apellido paterno (sin ingresar números)';}

            if (dato1 == '' || dato1.length < 2 || isNaN(dato1) == false)
            {
                confirmar = false;
                document.getElementById('mensaje').innerHTML = '';
                document.getElementById('mensaje').innerHTML = 'Favor de llenar el campo nombre (sin ingresar números)';}
            

            if (confirmar == false) {
                document.getElementById('reservacion').close();                                            
                dialogo.showModal();
                empty = '';
				return empty;
                
            } else {                                                                    
                ob = {
                    nombre: dato1,
                    paterno: dato2,
                    materno: dato3,
                    nacimiento: dato4,
                    telefono: dato5,
                    correo: dato6,
                    contrasenia: dato7,

                    fecInic: document.getElementById('evenInic').value,
                    fecFin: document.getElementById('evenFin').value,
                    lugar: <?php echo $_GET['id'] ?>
                }; 

                return ob;
            }   
            
        }

    </script>

    <script>

        function setLugar() {
            var lugar = '<?php echo $nombre; ?>';
            document.getElementById('txtlugar').value = lugar;
            document.getElementById("txtlugar").disabled = true;

        }
        

        function setForm() {
            
            var nombre = '<?php echo $decCliente->nombre; ?>' ;
            var paterno = '<?php echo $decCliente->paterno; ?>' ;
            var materno = '<?php echo $decCliente->materno; ?>' ;
            var nacimiento = '<?php echo $decCliente->nacimiento; ?>' ;
            var telefono = '<?php echo $decCliente->telefono; ?>' ;
            var correo = '<?php echo $decCliente->usuario->correo; ?>' ;
            var contrasenia = '<?php 
                $contrasenia=$decCliente->usuario->contrasenia;
                $y = '*'; $z = '';
                $passwd = strlen($contrasenia);
                for ($x = 0; $x < $passwd; $x=$x+1) {
                    $z = $z.$y;
                }

                echo $z;
                ?> ' ;

            document.getElementById('txtNombre').value = nombre;
            document.getElementById("txtNombre").disabled = true;

            document.getElementById('txtPaterno').value = paterno;
            document.getElementById("txtPaterno").disabled = true;

            document.getElementById('txtMaterno').value = materno;
            document.getElementById("txtMaterno").disabled = true;

            document.getElementById('txtFecNac').value = nacimiento;
            document.getElementById("txtFecNac").disabled = true;
            
            document.getElementById('txtTel').value = telefono;
            document.getElementById("txtTel").disabled = true;

            document.getElementById('txtCorreo').value =correo;
            document.getElementById("txtCorreo").disabled = true;

            document.getElementById('txtPass').value = contrasenia;
            document.getElementById("txtPass").disabled = true;

            document.getElementById('txtConfiPass').value = contrasenia;
            document.getElementById("txtConfiPass").disabled = true;

            //console.log(nombre,paterno,materno,nacimiento,telefono,correo,contrasenia,lugar);
        }

    </script>



</body>
</html>