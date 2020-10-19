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

call SP_insert_agente ('ANA CAROLINA','LOPEZ','MARTINEZ', '2000-12-23','F');
call SP_insert_agente ('MANUEL','MENDEZ','HERNANDEZ','1990-08-03','M');
call SP_insert_agente ('MARCO ANTONIO','RAMIREZ','LOZANO','1980-01-12','M');
call SP_insert_agente ('JORGE','CARRILLO','MARTINEZ','1990-08-05','M');
call SP_insert_agente ('JOHANA VANESSA','MAR','SANCHEZ','1989-07-21','F');
call SP_insert_agente ('JESUS ENRIQUE','VAZQUEZ','MARIN','2000-12-23','M');
call SP_insert_agente ('GINA ELIZABETH','LISZT','CORDOBA','1995-10-03','F');
call SP_insert_agente ('PAOLA','MARTINEZ','LARA','1980-01-12','F');
call SP_insert_agente ('MARTHA','CHAVEZ','OCHOA','1989-07-21','F');
call SP_insert_agente ('JOSE ALFONSO','PEREZ','CANTO','1990-08-05','M');
call SP_insert_agente ('FELIPE','LOPEZ','CHAVIRA','1999-07-21','M');
call SP_insert_agente ('VERONICA','FERNANDEZ','ZAMUDIO','2000-12-23','F');
call SP_insert_agente ('SANDRA','GARCIA','BUSTAMANTE','1989-07-21','F');
call SP_insert_agente ('JUAN CARLOS','JARAMILLO','VAZQUEZ','1980-01-12','M');
call SP_insert_agente ('VICTOR ALFONSO','CALDERON','TURRUBIATES','1990-08-05','M');
call SP_insert_agente ('MARTHA ALICIA','LEON','CARREÑO','1995-10-03','F');
call SP_insert_agente ('RODOLFO','HERNANDEZ','AVILA','1989-07-21','M');
call SP_insert_agente ('JULIO CESAR','JUAREZ','BORRAYO','1980-01-12','M');
call SP_insert_agente ('JOSE GUADALUPE','LOZANO','VALDEZ','2000-12-23','M');
call SP_insert_agente ('MIGUEL ANGEL','MEDINA','DEL TORO','1990-08-05','M');
call SP_insert_agente ('ALEJANDRO','GUTIERREZ','PEREZ','1995-10-03','M');
call SP_insert_agente ('CARMEN','MIRANDA','ROCHA','2000-12-23','F');

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