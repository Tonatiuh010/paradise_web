<?php

require_once("../mysql/connection.php");

    abstract class reservacion{
        
        private $num;                //Int se encuentra conectado con la pre_reservacion
        private $confirmada;         //Date fecha en la ue se confirmo la pre_reservación
        private $dias;               //Int el total de días del evento
        private $total;              //Decimal el total a pagar por la reservación

        public function getNum(){return $this->num;}
        public function setNum($var){$this->num=$var;}

        public function getConfirmada(){return $this->confirmada;}
        public function setConfirmada($var){$this->confirmada=$var;}

        public function getDias(){return $this->dias;}
        public function setDias($var){$this->dias=$var;}

        public function getTotal(){return $this->total;}
        public function setTotal($var){$this->total=$var;}

            public function __construct() {
                    $args=func_get_args();

                       if (func_num_args()==0){
                            $this->num=0;
                            $this->confirmada='';                            
                            $this->dias=0;
                            $this->total=0;
                        
                      }
                  
                      if (func_num_args()==4){
                            $this->num=$args[0];
                            $this->confirmada=$args[1];                            
                            $this->dias=$args[2];
                            $this->total=$args[3];       
                      }   

                      //// Posible constructor para hacer búsqueda.
                      //if (func_num_args()==1){                    
                      //      $this->nombre=$args[0];                                       
                      //}        
            }

        public function getJsonObject(){

            return json_encode(
                array
                (
                    'num'=>$this->num,
                    'confirmada'=>$this->confirmada,                            
                    'dias'=>$this->dias,
                    'total'=>$this->total)
                );
        }
    }

?>