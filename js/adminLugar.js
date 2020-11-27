function registrarLugar() {
    document.getElementById("listLugar").innerHTML = "";

    var lugarOb = null;

    var CKS = document.getElementsByClassName("ckB");

    var sctTP = document.getElementById("CBtp");
    var sctCiudades = document.getElementById("CBCiudades");


    lugarOb = {
        nombre: document.getElementById("txtNombreLugar").value,
        desc: document.getElementById("txtDescLugar").value,
        costo: document.getElementById("txtCostoLugar").value,
        capacidad: document.getElementById("txtCapacidadLugar").value,
        estado: sctCiudades.options[sctCiudades.selectedIndex].value,
        tipoLugar: sctTP.options[sctTP.selectedIndex].value,
        direc: new function () {
            this.obDirec = {
                calle: document.getElementById("txtCalleDirec").value,
                numIn: document.getElementById("txtNumIntDirec").value,
                numEx: document.getElementById("txtNumExtDirec").value,
                cp: document.getElementById("txtCP").value
            }

            if (this.obDirec.calle == "" || this.obDirec.numIn == "" || this.obDirec.cp == "") {
                this.obDirec = false;
            }
        },
        espacios: new function () {
            var a = 0;
            this.arrayId = [];
            while (CKS[a]) {
                if (CKS[a].checked == true) {
                    this.arrayId.push(CKS[a].value);
                }
                a++;
            }
        },
        verificacion: function () {
           
            if (this.nombre == "" || this.costo == "" || this.capacidad == "" || this.espacios.arrayId.length==0) {                
                
                return false;
            } else {
                
                return true;
            }
            
        }
        
        };

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            
            var response = JSON.parse(ajax.responseText);
            if (response.res!=true){
                showError("Error al momento de registrar: " + response.error);
            } else {
                imgDialogOpen(response.num);
                clearForm();
            }
            
        }
    };

    

    //ajax.open("GET", "../php/sendLugar.php?b="+JSON.stringify(lugarOb), true);
    ajax.open("GET", "../php/actions/registrarLugar.php?b=" + JSON.stringify(lugarOb), true);

    if (lugarOb.verificacion()){
        ajax.send();
    } else {
      
        var errorMsg = "Favor de Rellenar Todos los campos";
        showError(errorMsg);
    }
    
}


function buscarLugar() {
    createDialog();
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


function loadOptions() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            fillOptions(ajax.responseText);
        }
    };

    ajax.open("get", "../php/actions/loadElements.php?", true);
    ajax.send();
}


function fillOptions(ob) { 
    var y = 0;
    var obj = JSON.parse(ob);

    var arrayEspacios = obj.espacios;

    var espSection = document.getElementById("boxEsp");

   
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
        //Destino <------------ Objeto a agregar

        tr.appendChild(td);
        tabla.appendChild(tr);

        //espSection.appendChild(lbl);
        //espSection.appendChild(ckBox);
        y++;
    }
   
    var x = 0;

    var diag = document.getElementById("dialogEsp");

    var tablaD = document.createElement("table");
    tablaD.className = "tablaBox";

    diag.appendChild(tablaD);

    while (arrayEspacios[x]) {

        var ckBox = document.createElement("input");
        ckBox.setAttribute("type", "checkbox");

        ckBox.setAttribute("class", "ckBD");
        ckBox.style.marginRight = "50px";

        ckBox.value = arrayEspacios[x].num;

        var lbl = document.createElement("Label");
        lbl.innerHTML = arrayEspacios[x].nombre;

        var td = document.createElement("td");
        var tr = document.createElement("tr");

        td.appendChild(ckBox);
        td.appendChild(lbl);

        //Destino <------------ Objeto a agregar

        tr.appendChild(td);
        tablaD.appendChild(tr);
        x++;
    }


    var arrayTipoLugar = obj.tipoLugar;
        var z = 0;
        var selectTP = document.getElementById("CBtp");

        while (arrayTipoLugar[z]) {

            var option = document.createElement("option");
            option.value = arrayTipoLugar[z].num;
            option.innerHTML = arrayTipoLugar[z].nombre;

            selectTP.appendChild(option);
            z++;
        }

}

function clearForm() {

    var t = 0;

    var CKS = document.getElementsByClassName("ckB");
    var sctTP = document.getElementById("CBtp");
    var sctCiudades = document.getElementById("CBCiudades");

    document.getElementById("txtNombreLugar").value = "";
    document.getElementById("txtDescLugar").value = "";
    document.getElementById("txtCostoLugar").value = "";
    document.getElementById("txtCapacidadLugar").value = "";
    document.getElementById("txtCalleDirec").value = "";
    document.getElementById("txtNumIntDirec").value = "";
    document.getElementById("txtNumExtDirec").value = "";
    document.getElementById("txtCP").value = "";


    sctCiudades.options.selectedIndex = 0;
    sctTP.options.selectedIndex = 0;

    document.getElementById('intPnlDirection').style.display = 'none';
    document.getElementById('btnDwn').style.display = 'block';
    document.getElementById('btnUp').style.display = 'none'

    while (CKS[t]) {
        CKS[t].checked = 0;
        t++;
    }

}


var slideIndex = 1;

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
                child1.className='child1';

                var child2 = document.createElement('section');
                child2.className='child2';

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
                lb6.innerHTML = 'Costo: $'+ arrayLugar[y].costo;

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
                        editImgDialog({lugar: arrayLugar[_x].num, imagenes: arrayLugar[_x].imagenes});
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



        if (x == 0) {
            panel.appendChild(right_arrow);
        } else {
            panel.appendChild(right_arrow);
            panel.appendChild(left_arrow);
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



function updateLugar() {
    //Llamar a diálogo

    var CKS = document.getElementsByClassName("ckBD");

    var lugarOb = {
        numero: document.getElementById("lblNum").value,    
        costo: document.getElementById("txtCostoLugarD").value,
        capacidad: document.getElementById("txtCapacidadLugarD").value,

        espacios: new function () {
            var a = 0;
            this.arrayId = [];
            while (CKS[a]) {
                if (CKS[a].checked == true) {
                    this.arrayId.push(CKS[a].value);
                }
                a++;
            }
        }

        };    


    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
            document.getElementById("msgD").innerHTML = ajax.responseText;

            console.log(document.getElementById("msgD").innerHTML);

            if (ajax.responseText == true) {
                location.reload();
                cerrar();                
            }

            //Mostrar error en caso de que falle.
            
            
            
            
        }
    };


    ajax.open("GET", "../php/actions/actualizarLugar.php?b=" + JSON.stringify(lugarOb), true);
    ajax.send();
}

function abrir(a) {
    var dialogo = document.getElementById('update');
    dialogo.showModal();


    document.getElementById("lblNum").value = a.num;
    document.getElementById("lblNombre").value = a.nombre;
    document.getElementById("txtCostoLugarD").value = a.costo;
    document.getElementById("txtCapacidadLugarD").value = a.capacidad;   

    var ch = document.getElementsByClassName("ckBD");

    for (var x = 0; x < ch.length; x++) {
        for (var y=0; y<a.espacios.length;y++){
            if (ch[x].value == a.espacios[y].num) {
                ch[x].checked = true;
            }
        }        
    }

}

function cerrar() {
    var ch = document.getElementsByClassName("ckB");


    for (var x = 0; x < ch.length; x++) {
        ch[x].checked = false;
    }

    document.getElementById('update').close();


}


function imgDialogOpen(lug) {
    var dialogo = document.getElementById('addImg');
    var imgForm = document.getElementById("imgForm");
    
    var input = document.createElement("input");
    input.name = "numeroLugar";
    input.value = lug;
    input.style.display = "none";
    imgForm.appendChild(input);
    dialogo.showModal();
}

function imgDialogClose() {
    document.getElementById("addImg").close();

}


function editImgDialog(obj) {
    var dialogo = document.getElementById('updateImg'); 
    dialogo.showModal();

    
    var imgArray = obj.imagenes;
    var lugar = obj.lugar;
    
    var imgForm = document.getElementById("updateimgForm");

    var input = document.createElement("input");
    input.name = "numeroLugar";
    input.value = lugar;
    input.style.display = "none";

    imgForm.appendChild(input);

    var section = document.getElementById("container");

        if (imgArray.length>0){
            for (var a = 0; a < imgArray.length; a++) {

                var img = document.createElement("img");
                var internalSection = document.createElement("section");
                internalSection.className = "imgArray fade";
                

                img.className = "imgDisplay";
                img.src = "../img/lugares/" + lugar + "/" + imgArray[a].nombre;

                var btnDelete = document.createElement("button");
                btnDelete.innerHTML = "Eliminar imagen";
                btnDelete.addEventListener("click", function (_a) {
                    return function () {
               
                        deleteImg({ lugar: lugar, imagenes: imgArray[_a] });
                        document.getElementsByClassName('imgArray')[_a].style.display="none";
                    }
                }(a));

                internalSection.appendChild(img);
                internalSection.appendChild(btnDelete);
                section.appendChild(internalSection);
            }
        }
      
       
        
}

function closeEditImgDialog() {
    document.getElementById("updateImg").close();
    var section = document.getElementById("imgList");
    section.innerHTML = "";

    location.reload();
}


function deleteImg(obj) {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);                      
            if (ajax.responseText == true) {
                console.log("hecho"); // Mostrar en dialogo
            }
            
        }    
    };
    
    ajax.open("GET", "../php/actions/eliminarImagenLugar.php?b=" + JSON.stringify(obj), true);
    ajax.send();
}