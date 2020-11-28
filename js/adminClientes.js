var slideIndex = 1;


function buscarClientes() {
    createDialog();
    document.getElementById("listClientes").innerHTML = "";

    var ajax = new XMLHttpRequest();

    var shc=document.getElementById("shcId").value
      
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);           
            fillClientesShc(ajax.responseText);
        }
    };

    ajax.open("GET", "../php/actions/buscarCliente.php?b=" + shc, true);
    ajax.send();
}

function fillClientesShc(ob) {


    var list = document.getElementById("listClientes");
    list.style.display = "block";
    var arrayClientes = JSON.parse(ob);
    console.log(arrayClientes);

    var arreglos = arrayClientes.length;
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

            var cliente_sec = document.createElement('section');
            cliente_sec.setAttribute("class", "patern2");

            var esp = document.createElement("Section");
            esp.setAttribute("class", "espacio");

            if (arrayClientes[y]) {

                panel.appendChild(cliente_sec);
                panel.appendChild(esp);

                var child1 = document.createElement('section');
                child1.setAttribute('class', 'chl1');

                var child2 = document.createElement('section');
                child2.setAttribute('class', 'chl2');

                //--------------------------------------- C H I L D  1 -----------------------------------------------------------------
                if (arrayClientes[y].usuario.imagen.length > 0) {
                    var img = document.createElement('Img');
                    img.setAttribute('class', 'img');
                    img.setAttribute('src', '../img/usuario/' + arrayClientes[y].usuario.num + "/" + arrayClientes[y].usuario.imagen[0].nombre);
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
                lb1.innerHTML = 'Numero: ' + arrayClientes[y].num;

               

                var lb3 = document.createElement('section');
                lb3.setAttribute('class', 'label');
                lb3.innerHTML = 'Edad: ' + arrayClientes[y].edad;

                row1.appendChild(lb1);
                
                row1.appendChild(lb3);
                row1.setAttribute('class', 'chl2-1');

                row2.innerHTML = 'Nombre: ' + arrayClientes[y].nombre + " " + arrayClientes[y].paterno + " " + arrayClientes[y].materno + '</br>';
                row2.setAttribute('class', 'label');

                var lb4 = document.createElement('section');


                if (arrayClientes[y].telefono!=null) {
                    lb4.innerHTML = "<li>" + arrayClientes[y].telefono + "</li>";
                } else {
                    lb4.innerHTML = " -- ";
                }
                
                lb4.setAttribute('class', 'labe2');

                var lb5 = document.createElement('section');
                lb5.setAttribute('class', 'chl2-2-1')

                var lb6 = document.createElement('section');
                lb6.innerHTML = 'Usuario : ' + arrayClientes[y].usuario.nombre;

                var lb7 = document.createElement('section');
                lb7.innerHTML = 'Correo : ' + arrayClientes[y].usuario.correo;

                lb5.appendChild(lb6);
                lb5.appendChild(lb7);

                row3.appendChild(lb4);
                row3.appendChild(lb5);
                row3.setAttribute('class', 'chl2-2');

                //-----------------------------------------------------------------------------------------------------------------------

                cliente_sec.appendChild(child1);
                cliente_sec.appendChild(child2);

                y++;
            }


        }

        if (arreglos > 5) {
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

