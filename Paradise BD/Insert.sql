insert into municipio values ('ESE','Ensenada'),('MXL','Mexicali'),('TIJ','Tijuana'),('ROS','Rosarito'),('TEC','Tecate');

insert into espacio(espNombre) values
('Hotel'),('Kiosco'),('Salón'),('Pista de baile'),('Estacionamiento'),('Cocina para catering'),('Terraza'),('Jardín'),('Carpa'),('Piscina'),('Jacuzzi');

insert into tipoLugar(tlNombre) values
('Salón'),('Hacienda'),('Restaurante'),('Centro nocturno'),('Jardín'),('Quinta'),('Playa');


call SP_insert_userAg (@num,'user1','St@rt123','iabarcae@yahoo.es');
call SP_insert_userAg (@num,'admin','P@ssw0rd','maeillanes@hotmail.com');
call SP_insert_userAg (@num,'alex','bl4ck4ndwhite','osabarca@hotmail.com'); 
call SP_insert_userAg (@num,'pos','administrator','cabrigo@garmendia.cl'); 
call SP_insert_userAg (@num,'demo','.......','Sb.nashxo.sk8@hotmail.com'); 
call SP_insert_userAg (@num,'sql','123456','fran.afull@live.cl'); 
call SP_insert_userAg (@num,null,'654321','carlosaguileram@hotmail.com'); 	 
call SP_insert_userAg (@num,null,'password','ikis_rojo@hotmail.com'); 


/*call SP_insert_userAg (@num,null,'constraseña','daniela_aguilera_m500@hotmail.com'); 
call SP_insert_userAg (@num,null,'Juana','vizkala@hotmail.com');	 
call SP_insert_userAg (@num,null,'123456','alexus3@hotmail.com');	
call SP_insert_userAg (@num,null,'654321','capitanaguilera@hotmail.com');	 
call SP_insert_userAg (@num,null,'098765','apalamosg@hotmail.com');	 
call SP_insert_userAg (@num,null,'567890','niikhox__@hotmail.com');
call SP_insert_userAg (@num,null,'345678','luuuuuuci@hotmail.com'); 
call SP_insert_userAg (@num,null,'876543','kristian_siempre_azul@hotmail.com');*/


call SP_insert_agente ('ANA CAROLINA','LOPEZ','MARTINEZ', '2000-12-23','Femenino','iabarcae@yahoo.es',null);
call SP_insert_agente ('MANUEL','MENDEZ','HERNANDEZ','1990-08-03','Masculino','maeillanes@hotmail.com','6646211878');
call SP_insert_agente ('MARCO ANTONIO','RAMIREZ','LOZANO','1980-01-12','Masculino','osabarca@hotmail.com',null);
call SP_insert_agente ('JORGE','CARRILLO','MARTINEZ','1990-08-05','Masculino','cabrigo@garmendia.cl','6646099823');
call SP_insert_agente ('JOHANA VANESSA','MAR','SANCHEZ','1989-07-21','Femenino','Sb.nashxo.sk8@hotmail.com',null);
call SP_insert_agente ('JESUS ENRIQUE','VAZQUEZ','MARIN','2000-12-23','Masculino','fran.afull@live.cl','6646075408');
call SP_insert_agente ('GINA ELIZABETH','LISZT','CORDOBA','1995-10-03','Femenino','carlosaguileram@hotmail.com',null);
call SP_insert_agente ('PAOLA','MARTINEZ','LARA','1980-01-12','Femenino','ikis_rojo@hotmail.com','6641045520');

/*call SP_insert_agente ('MARTHA','CHAVEZ','OCHOA','1989-07-21','Femenino','daniela_aguilera_m500@hotmail.com',null);
call SP_insert_agente ('JOSE ALFONSO','PEREZ','CANTO','1990-08-05','Masculino','vizkala@hotmail.com','6646345289');
call SP_insert_agente ('FELIPE','LOPEZ','CHAVIRA','1999-07-21','Masculino','alexus3@hotmail.com','6646882150');
call SP_insert_agente ('VERONICA','FERNANDEZ','ZAMUDIO','2000-12-23','Femenino','capitanaguilera@hotmail.com',null);
call SP_insert_agente ('SANDRA','GARCIA','BUSTAMANTE','1989-07-21','Femenino','apalamosg@hotmail.com','6646231359');
call SP_insert_agente ('JUAN CARLOS','JARAMILLO','VAZQUEZ','1980-01-12','Masculino','niikhox__@hotmail.com','6649060024');
call SP_insert_agente ('VICTOR ALFONSO','CALDERON','TURRUBIATES','1990-08-05','Masculino','luuuuuuci@hotmail.com','6646834654');
call SP_insert_agente ('MARTHA ALICIA','LEON','CARREÑO','1995-10-03','Femenino','kristian_siempre_azul@hotmail.com',null);*/


call SP_insert_userCli (@num,null,'123456','m.altamiro@gmail.com');
call SP_insert_userCli (@num,'zuleima05','654321','zuleima@hotmail.com');
call SP_insert_userCli (@num,'marisolS','098765','marisolSP@gmail.com');
call SP_insert_userCli (@num,'Mgonzales','contrasenia','gonzalesMR@hotmail.com');
call SP_insert_userCli (@num,null,'password','guadalupe@hotmail.com');
call SP_insert_userCli (@num,'Arely15','arely','arelyY@outlook.com');
call SP_insert_userCli (@num,'juan_espinoza','correo','juan.ER@gmail.com');
call SP_insert_userCli (@num,null,'salome','salome@gmail.com');
call SP_insert_userCli (@num,'solis_emma','pelicula','emmaPSR@outlook.com');
call SP_insert_userCli (@num,'daniel01','basura','daniel@outlook.com');
call SP_insert_userCli (@num,null,'guadalupe','mariaGMc@gmail.com');



call SP_insert_cliente ('MARTINA','ALTAMIRANO','CALDERON','1999-10-05','6647733123','m.altamiro@gmail.com');             
call SP_insert_cliente ('ZULEIMA GABRIELA','ORDOÑES','ALANIS','2000-11-12','6641234567','zuleima@hotmail.com');         
call SP_insert_cliente ('MARISOL','SANCHEZ','PEREZ','1980-01-15','6650099724','marisolSP@gmail.com');                   
call SP_insert_cliente ('MAGDALENA','GONZALEZ','RODRIGUEZ','1990-05-20',null,'gonzalesMR@hotmail.com');                    
call SP_insert_cliente ('GUADALUPE','RODRIGUEZ','BARTOLO','1990-05-20',null,'guadalupe@hotmail.com');                     
call SP_insert_cliente ('YULETH ARELY','ORTIZ','RODRIGUEZ','1999-10-05','6647733553','arelyY@outlook.com');            
call SP_insert_cliente ('JUAN','ESPINOZA','RODRIGUEZ','2000-11-12','6649933123','juan.ER@gmail.com');                 
call SP_insert_cliente ('SALOME','RIVERA','VAZQUEZ','1980-01-15','6650011724','salome@gmail.com');                   
call SP_insert_cliente ('EMMA PAULA','SOLIS','RAMIREZ','1990-05-20',null,'emmaPSR@outlook.com');                        
call SP_insert_cliente ('DANIEL','TINAJERO','TRISTAN','1980-01-15','6647733133','daniel@outlook.com');                 
call SP_insert_cliente ('MARIA GUADALUPE','MORENO','CASTILLO','2000-11-12','6651199724','mariaGMc@gmail.com');         

call SP_insert_lugar (@numLug,'Salón Toscano',
'Se trata de un cómodo y cálido lugar en el que podrán compartir con sus familiares y 
allegados. Allí les brindarán los servicios necesarios para que el evento sea 
perfecto y para que no tengan que preocuparse por nada. Salón Toscano cuenta con 
una capacidad para 70 personas, en sus instalaciones podrán hacer el montaje que 
deseen y desarrollar como mejor les parezca la celebración de su evento. 
El lugar dispone de Estacionamientos y vigilancia privada durante todo su evento.',
2500.00,70,1,'Matamoros','7545','5','22245','TIJ');

call SP_insert_lugar (@numLug,'Salón Casa Blanca',
'Un hermoso salón finamente decorado y con unas instalaciones de alta calidad que ahora les 
abre sus puertas para que puedan celebrar su evento y que salga perfecto. Las instalaciones 
de este salón son de excelente calidad y están muy bien acondicionadas para albergar toda 
clase de eventos sociales. Elegir este salón será un paso hacia el éxito seguro de su enlace. 
Gracias a su gran extensión el Salón Casa Blanca puede albergar eventos de 100 hasta 500 
personas garantizando el confort en todo momento.',
3500.00,500,1,'Juarez','40',null,'22289','ESE');

call SP_insert_lugar (@numLug,'Belio Restaurante',
'Belio Restaurante es un lugar mágico para que ustedes celebren con el mar de fondo. La suave 
brisa marítima será una invitada más a la fiesta y les acompañará durante toda la noche, desde 
el atardecer en el mar hasta que salen los primeros rayos del sol después de la fiesta. Además 
del sitio, ustedes van a disfrutar de una auténtica cocina gourmet, ideal para maravillar los 
paladares de sus invitados. Belio Restaurante es un espacio para sentir una atmósfera diferente, 
el lugar cuenta con varios salones, terraza y un balcón que da directamente a la playa. 
Además de la cocina para uso del catering del restaurante.',
30000.00,200,3,'San Gabriel','8567',null,'22255','MXL');

call SP_insert_lugar (@numLug,'Puerto Nuevo',
'Puerto Nuevo Baja, Hotel y Villas es un precioso y exclusivo hotel a la orilla de la playa, 
que cuenta con grandes vistas, el cual tiene la experiencia de ofrecer sus instalaciones y 
servicios para su celebración, convirtiendo su evento en algo único e inolvidable. El resort 
cuenta con 3 salones para eventos, 2 jardines para la ceremonia religiosa o civil, un bar, 
spa y estacionamiento.',60061.00,600,7,'San Marcos','1234','18','22345','ESE');

call SP_insert_lugar (@numLug,'Jardín Maui',
'Por su ambiente encantador y por la elegancia de sus espacios, Jardín Maui es el lugar 
ideal para sus eventos. En estas instalaciones podrán celebrar tanto un enlace al exterior 
como en el interior. Por su parte, el equipo del salón pondrá a su disposición sus variados 
servicios para que su evento resulte exitoso. El compromiso de este lugar unido a sus 
servicios de calidad les garantizará momentos inolvidables.',
19000,200,5,'Av. Londres','1857',null,'22120','ESE');

call SP_insert_lugar (@numLug,'Cocina Rusa Familia Samarin',
'Cocina Rusa Familia Samarin se encuentra en la encantadora ciudad de Ensenada. Es un restaurante 
con carácter, de impresionantes espacios y sabores y un estilo vibrante que cautivará a todos los 
invitados. Se sentirán como en casa, ya que el objetivo del personal del lugar es conseguir su 
máxima satisfacción. Con comodidad podrán recibir varios comensales sin problemas. Tienen varias 
áreas para su fiesta, cada una con un encanto propio que llenará de magia su evento. 
Disfruten de la velada junto a sus seres queridos o amigos en las instalaciones que les ofrecen.',
20000,400,3,null,null,null,null,null);

call SP_insert_lugar (@numLug,'La Casa del Tutuli',
'La Casa del Tutuli es un restaurante que ofrece banquetes para todos sus eventos sociales importantes. 
Los platillos que ofrecen van desde cortes finos hasta puerco a la vuelta y vuelta, con el cual además 
de consentir el paladar de todos sus invitados, los sorprenderán con un atractivo visual. 17 años atendiendo 
banquetes, los señalan como la mejor opción para darle a su evento el auténtico sabor campirano.',
25000,200,3,null,null,null,null,null);

insert into lugEspacio (lg_NumEspacio,lg_NumLugar) values
(2,1),(3,1),(4,1),
(2,2),(3,2),(4,2),(5,2),
(3,3),(4,3),(5,3),(6,3),
(10,4),(7,4),(3,4),(11,4),
(1,5),(11,5),
(4,6),(5,6),(8,6),
(4,7),(6,7);

insert into usuario(usNombre,usContrasenia,usCorreo,usTipoUS) values
('tonatiuh','sandwich','0319125293@miutt.edu.mx','Administrador');

insert into usuario(usNombre,usContrasenia,usCorreo,usTipoUS) values
('Arreola','123456789','0319124849@miutt.edu.mx','Administrador');


/*in fecha_inicial date,
    in fecha_finalizar date,
    in lugar int,
    in cliente int
    
    
    call SP_PRE_RESERVACION_REGISTRO ();
call SP_preReservacion_asignarAgente();
call SP_insertarReservacion();

*/

