function loadPictures() {
    var ajax = new XMLHttpRequest();

    lista = '';

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            //document.getElementById('lugares').innerHTML = ajax.responseText;
            fillPictures(ajax.responseText);
        }
    }

    ajax.open("GET", "./php/actions/show_search_lugares.php?lista=" + lista, true);
    ajax.send();
}

function fillPictures(obj) {

    var arrayLugar = JSON.parse(obj);

    var section = document.getElementById("pictures_container");
   
    

    for (var i = 0; i < 10;i++){
        var internalSection = document.createElement("section");
        internalSection.className = "imgPicture fade";// Slide
        internalSection.style.width="100%";
        internalSection.style.height = "100%";
        
        var imgArray = arrayLugar[i].imagenes;
        
        if (imgArray.length >= 3) {

            for (var a = 0; a < 3; a++) {               
                var img = document.createElement("img");
                img.className = "imgf";

                img.src = "./img/lugares/"+arrayLugar[i].num+"/"+imgArray[a].nombre;
                internalSection.appendChild(img);

            }
            section.appendChild(internalSection);
        }
    }

    showPictures(0);
}


var slide = 0;


function plusPictures(n) {
    showPictures(slide+=n);
}


function showPictures(n) {
    var slides = document.getElementsByClassName("imgPicture");

    if (n >= slides.length) slide = 0;

    if (n < 0) slide = slides.length-1;

    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slide].style.display = "block";
}
