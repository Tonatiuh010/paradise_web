var slideIndex = 1;


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

    var obj = JSON.parse(ob);


    if (obj.usuario.imagen.length > 0) {
        var img = document.getElementById("imgAgente");
        img.src = "../img/usuario/" + obj.usuario.num + "/" + obj.usuario.imagen[0].nombre;
    }

    var nombre = obj.nombre;

    var nameTag = document.getElementById("user_name");
    nameTag.innerText = nombre;




}

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

    var obj = JSON.parse(ob);


    if (obj.usuario.imagen.length > 0) {
        var img = document.getElementById("imgAgente");
        img.src = "../img/usuario/" + obj.usuario.num + "/" + obj.usuario.imagen[0].nombre;
    }

    var nombre = obj.nombre;

    var nameTag = document.getElementById("user_name");
    nameTag.innerText = nombre;




}

function buscarLugar() {
   
    document.getElementById("listLugar").innerHTML = "";

    var ajax = new XMLHttpRequest();

    var shc=document.getElementById("shcId").value
      
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
           
            fillLugarShc(ajax.responseText);
        }
    };


    ajax.open("GET", "../php/actions/buscarLugar.php?b=" + shc, true);
    ajax.send();

}

function fillLugarShc(ob) {    
    var list = document.getElementById("listLugar");
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
                        str += 'Cuenta con: </br></br><li>' + arrayLugar[y].espacios[i].nombre + '</li>';
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

                
                row4.setAttribute('class', 'label');                


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