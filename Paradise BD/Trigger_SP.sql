use paradise;


#		PROCEDIMIENTO ALMACENADO Y TRIGGER PARA INSERTAR A UN AGENTE
#drop trigger DIS_AGENTE_INSERT;

DELIMITER //
create trigger DIS_AGENTE_INSERT before insert on agente
for each row 
begin 
	declare edad int;
	select timestampdiff(year,new.agFecNac,curdate())  into edad;
    
	set new.agEdad=edad; 
    set new.agMatricula=upper(concat(substr(new.agNombre,1,1),substr(new.agNombre,char_length(new.agNombre),1),substr(new.agNombre,char_length(new.agNombre)/2,1),'0',substr(new.agApPat,1,1),substr(new.agApPat,char_length(new.agApPat),1),substr(new.agApPat,char_length(new.agApPat)/2,1)));
end //
DELIMITER ;

# drop procedure SP_insert_agente;

DELIMITER //
create procedure SP_insert_agente (
	in nombre varchar(30),
	in apPat varchar(20),
	in apMat varchar(20),
	in fecNac date,
	in genero char(1)
) 
begin
    
	insert into agente (agNombre,agApPat,agApMat,agFecNac,FK_genero)values(
	nombre,apPat,apMat,fecNac,genero);
end //
DELIMITER ;

#call SP_insert_agente('Chapis','Pepogi','Ramirez','2000-12-23','F');
#select @matricula as Matricula;


#		PROCEDIMIENTO ALMACENADO PARA INSERTAR A UN CLIENTE

#drop trigger DIS_CLIENTE_INSERT;

/*DELIMITER //
create trigger DIS_CLIENTE_INSERT before insert on cliente
for each row 
begin 
	declare edad int;
	select timestampdiff(year,new.cliFecNac,curdate())  into edad;
    
	set new.cliEdad=edad; 
   
end //
DELIMITER ;*/


# drop procedure SP_insert_cliente;

DELIMITER //
create procedure SP_insert_cliente (
	in nombre varchar(30),
	in apPat varchar(20),
	in apMat varchar(20),
	in fecNac date,
    
    in telefono char(10),
    
    in userName varchar(30),
    in contrasenia varchar(30),
    in correo varchar(30)
) 
begin
    declare edad int;
	select timestampdiff(year,fecNac,curdate())  into edad;
    
	insert into cliente (cliNombre,cliApPat,cliApMat,cliFecNac,cliEdad)values(
	nombre,apPat,apMat,fecNac,edad);
    
    if (telefono is not null) then
		insert into telef_clientes (tcTelefono,FK_cliente)
        values (telefono,(select cliNum from cliente where cliNombre=nombre and cliApPat=apPat and cliApMat=apMat and cliFecNac=fecNac));
	end if;
    
    if (userName is null) then
    	insert into usuario (usNombre,usContrasenia,usCorreo,FK_TipoUS)
        values((concat((select count(cliNum) from cliente),' ',nombre,' ',apPat)),contrasenia,correo,'CLI');
	else 
		insert into usuario (usNombre,usContrasenia,usCorreo,FK_TipoUS)
        values (userName,contrasenia,correo,'CLI');
	end if;
    
end//
DELIMITER ;
 

call SP_insert_cliente ('Yoel','Mendez','Arriaga','1997-08-10',null,null,'123456','arriaga@gmail.com');
call SP_insert_cliente ('Kevin','Ortiz','Rieta','2001-12-02','6649977543',null,'123456','rieta@gmail.com');
call SP_insert_cliente ('Maria','Peña','Santos','1999-10-05',null,'santos_maria','123456','santosM@gmail.com');

#  delete from usuario where usNum=8 or usNum=9 or usNum=17;
# delete from cliente where cliNum=14 or cliNum=15 or cliNum=17;
# delete from telef_clientes where tcNum = 4;

select * from usuario;
select * from cliente;
select * from telef_clientes;