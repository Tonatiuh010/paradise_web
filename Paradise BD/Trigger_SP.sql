use paradise;


############################################ INSERTAR A UN AGENTE ##################################################

# drop procedure SP_insert_agente;

DELIMITER //
create procedure SP_insert_agente (
	in nombre varchar(30),
	in apPat varchar(20),
	in apMat varchar(20),
	in fecNac date,
	in genero varchar(20),
    
	in telefono char(10)
) 
begin
	declare edad int;
	declare matricula char(7);
	select timestampdiff(year,fecNac,curdate())  into edad;
	set matricula = upper(concat(substr(nombre,1,1),
    substr(nombre,char_length(nombre),1),substr(nombre,char_length(nombre)-1,1),
    '0',substr(apPat,1,1),substr(apPat,char_length(apPat),1),
    substr(apPat,char_length(apPat)/2,1)));
    
	insert into agente values(matricula,nombre,apPat,apMat,fecNac,edad,genero);
    
    if (telefono is not null) then
		insert into telef_agentes (tgTelefono,FK_agente)
        values (telefono,matricula);
	end if;
    
end //
DELIMITER ;

# drop procedure SP_insert_userAg
DELIMITER //
create procedure SP_insert_userAg(
	in agente char(7),  #matricula del agente
    in userName varchar(30),
    in contrasenia varchar(30),
    in correo varchar(30)
)
begin
	insert into usuario (usNombre,usContrasenia,usCorreo,FK_TipoUS,FK_Agente) values
	(userName,contrasenia,correo,'Agente',agente);
end//
DELIMITER ;

#call SP_insert_agente('Chapis','Pepogi','Ramirez','2000-12-23','F');
#select @matricula as Matricula;


########################################### INSERTAR A UN CLIENTE ##################################################

#drop procedure SP_insert_cliente;

DELIMITER //
create procedure SP_insert_cliente (
	in nombre varchar(30),
	in apPat varchar(20),
	in apMat varchar(20),
	in fecNac date,
    in telefono char(10)
    
    /*in userName varchar(30),
    in contrasenia varchar(30),
    in correo varchar(30)*/
) 
begin
    declare edad int; 
	select timestampdiff(year,fecNac,curdate())  into edad;
    
	insert into cliente (cliNombre,cliApPat,cliApMat,cliFecNac,cliEdad,cliTelefono)values(
	nombre,apPat,apMat,fecNac,edad,telefono);
    
end//
DELIMITER ;

#drop procedure SP_insert_userCli;

DELIMITER //
create procedure SP_insert_userCli(
	#in cliente char(7),  #no.cliente
    in userName varchar(30),
    in contrasenia varchar(30),
    in correo varchar(30),
    
	in nombre varchar(30),
	in apPat varchar(20),
	in apMat varchar(20)
)
begin
	declare cliente char(7);
    set cliente=(select cliNum from cliente where cliNombre=nombre and cliApPat=apPat and (cliApMat=apMat or cliApMat is null));
	insert into usuario (usNombre,usContrasenia,usCorreo,usTipoUS,FK_cliente) values
	(userName,contrasenia,correo,'Cliente',cliente);
end//
DELIMITER ;


# call SP_insert_userCli('guadalupe123','123456','guadalupe@gmail.com','GUADALUPE','MEDINA',null);
# call SP_insert_cliente ('GUADALUPE','MEDINA',null,'1999-10-05',null); 
# select * from cliente;
# select * from usuario;

# delete from cliente
# where cliNum=1;

# delete from usuario
# where usNum=1;

#ALTER TABLE cliente AUTO_INCREMENT = 0;

########################################### INSERTAR UN LUGAR ####################################################

# drop procedure SP_insert_lugar;

DELIMITER //
create procedure SP_insert_lugar(
	in nombre varchar(30),
    in descripcion text,
    in costo decimal(12,2),
    in capacidad int,
    in tipoLug int,
    in municipio char(3),
    # in proveedor char(5),
    
    in calle varchar(40),
    in numInt varchar(25),
    in numExt varchar(25),
    in cp char(5)
)
begin
	
    if (calle is not null and numInt is not null and cp is not null) then
		
        insert into lugar(lugNombre,lugDescripcion,lugCosto,lugCapacidad,FK_TipoL,FK_Municipio) values
        (nombre,descripcion,costo,capacidad,tipoLug,municipio);
        
        insert into diclugar values ((select lugNum from lugar order by lugNum desc limit 1),
        calle,numInt,numExt,cp);
        
    else
		insert into lugar(lugNombre,lugDescripcion,lugCosto,lugCapacidad,FK_TipoL,FK_Municipio) values
        (nombre,descripcion,costo,capacidad,tipoLug,municipio);
    end if;
    
end//
DELIMITER ;




