<?php

    require_once("lugar.php");
    require_once("agente.php");
    require_once("cliente.php");
    require_once("reservacion.php");
    require_once("../mysql/connection.php");


    class pre_reservacion extends reservacion{

        private $num;           //int
        private $registro;      //datetime - fecha de registro 
        private $inicio;        //date - fecha del evento
        private $termino;       //date - fecha en la que termina el evento
        private $status;        //varchar
        private $notas;         //varchar

        private $lugar;         //Es un objeto de la clase lugar
        private $cliente;       //Es un objeto de la clase cliente
        private $agente;        //Es un objeto de la clase agente


        public function getNum(){return $this->num;}
        public function setNum($var){$this->num=$var;}

        public function getRegistro(){return $this->registro;}
        public function setRegistro($var){$this->registro=$var;}

        public function getInicio(){return $this->inicio;}
        public function setInicio($var){$this->inicio=$var;}

        public function getTermino(){return $this->termino;}
        public function setTermino($var){$this->termino=$var;}

        public function getStatus(){return $this->status;}
        public function setStatus($var){$this->status=$var;}

        public function getNotas(){return $this->notas;}
        public function setNotas($var){$this->notas=$var;}

        public function getLugar(){return $this->lugar;}
        public function setLugar($var){$this->lugar=$var;}

        public function getCliente(){return $this->cliente;}
        public function setCliente($var){$this->cliente=$var;}

        public function getAgente(){return $this->agente;}
        public function setAgente($var){$this->agente=$var;}

            public function __construct() {
                    $args=func_get_args();

                       if (func_num_args()==0){
                            $this->num=0;                            
                            $this->registro='';
                            $this->inicio='';
                            $this->termino='';
                            $this->status=''; 
                            $this->notas='';

                            $this->lugar= new lugar();
                            $this->cliente= new cliente();
                            $this->agente= new agente();

                            parent::__construct();                           
                      }
                  
                      if (func_num_args()==13){
                            $this->num=$args[0];                            
                            $this->registro=$args[1];
                            $this->inicio=$args[2];
                            $this->termino=$args[3];
                            $this->status=$args[4]; 
                            $this->notas=$args[5];
                            $this->lugar=$args[6];
                            $this->cliente=$args[7];
                            $this->agente=$args[8];
                            parent::__construct($args[9],$args[10],$args[11],$args[12]);       
                      }   

                      // Posible constructor para hacer búsqueda.
                      if (func_num_args()==1){                    
                            $this->nombre=$args[0];                                       
                      }        
                }


        public function getAllPreReservaciones($p){
            $sql="select * from vw_reservacion_completa where cliente= ?;";  
            $conn=mysqlConnection::getConnection();
              $command=$conn->prepare($sql);
              $command->bind_param('i',$p);
              $command->bind_result($num,             //Generamos nuevas variables que nos
                                    $registro,                //almacenen los resultados obtenidos 
                                    $inicio,               //desde la base de datos
                                    $termino,               //NOTA: Las variables deben ir acomodadas
                                    $estado,            //según el orden en el que estan en la BD
                                    $notas,                  //en este caso, el orden de los campos en la vista o consulta
                                    $lugar,
                                    $cliente,
                                    $agente,
                                    $confirmacion,        
                                    $dias,
                                    $total);


              $command->execute();

              $list=array();
              while ($command->fetch()){
                $this->num=$num;                            
                $this->registro=$registro;
                $this->inicio=$inicio;
                $this->termino=$termino;
                $this->status=$estado; 
                $this->notas=$notas;

                if($lugar==null){
                    $this->lugar=new lugar();
                }else{
                    $this->lugar=new lugar($lugar);
                }
                
                if($cliente==null){
                    $this->cliente=new cliente();
                }else{
                    $this->cliente=new cliente($cliente);
                }
                
                if($agente==null){
                    $this->agente=new agente();
                }else{
                    $this->agente=new agente($agente);
                }
                
                parent:: setNum($num);
                parent:: setConfirmada($confirmacion);
                parent:: setDias($dias);
                parent:: setTotal($total);


                array_push($list,json_decode(self::getJsonObject()));
                }
                mysqli_stmt_close($command);
                $conn->close(); 
                return json_encode($list);
        }


        public function getJsonObject(){
            return json_encode(
                array(  "num"=>$this->num,
                        "registro"=>$this->registro,
                        "inicio" =>$this->inicio,
                        "termino"=>$this->termino,
                        "status"=>$this->status,
                        "notas"=>$this->notas,
                        "lugar"=> json_decode($this->lugar->getJsonObject()),
                        "cliente"=> json_decode($this->cliente->getJsonObject()),
                        "agente"=> json_decode($this->agente->getJsonObject()),
                        'reservacion'=>json_decode(parent::getJsonObject()))
                      
            );                
        }

    }

?>