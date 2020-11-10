<?php
    require_once("../mysql/connection.php");

    class tipoLugar {

        private $num;
        private $nombre;

       public function getNum(){return $this->num;}
       public function setNum($var){$this->num=$var;}

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

              //
               if (func_num_args()==1){
                    
                    $this->nombre=$args[0];                   
              }
                     
        }


        //call  SP_insert_espacios ('Test')

         public function insertTL(){
            $sql="call SP_insert_TL (?);";

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
      

         public function getAllTipoLugar(){
        
              $sql="select * from VW_tipolugares_admin;";  
            $conn=mysqlConnection::getConnection();

              $command=$conn->prepare($sql);              
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


        public function getJsonObject(){

            return json_encode(
                array('num'=>$this->num,
                      'nombre'=>$this->nombre)
            );
            
            

        }




    }
    
    
    
    
?> 