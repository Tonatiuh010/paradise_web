// JavaScript source code

function extractData() {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            //document.getElementById('data').innerHTML = ajax.responseText;
            setForm(ajax.responseText);
            //console.log(JSON.parse(ajax.responseText));
        }
    };

    ajax.open("get", "show_cliente_info.php?", true);
    ajax.send();
}




function setForm(ob) {

    var obj = JSON.parse(ob);
    //console.log(obj);

    var nombre = obj.nombre;
    var paterno = obj.paterno;
    var materno = obj.materno;
    var nacimiento = obj.nacimiento;
    var telefono = obj.telefono;
    var contrasenia = obj.usuario.contrasenia;
    var correo = obj.usuario.correo;

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

    document.getElementById('txtCorreo').value = correo;
    document.getElementById("txtCorreo").disabled = true;

    document.getElementById('txtPass').value = contrasenia;
    document.getElementById("txtPass").disabled = true;

    document.getElementById('txtConfiPass').value = contrasenia;
    document.getElementById("txtConfiPass").disabled = true;

    //console.log(nombre,paterno,materno,nacimiento,telefono,correo,contrasenia,lugar);
}

function abrir_reservacion() {
    var dialogo = document.getElementById('reservacion');

    if (activada == true) {
        disableScroll();
        dialogo.showModal();
    } else {
        var msg = 2;
        showError(msg);
    }

    
}

function cerrar_reservacion() {
    //document.getElementById('error').close();
    document.getElementById('reservacion').close();
    enableScroll();
    location.reload();
}

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
                if (typeUser == 'Administrador' || typeUser == 'Agente') {
                    document.getElementById("btnReservar").style.display="none";
                }


                extractData();

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

function reservar() {

    fecInic = document.getElementById('evenInic').value;
    fecFin = document.getElementById('evenFin').value;
    lugar = document.getElementById('lugar').value;

    if (fecInic != '' && fecFin != '' && lugar != '') {
        if (activada == true) {
            var ajax = new XMLHttpRequest();

            obj =
            {
                fecInic: document.getElementById('evenInic').value,
                fecFin: document.getElementById('evenFin').value,
                lugar: lugID
            };

            ajax.onreadystatechange = function () {
                if (ajax.status == 200 && ajax.readyState == 4) {
                    if (ajax.responseText == 1) {
                        alert('Reservación en proceso, revise en su historial de reservaciones para continuar');
                        window.location.href = "../../index.html";
                    } else {
                        document.getElementById('reservacion').close();
                        showError(ajax.responseText);
                    }
                }
            };

            ajax.open("get", "generar_reservacion.php?obj=" + JSON.stringify(obj), true);
            ajax.send();
        } else {
            var msg = 2;
            showError(msg);

        }
    } else {
        var msg = 'Favor de anexar las fechas a solicitar';
        showError(msg);
    }
}

function verifyForm() {
    var snEspacio = /\s/;
    //Variable que me autoriza si todo se encuentra correcto
    var confirmar = true;
    //Variable con el id del dialogo de error

    var dato1 = document.getElementById('txtNombre').value;
    var dato2 = document.getElementById('txtPaterno').value;
    var dato3 = document.getElementById('txtMaterno').value;
    var dato4 = document.getElementById('txtFecNac').value;
    var dato5 = document.getElementById('txtTel').value;
    var dato6 = document.getElementById('txtCorreo').value;
    var dato7 = document.getElementById('txtPass').value;
    var dato8 = document.getElementById('txtConfiPass').value;


    if (dato8 == '' || snEspacio.test(dato8) || dato8.length < 8) {
        confirmar = false;
        var mensaje = 'Favor de confirmar su contraseña';
    }

    if (dato7 == '' || snEspacio.test(dato7) || dato7.length < 8) {
        confirmar = false;
        var mensaje = 'Favor de colocar su constraseña, sin espacios, con al menos 8 caracteres';
    }

    if (dato7 != dato8) {
        confirmar = false;
        var mensaje = 'Verifique que las contraseñas coincidan';
    }

    if (dato6 == '' || snEspacio.test(dato6)) {
        confirmar = false;
        var mensaje = 'Favor de colocar su correo electrónico sin espacios';
    }

    if  (dato5 != '' && dato5.length!=10) {
        confirmar = false;
        var mensaje = 'Número de caracteres incorrecto para el número de telefono';
    }

    if (dato4 == '') {
        confirmar = false;
        var mensaje = 'Favor de colocar su fecha de nacimiento';
    }

    if (dato2 == '' || dato2.length < 2 || isNaN(dato2) == false) //
    {
        confirmar = false;
        var mensaje = 'Favor de llenar correctamente el campo apellido paterno';
    }

    if (dato1 == '' || dato1.length < 2 || isNaN(dato1) == false) {
        confirmar = false;
        var mensaje = 'Favor de llenar correctamente el campo nombre';
    }


    if (confirmar == false) {
        document.getElementById('reservacion').close();
        showError(mensaje);
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
            lugar: lugID
        };

        return ob;
    }

}


//------------------------------------ C A R R U S E L ------------------------------------------------------------------

var slideIndex = 1;

function extract_img() {
    var ajax = new XMLHttpRequest();
    var lugar = lugID;

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            //document.getElementById('data').innerHTML = ajax.responseText;
            console.log(JSON.parse(ajax.responseText));
            fill_img(ajax.responseText);
        }
    };

    ajax.open("get", "extract_img.php?lug=" + lugar, true);
    ajax.send();
}

function fill_img(img) {
    var arrayImg = JSON.parse(img);
    var imgsec = document.getElementById('imglug');

    var arreglos = arrayImg.length;
    var paneles = arreglos / 3;
    paneles = Math.ceil(paneles);

    y = 0;

    if (arreglos > 0) {

        for (x = 0; x < paneles; x++) {

            var panel = document.createElement('section');
            panel.className = "slide fade";

            var right_arrow = document.createElement('img');
            right_arrow.setAttribute("class", "next");
            right_arrow.src = "../../img/right.png";
            right_arrow.addEventListener('click', function () { plusSlides(1); });

            var left_arrow = document.createElement('img');
            left_arrow.setAttribute("class", "prev");
            left_arrow.src = "../../img/left.png";
            left_arrow.addEventListener('click', function () { plusSlides(-1); });

            var imagenes = document.createElement('section');
            imagenes.setAttribute("class", "imagenes");

            panel.appendChild(imagenes);
            if (arreglos > 3) {
                imagenes.appendChild(right_arrow);
                imagenes.appendChild(left_arrow);
            }
            
            imgsec.appendChild(panel);

            for (a = 0; a < 3; a++) {

                

                if (arrayImg[y]) {

                    var imgbox = document.createElement('a');
                    imgbox.setAttribute('class', 'ch1');
                    //imgbox.setAttribute('href', '../../img/lugares/' + lugID + '/' + arrayImg[y].nombre);
                    imgbox.href = '../../img/lugares/' + lugID + '/' + arrayImg[y].nombre
                    var img = document.createElement("img");
                    img.setAttribute('class', 'ch2');

                    img.src = "../../img/lugares/" + lugID + "/" + arrayImg[y].nombre;

                    imgbox.appendChild(img);
                    imagenes.appendChild(imgbox);
                    

                    y++;
                }

            }

        }
    }

    



    showSlides(slideIndex);
}


function plusSlides(n) {
    showSlides(slideIndex += n);
    scroll();
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    //console.log(document.getElementsByClassName('slide'));

    if (n < 1) {
        slideIndex = slides.length;
    }

    if (n > slides.length) {
        slideIndex = 1;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slides[slideIndex - 1].style.display = 'block';


}