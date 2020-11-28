<?php class mysqlConnection {

        public static function getConnection(){
               $data=file_get_contents(__DIR__.'/../config/json.json');    

               $var='{ "mysqlCrendentials" : { "server" : "localhost", "user" : "root", "pass" : "", "db" : "paradise" } }';                              
               //$var='{ "mysqlCrendentials" : { "server" : "localhost", "user" : "root", "pass" : "losseisbastardos12", "db" : "paradise" } }';

               $config=json_decode($var,true);

               if (isset($config['mysqlCrendentials'])){ 

                        $credentials =$config['mysqlCrendentials'];        

                        if (isset($credentials['server'])){
                            $server=$credentials['server'];
                        } else {
                            echo 'Error: Servidor no encontrado';
                            die;
                        }

                        if (isset($credentials['user'])){
                            $user=$credentials['user'];
                        } else {
                            echo 'Error: Usuario no encontrado';
                            die;
                        }

                        if (isset($credentials['pass'])){
                            $pass=$credentials['pass'];
                        } else {
                            echo 'Error: Contraseña inválida';
                            die;
                        }

                        if (isset($credentials['db'])){
                            $db=$credentials['db'];
                        } else {
                            echo 'Error: Base de datos errónea.';
                            die;
                        }

                        $conn= mysqli_connect($server,$user,$pass,$db);

                        if ($conn===false){

                            echo "Error de conexión.";
                            die;
                        } 
                         
                        $conn->set_charset('utf8');

                         return $conn;
                } else {
                    echo "Credenciales no encontradas";
                    die;
                }
            
        }
            
    }


    
?>
