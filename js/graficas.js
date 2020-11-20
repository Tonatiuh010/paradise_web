
window.onload = function(){
    let elem = document.getElementById("lugCon"),
    titulo = "Lugares concurridos";
    //cuando este cargado la ventana ejecutare esta funcion
    getData(elem,titulo);  
};


function getData(elem,titulo) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data =JSON.parse(this.responseText);
            // en esta funcion solo necesitamos 
            //      elemento padre donde divujaremos la grafica
            //      titulo de la grafica
            //          datos a graficar
            //              --datos de la Y: mi caso numero de concurrencias
            //              --datos de la x: nombres de los lugares
            //      
            grafica(elem,titulo, data);
        }
      };

      /*podemos usar el mismo archivo para todas las graficas*/
      xmlhttp.open("GET", "../php/actions/AcGraficas.php", true);
      xmlhttp.send();
 }
