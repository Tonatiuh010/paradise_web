


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

    var list = document.getElementById("listAltaReservaciones");
    list.innerHTML = "";

    var arrayPreReservaciones=JSON.parse(ob);
    console.log(arrayPreReservaciones);
    var x = 0;

    while (arrayPreReservaciones[x]) {

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

        tr1.innerHTML = "<td> Folio </td> <td> " + arrayPreReservaciones[x].num + "</td> ";
        tr2.innerHTML = "<td> Lugar </td> <td> " + arrayPreReservaciones[x].lugar.nombre + "</td> ";
        tr3.innerHTML = "<td> Cliente</td> <td> " + arrayPreReservaciones[x].cliente.nombre + " " + arrayPreReservaciones[x].cliente.paterno + " " + arrayPreReservaciones[x].cliente.materno + "</td> ";
        tr4.innerHTML = "<td> Cliente Correo </td> <td> " + arrayPreReservaciones[x].cliente.usuario.correo + "</td> ";
        tr5.innerHTML = "<td> Status </td> <td> " + arrayPreReservaciones[x].status + "</td>  ";
        tr6.innerHTML = "<td> Registrada en: </td> <td> " + arrayPreReservaciones[x].registro + "</td>  ";
        tr7.innerHTML = "<td> Fecha de evento </td> <td> " + arrayPreReservaciones[x].inicio + " a " + arrayPreReservaciones[x].termino + "</td>  ";

        var arrayTr = [tr1, tr2, tr3, tr4, tr5, tr6, tr7];


        for (z = 0; z < 7; z++) {
            table.appendChild(arrayTr[z]);
        }

        var img = document.createElement("img");
        img.src = "../img/lugares/" + arrayPreReservaciones[x].lugar.num + "/" + arrayPreReservaciones[x].lugar.imagenes[0].nombre;
        img.style.width = "20%";

        var button = document.createElement("button");
        button.innerHTML = "Establecer Agente";

        button.addEventListener("click", function (_x) {
            return function () {
                openDialogAddAgente(arrayPreReservaciones[_x].num);
                buscarAgente();
            }
        }(x));

        table.appendChild(button);
        
        list.appendChild(table);
        list.appendChild(img);

        x++;
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
    
    document.getElementById("container").innerHTML = "";

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
    list.style.display = "block";
    var arrayAgentes = JSON.parse(ob);

    var x = 0;

    while (arrayAgentes[x]) {

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
          
        tr1.innerHTML = "<td> Matrícula </td> <td> " + arrayAgentes[x].matricula + "</td> ";
        tr2.innerHTML = "<td> Nombre </td> <td> " + arrayAgentes[x].nombre + " " + arrayAgentes[x].paterno + " " + arrayAgentes[x].materno + "</td> ";
        
        tr3.innerHTML = "<td> Correo </td> <td> " + arrayAgentes[x].usuario.correo + "</td> ";
        tr4.innerHTML = "<td> Usuario </td> <td> " + arrayAgentes[x].usuario.nombre + "</td>  ";
       


        var str = "";

        for (var i = 0; i < arrayAgentes[x].telefono.length; i++) {

            if (i != arrayAgentes[x].telefono.length - 1)
                str += arrayAgentes[x].telefono[i].telefono + ", ";
            else {
                str += arrayAgentes[x].telefono[i].telefono;

            }
        }

        tr5.innerHTML = "<td> Teléfonos </td> <td> " + str + "</td>";


        var arrayTr = [tr1, tr2, tr3, tr4, tr5];


        for (z = 0; z < 5; z++) {
            table.appendChild(arrayTr[z]);
        }

        var btn = document.createElement("Button");
        btn.innerHTML = "Asignar";

        btn.addEventListener("click", function (_x) {
            return function () {
                setAgente(arrayAgentes[_x].matricula, document.getElementById("numReservacion").innerText);
            }
        }(x));

        table.appendChild(btn);
        list.appendChild(table);
        
        x++;
    }
}


function setAgente(matricula, numPR) {

    console.log(numPR);

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
            var res=JSON.parse(ajax.responseText);
            if (res.res==false){
                console.log("error");
            } else {
                location.reload();
            }
        }
    };


    ajax.open("GET", "../php/actions/asignarAgentePR.php?b=" + JSON.stringify({matricula: matricula, pr:numPR}), true);
    ajax.send();
}


function fillReservacionShc(ob) {

    var list = document.getElementById("listLugar");
    list.innerHTML = "";
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

            if (i != arrayLugar[x].espacios.length - 1)
                str += arrayLugar[x].espacios[i].nombre + ", ";
            else {
                str += arrayLugar[x].espacios[i].nombre;

            }
        }

        tr7.innerHTML = "<td> Espacios </td> <td> " + str + "</td>";


        var arrayTr = [tr1, tr2, tr3, tr4, tr5, tr6, tr7];


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
            trNE.innerHTML = "<td> Num. Ext </td> <td> " + arrayDirec.NE + "</td> ";
            trCP.innerHTML = " <td> Código Postal </td> <td> " + arrayDirec.CP + "</td>  ";
            trMun.innerHTML = " <td> Municipio </td> <td> " + arrayDirec.municipio.nombre + "</td>  ";

            var arrayDir = [trC, trNI, trNE, trCP, trMun];

            for (y = 0; y < 5; y++) {
                table.appendChild(arrayDir[y]);
            }
        }

        list.appendChild(table);
        x++;
    }
}