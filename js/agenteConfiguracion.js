

function buscarAgente() {       
    var ajax = new XMLHttpRequest();    
      
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
    var sectionTel = document.getElementById('secTel');
    
    //--------------------------- Variables del JSON ------------------------------------------------
    var obj = JSON.parse(ob);

    
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
    child4.setAttribute("class", "childConf");

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

    var btnImg = document.createElement('button');
    btnImg.setAttribute('class', 'imgButton');
    btnImg.innerHTML = 'Cambiar foto de perfil';
    btnImg.addEventListener('click', function () { abrirDialogEdit(); });

    var str = "";

    for (var x = 0; x < telefono.length; x++) {

        if (x == telefono.length-1) {
            str += telefono[x].telefono;
        } else {

            str += telefono[x].telefono + ",<br>";
        }
        var sect = document.createElement("section");
        sect.className = "telefs";
        sect.innerHTML = telefono[x].telefono;

        var btn = document.createElement("button");
        btn.setAttribute('class', 'updBoton');
        btn.innerHTML = "Eliminar Telefono";

        btn.addEventListener("click", function (_x) {
            return function () {
                eliminarTelefono(telefono[_x]);
                var telfs = document.getElementsByClassName("telefs");
                telfs[_x].style.display = "none";
                
            }
            
            
        }(x));


        sect.appendChild(btn);
        //sectionTel.appendChild(sect);
    }

    child4.innerHTML = str;
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

//function abrirDialogEdit() {
//    var dialog = document.getElementById("update");
//    dialog.showModal();
//}


//function closeDialogEdit() {
//    var dialog = document.getElementById("update");
//    location.reload();
//    dialog.close();
    
//}


function eliminarTelefono(obj) {    
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
           
            if (ajax.responseText==false){
                console.log("error");
            }
        }
    };


    ajax.open("GET", "../php/actions/eliminarTelefono.php?b="+obj.num, true);
    ajax.send();
}

function reloadd() {
    location.reload();
}

function abrirDialogEdit() {
    var dialog = document.getElementById("dialogUpd");
    dialog.showModal();
}


function closeDialogEdit() {
    var dialog = document.getElementById("dialogUpd");
    dialog.close();

}