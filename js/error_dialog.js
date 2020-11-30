function createDialog(msg) {
    var dialogo = document.createElement('dialog');
    dialogo.setAttribute('id', 'dialog_error');

    var logo = document.createElement('img');
    logo.src = "../img/logoOficial.png";
    logo.style.width = '40%';

    var mensaje = document.createElement('section');
    mensaje.setAttribute('id', 'mensaje');
    mensaje.innerHTML = '</br >' + msg + '</br></br>';

    var boton = document.createElement('button');
    boton.innerHTML = 'Cerrar';
    boton.setAttribute('id', 'cerrar_error');

    console.log(msg);
    if (msg == 1) {
        mensaje.innerHTML = '</br > Registrado inicie sesión para continuar </br></br>';
        boton.addEventListener('click', function () { reloadIndex(); });
    } else {
        if (msg == 2) {
            console.log('entre');
            mensaje.innerHTML = '</br > Favor de llenar todos los campos </br></br>';
        }
            boton.addEventListener('click', function () { closeError(); });
    }

    dialogo.appendChild(logo);
    dialogo.appendChild(mensaje);
    dialogo.appendChild(boton);
    document.body.appendChild(dialogo);
    

}

function showError(msg) {
    createDialog(msg);
    
    var dialogo = document.getElementById('dialog_error');

    disableScroll();
    dialogo.showModal();
}
//backDrop;

function closeError() {
    var dialogo = document.getElementById('dialog_error');
    enableScroll();
    dialogo.close();
    document.body.removeChild(dialogo);
    location.reload();
}


function disableScroll() {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', disableScroll);

}

function enableScroll() {
    window.scrollTo(0, 0);
    window.removeEventListener('scroll', disableScroll); 
}

function reloadIndex() {
    location.href = "../index.html";
}

function scroll() {
    window.scrollTo(0, 0);
}