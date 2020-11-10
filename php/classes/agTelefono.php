<?php
    require_once("../mysql/connection.php");


    class agTelefono{

        private $num;
        private $telefono;

        public function getNum(){return $this->num;}
        public function setNum($var){$this->num=$var;}

        public function getTelefono(){return $this->telefono;}
        public function setTelefono($var){$this->telefono=$var;}


            public function __construct() {
                $args=func_get_args();

                   if (func_num_args()==0){
                        $this->num=0;
                        $this->telefono='';                   
                  }

                  if (func_num_args()==2){
                        $this->num=$args[0];
                        $this->telefono=$args[1];                   
                  }

                  //Buscar Constructor
                   if (func_num_args()==1){
                    
                        $this->nombre=$args[0];                   
                  }
                     
            }

            public function getJsonObject(){

                return json_encode(
                    array('num'=>$this->num,
                          'telefono'=>$this->telefono)
                );                        

            }

            public function getAgTelefonos($n){
        
                $sql="select num, telefono from vw_agente_telefonos where agente=?;";  
                $conn=mysqlConnection::getConnection();

                  $command=$conn->prepare($sql);
                  $command->bind_param('s',$n);
                  $command->bind_result($num,$telefono);

                  $command->execute();

                  $list=array();
                  while ($command->fetch()){
                    $this->num=$num;
                    $this->telefono=$telefono;

                    array_push($list,json_decode(self::getJsonObject()));
                    }
                    mysqli_stmt_close($command);
                    $conn->close(); 
                    return json_encode($list);
            }            

    }

?>