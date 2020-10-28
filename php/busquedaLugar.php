<html>
<body>

<?php
    include("config.php");

$conn= new mysqli($servername	,$username	,$password	,$dbname);

if ($conn->connect_error){
	die("Conexión Fallida: ".$conn->connect_error);
    exit();
}

$shc=json_decode($_GET['b']);

$sql="select * from VW_lugar_admin where nombre like '".$shc->search."%';";
$result=$conn->query($sql);

if ($result->num_rows>0)
{
    $ob_lugar=array();

    while ($row=$result->fetch_assoc()){

   array_push( $ob_lugar ,array(
                "nombre"=>$row['nombre'], 
               "desc"=>$row['_desc'], 
               "costo"=>$row['costo'],
               "capacidad"=>$row['capacidad'], 
               "numero"=>$row['numero'],
                "tipoLugar"=>$row['tipoLugar'],
                "calle"=>$row['calle'],
                "numInt"=>$row['numInterior'],
                "numExt"=>$row['numExterior'],
                "CP"=>$row['CP']));
    
    echo "
    <table style='width:22%;margin-right:8%; border:2px solid;margin-bottom:3%;'>
        <tr>
            <td>Numero del Lugar </td>
            <td>".$row['numero']." </td>
        </tr>

        <tr>
            <td>Nombre del Lugar </td>
            <td>".$row['nombre']." </td>
        </tr>

        <tr>
            <td>Descripci&oacute;n del Lugar </td>
            <td>".$row['_desc']." </td>
        </tr>

        <tr>
            <td>Costo del Lugar </td>
            <td>".$row['costo']." </td>
        </tr>


        <tr>
            <td>Capacidad del Lugar </td>
            <td>".$row['capacidad']." </td>
        </tr>

        
        <tr>
            <td>Tipo Lugar </td>
            <td>".$row['tipoLugar']." </td>
        </tr>

        <tr>
            <td>Tipo Lugar </td>
            <td>".$row['tipoLugar']." </td>
        </tr>
    </table >
    ";

        
    if ($shc->type==true){
        echo "<button onclick='modifyLugar(".$ob_lugar.")'>click</button>";   
    }
    



    }
} else {
    echo "No data founded</br>";

    echo "Sentence:".$sql;
}




?>



</body>
</html>