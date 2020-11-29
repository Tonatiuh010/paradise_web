<?php

require_once("../mysql/connection.php");
require_once("usuario.php");

    class cliente extends usuario{
    
        private $num;           //int
        private $nombre;        //varchar
        private $paterno;       //varchar
        private $materno;       //varchar
        private $nacimiento;    //date
        private $edad;          //int
        private $telefono;      //char(10)
        

        public function getNum(){return $this->num;}
        public function setNum($var){$this->num=$var;}

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

        public function getTelefono(){return $this->telefono;}
        public function setTelefono($var){$this->telefono=$var;}


            public function __construct() {
                $args=func_get_args();

                   if (func_num_args()==0){
                        $this->num=0;                            
                        $this->nombre='';
                        $this->paterno='';
                        $this->materno='';
                        $this->nacimiento=''; 
                        $this->edad=0;
                        $this->telefono='';
                        parent::__construct();                           
                  }
                  
                  if (func_num_args()==12){
                        $this->num=$args[0];                            
                        $this->nombre=$args[1];
                        $this->paterno=$args[2];
                        $this->materno=$args[3];
                        $this->nacimiento=$args[4]; 
                        $this->edad=$args[5];
                        $this->telefono=$args[6];
                        parent::__construct($args[7],$args[8],$args[9],$args[10],$args[11]);       
                  }   

                  if (func_num_args()==8){                           
                        $this->nombre=$args[0];
                        $this->paterno=$args[1];
                        $this->materno=$args[2];
                        $this->nacimiento=$args[3]; 
                        $this->telefono=$args[4];
                        parent::__construct($args[5],$args[6],$args[7]);       
                  }   

                  // Posible constructor para hacer búsqueda.
                  if (func_num_args()==1){                    
                      $sql="select * from vw_cliente_perfil where num= ?;";

                      $conn=mysqlConnection::getConnection();

                        parent::__construct();

                      $command=$conn->prepare($sql);
                      $command->bind_param('i',$args[0]);
                      $command->bind_result($num,                   //Generamos nuevas variables que nos
                                    $nombre,                //almacenen los resultados obtenidos 
                                    $paterno,               //desde la base de datos
                                    $materno,               //NOTA: Las variables deben ir acomodadas
                                    $nacimiento,            //según el orden en el que estan en la BD
                                    $edad,                  //en este caso, el orden de los campos en la vista o consulta
                                    $telefono,
                                    $num_us,
                                    $usuario,
                                    $contrasenia,
                                    $correo,        
                                    $tipo);

                        $command->execute();

                          $list=array();
                          while ($command->fetch()){
                            $this->num=$num;                            
                            $this->nombre=$nombre;
                            $this->paterno=$paterno;
                            $this->materno=$materno;
                            $this->nacimiento=$nacimiento; 
                            $this->edad=$edad;

                            parent:: setNum($num_us);
                            parent:: setNombre($usuario);
                            parent:: setContrasenia($contrasenia);
                            parent:: setCorreo($correo);
                            parent:: setTipo($tipo);

                            array_push($list,json_decode(self::getJsonObject()));
                            }
                            mysqli_stmt_close($command);
                            $conn->close();                     
                  }

                    if (func_num_args()==2){                    
                      $sql="select * from vw_cliente_perfil where nombre=? and email=?;";

                      $conn=mysqlConnection::getConnection();
                      $command=$conn->prepare($sql);
                      $command->bind_param('ss',$args[0],$args[1]);
                      $command->bind_result($num,                   //Generamos nuevas variables que nos
                                    $nombre,                //almacenen los resultados obtenidos 
                                    $paterno,               //desde la base de datos
                                    $materno,               //NOTA: Las variables deben ir acomodadas
                                    $nacimiento,            //según el orden en el que estan en la BD
                                    $edad,                  //en este caso, el orden de los campos en la vista o consulta
                                    $telefono,
                                    $num_us,
                                    $usuario,
                                    $contrasenia,
                                    $correo,        
                                    $tipo);

                        $command->execute();

                          $list=array();
                          while ($command->fetch()){
                            $this->num=$num;                            
                            $this->nombre=$nombre;
                            $this->paterno=$paterno;
                            $this->materno=$materno;
                            $this->nacimiento=$nacimiento; 
                            $this->edad=$edad;

                            parent:: setNum($num_us);
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

        public function getAllClientes($n){                 //Esta función la requiero para mostrarle al cliente sus propios datos
            $sql="select * from vw_cliente_perfil where nombre like ?;";  
            $conn=mysqlConnection::getConnection();
            $var=$n.'%';
              $command=$conn->prepare($sql);
              $command->bind_param('s',$var);
              $command->bind_result($num,                   //Generamos nuevas variables que nos
                                    $nombre,                //almacenen los resultados obtenidos 
                                    $paterno,               //desde la base de datos
                                    $materno,               //NOTA: Las variables deben ir acomodadas
                                    $nacimiento,            //según el orden en el que estan en la BD
                                    $edad,                  //en este caso, el orden de los campos en la vista o consulta
                                    $telefono,
                                    $num_us,
                                    $usuario,
                                    $contrasenia,
                                    $correo,        
                                    $tipo);

            $command->execute();

              $list=array();
              while ($command->fetch()){
                $this->num=$num;                            
                $this->nombre=$nombre;
                $this->paterno=$paterno;
                $this->materno=$materno;
                $this->nacimiento=$nacimiento; 
                $this->edad=$edad;
                $this->telefono=$telefono;

                parent:: setNum($num_us);
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

        public function insertarCli(){
            $conn=mysqlConnection::getConnection();
            $verificar= parent:: insertUserCli();
            $correo= parent:: getCorreo();

            if($verificar==false){
                echo 'Cuenta de usuario ya existe verifique su nombre de usuario o su correo';
            }else{
                $sql="call SP_insert_cliente (?,?,?,?,?,?);";//SQL Sentence
                $command=$conn->prepare($sql);
                  
                

                  $command->bind_param('ssssss',
                        $this->nombre,
                        $this->paterno,
                        $this->materno,
                        $this->nacimiento,
                        $this->telefono,
                        $correo);

            
                  $command->execute();

                  if ($command->error!=""){
                    return "Error ---> ".$command->error;
                    

                  } else {




                    //return "Registrado";

                    return "Registrado Exitosamente";

                   
                    
                  }
            }

            mysqli_stmt_close($command);
		    $conn->close();
        }

        public function updateCliente($id,$tel,$name,$pwd){
            
            $conn=mysqlConnection::getConnection();

            //call sp_update_perfilCli(id,number_case,cambio);
            //case 1= nombre de usuario
            //case 2= contraseña
            //case 3= telefono

            $case;
            $cambio;

            if($name!=''){$case=1; $cambio=$name;}
            if($pwd!=''){$case=2; $cambio=$pwd;}
            if($tel!=''){$case=3; $cambio=$tel;}

            $sql="call sp_update_perfilCli (?,?,?);";//SQL Sentence
            $command=$conn->prepare($sql);
                  
                $command->bind_param('iss',$id,$case,$cambio);

                $command->execute();

                if ($command->error!=""){
                return $command->error;
                    

                } else {

                return "Cambios realizados";
                   
                    
                }

            

            mysqli_stmt_close($command);
            $conn->close();

        }

        public function deleteCliente($c){
            $conn=mysqlConnection::getConnection();
            $verificar= parent::deleteUserCli($c);

            if($verificar==true){
                return true;
            }else{
                return false;
            }

            //mysqli_stmt_close($command);
            $conn->close();
        }

        public function getJsonObject(){

            return json_encode(
                array
                (
                    'num'=>$this->num,                            
                    'nombre'=>$this->nombre,
                    'paterno'=>$this->paterno,
                    'materno'=>$this->materno,
                    'nacimiento'=>$this->nacimiento,
                    'edad'=>$this->edad,
                    'telefono'=>$this->telefono,
                    'usuario'=>json_decode(parent::getJsonObject()))
                );
        }

    }


?>