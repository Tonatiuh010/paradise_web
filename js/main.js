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
    console.log(arrayLugar);

    var seccion = document.getElementById("pictures_container");
   
    

    for (var i = 0; i < 10; i++) {

        var right_arrow = document.createElement('img');
        right_arrow.setAttribute("class", "nextLit");
        right_arrow.src = "./img/next_page.png";
        right_arrow.addEventListener('click', function () { plusPictures(1) ; });

        var left_arrow = document.createElement('img');
        left_arrow.setAttribute("class", "prevLit");
        left_arrow.src = "./img/prev_page.png";
        left_arrow.addEventListener('click', function () { plusPictures(-1); });


       if (arrayLugar[i]){
            var internalSection = document.createElement("section");
            internalSection.className = "imgPicture fade";// Slide
            internalSection.style.width="100%";
            internalSection.style.height = "100%";


           var section = document.createElement('section');
           section.setAttribute('class', 'imgPictures');

           internalSection.appendChild(section);

           var imgArray = arrayLugar[i].imagenes;

           var lb1 = document.createElement("section");
           lb1.setAttribute('class', 'label1');
        
            if (imgArray.length >= 3) {

                for (var a = 0; a < 3; a++) {               
                    var img = document.createElement("img");
               
                    lb1.innerHTML = arrayLugar[i].nombre;

                    img.className = "imgf";
                    img.src = "./img/lugares/" + arrayLugar[i].num + "/" + imgArray[a].nombre;

                    var secImg = document.createElement('section');
                    secImg.setAttribute('class', 'imagen');

                    secImg.appendChild(img);
                    section.appendChild(secImg);

                    img.addEventListener('click', function (_i) {
                        return function () {
                            location.href = './php/actions/PHP_MLUGAR.php?id=' + arrayLugar[_i].num;
                        }
                    }(i));
                }


                section.appendChild(lb1);

                internalSection.appendChild(right_arrow);
                internalSection.appendChild(left_arrow);

                seccion.appendChild(internalSection);
            }
        }
    }
    showPictures(0);
}


var slide = 0;


function plusPictures(n) {
    showPictures(slide += n);
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
