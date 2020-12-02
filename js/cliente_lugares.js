// JavaScript source code

var slideIndex = 1;


function lugares() {

    var ajax = new XMLHttpRequest();

    lista = '';

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            //document.getElementById('lugares').innerHTML = ajax.responseText;
            lugaresList(ajax.responseText);
            //novedad(ajax.responseText);
            //console.log(ajax.responseText);
        }
    }

    ajax.open("GET", "../php/actions/show_search_lugares.php?lista=" + lista, true);
    ajax.send();
}



function lugaresList(ls) {
    //var y = 0;
    //var inPanel = 0;
    var arrayLugares = JSON.parse(ls);
    //console.log(arrayLugares);
    var lugares = document.getElementById("lugares");

    var arreglos = arrayLugares.length;
    var paneles = arreglos / 5;
    paneles = Math.ceil(paneles);

    //var right_arrow = document.createElement('section');
    //right_arrow.setAttribute('class', 'colores');
    //var left_arrow = document.createElement('section');
    //left_arrow.setAttribute('class', 'colores');


    var y = 0;
    if (arreglos>0) {

        for (x = 0; x < paneles; x++) {

            var panel = document.createElement('section');
            panel.className = "slide fade";

            var right_arrow = document.createElement('img');
            right_arrow.setAttribute("class", "next");
            right_arrow.src = "../img/next_page.png";
            right_arrow.addEventListener('click', function () { plusSlides(1); });

            var left_arrow = document.createElement('img');
            left_arrow.setAttribute("class", "prev");
            left_arrow.src = "../img/prev_page.png";
            left_arrow.addEventListener('click', function () { plusSlides(-1); });

            lugares.appendChild(panel);

            for (a = 0; a < 5; a++) {

                var lugAg = document.createElement('section');
                lugAg.setAttribute("class", "complete_section");

                var lb5 = document.createElement("Section");
                lb5.setAttribute("class", "espacio");

                var lb7 = document.createElement("Section");
                lb7.setAttribute("class", "espacio");

                //panel.appendChild(lb5);

                if (arrayLugares[y]) {


                    if (arrayLugares[y].imagenes.length>0) {
                        var img = document.createElement('Img');
                        img.setAttribute('class', 'lugImg');
                        img.setAttribute('src', '../img/lugares/' + arrayLugares[y].num + "/" + arrayLugares[y].imagenes[0].nombre);
                    } else {
                        var img = document.createElement('Img');
                        img.setAttribute('class', 'lugImg');
                        img.setAttribute('src', '../img/index/anuncio6.jpeg');
                    }

                    var lugSec = document.createElement("section");
                    lugSec.setAttribute("class", "lista")

                    var lb6 = document.createElement("Section");
                    lb6.setAttribute("class", "espacio");

                    var lb1 = document.createElement("Section");
                    lb1.setAttribute("class", "nombreLug");
                    lb1.innerHTML = arrayLugares[y].nombre;

                    var lb2 = document.createElement("Section");
                    lb2.setAttribute("class", "description");
                    lb2.innerHTML = arrayLugares[y].desc;

                    var lb3 = document.createElement("Section");
                    lb3.setAttribute("class", "costo");
                    lb3.innerHTML = 'A partir de $' + arrayLugares[y].costo;

                    var lb4 = document.createElement("Section");
                    lb4.setAttribute("class", "capacidad");
                    lb4.innerHTML = 'Apropiado para ' + arrayLugares[y].capacidad + ' personas';

                    var bt = document.createElement("button");
                    bt.setAttribute("class", "lugBoton");
                    bt.addEventListener('click', function (_y) {
                        return function () {
                            location.href = '../php/actions/PHP_MLUGAR.php?id=' + arrayLugares[_y].num;
                            
                        }
                    }(y));
                    bt.innerHTML = 'Consultar Lugar';

                    var br = document.createElement('br');

                    panel.appendChild(lugAg);
                    panel.appendChild(lb5);

                    lugAg.appendChild(lugSec);
                    lugAg.appendChild(img);
                    lugSec.appendChild(br);
                    lugSec.appendChild(lb1);
                    lugSec.appendChild(lb2);
                    lugSec.appendChild(lb3);
                    lugSec.appendChild(lb4);
                    lugSec.appendChild(bt);
                    
                    lugSec.appendChild(lb6);

                    

                    y++;

                    showSlides(slideIndex);
                }

                
                //panel.appendChild(lb7);
                //panel.appendChild(lb7);
                //panel.appendChild(right_arrow);
                //panel.appendChild(left_arrow);
            }

            

            if (x == 0) {
                panel.appendChild(lb7);
                panel.appendChild(right_arrow);
            } else {
                panel.appendChild(right_arrow);
                panel.appendChild(left_arrow);
            }
            
            
        }
    
    } else {

        var monitor = document.createElement('img');
        monitor.src = '../img/carpeta_vacia.png';
        monitor.className = 'admin-carpeta';

        lugares.appendChild(monitor);
    }
 
    //showSlides(0);

}

//showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
    scroll();
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
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

function cargarOPE() {

    var ajax = new XMLHttpRequest();
    caso = 1;

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            fillData(ajax.responseText);
        }
    };

    ajax.open("get", "../php/actions/loadElements.php?", true);
    ajax.send();

}


function fillData(ob) {
    var y = 0;
    var obj = JSON.parse(ob);
    var arrayEspacios = obj.espacios;
    var arrayTipo = obj.tipoLugar;

    var espSection = document.getElementById("espBox");



    var tabla = document.createElement("table");
    tabla.className = "tablaBox";

    espSection.appendChild(tabla);


    while (arrayEspacios[y]) {

        var ckBox = document.createElement("input");
        ckBox.setAttribute("type", "checkbox");
        ckBox.setAttribute("class", "ckB");
        ckBox.style.marginRight = "50px";

        ckBox.value = arrayEspacios[y].num;

        var lbl = document.createElement("Label");
        lbl.innerHTML = arrayEspacios[y].nombre;

        var td = document.createElement("td");
        var tr = document.createElement("tr");

        td.appendChild(ckBox);
        td.appendChild(lbl);

        tr.appendChild(td);
        tabla.appendChild(tr);


        y++;
    }

    var x = 0;
    var tlSection = document.getElementById("opsel");


    while (arrayTipo[x]) {

        var option = document.createElement("option");
        //option.setAttribute("class", "opsel");
        option.style.marginRight = "50px";

        option.value = arrayTipo[x].num;

        option.innerHTML = arrayTipo[x].nombre;

        tlSection.appendChild(option);
        x++;
    }

}

function fillDataTl(ob) {
    var y = 0;
    var arrayEspacios = JSON.parse(ob);

    var tlSection = document.getElementById("opsel");


    while (arrayEspacios[y]) {

        var option = document.createElement("option");
        //option.setAttribute("class", "opsel");
        option.style.marginRight = "50px";

        option.value = arrayEspacios[y].num;

        option.innerHTML = arrayEspacios[y].nombre;

        tlSection.appendChild(option);
        y++;
    }
}

function searchSp() {
    var lugares = document.getElementById("lugares");
    lugares.innerHTML = '';

    espacios = document.getElementsByClassName("ckB");

    console.log(document.getElementById('opsel').value);

    objbuscar =
    {
        ciudad: document.getElementById('ciudad').value,

        tipoL: document.getElementById('opsel').value,

        capacidad: document.getElementById('cap').value,

        esp: new function () {
            var a = 0;
            this.arrayId = [];
            while (espacios[a]) {
                if (espacios[a].checked == true) {
                    this.arrayId.push(espacios[a].value);
                }
                a++;
            }
        }
    };

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            //console.log(objbuscar);
            fillCompresData(ajax.responseText);
            //console.log(ajax.responseText);
        }
    }



    ajax.open("get", "../php/actions/search_filter_lug.php?objbuscar=" + JSON.stringify(objbuscar), true);
    ajax.send();
}

function fillCompresData(ob) {
    var y = 0;
    var arrayLugares = JSON.parse(ob);
    //console.log(ob);

    var lugares = document.getElementById("lugares");
    lugares.innerHTML = '';

    var arreglos = arrayLugares.length;
    var paneles = arreglos / 5;
    paneles = Math.ceil(paneles);


    var y = 0;


    if (arreglos>0){

    for (x = 0; x < paneles; x++) {

        var panel = document.createElement('section');
        panel.className = "slide fade";

        var right_arrow = document.createElement('img');
        right_arrow.setAttribute("class", "next");
        right_arrow.src = "../img/next_page.png";
        right_arrow.addEventListener('click', function () { plusSlides(1); });

        var left_arrow = document.createElement('img');
        left_arrow.setAttribute("class", "prev");
        left_arrow.src = "../img/prev_page.png";
        left_arrow.addEventListener('click', function () { plusSlides(-1); });

        lugares.appendChild(panel);

        for (a = 0; a < 5; a++) {

            var lugAg = document.createElement('section');
            lugAg.setAttribute("class", "complete_section");

            var lb5 = document.createElement("Section");
            lb5.setAttribute("class", "espacio");

            var lb7 = document.createElement("Section");
            lb7.setAttribute("class", "espacio");

            //panel.appendChild(lb5);

            if (arrayLugares[y]) {


                if (arrayLugares[y].imagenes.length > 0) {
                    var img = document.createElement('Img');
                    img.setAttribute('class', 'lugImg');
                    img.setAttribute('src', '../img/lugares/' + arrayLugares[y].num + "/" + arrayLugares[y].imagenes[0].nombre);
                } else {
                    var img = document.createElement('Img');
                    img.setAttribute('class', 'lugImg');
                    img.setAttribute('src', '../img/index/anuncio6.jpeg');
                }

                var lugSec = document.createElement("section");
                lugSec.setAttribute("class", "lista")

                var lb6 = document.createElement("Section");
                lb6.setAttribute("class", "espacio");

                var lb1 = document.createElement("Section");
                lb1.setAttribute("class", "nombreLug");
                lb1.innerHTML = arrayLugares[y].nombre;

                var lb2 = document.createElement("Section");
                lb2.setAttribute("class", "description");
                lb2.innerHTML = arrayLugares[y].desc;

                var lb3 = document.createElement("Section");
                lb3.setAttribute("class", "costo");
                lb3.innerHTML = 'A partir de $' + arrayLugares[y].costo;

                var lb4 = document.createElement("Section");
                lb4.setAttribute("class", "capacidad");
                lb4.innerHTML = 'Apropiado para ' + arrayLugares[y].capacidad + ' personas';

                var bt = document.createElement("button");
                bt.setAttribute("class", "lugBoton");
                bt.addEventListener('click', function (_y) {
                    return function () {
                        location.href = '../php/actions/PHP_MLUGAR.php?id=' + arrayLugares[_y].num;

                    }
                }(y));
                bt.innerHTML = 'Consultar Lugar';

                var br = document.createElement('br');

                panel.appendChild(lugAg);
                panel.appendChild(lb5);

                lugAg.appendChild(lugSec);
                lugAg.appendChild(img);
                lugSec.appendChild(br);
                lugSec.appendChild(lb1);
                lugSec.appendChild(lb2);
                lugSec.appendChild(lb3);
                lugSec.appendChild(lb4);
                lugSec.appendChild(bt);

                lugSec.appendChild(lb6);

                y++;
                showSlides(slideIndex);
            }

        }


        if (arreglos > 5) {
            if (x == 0) {
                panel.appendChild(lb7);
                panel.appendChild(right_arrow);
            } else {
                panel.appendChild(right_arrow);
                panel.appendChild(left_arrow);
            }
        }
        
    }
    } else {
        var monitor = document.createElement('img');
        monitor.src = '../img/carpeta_vacia.png';
        monitor.className = 'admin-carpeta';

        lugares.appendChild(monitor);

    }

    

    
}

function cerrar() {
    document.getElementById("error2").close();

}