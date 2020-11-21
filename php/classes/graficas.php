<?php
    require_once("../mysql/connection.php");


    class chart{

        public function getChartDest()
        {
            $conn=mysqlConnection::getConnection();
            $sql="SELECT  FK_Lugar, lugNombre ,count(FK_Lugar) as res FROM pre_reservacion
            JOIN lugar on FK_Lugar = lugNum where prStatus = 'autorizada'
            GROUP by FK_Lugar ORDER by FK_Lugar
            limit 5
            ";
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $result = $stmt->get_result();
            $outp = $result->fetch_all(MYSQLI_ASSOC);
            mysqli_stmt_close($stmt);
            $conn->close(); 

            return json_encode($outp);
        }
    }