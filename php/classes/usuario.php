<?php

require_once("imagenes.php");

    abstract class usuario{
    
        private $num;           //int
        private $nombre;        //varchar     
        private $contrasenia;   //varchar
        private $correo;        //varchar
        private $tipo;          //varchar
        
        private $imagen;

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

         public function getImagen(){return $this->imagen;}
        public function setImagen($var){$this->imagen=$var;}


            public function __construct(){
               $args=func_get_args();

               if (func_num_args()==0){
                    $this->num=0;                            
                    $this->nombre='';
                    $this->contrasenia='';  
                    $this->correo='';    
                    $this->tipo='';      

                    $this->imagen=new imagenes();           
              }

              if (func_num_args()==5){  
                    $this->num=$args[0];                            
                    $this->nombre=$args[1];
                    $this->contrasenia=$args[2];  
                    $this->correo=$args[3];    
                    $this->tipo=$args[4];      
                    $this->imagen=new imagenes();                      
              }
            
              if (func_num_args()==3){                             
                    $this->nombre=$args[0];
                    $this->contrasenia=$args[1];  
                    $this->correo=$args[2];                             
                    $this->imagen=new imagenes();  
              }         

              // Posible constructor para hacer búsqueda.
              if (func_num_args()==1){                    
                    $this->codigo=$args[0];         
                    $this->imagen=new imagenes();                                
              }
  
            }

        public function insertUserCli(){
            $conn=mysqlConnection::getConnection();

            $conn->query("set @num=0;");

            if($this->nombre!=''){
                $sql="call SP_insert_userCli (@num,?,?,?);";//SQL Sentence
                $command=$conn->prepare($sql);
                  

                  $command->bind_param('sss',
                        $this->nombre,
                        $this->contrasenia,
                        $this->correo);
            
                  $command->execute();
            }else{
                 $sql="call SP_insert_userCli (@num,null,?,?);";//SQL Sentence
                 $command=$conn->prepare($sql);                  

                  $command->bind_param('ss',
                        $this->contrasenia,
                        $this->correo);
            
                  $command->execute();
            }


                  if ($command->error!=""){
                    //$mensaje= "Error ---> ".$command->error;
                    return false;

                  } else {
                    
                    $resNum=$conn->query("select @num as num;");    
                    $numUs=$resNum->fetch_assoc();   

                     $baseDirec="../../img/usuario";
                     if (!mkdir($baseDirec.'/'.$numUs['num'],0777,true)){
                        return false;                             
                     }     else {
                        return true;
                    }                                        
                  }

            mysqli_stmt_close($command);
            $conn->close();
        }

        public function insertUserAgente(){
            $conn=mysqlConnection::getConnection();

            $conn->query("set @num=0;");

            $sql="call SP_insert_userAg (@num,?,?,?);";//SQL Sentence
            $command=$conn->prepare($sql);
            
             

                  $command->bind_param('sss',
                        $this->nombre,
                        $this->contrasenia,
                        $this->correo);
            
                  $command->execute();

                  if ($command->error!=""){
                    //$mensaje= "Error ---> ".$command->error;
                    return false;

                  } else {
                   $resNum=$conn->query("select @num as num;");    
                    $numUs=$resNum->fetch_assoc(); 
                    //$mensaje= "Registrado";
                    $baseDirec="../../img/usuario";
                     if (!mkdir($baseDirec.'/'.$numUs['num'],0777,true)){
                        return false;                             
                        }     else {
                        return true;
                     }
                    
                  }

            mysqli_stmt_close($command);
            $conn->close();
        }

        public function deleteUserCli($c){
            $conn=mysqlConnection::getConnection();
            $sql="call sp_delete_perfilCli(?);";//SQL Sentence
            $command=$conn->prepare($sql);
                  

                  $command->bind_param('i',$c);     //se recibe el número de cliente que a su vez, en el procedimiento almacenado
                                                    //va a encontrar el numero de usuario para poderlo eliminar
                                                    //como es eliminacion por cascada, automaticamente borra al usuario y al cliente
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
                        'tipo'=>$this->tipo,
                        'imagen'=>json_decode($this->imagen->getAllImagenesByUser($this->num))
                     )
            );
        }


    }

?>