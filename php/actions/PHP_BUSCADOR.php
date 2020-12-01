
<html lang="en">
<head>
    <title>Lugares y Salones - Paradise</title>

    <meta charset="utf-8" />
    <link rel="stylesheet" href="../../css/CSS_BUSCADOR.css" type="text/css">
    <meta meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" href="../../img/Loto_icon.png">

</head>

<body onload="sesion(0);">

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

        <section class="principal-section">

            <section class="resultado-section">

                <?php
        
                    require_once("../classes/lugar.php");

                    $parametro= $_GET['prm'];
                    $obj= new lugar();                    
                    $resultado=json_decode($obj->buscador_navegador($parametro));
            
                    //var_dump($resultado);

			        $x = 0;
			
                    while($x < count($resultado)){

                        $imagen= $resultado[$x]->imagenes;

                      echo '<section class="elemento">';
						if(count($imagen)!=0){
							echo '<section><img class="imglug" src="../../img/lugares/'.$resultado[$x]->num.'/'.$imagen[0]->nombre.'"/></section>';
						}else{
							echo '<section><img class="imglug" src="../../img/index/anuncio4.jpg"/></section>';
						}
                      
                      echo     '<article class="margen">'.$resultado[$x]->nombre.'</article>
                                <section class="inside-element margen">
                                    <article>$'.$resultado[$x]->costo.'</article>
                                    <article>max. '.$resultado[$x]->capacidad.' personas</article>
                                </section>
                                <article class="desc">'.$resultado[$x]->desc.'</br></br></article>
                                <button class="php-button" onclick="php_lugar('.$resultado[$x]->num.')">Consultar Lugar</button>
                            </section>';
                     


				        $x = $x + 1;
                    }

        

                ?>

            </section>
        </section>

    </main>


    <script>

    function sesion(type) {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            var obj_user = JSON.parse(ajax.responseText);
            var respuesta = obj_user.res;
           

            if (respuesta == true) {
                document.getElementById('log').style.display = "none";

                document.getElementById('login').style.display = "block";
                var lotoHome = document.getElementById('imgHome');
                lotoHome.addEventListener('click', function () {
                    location.href = "../../" + obj_user.index;
                });

                activada = true;
                userID = obj_user.user;
                typeUser = obj_user.tipo;               

            } else {
                if (obj_user.index != '') {
                    showError("Error de inicio de sesión.");
                    document.body.innerHTML = "";
                    location.href = "../" + obj_user.index;
                }
            }

        }
    }

    ajax.open("GET", "session_verify.php?b="+type, true);
    ajax.send();
}

        function php_lugar(prm) {
            location.href = 'PHP_MLUGAR.php?id=' + prm;
        }

        function buscador() {

            var parametro = document.getElementById('general-search').value;

            location.href = 'PHP_BUSCADOR.php?prm=' + parametro;
        }

    </script>



</body>
</html>