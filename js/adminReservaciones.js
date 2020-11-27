var slideReservaciones = 0;
var slideReservacionesCons = 0;


function loadReservaciones() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
           //console.log(ajax.responseText);
           fillReservacionAlta(ajax.responseText);            

        }
    }

    ajax.open("GET", "../php/actions/buscarReservacionesEnProceso.php?", true);
    ajax.send();

   
}


function fillReservacionAlta(ob) {    
    
    var y = 0;
    var arrayPreReservaciones = JSON.parse(ob);    

    var historial = document.getElementById("listAltaReservaciones");
    historial.innerHTML = "";

    while (arrayPreReservaciones[y]) {

        var slide = document.createElement('section');
        slide.className = "reservaciones fade";

        var pat = document.createElement('Section');
        pat.setAttribute("class", "pat");

        //------------------ C H I L D  1 -----------------------
        var child1 = document.createElement('Section');
        child1.setAttribute("class", "ch1");

        var lb1 = document.createElement("Section");
        lb1.innerHTML = 'Reservación: ' + arrayPreReservaciones[y].num;

        var lb2 = document.createElement("Section");
        lb2.innerHTML = arrayPreReservaciones[y].lugar.nombre;
        //lb2.setAttribute('class', 'centrar');

        var lb4 = document.createElement("Section");
        lb4.innerHTML = 'Fechas solicitadas: </br>' +
                        arrayPreReservaciones[y].inicio + '</br>' +
                        arrayPreReservaciones[y].termino;

        var lb5 = document.createElement("Section");
        lb5.innerHTML = 'Estado: ' + arrayPreReservaciones[y].status;

        if (arrayPreReservaciones[y].reservacion.total != null) {
            var lb5_1 = document.createElement("Section");
            lb5_1.innerHTML = 'Total: $' + arrayPreReservaciones[y].reservacion.total;
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
        lb3_1.innerHTML = arrayPreReservaciones[y].registro;

        var lb6 = document.createElement("Section");
        lb6.innerHTML = 'Cliente: ';
        lb6.setAttribute('class', 'labelL');
        var lb6_1 = document.createElement("Section");
        lb6_1.innerHTML = arrayPreReservaciones[y].cliente.nombre + ' '
                        + arrayPreReservaciones[y].cliente.paterno + ' '
                        + arrayPreReservaciones[y].cliente.materno;
        lb6_1.setAttribute('class', 'labelR');

        var lb7 = document.createElement("Section");
        lb7.innerHTML = 'Agente: ';
        lb7.setAttribute('class', 'labelL');
        var lb7_1 = document.createElement("Section");
        lb7_1.innerHTML = arrayPreReservaciones[y].agente.nombre + ' '
                        + arrayPreReservaciones[y].agente.paterno + ' '
                        + arrayPreReservaciones[y].agente.materno;
        lb7_1.setAttribute('class', 'labelR');

        var lb8 = document.createElement("Section");
        lb8.innerHTML = 'Telefono del Cliente: ';
        lb8.setAttribute('class', 'labelL');
        var lb8_1 = document.createElement("Section");
        lb8_1.innerHTML = arrayPreReservaciones[y].cliente.telefono;
        lb8_1.setAttribute('class', 'labelR');

        var lb9 = document.createElement("Section");
        lb9.innerHTML = 'Correo del Cliente: ';
        lb9.setAttribute('class', 'labelL');
        var lb9_1 = document.createElement("Section");
        lb9_1.innerHTML = arrayPreReservaciones[y].cliente.usuario.correo;
        lb9_1.setAttribute('class', 'labelR');

        var lb10 = document.createElement("Section");

        lb10.setAttribute('class', 'labelL');
        var lb10_1 = document.createElement("Section");
        lb10_1.setAttribute('class', 'labelR');



        var btn = document.createElement("button");
        btn.className = "asignarbtn";
        btn.innerHTML = "Asignar Agente";
        btn.addEventListener("click", function (_y) {

            //Mi botón kawai ;v
            return function () {
                openDialogAddAgente(arrayPreReservaciones[_y].num);
            }


        }(y));


        lb10_1.appendChild(btn);


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

        imagenes = arrayPreReservaciones[y].lugar.imagenes.length;

        if (imagenes > 0) {
            var imglb = document.createElement('Img');
            imglb.setAttribute('class', 'ImgCH');
            imglb.setAttribute('src', '../img/lugares/' + arrayPreReservaciones[y].lugar.num + "/" + arrayPreReservaciones[y].lugar.imagenes[0].nombre);
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
        right_arrow.addEventListener('click', function () { plusReservaciones(1); });

        var left_arrow = document.createElement('img');
        left_arrow.setAttribute("class", "prev");
        left_arrow.src = "../img/prev_page.png";
        left_arrow.addEventListener('click', function () { plusReservaciones(-1); });

        var esp = document.createElement("Section");
        esp.setAttribute("class", "espacio");

        slide.appendChild(pat);
        slide.appendChild(esp);
        slide.appendChild(left_arrow);
        slide.appendChild(right_arrow);

        historial.appendChild(slide);

        y++;

        showReservaciones(slideReservaciones);
    }


}




function openDialogAddAgente(numPReservacion) {
    var dialog = document.getElementById("addAgente");
    var p = document.createElement("p");
    p.id = "numReservacion";
    p.innerText = numPReservacion;
    p.style.display = "none";

    dialog.appendChild(p);
    dialog.showModal();

}

function closeDialogAddAgente() {
    var dialog = document.getElementById("addAgente");
    dialog.close();
}

function buscarAgente() {
    
   

    var ajax = new XMLHttpRequest();

    var shc = document.getElementById("shcId").value

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);

            fillAgenteShc(ajax.responseText);
        }
    };


    ajax.open("GET", "../php/actions/buscarAgente.php?b=" + shc, true);
    ajax.send();

}



function fillAgenteShc(ob) {



    var list = document.getElementById("container");
    list.innerHTML = "";
    list.style.display = "block";

    var arrayAgentes = JSON.parse(ob);           

    var y = 0;

    while (arrayAgentes[y]) {
        console.log(arrayAgentes[y]);

        var panel = document.createElement('section');
        panel.className = "paneles fade";
        panel.style.display = "block";

        var esp2 = document.createElement("Section");
        esp2.setAttribute("class", "espacio");

        list.appendChild(panel);

       

            var agente_sec = document.createElement('section');
            agente_sec.setAttribute("class", "patern3");

            

            

                panel.appendChild(agente_sec);
            

               

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
        

                //-----------------------------------------------------------------------------------------------------------------------

                //--------------------------------------- C H I L D  2 -----------------------------------------------------------------
               
                var row2 = document.createElement("section");
                row2.innerHTML = 'Nombre: ' + arrayAgentes[y].nombre + " " + arrayAgentes[y].paterno + " " + arrayAgentes[y].materno + '</br>';
                row2.setAttribute('class', 'label');                                


                var btn = document.createElement("button");
                btn.className = "btnAsignarAgente";
                btn.innerHTML = "Asignar Agente";
                btn.addEventListener("click", function (_y) {

                    //Mi botón kawai ;v
                    return function () {
                        setAgente(arrayPreReservaciones[_y].agente.matricula, arrayPreReservaciones[_y].num);
                    }


                }(y));


               
                //-----------------------------------------------------------------------------------------------------------------------

                agente_sec.appendChild(imgsec);
                agente_sec.appendChild(row2);
                agente_sec.appendChild(btn);
                
                
                y++;                           
    }    

}


function setAgente(matricula, numPR) {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
            var res=JSON.parse(ajax.responseText);
            if (res.res==false){
                console.log(res.error);
            } else {
                location.reload();
            }
        }
    };


    ajax.open("GET", "../php/actions/asignarAgentePR.php?b=" + JSON.stringify({matricula: matricula, pr:numPR}), true);
    ajax.send();
}


function buscarPReservacionesEstado() {

    var cbStatus=document.getElementById("statusShc");

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
            fillPReservacionShc(ajax.responseText);           
        }
    };


    ajax.open("GET", "../php/actions/buscarReservacionesEstado.php?b=" +cbStatus.options[cbStatus.selectedIndex].value, true);
    ajax.send();
}


function fillPReservacionShc(ob) {

   
    

    var y = 0;
    var arrayPreReservaciones = JSON.parse(ob);

    console.log(arrayPreReservaciones);

    var historial = document.getElementById("listReservacion");;

   historial.innerHTML = "";

    while (arrayPreReservaciones[y]) {

        var slide = document.createElement('section');
        slide.className = "reservacionesCons fade";

        var pat = document.createElement('Section');
        pat.setAttribute("class", "pat");

        //------------------ C H I L D  1 -----------------------
        var child1 = document.createElement('Section');
        child1.setAttribute("class", "ch1");

        var lb1 = document.createElement("Section");
        lb1.innerHTML = 'Reservación: ' + arrayPreReservaciones[y].num;

        var lb2 = document.createElement("Section");
        lb2.innerHTML = arrayPreReservaciones[y].lugar.nombre;
        //lb2.setAttribute('class', 'centrar');

        var lb4 = document.createElement("Section");
        lb4.innerHTML = 'Fechas solicitadas: </br>' +
                        arrayPreReservaciones[y].inicio + '</br>' +
                        arrayPreReservaciones[y].termino;

        var lb5 = document.createElement("Section");
        lb5.innerHTML = 'Estado: ' + arrayPreReservaciones[y].status;

        if (arrayPreReservaciones[y].reservacion.total != null) {
            var lb5_1 = document.createElement("Section");
            lb5_1.innerHTML = 'Total: $' + arrayPreReservaciones[y].reservacion.total;
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
        lb3_1.innerHTML = arrayPreReservaciones[y].registro;

        var lb6 = document.createElement("Section");
        lb6.innerHTML = 'Cliente: ';
        lb6.setAttribute('class', 'labelL');
        var lb6_1 = document.createElement("Section");
        lb6_1.innerHTML = arrayPreReservaciones[y].cliente.nombre + ' '
                        + arrayPreReservaciones[y].cliente.paterno + ' '
                        + arrayPreReservaciones[y].cliente.materno;
        lb6_1.setAttribute('class', 'labelR');

        var lb7 = document.createElement("Section");
        lb7.innerHTML = 'Agente: ';
        lb7.setAttribute('class', 'labelL');
        var lb7_1 = document.createElement("Section");
        lb7_1.innerHTML = arrayPreReservaciones[y].agente.nombre + ' '
                        + arrayPreReservaciones[y].agente.paterno + ' '
                        + arrayPreReservaciones[y].agente.materno;
        lb7_1.setAttribute('class', 'labelR');

        var lb8 = document.createElement("Section");
        lb8.innerHTML = 'Telefono del Cliente: ';
        lb8.setAttribute('class', 'labelL');
        var lb8_1 = document.createElement("Section");
        lb8_1.innerHTML = arrayPreReservaciones[y].cliente.telefono;
        lb8_1.setAttribute('class', 'labelR');

        var lb9 = document.createElement("Section");
        lb9.innerHTML = 'Correo del Cliente: ';
        lb9.setAttribute('class', 'labelL');
        var lb9_1 = document.createElement("Section");
        lb9_1.innerHTML = arrayPreReservaciones[y].cliente.usuario.correo;
        lb9_1.setAttribute('class', 'labelR');

        var lb10 = document.createElement("Section");

        lb10.innerHTML = 'Notas: ';
        lb10.setAttribute('class', 'labelL');
        var lb10_1 = document.createElement("Section");
        lb10_1.innerHTML = arrayPreReservaciones[y].notas;
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

        imagenes = arrayPreReservaciones[y].lugar.imagenes.length;

        if (imagenes > 0) {
            var imglb = document.createElement('Img');
            imglb.setAttribute('class', 'ImgCH');
            imglb.setAttribute('src', '../img/lugares/' + arrayPreReservaciones[y].lugar.num + "/" + arrayPreReservaciones[y].lugar.imagenes[0].nombre);
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
        right_arrow.addEventListener('click', function () { plusReservacionesCons(1); });

        var left_arrow = document.createElement('img');
        left_arrow.setAttribute("class", "prev");
        left_arrow.src = "../img/prev_page.png";
        left_arrow.addEventListener('click', function () { plusReservacionesCons(-1); });

        var esp = document.createElement("Section");
        esp.setAttribute("class", "espacio");

        slide.appendChild(pat);
        slide.appendChild(esp);
        slide.appendChild(left_arrow);
        slide.appendChild(right_arrow);

        historial.appendChild(slide);

        y++;

        showReservacionesCons(slideReservacionesCons);
    }
}




function plusReservaciones(n) {
    showReservaciones(slideReservaciones += n);
}

function showReservaciones(n) {
    var i;
    var slides = document.getElementsByClassName("reservaciones");
    //console.log(document.getElementsByClassName('slide'));

    if (n < 1) {
        slideReservaciones = slides.length;
    }

    if (n > slides.length) {
        slideReservaciones = 1;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slides[slideReservaciones - 1].style.display = 'block';
}



function plusReservacionesCons(n) {
    showReservacionesCons(slideReservaciones += n);
}

function showReservacionesCons(n) {
    var i;
    var slides = document.getElementsByClassName("reservacionesCons");
    //console.log(document.getElementsByClassName('slide'));

    if (n < 1) {
        slideReservacionesCons = slides.length;
    }

    if (n > slides.length) {
        slideReservacionesCons = 1;
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }

    slides[slideReservacionesCons - 1].style.display = 'block';
}
