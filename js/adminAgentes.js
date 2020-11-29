var slideIndex = 1;


function registrarAgente() { 

    var agenteOb = null;

    var genero = document.getElementById("genreBox");

        agenteOb = {
            nombre: document.getElementById("txtNombre").value,
            apPat: document.getElementById("txtApPat").value,
            apMat: document.getElementById("txtApMat").value,
            fecNac: document.getElementById("txtFecNac").value,            
            genero: genero.options[genero.selectedIndex].value,
            telefono: document.getElementById("txtTelefono").value,
            usuario: {
                correo: document.getElementById("txtCorreo").value,
                nameUser: document.getElementById("txtUsuario").value,
                passwd: new function () {
                    this.passContent = document.getElementById("txtPass").value;
                    validationPass = document.getElementById("txtConfiPass").value;

                    if (this.passContent != validationPass) {
                        this.passContent = false;

                        }

                    }
            },
            verify: function () {                
                if (this.apPat == "" || this.nombre == "" || this.fecNac == "" || this.usuario.correo == "" || this.usuario.nameUser == ""|| this.usuario.passwd.passContent==false) {
                    return false;
                } else {
                    return true;
                }
            }
        };

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
            var res = JSON.parse(ajax.responseText);

            if (res.res==false){
                showError(res.error);
            } else {
                location.reload();
             
            }

            
        }
    };
    agenteOb.verify();

    //ajax.open("GET", "../php/sendLugar.php?b="+JSON.stringify(lugarOb), true);
    ajax.open("GET", "../php/actions/registrarAgente.php?b=" + JSON.stringify(agenteOb), true);
    if (agenteOb.verify()) {
        
       ajax.send();
    } else {
        // Mostrar Diálogo
        showError("Favor de verificar que los datos ingresados sean correctos.");
    }
    
}


function buscarAgente() {
    document.getElementById("listAgen").innerHTML = "";

    var ajax = new XMLHttpRequest();

    var shc=document.getElementById("shcId").value
      
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
           
            fillAgenteShc(ajax.responseText);
        }
    };


    ajax.open("GET", "../php/actions/buscarAgente.php?b=" + shc, true);
    ajax.send();

}





function clearForm() {

    var t = 0;

    var genero = document.getElementById("genreBox");
    genero.options.selectedIndex = 0;

    document.getElementById("txtNombre").value="";
    document.getElementById("txtApPat").value="";
    document.getElementById("txtApMat").value="";
    document.getElementById("txtFecNac").value="";    
    document.getElementById("txtTelefono").value="";
    
    document.getElementById("txtCorreo").value="";
    document.getElementById("txtUsuario").value="";
        
    document.getElementById("txtPass").value="";
    document.getElementById("txtConfiPass").value="";

}


function fillAgenteShc(ob) {


    var list = document.getElementById("listAgen");
    list.style.display = "block"; 
    var arrayAgentes = JSON.parse(ob);
    console.log(arrayAgentes);

    var arreglos = arrayAgentes.length;
    var paneles = arreglos / 5;
    paneles = Math.ceil(paneles);


    var y = 0;

    for (x = 0; x < paneles; x++) {

        var panel = document.createElement('section');
        panel.className = "paneles fade";

        var right_arrow = document.createElement('img');
        right_arrow.setAttribute("class", "right");
        right_arrow.src = "../img/next_page.png";
        right_arrow.addEventListener('click', function () { plusPaneles(1); });

        var left_arrow = document.createElement('img');
        left_arrow.setAttribute("class", "left");
        left_arrow.src = "../img/prev_page.png";
        left_arrow.addEventListener('click', function () { plusPaneles(-1); });

        var esp2 = document.createElement("Section");
        esp2.setAttribute("class", "espacio");

        list.appendChild(panel);

        for (a = 0; a < 5; a++) {

            var agente_sec = document.createElement('section');
            agente_sec.setAttribute("class", "patern2");

            var esp = document.createElement("Section");
            esp.setAttribute("class", "espacio");

            if (arrayAgentes[y]) {

                panel.appendChild(agente_sec);
                panel.appendChild(esp);

                var child1 = document.createElement('section');
                child1.setAttribute('class', 'chl1');

                var child2 = document.createElement('section');
                child2.setAttribute('class', 'chl2');

                //--------------------------------------- C H I L D  1 -----------------------------------------------------------------
                    if (arrayAgentes[y].usuario.imagen.length > 0) {
                        var img = document.createElement('Img');
                        img.setAttribute('class', 'img');
                        img.setAttribute('src', '../img/usuario/' + arrayAgentes[y].usuario.num + "/" + arrayAgentes[y].usuario.imagen[0].nombre);
                    } else {
                        var img = document.createElement('Img');
                        img.setAttribute('class', 'img');
                        img.setAttribute('src', '../img/perfil_usuario.png');
                    }

               

                var imgsec = document.createElement('section');
                imgsec.setAttribute('class', 'imgsec');

                imgsec.appendChild(img);
                child1.appendChild(imgsec);

                //-----------------------------------------------------------------------------------------------------------------------

                //--------------------------------------- C H I L D  2 -----------------------------------------------------------------
                var row1 = document.createElement('section');
                var row2 = document.createElement('section');
                var row3 = document.createElement('section');

                child2.appendChild(row1);
                child2.appendChild(row2);
                child2.appendChild(row3);

                var lb1 = document.createElement('section');
                lb1.setAttribute('class', 'label');
                lb1.innerHTML = 'Matricula: ' + arrayAgentes[y].matricula;

                var lb2 = document.createElement('section');
                lb2.setAttribute('class', 'label');
                lb2.innerHTML = 'Género: ' + arrayAgentes[y].genero;

                var lb3 = document.createElement('section');
                lb3.setAttribute('class', 'label');
                lb3.innerHTML = 'Edad: ' + arrayAgentes[y].edad;

                row1.appendChild(lb1);
                row1.appendChild(lb2);
                row1.appendChild(lb3);
                row1.setAttribute('class', 'chl2-1');

                row2.innerHTML = 'Nombre: ' + arrayAgentes[y].nombre + " " + arrayAgentes[y].paterno + " " + arrayAgentes[y].materno + '</br>';
                row2.setAttribute('class', 'label');

                var lb4 = document.createElement('section');
                    var str = "";
                    for (var i = 0; i < arrayAgentes[y].telefono.length; i++) {

                        if (i == 0) {
                            str += 'Teléfonos: </br></br><li>' + arrayAgentes[y].telefono[i].telefono + '</li>';
                        } else {
                            if (i != arrayAgentes[y].telefono.length - 1)
                                str += '<li>' + arrayAgentes[y].telefono[i].telefono + '</li>';
                            else {
                                str += '<li>' + arrayAgentes[y].telefono[i].telefono + '</li>';

                            }
                        }
                    }
                lb4.innerHTML = str;
                lb4.setAttribute('class', 'labe2');

                var lb5 = document.createElement('section');
                lb5.setAttribute('class', 'chl2-2-1')

                var lb6 = document.createElement('section');
                lb6.innerHTML = 'Usuario : ' + arrayAgentes[y].usuario.nombre;

                var lb7 = document.createElement('section');
                lb7.innerHTML = 'Correo : ' + arrayAgentes[y].usuario.correo;

                lb5.appendChild(lb6);
                lb5.appendChild(lb7);

                row3.appendChild(lb4);
                row3.appendChild(lb5);
                row3.setAttribute('class', 'chl2-2');

                //-----------------------------------------------------------------------------------------------------------------------

                agente_sec.appendChild(child1);
                agente_sec.appendChild(child2);

                y++;
            }
        }
		
		if(arreglos>5){
				if (x == 0) {
					panel.appendChild(right_arrow);
					panel.appendChild(esp2);
				} else {
					panel.appendChild(right_arrow);
					panel.appendChild(left_arrow);
					panel.appendChild(esp2);
				}
		}


    }

    showPaneles(slideIndex);

}

function plusPaneles(n) {
    showPaneles(slideIndex += n);
    scroll();
}

function showPaneles(n) {
    var i;
    var slides = document.getElementsByClassName("paneles");
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

