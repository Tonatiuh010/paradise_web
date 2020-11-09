<?php
$HOST="localhost";
$USER="root";
$PASS="";
$BD="paradise";


$mysqli= new mysqli("localhost","root","","paradise");

if ($mysqli->connect_error) {
    echo 'No pudo conectarse a mysql';
    exit();
}


$sql       = "select * from reservaciones;";
$resultado = $mysqli->query($sql);

if ($resultado->num_rows>0) {

    while ($fila = $resultado->fetch_assoc()) {
    echo '<section style="width:30%; float:initial;"><table border="1">';
    echo "<tr><th>".$fila['resNum']."</th></tr>";
    echo "<tr><th>".$fila['resFechaProceso']."</th></tr>";
    echo "<tr><th>".$fila['resFehcaInic']."</th></tr>";
    echo "<tr><th>".$fila['resFechaFin']."</th></tr>";
    echo "<tr><th>".$fila['resTotalDias']."</th></tr>";
    echo "<tr><th>".$fila['FK_salon']."</th></tr>";
    echo "<tr><th>".$fila['FK_cliente']."</th></tr>";
    echo "<tr><th>".$fila['FK_agente']."</th></tr>";
    echo '<table/></section>';
}

}else{
    echo "Error de BD, no se pudo consultar la base de datos\n";
    echo "Error MySQL: " . mysql_error();
    exit();
}



?>