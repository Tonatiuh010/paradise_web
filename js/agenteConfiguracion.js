

function buscarAgente() {       
    var ajax = new XMLHttpRequest();    
    //var seccion = document.getElementById('data');
    //seccion.innerHTML = '';
      
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
           
            fillDataShc(ajax.responseText);
        }
    };


    ajax.open("GET", "../php/actions/matriculaAgente.php?", true);
    ajax.send();

}

function fillDataShc(ob) {    
    var seccion = document.getElementById('data');
    var tellist = document.getElementById('numeros-agente');
    
    //--------------------------- Variables del JSON ------------------------------------------------
    var obj = JSON.parse(ob);
    console.log(obj);
    
    if (obj.usuario.imagen.length>0){
        var img = document.getElementById("imgAgente");        
        img.src = "../img/usuario/" + obj.usuario.num + "/" + obj.usuario.imagen[0].nombre;
    }    

    var nombre = obj.nombre;
    var paterno = obj.paterno;
    var materno = obj.materno;
    var nacimiento = obj.nacimiento;
    var edad = obj.edad;
    var telefono = obj.telefono;
    var usuario = obj.usuario.nombre;
    var contrasenia = obj.usuario.contrasenia;
    var correo = obj.usuario.correo;


    var nameTag = document.getElementById("user_name");
    nameTag.innerText = nombre;

    //--------------------------- Variables del JSON ------------------------------------------------

    //--------------------------- Elementos para append child ------------------------------------------------


    var parent = document.createElement('section');
    parent.setAttribute("class", "complete_sectionConf");

    var child1 = document.createElement('section');
    child1.setAttribute("class", "childConf");
    child1.innerHTML = nombre + ' ' + paterno + ' ' + materno;

    var child2 = document.createElement('section');
    child2.setAttribute("class", "childConf");
    child2.innerHTML = nacimiento;

    var child3 = document.createElement('section');
    child3.setAttribute("class", "childConf");
    child3.innerHTML = edad;

    var child4 = document.createElement('section');
    child4.setAttribute("class", "childConf5");

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
    tel_bt.setAttribute("class", "updBotontel");
    tel_bt.addEventListener('click', function () { updTel(); });
    tel_bt.innerHTML = 'Cambiar';

    var btnImg = document.createElement('button');
    btnImg.setAttribute('class', 'imgButton');
    btnImg.innerHTML = 'Cambiar foto de perfil';
    btnImg.addEventListener('click', function () { abrirDialogEdit(); });

    var str = "";

    for (var x = 0; x < telefono.length; x++) {

        if (x == telefono.length-1) {
            //str += telefono[x].telefono;
            str += '<li>' + telefono[x].telefono + '</li>';
        } else {

            str += '<li>' + telefono[x].telefono + '</li>';
        }

        if (x == telefono.length - 1) {
            var del_tel_sec = document.createElement('section');
            del_tel_sec.setAttribute('class', 'tel-label');
            del_tel_sec.innerHTML= '<li>' + telefono[x].telefono + '</li>';
        } else {
            var del_tel_sec = document.createElement('section');
            del_tel_sec.setAttribute('class', 'tel-label');
            del_tel_sec.innerHTML = '<li>' + telefono[x].telefono + '</li>';
        }

        var num_telefono = telefono[x].num;

        var btn_eliminar = document.createElement('button');
        btn_eliminar.innerHTML = 'eliminar';
        btn_eliminar.setAttribute('class', 'udpButtons');
        btn_eliminar.addEventListener('click', function () { eliminarTelefono(num_telefono); });

        tellist.appendChild(del_tel_sec);
        tellist.appendChild(btn_eliminar);

        //var sect = document.createElement("section");
        //sect.className = "telefs";
        //sect.innerHTML = telefono[x].telefono;

        //var btn = document.createElement("button");
        //btn.setAttribute('class', 'updBoton');
        //btn.innerHTML = "Eliminar Telefono";

        //btn.addEventListener("click", function (_x) {
        //    return function () {
        //        eliminarTelefono(telefono[_x]);
        //        var telfs = document.getElementsByClassName("telefs");
        //        telfs[_x].style.display = "none";
                
        //    }
            
            
        //}(x));


        //sect.appendChild(btn);
        //sectionTel.appendChild(sect);
    }

    var telefonos = document.createElement('section');
    telefonos.innerHTML = str;
    child4.appendChild(telefonos);
    //child4.innerHTML = str;
    child4.appendChild(tel_bt);

    var child5 = document.createElement('section');
    child5.setAttribute("class", "childConf");
    child5.innerHTML = usuario;
    child5.appendChild(user_bt);

    var child6 = document.createElement('section');
    child6.setAttribute("class", "childConf");
    var y = '*'; var z = '';
    var passwd = contrasenia.length;
    for (x = 0; x < passwd; x++) {
        z += y;
    }
    child6.innerHTML = z;
    child6.appendChild(pssw_bt);

    var child7 = document.createElement('section');
    child7.setAttribute("class", "childConf");
    child7.innerHTML = correo;

    var child1_1 = document.createElement('section');
    child1_1.setAttribute("class", "child2Conf");
    child1_1.innerHTML = 'NOMBRE: ';

    var child2_2 = document.createElement('section');
    child2_2.setAttribute("class", "child2Conf");
    child2_2.innerHTML = 'FECHA DE NACIMIENTO: ';

    var child3_3 = document.createElement('section');
    child3_3.setAttribute("class", "child2Conf");
    child3_3.innerHTML = 'EDAD: ';

    var child4_4 = document.createElement('section');
    child4_4.setAttribute("class", "child2Conf");
    child4_4.innerHTML = 'TÉLEFONO: ';

    var child5_5 = document.createElement('section');
    child5_5.setAttribute("class", "child2Conf");
    child5_5.innerHTML = 'USUARIO: ';

    var child6_6 = document.createElement('section');
    child6_6.setAttribute("class", "child2Conf");
    child6_6.innerHTML = "CONTRASEÑA: ";

    var child7_7 = document.createElement('section');
    child7_7.setAttribute("class", "child2Conf");
    child7_7.innerHTML = 'CORREO: ';
    //var br = document.createElement('br');
    var hr = document.createElement('hr');
    //--------------------------- Elementos para append child ------------------------------------------------

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

    parent.appendChild(btnImg);
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


        ajax.open("GET", "../php/actions/update_agente.php?txtTelefono=" + txtTelefono + "&txtUsuario=" + txtUsuario + "&pass=" + txtPass, true);
        ajax.send();
    }

}

//function abrirDialogEdit() {
//    var dialog = document.getElementById("update");
//    dialog.showModal();
//}


//function closeDialogEdit() {
//    var dialog = document.getElementById("update");
//    location.reload();
//    dialog.close();
    
//}


function eliminarTelefono(tel) {    
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log(ajax.responseText);
           
            if (ajax.responseText == false) {

                console.log("error");
            } else {
                alert('Eliminado');
                window.location.href = "HTML_AGEN_CONFIGURACION.html";
            }
        }
    };


    ajax.open("GET", "../php/actions/eliminarTelefono.php?b="+tel, true);
    ajax.send();
}



function reloadd() {
    location.reload();
}

function abrirDialogEdit() {
    var dialog = document.getElementById("dialogUpd");
    disableScroll();
    dialog.showModal();
}


function closeDialogEdit() {
    var dialog = document.getElementById("dialogUpd");
    enableScroll();
    dialog.close();

}

function disableScroll() {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', disableScroll);
}

function enableScroll() {
    window.scrollTo(0, 0);
    window.removeEventListener('scroll', disableScroll);
}