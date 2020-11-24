<?php

require_once("../mysql/connection.php");
require_once("usuario.php");
require_once("agTelefono.php");

    class agente extends usuario{
    
        private $matricula;     //char(7)
        private $nombre;        //varchar
        private $paterno;       //varchar
        private $materno;       //varchar
        private $nacimiento;    //date
        private $edad;          //int
        private $genero;        //varchar
        
        private $telefono;      //char(10)

        public function getMatricula(){return $this->matricula;}
        public function setMatricula($var){$this->matricula=$var;}

        public function getNombre(){return $this->nombre;}
        public function setNombre($var){$this->nombre=$var;}

        public function getPaterno(){return $this->paterno;}
        public function setPaterno($var){$this->paterno=$var;}

        public function getMaterno(){return $this->materno;}
        public function setMaterno($var){$this->materno=$var;}

        public function getNacimiento(){return $this->nacimiento;}
        public function setNacimiento($var){$this->nacimiento=$var;}

        public function getEdad(){return $this->edad;}
        public function setEdad($var){$this->edad=$var;}

        public function getGenero(){return $this->genero;}
        public function setGenero($var){$this->genero=$var;}

        //telefono
        public function getTelefono(){return $this->telefono;}
        public function setTelefono($var){$this->telefono=$var;}


            public function __construct() {
                $args=func_get_args();

                   if (func_num_args()==0){
                        $this->matricula='';                            
                        $this->nombre='';
                        $this->paterno='';
                        $this->materno='';
                        $this->nacimiento=''; 
                        $this->edad=0;
                        $this->genero='';
                        $this->telefono= new agTelefono();      //Creo una nueva instancia.
                        parent::__construct();
                  }
                  
                  if (func_num_args()==13){
                        $this->matricula=$args[0];                            
                        $this->nombre=$args[1];
                        $this->paterno=$args[2];
                        $this->materno=$args[3];
                        $this->nacimiento=$args[4]; 
                        $this->edad=$args[5];
                        $this->genero=$args[6];
                        $this->telefono=$args[7];
                        parent::__construct($args[8],$args[9],$args[10],$args[11],$args[12]);       
                  }

                  if (func_num_args()==9){                           
                        $this->nombre=$args[0];
                        $this->paterno=$args[1];
                        $this->materno=$args[2];
                        $this->nacimiento=$args[3];
                        $this->genero=$args[4]; 
                        $this->telefono=$args[5];
                        parent::__construct($args[6],$args[7],$args[8]);       
                  }        

                  // Posible constructor para hacer búsqueda.
                  if (func_num_args()==1){                    
                      $sql="select * from VW_agente_admin where matricula= ?;";

                      $conn=mysqlConnection::getConnection();
                      $command=$conn->prepare($sql);
                      $command->bind_param('s',$args[0]);
                      $command->bind_result($matricula,             
                                        $nombre,                 
                                        $paterno,               
                                        $materno,               
                                        $nacimiento,            
                                        $edad,                  
                                        $genero,
                                        $num,
                                        $usuario,
                                        $contrasenia,
                                        $correo,        
                                        $tipo);


                      $command->execute();

                      $list=array();
                      while ($command->fetch()){
                        $this->matricula=$matricula;                            
                        $this->nombre=$nombre;
                        $this->paterno=$paterno;
                        $this->materno=$materno;
                        $this->nacimiento=$nacimiento; 
                        $this->edad=$edad;
                        $this->genero=$genero;
                        $this->telefono=new agTelefono();

                        parent:: setNum($num);
                        parent:: setNombre($usuario);
                        parent:: setContrasenia($contrasenia);
                        parent:: setCorreo($correo);
                        parent:: setTipo($tipo);

                        array_push($list,json_decode(self::getJsonObject()));
                        }
                        mysqli_stmt_close($command);
                        $conn->close();                           
                  }        
            }


        public function getAllAgentes($a){
            $sql="select * from VW_agente_admin where nombre like ?;";  
            $conn=mysqlConnection::getConnection();
				$a2=$a.'%';
              $command=$conn->prepare($sql);
              $command->bind_param('s',$a2);
              $command->bind_result($matricula,             //Generamos nuevas variables que nos
                                    $nombre,                //almacenen los resultados obtenidos 
                                    $paterno,               //desde la base de datos
                                    $materno,               //NOTA: Las variables deben ir acomodadas
                                    $nacimiento,            //según el orden en el que estan en la BD
                                    $edad,                  //en este caso, el orden de los campos en la vista o consulta
                                    $genero,
                                    $num,
                                    $usuario,
                                    $contrasenia,
                                    $correo,        
                                    $tipo);


              $command->execute();

              $list=array();
              while ($command->fetch()){
                $this->matricula=$matricula;                            
                $this->nombre=$nombre;
                $this->paterno=$paterno;
                $this->materno=$materno;
                $this->nacimiento=$nacimiento; 
                $this->edad=$edad;
                $this->genero=$genero;
                $this->telefono=new agTelefono();

                parent:: setNum($num);
                parent:: setNombre($usuario);
                parent:: setContrasenia($contrasenia);
                parent:: setCorreo($correo);
                parent:: setTipo($tipo);

                array_push($list,json_decode(self::getJsonObject()));
                }
                mysqli_stmt_close($command);
                $conn->close(); 
                return json_encode($list);
        }

        public function insertarAgente(){
            $conn=mysqlConnection::getConnection();
            $verificar= parent:: insertUserAgente();
            $correo= parent:: getCorreo();

            if($verificar==false){
                return json_encode(array("res"=>false, "error"=>'Cuenta de usuario ya existe verifique su nombre de usuario o su correo'));
            }else{
                  
                $tel=$this->telefono;
                //echo $tel;
                //echo $correo;

                if($tel==''){
                    $sql="call SP_insert_agente (?,?,?,?,?,?,null);";//SQL Sentence
                    $command=$conn->prepare($sql);
                    $command->bind_param('ssssss',
                            $this->nombre,
                            $this->paterno,
                            $this->materno,
                            $this->nacimiento,
                            $this->genero,
                            $correo);
            
                      $command->execute();

                      if ($command->error!=""){
                        return json_encode(array("res"=>false, "error"=>$command->error));                    
                      } else {

                        return json_encode(array("res"=>true));
                      }
                    
                }else{
                    $sql="call SP_insert_agente (?,?,?,?,?,?,?);";//SQL Sentence
                    $command=$conn->prepare($sql);

                    $command->bind_param('sssssss',
                            $this->nombre,
                            $this->paterno,
                            $this->materno,
                            $this->nacimiento,
                            $this->genero,
                            $correo,
                            $this->telefono
                            );
            
                        $command->execute();

                      if ($command->error!=""){
                        return json_encode(array("res"=>false, "error"=>$command->error));                    
                      } else {
                        return json_encode(array("res"=>true));
                      }
                
			  }

                  
			}
		}

        public function getJsonObject(){

            return json_encode(
                array
                (
                    'matricula'=>$this->matricula,                            
                    'nombre'=>$this->nombre,
                    'paterno'=>$this->paterno,
                    'materno'=>$this->materno,
                    'nacimiento'=>$this->nacimiento,
                    'genero'=>$this->genero,
                    'edad'=>$this->edad,
                    'telefono'=>json_decode($this->telefono->getAgTelefonos($this->matricula)),
                    'usuario'=>json_decode(parent::getJsonObject()))
                );
        }

    }




?>