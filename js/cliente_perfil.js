// JavaScript source code



function usarConfiguracion() {
    //document.getElementById('reservacion').style.display = "None";
    document.getElementById('historial').style.display = "None";
    document.getElementById('configuracion').style.display = "block";

    document.getElementById('udpUser').style.display = "none";
    document.getElementById('udpPsswd').style.display = 'none';
    document.getElementById('udpTel').style.display = "none";
    document.getElementById('data').innerHTML = '';
    //document.getElementById('update').style.display = 'none';


    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            //document.getElementById('data').innerHTML = ajax.responseText;
            fillData(ajax.responseText);
            //console.log(JSON.parse(ajax.responseText));
        }
    };

    ajax.open("get", "../php/actions/show_cliente_info.php?", true);
    ajax.send();
}

function fillData(ob) {

    var seccion = document.getElementById('data');

    //--------------------------- Variables del JSON ------------------------------------------------
    var obj = JSON.parse(ob);
    var nombre = obj.nombre;
    var paterno = obj.paterno;
    var materno = obj.materno;
    var nacimiento = obj.nacimiento;
    var edad = obj.edad;
    var telefono = obj.telefono;
    var usuario = obj.usuario.nombre;
    var contrasenia = obj.usuario.contrasenia;
    var correo = obj.usuario.correo;
    //--------------------------- Variables del JSON ------------------------------------------------

    //--------------------------- Elementos para append child ------------------------------------------------

    var user_bt = document.createElement("button");
    user_bt.setAttribute("class", "updBoton");
    user_bt.addEventListener('click', function () { updUser(); });
    user_bt.innerHTML = 'Cambiar';
    //ESTO LO HIZO TONATIUH

    var pssw_bt = document.createElement("button");
    pssw_bt.setAttribute("class", "updBoton");
    pssw_bt.addEventListener('click', function () { updPssw(); });
    pssw_bt.innerHTML = 'Cambiar';
    //ESTO LO HIZO TONATIUH

    var tel_bt = document.createElement("button");
    tel_bt.setAttribute("class", "updBoton");
    tel_bt.addEventListener('click', function () { updTel(); });
    tel_bt.innerHTML = 'Cambiar';
    //ESTO LO HIZO TONATIUH

    var parent = document.createElement('section');
    parent.setAttribute("class", "complete_section");

    var child1 = document.createElement('section');
    child1.setAttribute("class", "child");
    child1.innerHTML = nombre + ' ' + paterno + ' ' + materno;

    var child2 = document.createElement('section');
    child2.setAttribute("class", "child");
    child2.innerHTML = nacimiento;

    var child3 = document.createElement('section');
    child3.setAttribute("class", "child");
    child3.innerHTML = edad;

    var child4 = document.createElement('section');
    child4.setAttribute("class", "child");
    child4.innerHTML = telefono;

    var child5 = document.createElement('section');
    child5.setAttribute("class", "child");
    child5.innerHTML = usuario;

    var child6 = document.createElement('section');
    child6.setAttribute("class", "child");
    var y = '*'; var z = '';
    var passwd = contrasenia.length;
    for (x = 0; x < passwd; x++) {
        z += y;
    }
    child6.innerHTML = z;

    var child7 = document.createElement('section');
    child7.setAttribute("class", "child");
    child7.innerHTML = correo;

    var child1_1 = document.createElement('section');
    child1_1.setAttribute("class", "child2");
    child1_1.innerHTML = 'NOMBRE: ';

    var child2_2 = document.createElement('section');
    child2_2.setAttribute("class", "child2");
    child2_2.innerHTML = 'FECHA DE NACIMIENTO: ';

    var child3_3 = document.createElement('section');
    child3_3.setAttribute("class", "child2");
    child3_3.innerHTML = 'EDAD: ';

    var child4_4 = document.createElement('section');
    child4_4.setAttribute("class", "child2");
    child4_4.innerHTML = 'TÉLEFONO: ';

    var child5_5 = document.createElement('section');
    child5_5.setAttribute("class", "child2");
    child5_5.innerHTML = 'USUARIO: ';

    var child6_6 = document.createElement('section');
    child6_6.setAttribute("class", "child2");
    child6_6.innerHTML = "CONTRASEÑA: ";

    var child7_7 = document.createElement('section');
    child7_7.setAttribute("class", "child2");
    child7_7.innerHTML = 'CORREO: ';
    //var br = document.createElement('br');
    var hr = document.createElement('hr');
    //--------------------------- Elementos para append child ------------------------------------------------

    var username = document.getElementById('user_name');
    username.innerHTML = nombre;

    child4.appendChild(tel_bt);
    child5.appendChild(user_bt);
    child6.appendChild(pssw_bt);

    seccion.appendChild(parent);

    parent.appendChild(child1_1);
    parent.appendChild(child1);

    parent.appendChild(child2_2);
    parent.appendChild(child2);

    parent.appendChild(child3_3);
    parent.appendChild(child3);

    if (telefono != null) {
        parent.appendChild(child4_4);
        parent.appendChild(child4);
    }

    parent.appendChild(child5_5);
    parent.appendChild(child5);

    parent.appendChild(child6_6);
    parent.appendChild(child6);

    parent.appendChild(child7_7);
    parent.appendChild(child7);

    //console.log(nombre, paterno, materno, nacimiento, edad, telefono, usuario, contrasenia, correo);

}


function updUser() {
    document.getElementById('data').innerHTML = '';
    //document.getElementById('update').styele.display = 'block';
    document.getElementById('udpUser').style.display = "block";
}

function updPssw() {
    document.getElementById('data').innerHTML = '';
    //document.getElementById('update').styele.display = 'block';
    document.getElementById('udpPsswd').style.display = 'block';
}

function updTel() {
    document.getElementById('data').innerHTML = '';
    //document.getElementById('update').styele.display = 'block';
    document.getElementById('udpTel').style.display = "block";
}

function update() {
    confirmar = true;

    txtTelefono = document.getElementById('txtTelefono').value;
    if (txtTelefono == null) {
        txtTelefono = '';
    }
    txtUsuario = document.getElementById('txtUsuario').value;
    if (txtUsuario == null) {
        txtUsuario = '';
    }
    confipassword = document.getElementById('veri_psswd').value;
    txtPass = document.getElementById('psswd').value;
    if (txtPass == null) {
        txtPass = '';
    } else {
        if (txtPass != confipassword) {
            confirmar = false;
            document.getElementById('error').innerHTML = '';
            document.getElementById('error').innerHTML = 'Verifique que las contraseñas coincidan';
            var dialogo = document.getElementById('errorD');
            dialogo.showModal();
        }
    }

    if (confirmar != false) {

        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                //document.getElementById("listaRes").innerHTML = ajax.responseText;
                document.getElementById('error').innerHTML = '';
                document.getElementById('error').innerHTML = ajax.responseText;
                var dialogo = document.getElementById('errorD');
                dialogo.showModal();
            }
        };


        ajax.open("GET", "../php/actions/update_cliente.php?txtTelefono=" + txtTelefono + "&txtUsuario=" + txtUsuario + "&txtPass" + txtPass, true);
        ajax.send();
    }

}

function cerrar() {
    document.getElementById("errorD").close();
    location.reload();
}

//---------------------------- H I S T O R I A L   D E    R E S E R V A C I O N E S -------------------------------------


function usarHistorial() {
    //document.getElementById('reservacion').style.display = "None";
    document.getElementById('historial').style.display = "block";
    document.getElementById('configuracion').style.display = "None";

    document.getElementById("listaRes").innerHTML = "";

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //fillHistorial(ajax.responseText);
            console.log(ajax.responseText);
        }
    };


    ajax.open("GET", "../php/actions/show_cliente_reservaciones.php?", true);
    ajax.send();
}

//function fillHistorial(ht) {
//    var y=0;
//    var arrayHistorial = JSON.parse(ob);


//}


function buscarRes() {
    document.getElementById("listaRes").innerHTML = "";

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById("listLugar").style.display = "block";
            document.getElementById("listLugar").innerHTML = ajax.responseText;
        }
    };


    ajax.open("GET", "../php/buscarLugares.php?", true);
    ajax.send();

}
