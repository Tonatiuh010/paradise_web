use paradise;

insert into genero values ('M', 'Masculino'),('F','Femenino');

insert into tipo_us values ('CLI','Cliente'),('ADM','Administrador'),('AGT','Agente');

insert into municipio values ('ESE','Ensenada'),('MXL','Mexicali'),('TIJ','Tijuana'),('ROS','Rosarito'),('TEC','Tecate');

insert into espacio(espNombre) values
('Salón'),('Pista de baile'),('Estacionamiento'),('Cocina para catering'),('Terraza'),('Jardín'),('Carpa'),('Piscina'),('Jacuzzi');

insert into metodopag(pm_Metodo) values('Efectivo'),('Tarjeta bancaria'),('Paypal'),('Tranferencia bancaria');

insert into tipolugar(tlNombre) values
('Salón'),('Hacienda'),('Restaurante'),('Centro nocturno'),('Jardín'),('Quinta'),('Playa');


########################################### AGENTES ###################################################################
# call SP_insert_agente('Chapis','Pepogi','Ramirez','2000-12-23','F');

call SP_insert_agente ('ANA CAROLINA','LOPEZ','MARTINEZ', '2000-12-23','F',null,null,null,null);
call SP_insert_agente ('MANUEL','MENDEZ','HERNANDEZ','1990-08-03','M',null,null,null,null);
call SP_insert_agente ('MARCO ANTONIO','RAMIREZ','LOZANO','1980-01-12','M',null,null,null,null);
call SP_insert_agente ('JORGE','CARRILLO','MARTINEZ','1990-08-05','M',null,null,null,null);
call SP_insert_agente ('JOHANA VANESSA','MAR','SANCHEZ','1989-07-21','F',null,null,null,null);
call SP_insert_agente ('JESUS ENRIQUE','VAZQUEZ','MARIN','2000-12-23','M',null,null,null,null);
call SP_insert_agente ('GINA ELIZABETH','LISZT','CORDOBA','1995-10-03','F',null,null,null,null);
call SP_insert_agente ('PAOLA','MARTINEZ','LARA','1980-01-12','F',null,null,null,null);
call SP_insert_agente ('MARTHA','CHAVEZ','OCHOA','1989-07-21','F',null,null,null,null);
call SP_insert_agente ('JOSE ALFONSO','PEREZ','CANTO','1990-08-05','M',null,null,null,null);
call SP_insert_agente ('FELIPE','LOPEZ','CHAVIRA','1999-07-21','M',null,null,null,null);
call SP_insert_agente ('VERONICA','FERNANDEZ','ZAMUDIO','2000-12-23','F',null,null,null,null);
call SP_insert_agente ('SANDRA','GARCIA','BUSTAMANTE','1989-07-21','F',null,null,null,null);
call SP_insert_agente ('JUAN CARLOS','JARAMILLO','VAZQUEZ','1980-01-12','M',null,null,null,null);
call SP_insert_agente ('VICTOR ALFONSO','CALDERON','TURRUBIATES','1990-08-05','M',null,null,null,null);
call SP_insert_agente ('MARTHA ALICIA','LEON','CARREÑO','1995-10-03','F',null,null,null,null);
call SP_insert_agente ('RODOLFO','HERNANDEZ','AVILA','1989-07-21','M',null,null,null,null);
call SP_insert_agente ('JULIO CESAR','JUAREZ','BORRAYO','1980-01-12','M',null,null,null,null);
call SP_insert_agente ('JOSE GUADALUPE','LOZANO','VALDEZ','2000-12-23','M',null,null,null,null);
call SP_insert_agente ('MIGUEL ANGEL','MEDINA','DEL TORO','1990-08-05','M',null,null,null,null);
call SP_insert_agente ('ALEJANDRO','GUTIERREZ','PEREZ','1995-10-03','M',null,null,null,null);
call SP_insert_agente ('CARMEN','MIRANDA','ROCHA','2000-12-23','F',null,null,null,null);

select * from agente;

########################################### CLIENTES ###################################################################
# call SP_insert_cliente ('Maria','Peña','Santos','1999-10-05','6657700934','santos_maria','123456','santosM@gmail.com');

call SP_insert_cliente ('MARTINA','ALTAMIRANO','CALDERON','1999-10-05','6647733123',null,'123456','m.altamiro@gmail.com');
call SP_insert_cliente ('ZULEIMA GABRIELA','ORDOÑES','ALANIS','2000-11-12','6641234567','zuleima05','654321','zuleima@hotmail.com');
call SP_insert_cliente ('MARISOL','SANCHEZ','PEREZ','1980-01-15','6650099724','marisolS','098765','marisolSP@gmail.com');
call SP_insert_cliente ('MAGDALENA','GONZALEZ','RODRIGUEZ','1990-05-20',null,'Mgonzales','contrasenia','gonzalesMR@hotmail.com');
call SP_insert_cliente ('GUADALUPE','RODRIGUEZ','BARTOLO','1990-05-20',null,null,'password','guadalupe@hotmail.com');
call SP_insert_cliente ('YULETH ARELY','ORTIZ','RODRIGUEZ','1999-10-05','6647733553','Arely15','arely','arelyY@outlook.com');
call SP_insert_cliente ('JUAN','ESPINOZA','RODRIGUEZ','2000-11-12','6649933123','juan_espinoza','correo','juan.ER@gmail.com');
call SP_insert_cliente ('SALOME','RIVERA','VAZQUEZ','1980-01-15','6650011724',null,'salome','salome@gmail.com');
call SP_insert_cliente ('EMMA PAULA','SOLIS','RAMIREZ','1990-05-20',null,'solis_emma','pelicula','emmaPSR@outlook.com');
call SP_insert_cliente ('DANIEL','TINAJERO','TRISTAN','1980-01-15','6647733133','daniel01','basura','daniel@outlook.com');
call SP_insert_cliente ('MARIA GUADALUPE','MORENO','CASTILLO','2000-11-12','6651199724',null,'guadalupe','mariaGMc@gmail.com');
call SP_insert_cliente ('JOSE GUADALUPE','MEDINA','RODRIGUEZ','1999-10-05',null,'jose_guadalupe','constrasenia','joseGuadalupe@outloo.com');

select * from cliente;
select * from usuario;
select * from telef_clientes;

########################################### Proveedores ###########################################################################

call SP_insert_proveedor('Palacios Diseño',' Palacios Diseño y Decoración cuenta con 55 años de experiencia en el 
rubro de producción y decoración de eventos, tiempo que avala la excelente calidad de sus servicios. 
La base del trabajo de sus profesionales es el buen gusto, porque su misión es ambientar de manera 
sobria, elegante y refinada un evento para ustedes. Los expertos tienen amplios conocimientos en decoración, 
por lo que crearán los detalles. Entre los servicios que ofrece: ramos de flores, decoración floral para eventos, decoración 
floral para el banquete, arreglos frutales, centros de mesa, etc.','www.PalaciosDesign');

call SP_insert_proveedor('Expresiones Estudio','Una excelente profesional que sabe captar 
esos momentos tan especiales, es Expresiones Estudio. Con una mirada fresca y 
espontánea captura la esencia de su día y les entrega instantes únicos que podrán revivir 
cuantas veces quieran para mantener presente ese bello sentimiento. Entre sus servicios: 
Fotografía, video, e-session, trash the dress, álbumes, photobook, álbum digital, fotografías 
en alta resolución, negativos, blu-ray o DVD con todas las fotografías, photocall, photobooth',
'https://www.facebook.com/estudioEXPRESIONES/');

call SP_insert_proveedor('Musca Group','Musca Group es una empresa con amplia experiencia en 
el sector de los eventos en el Norte del País, basados en Monterrey, Nuevo León, y ofreciendo  
servicios de música en todo México. Harán de su evento una celebración inolvidable sabiendo 
que será un éxito total. Entre los servicios que ofrece: Música para la ceremonia, música 
para el coctel / banquete, música para bailar, animación, audiovisuales, dJ. Ademas, los estilos 
que maneja: Instrumental, pop, para bailar, actual, versátil, cumbia, tropical, banda, dj',
'http://muscagroup.com/');

call SP_insert_proveedor('El Molino','Sólo utilizan ingredientes de la mejor calidad, 
garantizado un sabor inigualable, pues constantemente están aprendiendo las técnicas 
más novedosas. Su pastel será de acuerdo a los gustos y personalidad de los novios. 
Venta y elaboración de pasteles para eventos, venta y elaboración de pasteles a medida.',
'http://www.pasteleriaelmolino.com');

call SP_insert_proveedor('Banquetes Krissa','Banquetes Krissa es una empresa cuyo 
objetivo principal es consentir y satisfacer su paladar y la de sus invitados. 
Se comprometen con cariño y profesionalismo para que su evento sea todo un éxito, 
pero ante todo, que con sus preparaciones exquisitas vivan su celebración con el 
estomago lleno y corazón contento. Desde 50 hasta 500 invitados.',
'https://www.facebook.com/banqueteskrissa/');

select * from proveedor;

/*alter table proveedor
modify column pro_Sitio varchar(60);*/