//id del input = general-search
//id del boton = general-button

function buscador() {

    var parametro = document.getElementById('general-search').value;

    location.href = '../php/actions/PHP_BUSCADOR.php?prm=' + parametro;
}

