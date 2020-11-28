<?php

require_once("../classes/lugar.php");

$obbus=  json_decode($_GET['objbuscar']);

            $arrayId=$obbus->esp->arrayId; 

            $b = 0;
            $str = "and Espacio in (";

            while ($b<count($arrayId))
            {
                if ($b+1 >= count($arrayId))
                {
                    $str = $str . $arrayId[$b];
                } else {
                    $str = $str . $arrayId[$b] . ",";
                }
                $b++;     
            }

            $str = $str . ")";

            
            $capacidad= $obbus->capacidad;
            $ciudad= $obbus->ciudad;
            $tipo=$obbus->tipoL;


$lugar = new lugar();
$res=$lugar->getAllLugaresFiltros($ciudad,$tipo,$capacidad,$str);
//var_dump($res);
echo $res;


?>