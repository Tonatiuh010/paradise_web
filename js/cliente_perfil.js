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

    if (obj.usuario.imagen.length > 0) {
        var img = document.getElementById("imgCliente");
        img.src = "../img/usuario/" + obj.usuario.num + "/" + obj.usuario.imagen[0].nombre;
    }

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

    var confipassword = document.getElementById('veri_psswd').value;
    var txtPass = document.getElementById('psswd').value;


    if (txtPass == null) {
        txtPass = '';
    } else {
        if (txtPass != confipassword) {
            confirmar = false;
            var mensaje = 'Verifique que las contraseñas coincidan';
            showError(mensaje);
        }
    }

    if (confirmar != false) {

        var ajax = new XMLHttpRequest();

        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                showError(ajax.responseText);
            }
        };


        ajax.open("GET", "../php/actions/update_cliente.php?txtTelefono=" + txtTelefono + "&txtUsuario=" + txtUsuario + "&pass=" + txtPass, true);
        ajax.send();
    }

}

function cerrar() {
    document.getElementById("errorD").close();
    location.reload();
}

//---------------------------- H I S T O R I A L   D E    R E S E R V A C I O N E S -------------------------------------
var slideIndex = 1;

function usarHistorial() {
    //document.getElementById('reservacion').style.display = "None";
    document.getElementById('historial').style.display = "block";
    document.getElementById('configuracion').style.display = "None";

    document.getElementById("listaRes").innerHTML = "";

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            fillHistorial(ajax.responseText);
            //console.log(ajax.responseText);
        }
    };


    ajax.open("GET", "../php/actions/show_cliente_reservaciones.php?", true);
    ajax.send();
}

function fillHistorial(ht) {
    var y=0;
    var arrayHistorial = JSON.parse(ht);
    var historial = document.getElementById('historial');

    while (arrayHistorial[y]) {

        var slide = document.createElement('section');
        slide.className = "slides fade";

        var pat = document.createElement('Section');
        pat.setAttribute("class", "pat");

        //------------------ C H I L D  1 -----------------------
        var child1 = document.createElement('Section');
        child1.setAttribute("class", "ch1");

        var lb1 = document.createElement("Section");
        lb1.innerHTML = 'Reservación';

        var lb2 = document.createElement("Section");
        lb2.innerHTML = arrayHistorial[y].lugar.nombre;
        //lb2.setAttribute('class', 'centrar');

        var lb4 = document.createElement("Section");
        lb4.innerHTML = 'Fechas solicitadas: </br>' +
                        arrayHistorial[y].inicio + '</br>' +
                        arrayHistorial[y].termino;

        var lb5 = document.createElement("Section");
        lb5.innerHTML = 'Estado: ' + arrayHistorial[y].status;

        if (arrayHistorial[y].reservacion.total != null) {
            var lb5_1 = document.createElement("Section");
            lb5_1.innerHTML = 'Total: $' + arrayHistorial[y].reservacion.total;
        } else {
            var lb5_1 = document.createElement("Section");
            lb5_1.innerHTML = 'Total: ---';
        }
        

        child1.appendChild(lb1);
        child1.appendChild(lb2);
        //child1.appendChild(lb3);
        child1.appendChild(lb4);
        child1.appendChild(lb5);
        child1.appendChild(lb5_1);
        
        //-------------------------------------------------------

        //------------------ C H I L D  2 -----------------------
        var child2 = document.createElement('Section');
        child2.setAttribute("class", "ch2");
        //child2.setAttribute('class', 'labelL');

        var lb3 = document.createElement("Section");
        lb3.innerHTML = 'Solicitud: ';
        lb3.setAttribute('class', 'labelL');
        var lb3_1 = document.createElement("Section");
        lb3_1.setAttribute('class', 'labelR');
        lb3_1.innerHTML = arrayHistorial[y].registro;

        var lb6 = document.createElement("Section");
        lb6.innerHTML = 'Cliente: ';
        lb6.setAttribute('class', 'labelL');
        var lb6_1 = document.createElement("Section");
        lb6_1.innerHTML = arrayHistorial[y].cliente.nombre + ' '
                        + arrayHistorial[y].cliente.paterno + ' '
                        + arrayHistorial[y].cliente.materno;
        lb6_1.setAttribute('class', 'labelR');

        var lb7 = document.createElement("Section");
        lb7.innerHTML = 'Agente: ';
        lb7.setAttribute('class', 'labelL');
        var lb7_1 = document.createElement("Section");
        lb7_1.innerHTML = arrayHistorial[y].agente.nombre + ' '
                        + arrayHistorial[y].agente.paterno + ' '
                        + arrayHistorial[y].agente.materno;
        lb7_1.setAttribute('class', 'labelR');

        var lb8 = document.createElement("Section");
        lb8.innerHTML = 'Telefono del Agente: ';
        lb8.setAttribute('class', 'labelL');
        var lb8_1 = document.createElement("Section");
        lb8_1.innerHTML = arrayHistorial[y].agente.telefono;
        lb8_1.setAttribute('class', 'labelR');

        var lb9 = document.createElement("Section");
        lb9.innerHTML = 'Correo del Agente: ';
        lb9.setAttribute('class', 'labelL');
        var lb9_1 = document.createElement("Section");
        lb9_1.innerHTML = arrayHistorial[y].agente.usuario.correo;
        lb9_1.setAttribute('class', 'labelR');

        var lb10 = document.createElement("Section");
        lb10.innerHTML = 'Notas: ';
        lb10.setAttribute('class', 'labelL');
        var lb10_1 = document.createElement("Section");
        lb10_1.innerHTML = arrayHistorial[y].notas;
        lb10_1.setAttribute('class', 'labelR');

        child2.appendChild(lb3);
        child2.appendChild(lb3_1);
        child2.appendChild(lb6);
        child2.appendChild(lb6_1);
        child2.appendChild(lb7);
        child2.appendChild(lb7_1);
        child2.appendChild(lb8);
        child2.appendChild(lb8_1);
        child2.appendChild(lb9);
        child2.appendChild(lb9_1);
        child2.appendChild(lb10);
        child2.appendChild(lb10_1);

        //-------------------------------------------------------

        //------------------ C H I L D  3 -----------------------
        var child3 = document.createElement('Section');
        child3.setAttribute("class", "ch3");

        imagenes=arrayHistorial[y].lugar.imagenes.length;

        if (imagenes > 0) {
            var imglb = document.createElement('Img');
            imglb.setAttribute('class', 'ImgCH');
            imglb.setAttribute('src', '../img/lugares/' + arrayHistorial[y].lugar.num + "/" + arrayHistorial[y].lugar.imagenes[0].nombre);
        } else {
            var imglb = document.createElement('img');
            imglb.setAttribute('class', 'ImgCH');
            imglb.src = '../img/index/anuncio5.jpg';
        }

        child3.appendChild(imglb);

        child1.appendChild(child3);
        //-------------------------------------------------------

        
        pat.appendChild(child1);
        pat.appendChild(child2);

        var right_arrow = document.createElement('img');
        right_arrow.setAttribute("class", "next");
        right_arrow.src = "../img/next_page.png";
        right_arrow.addEventListener('click', function () { plusSlides(1); });

        var left_arrow = document.createElement('img');
        left_arrow.setAttribute("class", "prev");
        left_arrow.src = "../img/prev_page.png";
        left_arrow.addEventListener('click', function () { plusSlides(-1); });

        var esp = document.createElement("Section");
        esp.setAttribute("class", "espacio");

        slide.appendChild(pat);
        slide.appendChild(esp);
        slide.appendChild(left_arrow);
        slide.appendChild(right_arrow);

        historial.appendChild(slide);

        y++;

    }

    showSlides(slideIndex);

}


function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slides");
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

function reloadd() {
    location.reload();
}
