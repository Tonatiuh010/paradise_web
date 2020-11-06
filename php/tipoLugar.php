<?php
    require_once("mysql/connection.php");

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


        public function getJsonObject(){

            return json_encode(
                array('num'=>$this->num,
                      'nombre'=>$this->nombre)
            );
            
            

        }




    }
    
    
    
    
?> 