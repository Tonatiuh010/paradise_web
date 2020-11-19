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
                activada = true;
                userID = obj_user.user;
                typeUser = obj_user.tipo;
                extractData();
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
            lugar: lugID
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

function verifyForm() {
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


    if (dato8 == '' || snEspacio.test(dato8) || dato8.length < 8) {
        confirmar = false;
        document.getElementById('mensaje').innerHTML = '';
        document.getElementById('mensaje').innerHTML = 'Favor de confirmar su contraseña';
    }

    if (dato7 == '' || snEspacio.test(dato7) || dato7.length < 8) {
        confirmar = false;
        document.getElementById('mensaje').innerHTML = '';
        document.getElementById('mensaje').innerHTML = 'Favor de colocar su constraseña, sin espacios, con al menos 8 caracteres';
    }

    if (dato7 != dato8) {
        confirmar = false;
        document.getElementById('mensaje').innerHTML = '';
        document.getElementById('mensaje').innerHTML = 'Verifique que las contraseñas coincidan';
    }

    if (dato6 == '' || snEspacio.test(dato6)) {
        confirmar = false;
        document.getElementById('mensaje').innerHTML = '';
        document.getElementById('mensaje').innerHTML = 'Favor de colocar su correo electrónico sin espacios';
    }

    if (dato4 == '') {
        confirmar = false;
        document.getElementById('mensaje').innerHTML = '';
        document.getElementById('mensaje').innerHTML = 'Favor de colocar su fecha de nacimiento';
    }

    if (dato2 == '' || dato2.length < 2 || isNaN(dato2) == false) //
    {
        confirmar = false;
        document.getElementById('mensaje').innerHTML = '';
        document.getElementById('mensaje').innerHTML = 'Favor de llenar el campo apellido paterno (sin ingresar números)';
    }

    if (dato1 == '' || dato1.length < 2 || isNaN(dato1) == false) {
        confirmar = false;
        document.getElementById('mensaje').innerHTML = '';
        document.getElementById('mensaje').innerHTML = 'Favor de llenar el campo nombre (sin ingresar números)';
    }


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
            lugar: lugID
        };

        return ob;
    }

}
