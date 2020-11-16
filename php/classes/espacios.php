<?php
    require_once("../mysql/connection.php");

    class espacios {

        private $num;
        //private $numLug;  Pensar acerca de este atributo
        private $nombre;

       public function getNum(){return $this->num;}
       public function setNum($var){$this->num=$var;}

       //public function getNumLug(){return $this->numLug;}
       //public function setNumLug($var){$this->numLug=$var;}

       public function getNombre(){return $this->nombre;}
       public function setNombre($var){$this->nombre=$var;}

        public function __construct() {
            $args=func_get_args();

               if (func_num_args()==0){
                    $this->num=0;
                    $this->nombre='';                   
              }

              if (func_num_args()==2){
                    $this->num=$args[0];
                    $this->nombre=$args[1];                   
              }

              //Buscar Constructor
               if (func_num_args()==1){
                    
                    $this->nombre=$args[0];                   
              }
                     
        }


        public function insertEspacios(){
            $sql="call SP_insert_espacios (?);";

            $conn=mysqlConnection::getConnection();

            $command=$conn->prepare($sql);
            $command->bind_param('s',$this->nombre);
            $command->execute();

            if ($command->error!=""){
                    echo 'Error: '.$command->error;
             } else {
                    echo 'registrado';
             }

                mysqli_stmt_close($command);
                $conn->close();        
        }

        public function insertEspaciosLugar($numEspacios,$numLugar){
                $sql='call SP_insertar_EspLug(?,?);';
                $conn=mysqlConnection::getConnection();
                $command=$conn->prepare($sql);

                $command->bind_param('ii',$numEspacios,$numLugar);
             
                $command->execute();

                if ($command->error!=""){
                    echo 'Error in insert: '.$command->error;
                }

                mysqli_stmt_close($command);
                $conn->close();         

        }


         public function deleteEspaciosLugar($numEspacios,$numLugar){
                $sql='call SP_delete_EspLug(?,?);';                           
                $conn=mysqlConnection::getConnection();
                $command=$conn->prepare($sql);

                $command->bind_param('ii',$numEspacios,$numLugar);
             
                $command->execute();

                if ($command->error!=""){
                    echo 'Error in delete: '.$command->error;
                }

                mysqli_stmt_close($command);
                $conn->close();         
        }

        public function getJsonObject(){

            return json_encode(
                array('num'=>$this->num,
                      'nombre'=>$this->nombre)
            );                        

        }

        public function getAllEspacios(){
        
              $sql="select * from VW_espacios_admim;";  
            $conn=mysqlConnection::getConnection();

              $command=$conn->prepare($sql);              
              $command->bind_result($nombre,$num);

              $command->execute();

              $list=array();
              while ($command->fetch()){
                $this->num=$num;
                $this->nombre=$nombre;

                array_push($list,json_decode(self::getJsonObject()));
                }
                mysqli_stmt_close($command);
                $conn->close(); 
                return json_encode($list);
        }            

        public function getAllEspaciosByLugar($n){
        
              $sql="select numEsp,nombre from vw_lugEspacios where numLugar =? ;";  
            $conn=mysqlConnection::getConnection();

              $command=$conn->prepare($sql);
              $command->bind_param('i',$n);
              $command->bind_result($num,$nombre);

              $command->execute();

              $list=array();
              while ($command->fetch()){
                $this->num=$num;
                $this->nombre=$nombre;

                array_push($list,json_decode(self::getJsonObject()));
                }
                mysqli_stmt_close($command);
                $conn->close(); 
                return json_encode($list);
        }            

    }
    
    
    
    
?> 