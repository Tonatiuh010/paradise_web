use paradise;

insert into genero values ('M', 'Masculino'),('F','Femenino');

insert into tipo_us values ('CLI','Cliente'),('ADM','Administrador'),('AGT','Agente');

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
