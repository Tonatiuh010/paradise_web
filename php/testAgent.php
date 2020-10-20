<html>
<body>

<?php
    $servername="localhost";
$username="root";
$password="losseisbastardos12";
$dbname="paradise";
// Credentials


$conn= new mysqli($servername	,$username	,$password	,$dbname);

if ($conn->connect_error){
	die("Conexión Fallida: ".$conn->connect_error);
    exit();
}

    //$shc=json_decode($_GET['b']);

$sql="select * from VW_agente_admin;";
$result=$conn->query($sql);

if ($result->num_rows>0)
{
    $ob_agente=array();
    
    while ($row=$result->fetch_assoc()){
    
    array_push( $ob_agente,array( "nombre" => $row['nombre'], 
               "apPat"=>$row['apPat'], 
               "apMat"=>$row['apMat'],
               "nacimiento"=>$row['nacimiento'], 
               "genero"=>$row['genero'],
                "matricula"=>$row['matricula']));


   //$ob_agente[$x]='{ "nombre" : "'.$row['nombre'].'", 
   //            "apPat": "'.$row['apPat'].'", 
   //            "apMat": "'.$row['apMat'].'",
   //            "nacimiento": "'.$row['nacimiento'].'", 
   //            "genero": "'.$row['genero'].'",
   //             "matricula": "'.$row['matricula'].'" }';

    //echo "
    //<table style='width:22%;margin-right:8%; border:2px solid;margin-bottom:3%;'>
    //    <tr>
    //        <td>Matricula </td>
    //        <td>".$row['matricula']." </td>
    //    </tr>

    //    <tr>
    //        <td>Nombre </td>
    //        <td>".$row['nombre']." </td>
    //    </tr>

    //    <tr>
    //        <td>Apellido Paterno </td>
    //        <td>".$row['apPat']." </td>
    //    </tr>

    //    <tr>
    //        <td>Apellido Materno </td>
    //        <td>".$row['apMat']." </td>
    //    </tr>


    //    <tr>
    //        <td> Nacimiento </td>
    //        <td>".$row['nacimiento']." </td>
    //    </tr>


    //     <tr>
    //        <td> Genero </td>
    //        <td>".$row['genero']." </td>
    //    </tr>
    //</table >
    //";

    //if ($shc->type==true){
    //    echo "<button onclick='modifyAgente(".$ob_agente.")'>click</button>";   
    //}


    }

    $response=json_encode(array("type"=>true,
               "agentesArray"=> $ob_agente));
        


     $decod=json_decode($response);

     var_dump( $decod->agentesArray[0]);
         
} else {
    echo "No data founded</br>";

    echo "Sentence:".$sql;

    exit();
}




?>



</body>
</html>