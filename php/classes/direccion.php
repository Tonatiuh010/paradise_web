<?php 

require_once("mysql/connection.php");
require_once("municipio.php");

    class direccion extends municipio {
        private $num;
        private $calle;
        private $numInterior;
        private $numExterior;
        private $CP;
        

        
       public function getNum(){return $this->num;}
       public function setNum($var){$this->num=$var;}

       public function getCalle(){return $this->calle;}
       public function setCalle($var){$this->calle=$var;}

       public function getNI(){return $this->numInterior;}
       public function setNI($var){$this->numInterior=$var;}

       public function getNE(){return $this->numExterior;}
       public function setNE($var){$this->numExterior=$var;}

       public function getCP(){return $this->CP;}
       public function setCP($var){$this->CP=$var;}

        public function __construct() {
            $args=func_get_args();

               if (func_num_args()==0){
                    $this->num=0;                            
                    $this->calle='';
                    $this->numInterior='';
                    $this->numExterior='';
                    $this->CP=''; 
                    parent::__construct();                           
              }

              // Posible constructor para hacer búsqueda.
              if (func_num_args()==1){                    
                    $this->nombre=$args[0];                                       
              }

              if (func_num_args()==7){  
                    $this->num=$args[0];                                                     
                    $this->calle=$args[1];
                    $this->numInterior=$args[2];
                    $this->numExterior=$args[3];
                    $this->CP=$args[4];
                    parent::__construct($args[5],$args[6]);       
              }           
        }


        public function getJsonObject(){

            return json_encode(
                array('num'=>$this->num,                            
                    'calle'=>$this->calle,
                    'NI'=>$this->numInterior,
                    'NE'=>$this->numExterior,
                    'CP'=>$this->CP,
                    'municipio'=>json_decode(parent::getJsonObject()))
            );
        }

    }
    
    
    
    
?> 