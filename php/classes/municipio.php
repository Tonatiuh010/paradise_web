<?php 

require_once("mysql/connection.php");

    abstract class municipio {
        protected $codigo;
        protected $nombre;
    
       public function getCodigo(){return $this->codigo;}
       public function setCodigo($var){$this->codigo=$var;}

       public function getNombre(){return $this->nombre;}
       public function setNombre($var){$this->nombre=$var;}

       
        public function __construct() {
            $args=func_get_args();

               if (func_num_args()==0){
                    $this->codigo='';                            
                    $this->nombre='';                                           
              }

              // Posible constructor para hacer búsqueda.
              if (func_num_args()==1){                    
                    $this->codigo=$args[0];                                       
              }

              if (func_num_args()==2){  
                    $this->codigo=$args[0];                                                     
                    $this->nombre=$args[1];                    
              }           
        }


        public function getJsonObject(){

            return json_encode(
                array('codigo'=>$this->codigo,                            
                    'nombre'=>$this->nombre
                   )
            );
        }

    }
    
    
    
    
?> 