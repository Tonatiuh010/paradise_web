// JavaScript source code

function sesion() {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            var obj_user = JSON.parse(ajax.responseText);
            var respuesta = obj_user.res;

            if (respuesta == true) {
                document.getElementById('login').style.display = "block";
                document.getElementById('log').style.display = "none";
            }


        }
    }

    ajax.open("GET", "../php/actions/session_verify.php?", true);
    ajax.send();
}


