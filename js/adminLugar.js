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
            }            
        };

    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            createDialog();
            document.getElementById("msg").innerHTML = ajax.responseText;
            clearForm();
        }
    };

    //ajax.open("GET", "../php/sendLugar.php?b="+JSON.stringify(lugarOb), true);
    ajax.open("GET", "../php/actions/registrarLugar.php?b=" + JSON.stringify(lugarOb), true);
    ajax.send();
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


function fillLugarShc(ob) {


    var list = document.getElementById("listLugar");
    list.style.display = "block"; 
    var arrayLugar = JSON.parse(ob);

    var x = 0;


    while (arrayLugar[x]) {

        var table = document.createElement("table");

        table.style.width = "80%";
        table.style.marginRight = "8%";
        table.style.border = "2px solid";
        table.style.marginBottom = "3%";

        var tr1 = document.createElement("tr");
        var tr2 = document.createElement("tr");
        var tr3 = document.createElement("tr");
        var tr4 = document.createElement("tr");
        var tr5 = document.createElement("tr");
        var tr6 = document.createElement("tr");
        var tr7 = document.createElement("tr");
        

        tr1.innerHTML = "<td> Numero </td> <td> " + arrayLugar[x].num + "</td> ";
        tr2.innerHTML = "<td> Nombre </td> <td> " + arrayLugar[x].nombre + "</td> ";
        tr3.innerHTML = "<td> Descripción </td> <td> " + arrayLugar[x].desc + "</td> ";
        tr4.innerHTML = "<td> Costo </td> <td> " + arrayLugar[x].costo + "</td> ";
        tr5.innerHTML = "<td> Capacidad </td> <td> " + arrayLugar[x].capacidad + "</td>  ";
        tr6.innerHTML = "<td> Tipo de lugar </td> <td> " + arrayLugar[x].tipoLugar.nombre + "</td>";
        

        var str = "";
      
        for (var i = 0; i < arrayLugar[x].espacios.length; i++) {

            if (i!=arrayLugar[x].espacios.length-1)
                str += arrayLugar[x].espacios[i].nombre + ", ";
            else {
                str += arrayLugar[x].espacios[i].nombre;

            }
        }

        tr7.innerHTML = "<td> Espacios </td> <td> " + str + "</td>";        
        

        var arrayTr = [tr1, tr2, tr3, tr4, tr5, tr6,tr7];


        for (z = 0; z < 7; z++) {
            table.appendChild(arrayTr[z]);
        }


        var arrayDirec = arrayLugar[x].direccion;

        if (arrayDirec.calle != null || arrayDirec.NI != null || arrayDirec.NE != null || arrayDirec.CP != null) {

            var trC = document.createElement("tr");
            var trNI = document.createElement("tr");
            var trNE = document.createElement("tr");
            var trCP = document.createElement("tr");
            var trMun = document.createElement("tr");

            trC.innerHTML = " <td> Calle </td> <td> " + arrayDirec.calle + "</td>";
            trNI.innerHTML = "<td> No. Interno </td> <td> " + arrayDirec.NI + "</td>";
            trNE.innerHTML = "<td> Num. Ext </td> <td> " + arrayDirec.NE+ "</td> ";
            trCP.innerHTML = " <td> Código Postal </td> <td> " + arrayDirec.CP + "</td>  ";
            trMun.innerHTML = " <td> Municipio </td> <td> " + arrayDirec.municipio.nombre + "</td>  ";

            var arrayDir = [trC, trNI, trNE, trCP,trMun];

            for (y = 0; y < 5; y++) {
                table.appendChild(arrayDir[y]);
            }
        }

        
            var btn = document.createElement("button");

            btn.addEventListener("click", function (_x) {
                return function () {
                    abrir(arrayLugar[_x]);
                }

            }(x));
            btn.innerHTML = "Editar";
            table.appendChild(btn);
        

        list.appendChild(table);
        x++;
    }
}

function cerrar() {
    var ch = document.getElementsByClassName("ckB");


    for (var x = 0; x < ch.length; x++) {
        ch[x].checked = false;
    }

    document.getElementById('update').close();


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



function showFilesData(){
    var myFile = document.getElementById("files").files;
    

    for (var i = 0, f; f = myFile[i]; i++) {

        var reader = new FileReader();
        reader.readAsDataURL(f);

        var decodeImg;

        reader.onloadend = function () {
            decodeImg = reader.result;
            console.log(reader.result);
            document.getElementById("myImg").src = reader.result;
        }

    //    var ajax = new XMLHttpRequest();
    //    ajax.onreadystatechange = function () {
    //        if (ajax.readyState == 4 && ajax.status == 200) {
    //            document.getElementById("myImg").src=ajax.responseText;
               
    //        }
    //    };


    //    ajax.open("GET", "../php/test.php?f=" +decodeImg, true);
    //    ajax.send();
    }
}