function registrarAgente() {
    document.getElementById("msg").innerHTML = "";

    var agenteOb = null;

    var genero = document.getElementById("genreBox");

        agenteOb = {
            nombre: document.getElementById("txtNombre").value,
            apPat: document.getElementById("txtApPat").value,
            apMat: document.getElementById("txtApMat").value,
            fecNac: document.getElementById("txtFecNac").value,            
            genero: genero.options[genero.selectedIndex].value,
            telefono: document.getElementById("txtTelefono").value,
            usuario: {
                correo: document.getElementById("txtCorreo").value,
                nameUser: document.getElementById("txtUsuario").value,
                passwd: new function () {
                    this.passContent = document.getElementById("txtPass").value;
                    validationPass = document.getElementById("txtConfiPass").value;

                    if (this.passContent != validationPass) {
                        this.passContent = false;

                        }

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
    ajax.open("GET", "../php/actions/registrarAgente.php?b=" + JSON.stringify(agenteOb), true);
    if (agenteOb.usuario.passwd.passContent != false) {
        
        ajax.send();
    } else {
        // Mostrar Diálogo
        console.log("contraseñas no coinciden");
    }
    
}


function buscarAgente() {
    createDialog();
    document.getElementById("listAgen").innerHTML = "";

    var ajax = new XMLHttpRequest();

    var shc=document.getElementById("shcId").value
      
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            //console.log(ajax.responseText);
           
            fillAgenteShc(ajax.responseText);
        }
    };


    ajax.open("GET", "../php/actions/buscarAgente.php?b=" + shc, true);
    ajax.send();

}





function clearForm() {

    var t = 0;

    var genero = document.getElementById("genreBox");
    genero.options.selectedIndex = 0;

    document.getElementById("txtNombre").value="";
    document.getElementById("txtApPat").value="";
    document.getElementById("txtApMat").value="";
    document.getElementById("txtFecNac").value="";    
    document.getElementById("txtTelefono").value="";
    
    document.getElementById("txtCorreo").value="";
    document.getElementById("txtUsuario").value="";
        
    document.getElementById("txtPass").value="";
    document.getElementById("txtConfiPass").value="";

}


function fillAgenteShc(ob) {


    var list = document.getElementById("listAgen");
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

