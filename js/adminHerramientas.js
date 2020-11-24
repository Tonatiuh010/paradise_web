function insertarEspacio() {
    var nombre = document.getElementById("txtEspacio").value;

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            
            document.getElementById("msg").innerHTML=ajax.responseText;

        }
    }

    ajax.open("GET", "../php/actions/registrarEspacio.php?b=" + nombre, true);
    ajax.send();

    document.getElementById("txtEspacio").innerHTML="";
}

function insertarTL() {
    var nombre = document.getElementById("txtTL").value;

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {

            document.getElementById("msg").innerHTML = ajax.responseText;
        }
    }


    ajax.open("GET", "../php/actions/registrarTipoLugar.php?b=" + nombre, true);
    ajax.send();

    document.getElementById("txtTL").innerHTML = "";
}

function buscarEspacios() {       

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {

            var obj = JSON.parse(ajax.responseText);
            var arrayEspacios = obj.espacios;

            var espSection = document.getElementById("listEspacios");

            var y = 0;

            while (arrayEspacios[y]) {
                
                var lb1 = document.createElement("section");
                lb1.setAttribute('class', 'lugEspacios');
                lb1.innerHTML = "Número: " + arrayEspacios[y].num + "</br>Nombre: " + arrayEspacios[y].nombre;

                espSection.appendChild(lb1);

                y++;

            }
        }
    }

    ajax.open("GET", "../php/actions/loadElements.php?", true);
    ajax.send();
}


function buscarTL() {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {

            var obj = JSON.parse(ajax.responseText);
            var arrayTL = obj.tipoLugar;

            var tlSection = document.getElementById("listTL");

            var y = 0;

            while (arrayTL[y]) {

                var lb1 = document.createElement("section");
                lb1.setAttribute('class', 'lugEspacios');
                lb1.innerHTML = "Número: " + arrayTL[y].num + "</br>Nombre: " + arrayTL[y].nombre;

                tlSection.appendChild(lb1);

                y++;

            }
        }
    }

    ajax.open("GET", "../php/actions/loadElements.php?", true);
    ajax.send();
}



function buscarLugaresMunicipio() {
    var codMunicipio = document.getElementById("CBCiudades");
    var cod = codMunicipio.options[codMunicipio.selectedIndex].value;
    
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            
            fillLugarShc(ajax.responseText);

        }
    }

    ajax.open("GET", "../php/actions/buscarLugaresMunicipio.php?b=" + cod, true);
    ajax.send();
}

var slideIndex = 1;


function fillLugarShc(ob) {

    var list = document.getElementById("listLugar");
    list.innerHTML = "";
    list.style.display = "block";

        //var list = document.getElementById("listLugar");

    //list.style.display = "block"; 
    var arrayLugar = JSON.parse(ob);

    var arreglos = arrayLugar.length;
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

        list.appendChild(panel);

        for (a = 0; a < 5; a++) {

            var lugar_section = document.createElement('section');
            lugar_section.setAttribute("class", "patern");

            var esp = document.createElement('section');
            esp.setAttribute('class', 'espacio');

            if (arrayLugar[y]) {

                panel.appendChild(lugar_section);
                panel.appendChild(esp);

                var child1 = document.createElement('section');
                child1.className = 'child1';

                var child2 = document.createElement('section');
                child2.className = 'child2';

                //----------------------------- C H I L D   1 -------------------------------------------------------------------------
                if (arrayLugar[y].imagenes.length > 0) {
                    var img = document.createElement('Img');
                    img.setAttribute('class', 'img');
                    img.setAttribute('src', '../img/lugares/' + arrayLugar[y].num + "/" + arrayLugar[y].imagenes[0].nombre);
                } else {
                    var img = document.createElement('Img');
                    img.setAttribute('class', 'img');
                    img.setAttribute('src', '../img/index/anuncio6.jpeg');
                }

                var imgsec = document.createElement('section');
                imgsec.setAttribute('class', 'imgsec');
                imgsec.appendChild(img);

                var lb1 = document.createElement("section");
                lb1.setAttribute('class', 'label');
                lb1.innerHTML = arrayLugar[y].num;

                var lb2 = document.createElement('section');
                lb2.setAttribute('class', 'label');
                lb2.innerHTML = arrayLugar[y].nombre;

                var lb3 = document.createElement('section');
                lb3.setAttribute('class', 'label');
                lb3.innerHTML = 'Tipo: ' + arrayLugar[x].tipoLugar.nombre;

                child1.appendChild(imgsec);
                child1.appendChild(lb1);
                child1.appendChild(lb2);
                child1.appendChild(lb3);
                //----------------------------------------------------------------------------------------------------------------------

                //----------------------------- C H I L D   2 -------------------------------------------------------------------------

                var row1 = document.createElement('section');
                var row2 = document.createElement('section');
                var row3 = document.createElement('section');
                var row4 = document.createElement('section');

                child2.appendChild(row1);
                child2.appendChild(row2);
                child2.appendChild(row3);
                child2.appendChild(row4);

                var lb4 = document.createElement('section');
                lb4.setAttribute('class', 'label2');
                lb4.innerHTML = arrayLugar[y].desc;

                var str = '';
                for (var i = 0; i < arrayLugar[y].espacios.length; i++) {

                    if (i == 0) {
                        str += 'Cuenta con: </br></br>';
                    } else {
                        if (i != arrayLugar[y].espacios.length - 1)
                            str += '<li>' + arrayLugar[y].espacios[i].nombre + '</li>';
                        else {
                            str += '<li>' + arrayLugar[y].espacios[i].nombre + '</li>';
                        }
                    }

                }

                var lb5 = document.createElement('section');
                lb5.setAttribute('class', 'label3');
                lb5.innerHTML = str;

                row1.appendChild(lb4);
                row1.appendChild(lb5);
                row1.setAttribute('class', 'child2-1');

                var lb6 = document.createElement('section');
                lb6.setAttribute('class', 'label');
                lb6.innerHTML = 'Costo: $' + arrayLugar[y].costo;

                var lb7 = document.createElement('section');
                lb7.setAttribute('class', 'label');
                lb7.innerHTML = 'Apropiado para ' + arrayLugar[y].capacidad + ' personas';

                row2.appendChild(lb6);
                row2.appendChild(lb7);
                row2.setAttribute('class', 'child2-2');

                arrayDirec = arrayLugar[y].direccion;
                if (arrayDirec.calle == null) {
                    var calle = '';
                } else {
                    var calle = 'Ubicado en ' + arrayDirec.calle;
                }
                if (arrayDirec.NI == null) {
                    var numInt = '';
                } else {
                    var numInt = ' ' + arrayDirec.NI;
                }
                if (arrayDirec.NE == null) {
                    var numExt = '';
                } else {
                    var numExt = '-' + arrayDirec.NE;
                } if (arrayDirec.CP == null) {
                    var cp = '';
                } else {
                    var cp = ' ' + arrayDirec.CP;
                }
                if (arrayDirec.municipio.nombre == null) {
                    var mun = '';
                } else {
                    var mun = ' ' + arrayDirec.municipio.nombre;
                }

                var direccion = calle + numInt + numExt + cp + mun;

                row3.innerHTML = direccion;
                row3.setAttribute('class', 'label');

                //EDITAR BUTTON
                var btn = document.createElement("button");
                btn.setAttribute('class', 'btnGLug1');

                btn.addEventListener("click", function (_x) {
                    return function () {
                        abrir(arrayLugar[_x]);
                    }

                }(x));
                btn.innerHTML = "Editar";


                // ADD IMG BUTTON
                var btnImg = document.createElement("button");
                btnImg.setAttribute('class', 'btnGLug2');

                btnImg.addEventListener("click", function (_x) {
                    return function () {
                        editImgDialog({ lugar: arrayLugar[_x].num, imagenes: arrayLugar[_x].imagenes });
                    }

                }(x));
                btnImg.innerHTML = "Imagen";

                row4.setAttribute('class', 'label');
                row4.appendChild(btn);
                row4.appendChild(btnImg);


                lugar_section.appendChild(child1);
                lugar_section.appendChild(child2);

                y++;
            }


            //panel.appendChild(lb7);
            //panel.appendChild(lb7);
            //panel.appendChild(right_arrow);
            //panel.appendChild(left_arrow);
        }

        if (arreglos > 5) {
            if (x == 0) {
                panel.appendChild(right_arrow);
            } else {
                panel.appendChild(right_arrow);
                panel.appendChild(left_arrow);
            }
        }




    }


    showPanel(slideIndex);


    
}


function plusPaneles(n) {
    showPanel(slideIndex += n);
    scroll();
}

function showPanel(n) {
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