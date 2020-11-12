<?php

require_once("../mysql/connection.php");

function get_log_in($us='',$pwd='')
{
    $default='empty';
    //$sql="call sp_log_in('".$us."','".$pwd."');";
    $sql="call sp_log_in(?,?);";

            $conn=mysqlConnection::getConnection();
            $command=$conn->prepare($sql);
            $command->bind_param('ss',$us,$pwd);

            //$command->bind_result($id_out);

                $command->execute();

                $command->bind_result($id,$user,$type);

                $obj=array();

                if ($command->fetch()){

                    $obj = array( "id" => $id, 
                                 "num_us"=>$user,
                                 "tipo"=>$type);
                                         
                }else{

                    $obj = array( "id" => $default);
                }

        $res=json_encode($obj);

        mysqli_stmt_close($command);
        $conn->close();         
        return $res;
}



?>
