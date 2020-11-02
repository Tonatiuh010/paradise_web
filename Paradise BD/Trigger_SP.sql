use paradise;


############################################ INSERTAR A UN AGENTE ##################################################

DELIMITER //
create trigger DIS_AGENTE_INSERT before insert on agente
for each row 
begin 
	declare edad int;
	select timestampdiff(year,new.agFecNac,curdate())  into edad;
    
	set new.agEdad=edad; 
    set new.agMatricula = upper(concat(substr(new.agNombre,1,1),
    substr(new.agNombre,char_length(new.agNombre),1),substr(new.agNombre,char_length(new.agNombre)-1,1),
    '0',substr(new.agApPat,1,1),substr(new.agApPat,char_length(new.agApPat),1),
    substr(new.agApPat,char_length(new.agApPat)/2,1)));
end //
DELIMITER ;

# drop procedure SP_insert_agente;
DELIMITER //
create procedure SP_insert_agente (
	in nombre varchar(30),
	in apPat varchar(20),
	in apMat varchar(20),
	in fecNac date,
	in genero varchar(20),
    in userEmail varchar(60),
    
    in telefono char(10)
) 
begin
    
	insert into agente (agNombre,agApPat,agApMat,agFecNac,agGenero,FK_usuario)
    values(nombre,apPat,apMat,fecNac,genero,(select usNum from usuario where usCorreo=userEmail));
    
    if (telefono is not null) then
		insert into telef_agentes (tgTelefono,FK_agente)
        values (telefono,(select agMatricula from agente order by FK_usuario desc limit 1));
	end if;
    
end //
DELIMITER ;

# drop procedure SP_insert_userAg;
DELIMITER //
create procedure SP_insert_userAg(
    in userName varchar(30),
    in contrasenia varchar(30),
    in correo varchar(60)
)
begin
	if(userName is not null) then
		insert into usuario (usNombre,usContrasenia,usCorreo,usTipoUS) values
		(userName,contrasenia,correo,'Agente');
	else 
		set @prueba =  (select count(usNum) from usuario);
		set @again= concat('usuario',@prueba);
        
		insert into usuario (usNombre,usContrasenia,usCorreo,usTipoUS) values
		(@again,contrasenia,correo,'Agente');
	end if;
end//
DELIMITER ;

/*
call SP_insert_userAg ('jose_guadalupe','constrasenia','joseGuadalupe@outloo.com');
call SP_insert_agente ('JOSE GUADALUPE','LOZANO','VALDEZ','2000-12-23','Masculino','joseGuadalupe@outloo.com','6645577934');
select * from agente;
select * from telef_agentes;
select * from usuario;
*/

########################################### INSERTAR A UN CLIENTE ##################################################

DELIMITER //
create trigger DIS_CLIENTE_INSERT before insert on cliente
for each row 
begin 
	declare edad int;
	select timestampdiff(year,new.cliFecNac,curdate())  into edad;
    
	set new.cliEdad=edad; 
end //
DELIMITER ;

# drop procedure SP_insert_cliente;
DELIMITER //
create procedure SP_insert_cliente (
	in nombre varchar(30),
	in apPat varchar(20),
	in apMat varchar(20),
	in fecNac date,
    in telefono char(10),
    in userEmail varchar(60)
    
) 
begin
    
	insert into cliente (cliNombre,cliApPat,cliApMat,cliFecNac,cliTelefono,FK_usuario)
    values(nombre,apPat,apMat,fecNac,telefono,(select usNum from usuario where usCorreo=userEmail));
    
end//
DELIMITER ;

# drop procedure SP_insert_userCli;
DELIMITER //
create procedure SP_insert_userCli(
    in userName varchar(30),
    in contrasenia varchar(30),
    in correo varchar(60)
)
begin
	if(userName is not null) then
		insert into usuario (usNombre,usContrasenia,usCorreo,usTipoUS) values
		(userName,contrasenia,correo,'Cliente');
	else 
		set @prueba =  (select count(usNum) from usuario);
		set @again= concat('usuario',@prueba);
        
		insert into usuario (usNombre,usContrasenia,usCorreo,usTipoUS) values
		(@again,contrasenia,correo,'Cliente');
	end if;
    
end//
DELIMITER ;


/*
call SP_insert_userCli ('daniel01','basura','daniel@outlook.com');
call SP_insert_userCli (null,'password','guadalupe@hotmail.com');
call SP_insert_cliente ('DANIEL','TINAJERO','TRISTAN','1980-01-15','6647733133','daniel@outlook.com');
select * from cliente;
select * from usuario;
*/

# ALTER TABLE agente AUTO_INCREMENT = 0;

########################################### INSERTAR UN LUGAR ####################################################

# drop procedure SP_insert_lugar;

DELIMITER //
create procedure SP_insert_lugar(
	out numLug int,    
	in nombre varchar(30),
    in descripcion text,
    in costo decimal(12,2),
    in capacidad int,
    in tipoLug int,
    # in proveedor char(5),
    
    in calle varchar(40),
    in numInt varchar(25),
    in numExt varchar(25),
    in cp char(5),
	in municipio char(3)
)
begin	    
    
    if (calle is not null and numInt is not null and cp is not null) then
		
        insert into lugar(lugNombre,lugDescripcion,lugCosto,lugCapacidad,FK_TipoL) values
        (nombre,descripcion,costo,capacidad,tipoLug);
        
        insert into diclugar values ((select lugNum from lugar order by lugNum desc limit 1),
        calle,numInt,numExt,cp,municipio);
        
    else
		insert into lugar(lugNombre,lugDescripcion,lugCosto,lugCapacidad,FK_TipoL) values
        (nombre,descripcion,costo,capacidad,tipoLug);
    end if;
    
    select lugNum from lugar order by lugNum desc limit 1 into numLug;
   
end//
DELIMITER 

##-------------------------------------------- Insert Espacios - Lugar ---------------------------------

#drop procedure SP_insertar_EspLug;

DELIMITER //
create procedure SP_insertar_EspLug (
	in numEsp int,
    in numLug int
)
begin 
	insert into lugespacio (lg_NumEspacio,lg_NumLugar) values (numEsp,numLug);
end//
DELIMITER ;

######################################### INICIO DE SESIÓN ###################################################

#No ejecutar sin antes antes ejecutar la vista 'vw_primary_user' en la linea 94 en 'Consultas.sql'

DELIMITER //
create procedure sp_log_in
(
	in usern varchar(60),
    in passwd varchar(30)
)
begin
	set @tipoU=(select tipo from vw_primary_user
				where contrasenia = passwd  and (correo=usern or username=usern));
                
	if(@tipoU='Cliente') then
		select numc as id, numU, tipo from vw_primary_user
		where contrasenia = passwd  and (correo=usern or username=usern);
	else
		select mat as id, numU, tipo from vw_primary_user
		where contrasenia = passwd  and (correo=usern or username=usern);
	end if;
end// 
DELIMITER ;

# call sp_log_in ('usuario26','guadalupe');


