<?php

    abstract class usuario{
    
        private $num;           //int
        private $nombre;        //varchar     
        private $contrasenia;   //varchar
        private $correo;        //varchar
        private $tipo;          //varchar


        public function getNum(){return $this->num;}
        public function setNum($var){$this->num=$var;}

        public function getNombre(){return $this->nombre;}
        public function setNombre($var){$this->nombre=$var;}

        public function getContrasenia(){return $this->contrasenia;}
        public function setContrasenia($var){$this->contrasenia=$var;}

        public function getCorreo(){return $this->correo;}
        public function setCorreo($var){$this->correo=$var;}

        public function getTipo(){return $this->tipo;}
        public function setTipo($var){$this->tipo=$var;}


            public function __construct(){
               $args=func_get_args();

               if (func_num_args()==0){
                    $this->num=0;                            
                    $this->nombre='';
                    $this->contrasenia='';  
                    $this->correo='';    
                    $this->tipo='';                 
              }

              if (func_num_args()==5){  
                    $this->num=$args[0];                            
                    $this->nombre=$args[1];
                    $this->contrasenia=$args[2];  
                    $this->correo=$args[3];    
                    $this->tipo=$args[4];                          
              }
            
              if (func_num_args()==3){                             
                    $this->nombre=$args[0];
                    $this->contrasenia=$args[1];  
                    $this->correo=$args[2];                             
              }         

              // Posible constructor para hacer búsqueda.
              if (func_num_args()==1){                    
                    $this->codigo=$args[0];                                       
              }
  
            }

        public function insertUserCli(){
            $conn=mysqlConnection::getConnection();

            $sql="call SP_insert_userCli (?,?,?);";//SQL Sentence
            $command=$conn->prepare($sql);
                  

                  $command->bind_param('sss',
                        $this->nombre,
                        $this->contrasenia,
                        $this->correo,);
            
                  $command->execute();

                  if ($command->error!=""){
                    //$mensaje= "Error ---> ".$command->error;
                    return false;

                  } else {

                    //$mensaje= "Registrado";
                    return true;
                    
                  }

            mysqli_stmt_close($command);
            $conn->close();
        }


        public function getJsonObject(){

            return json_encode(
                array(
                        'num'=>$this->num,                            
                        'nombre'=>$this->nombre,
                        'contrasenia'=>$this->contrasenia,
                        'correo'=>$this->correo,
                        'tipo'=>$this->tipo
                     )
            );
        }


    }

?>