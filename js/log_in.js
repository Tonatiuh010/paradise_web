// JavaScript source code

function inicio_sesion() {
    document.getElementById("prueba").innerHTML = "";
    user = document.getElementById("User").value;
    passwd = document.getElementById("Password").value;


    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            fill(ajax.responseText);
            //console.log(ajax.responseText);
        }
    };

    ajax.open("GET", "../php/actions/session_in.php?user=" + user + "&passwd=" + passwd, true);
    ajax.send();
}

function fill(ob) {

    var obj = JSON.parse(ob);
    var respuesta = obj.res;


    if (respuesta == true) {
        var tipo = obj.tipo;

        if (tipo == 'Cliente') {
            location.href = "../html/HTML_PERFIL_USUARIO.html";
        } else if (tipo == 'Agente') {
            location.href = "../html/HTML_AGEN_RESERVACIONES.html";
        } else {
            location.href = "../html/HTML_ADMIN_RESERVACIONES.html";
        }
        //location.href = "../index.html";
    } else {

        mensaje = 'Verifique su correo o contraseña';
        showError(mensaje);
    }

}


function showIcon() {
    document.getElementById('icon').style.display = "block";
}


