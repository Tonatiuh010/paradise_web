


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
    var x = 0;
    
    while (arrayClientes[x]) {

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
        

        tr1.innerHTML = "<td> Número </td> <td> " + arrayClientes[x].num + "</td> ";
        tr2.innerHTML = "<td> Nombre </td> <td> " + arrayClientes[x].nombre + " " + arrayClientes[x].paterno + " " + arrayClientes[x].materno + "</td> ";
        tr3.innerHTML = "<td> Edad </td> <td> " + arrayClientes[x].edad + "</td> ";
        tr4.innerHTML = "<td> Correo </td> <td> " + arrayClientes[x].usuario.correo + "</td> ";
        tr5.innerHTML = "<td> Usuario </td> <td> " + arrayClientes[x].usuario.nombre + "</td>  ";                              
        tr6.innerHTML = "<td> Teléfonos </td> <td> " + arrayClientes[x].telefono + "</td>";

        var arrayTr = [tr1, tr2, tr3, tr4, tr5, tr6];

        for (z = 0; z < 6; z++) {
            table.appendChild(arrayTr[z]);
        }

        list.appendChild(table);
        x++;
    }
}

