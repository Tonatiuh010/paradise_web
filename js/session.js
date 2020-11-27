// JavaScript source code

function sesion(type) {

    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.status == 200 && ajax.readyState == 4) {
            console.log(ajax.responseText);
             

            var obj_user = JSON.parse(ajax.responseText);

            //console.log(obj_user);

            var respuesta = obj_user.res;

            if (respuesta == true) {
                document.getElementById('log').style.display = "none";

                document.getElementById('login').style.display = "block";
                var lotoHome = document.getElementById('imgHome');
                lotoHome.addEventListener('click', function () {
                    location.href = "../"+obj_user.index;
                });
                        
            } else {                
                if (obj_user.index != '') {
                    //showError("Error de inicio de sesión.");
                    document.body.innerHTML = "";
                    location.href = "../" + obj_user.index;
                }
            }


        }
    }

    ajax.open("GET", "../php/actions/session_verify.php?b="+type, true);
    ajax.send();
}


