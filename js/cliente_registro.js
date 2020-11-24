// JavaScript source code
function verifyForm() {

    //Variable para verificar una variable sin espacios
    var snEspacio = /\s/;
    //Variable que me autoriza si todo se encuentra correcto
    var confirmar = true;
    //Variable con el id del dialogo de error
    var dialogo = document.getElementById('error');

    var dato1 = document.getElementById('txtNombre').value;
    var dato2 = document.getElementById('txtApPat').value;
    var dato3 = document.getElementById('txtApMat').value;          //este campo puede estar vacio
    var dato4 = document.getElementById('txtFecNac').value;
    var dato5 = document.getElementById('txtTelefono').value;       //este campo puede estar vacio
    var dato6 = document.getElementById('txtCorreo').value;
    var dato7 = document.getElementById('txtUsuario').value;
    var dato8 = document.getElementById('txtPass').value;
    var dato9 = document.getElementById('txtConfiPass').value;

    // Posibles condicionales de verificación
    //dato1==''     ||  snEspacio.test(dato1)    ||     dato1.length < 2     ||     isNaN(dato1)
    //verificar        //verificar si encuentra     //verificarun minimo     //verificar que no sea numero 
    //si esta vacio    //espacio                   

    if (dato9 == '' || snEspacio.test(dato9) || dato9.length < 8) {
        confirmar = false;
        var mensaje = "Favor de confirmar su contraseña";
    }

    if (dato8 == '' || snEspacio.test(dato8) || dato8.length < 8) {
        confirmar = false;
        var mensaje = "Favor de colocar su constraseña, sin espacios, con al menos 8 caracteres";
    }

    if (dato8 != dato9) {
        confirmar = false;
        var mensaje = "Verifique que las contraseñas coincidan";
    }

    if (dato7 == '' || snEspacio.test(dato7) || dato7.length < 8 || isNaN(dato7) == false) {
        confirmar = false;
        var mensaje = "Favor de colocar su nombre de usuario, sin espacios, al menos 8 caracteres y con al menos 1 letra";
    }

    if (dato6 == '' || snEspacio.test(dato6)) {
        confirmar = false;
        var mensaje = "Favor de colocar su correo electrónico sin espacios";
    }

    if (dato4 == '') {
        confirmar = false;
        var mensaje = 'Favor de colocar su fecha de nacimiento';
    }

    if (dato5 != '' && dato5.length != 10) {
        confirmar = false;
        var mensaje = 'Número de caracteres incorrecto para el número de telefono';
    }

    //if (isNaN(dato3))   // == false
    //{
    //    confirmar = false;
    //    document.getElementById('mensaje').innerHTML = '';
    //    document.getElementById('mensaje').innerHTML = 'Favor de no colocar numeros en el campo apellido materno ';} 

    if (dato2 == '' || dato2.length < 2 || isNaN(dato2) == false) //
    {
        confirmar = false;
        var mensaje = "Favor de llenar correctamente el campo apellido paterno";
    }

    if (dato1 == '' || dato1.length < 2 || isNaN(dato1) == false) {
        confirmar = false;
        var mensaje = "Favor de llenar correctamente el campo nombre";
    }


    if (confirmar == false) {                       //En esta sección verificamos que todos los datos se encuentren correctos
        showError(mensaje);                        //si encuentra un solo error, despliega un dialogo con el mensaje de error
    } else {
        registrarUS(dato1, dato2, dato3, dato4, dato5, dato6, dato7, dato8);
    }   //Una vez que todo esta verificado y correcto, enviamos los parametros a la función




}

function registrarUS(d1, d2, d3, d4, d5, d6, d7, d8) {
    //var dialogo = document.getElementById('error');

    //Generamos un objeto con los datos proporcionados por el usuario

    newUserObj = {
        nombre: d1,
        paterno: d2,
        materno: d3,
        nacimiento: d4,
        telefono: d5,
        correo: d6,
        usuario: d7,
        contrasenia: d8
    }

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            showError(ajax.responseText);
        }
    };
    ajax.open("GET", "../php/actions/registrarUser.php?obj=" + JSON.stringify(newUserObj), true);
    ajax.send();

}


function cerrar() {
    document.getElementById("error").close();
    location.reload();
    //document.getElementById("error2").close();

}