


function buscarClientes() {
    createDialog();
    document.getElementById("listClientes").innerHTML = "";

    var ajax = new XMLHttpRequest();

    var shc=document.getElementById("shcId").value
      
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            console.log(ajax.responseText);           
            //fillClientesShc(ajax.responseText);
        }
    };

    ajax.open("GET", "../php/actions/buscarClientes.php?b=" + shc, true);
    ajax.send();
}

function fillClientesShc(ob) {


    var list = document.getElementById("listClientes");
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
        var tr6 = document.createElement("tr");
        var tr7 = document.createElement("tr");
        
        

        tr1.innerHTML = "<td> Matrícula </td> <td> " + arrayAgentes[x].matricula + "</td> ";
        tr2.innerHTML = "<td> Nombre </td> <td> " + arrayAgentes[x].nombre + " " + arrayAgentes[x].paterno + " " + arrayAgentes[x].materno + "</td> ";
        tr3.innerHTML = "<td> Edad </td> <td> " + arrayAgentes[x].edad + "</td> ";
        tr4.innerHTML = "<td> Correo </td> <td> " + arrayAgentes[x].usuario.correo + "</td> ";
        tr5.innerHTML = "<td> Usuario </td> <td> " + arrayAgentes[x].usuario.nombre + "</td>  ";
        tr7.innerHTML = "<td> Genero </td> <td> " + arrayAgentes[x].genero+ "</td>  ";
        

        var str = "";
      
        for (var i = 0; i < arrayAgentes[x].telefono.length; i++) {

            if (i!=arrayAgentes[x].telefono.length-1)
                str += arrayAgentes[x].telefono[i].telefono+ ", ";
            else {
                str += arrayAgentes[x].telefono[i].telefono;

            }
        }

        tr6.innerHTML = "<td> Teléfonos </td> <td> " + str + "</td>";        
        

        var arrayTr = [tr1, tr2, tr3, tr4, tr5, tr6, tr7];


        for (z = 0; z < 7; z++) {
            table.appendChild(arrayTr[z]);
        }


                           

        list.appendChild(table);
        x++;
    }
}

