<?php
    require_once("../mysql/connection.php");

    class imagenes {

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


        public function insertImagen($n){
            $sql="insert into imagenesLugar (img_Nombre,FK_Lugar) values (?,?);";

            $conn=mysqlConnection::getConnection();

            $command=$conn->prepare($sql);
            $command->bind_param('si',$this->nombre,$n);
            $command->execute();

            if ($command->error!=""){
                    echo 'Error: '.$command->error;
             } else {
                    echo 'registrado';
             }

                mysqli_stmt_close($command);
                $conn->close();        
        }

        public function getAllImagenesByLugar($n){

            $sql="select * from imagenesLugar where FK_lugar=?";
            $command=$conn->prepare($sql);
            $command->bind_param('i',$n);
            $command->execute();
        } 

        public function getJsonObject(){

            return json_encode(
                array('num'=>$this->num,
                      'nombre'=>$this->nombre)
            );                        
        }        

    }
    
    
    
    
?> 