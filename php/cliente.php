<?php

require_once("mysql/connection.php");
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

                  // Posible constructor para hacer búsqueda.
                  if (func_num_args()==1){                    
                        $this->nombre=$args[0];                                       
                  }        
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