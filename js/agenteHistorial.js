var slideReservaciones = 0;

function loadReservaciones() {
    document.getElementById("listReservaciones").innerHTML = "";

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
            fillReservaciones(ajax.responseText);
        }
    };

    ajax.open("GET", "../php/actions/historialAgente.php?", true);
    ajax.send();
}

function fillReservaciones(ob) {
    var y = 0;
    var arrayPreReservaciones = JSON.parse(ob);

    console.log(arrayPreReservaciones);

    var historial = document.getElementById('listReservaciones');

    while (arrayPreReservaciones[y]) {

        var slide = document.createElement('section');
        slide.className = "reservaciones fade";

        var pat = document.createElement('Section');
        pat.setAttribute("class", "pat");

        //------------------ C H I L D  1 -----------------------
        var child1 = document.createElement('Section');
        child1.setAttribute("class", "ch1");

        var lb1 = document.createElement("Section");
        lb1.innerHTML = 'Reservación: '+arrayPreReservaciones[y].num;

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

function openDialogReservacion(num) {
    var dialogo = document.getElementById("update");
    dialogo.showModal();

    var prNum = document.getElementById("lblNum");
    prNum.value = num;
}


function cerrar() {
    var dialogo = document.getElementById("update");
    dialogo.close();
}


