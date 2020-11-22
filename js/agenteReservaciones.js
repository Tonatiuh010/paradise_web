function buscarLugar() {
    createDialog();
    document.getElementById("listReservaciones").innerHTML = "";

    var ajax = new XMLHttpRequest();

    var shc=document.getElementById("shcId").value
      
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
           
            fillReservaciones(ajax.responseText);
        }
    };


    ajax.open("GET", "../php/actions/buscarReservaciones.php?b=" + shc, true);
    ajax.send();

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
        


        list.appendChild(table);

        if (arrayLugar[x].imagenes.length > 0) {
            var img = document.createElement("img");
            img.style.width = "20%";
            img.src = "../img/lugares/" + arrayLugar[x].num + "/" + arrayLugar[x].imagenes[0].nombre;
            list.appendChild(img);
        }
        x++;
    }
}
