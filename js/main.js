function loadPictures() {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState==4 && ajax.status==200){
            fillPictures(ajax.responseText);
        }
    };
}

function fillPictures() {
    

}