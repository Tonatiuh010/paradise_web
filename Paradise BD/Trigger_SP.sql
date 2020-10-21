use paradise;


############################################ INSERTAR A UN AGENTE ##################################################

# drop procedure SP_insert_agente;

DELIMITER //
create procedure SP_insert_agente (
	in nombre varchar(30),
	in apPat varchar(20),
	in apMat varchar(20),
	in fecNac date,
	in genero char(1),
    
	in telefono char(10),
    
    in userName varchar(30),
    in contrasenia varchar(30),
    in correo varchar(30)
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
		insert into telef_agentes (tcTelefono,FK_agente)
        values (telefono,matricula);
	end if;
    
    if (userName is not null and contrasenia is not null and correo is not null) then
    	insert into usuario (usNombre,usContrasenia,usCorreo,FK_TipoUS,FK_Agente) values
        (userName,contrasenia,correo,'AGT',matricula);
	end if;

end //
DELIMITER ;

#call SP_insert_agente('Chapis','Pepogi','Ramirez','2000-12-23','F');
#select @matricula as Matricula;


########################################### INSERTAR A UN CLIENTE ##################################################

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
    	insert into usuario (usNombre,usContrasenia,usCorreo,FK_TipoUS,FK_Cliente)
        values((concat((select count(cliNum) from cliente where cliNombre=nombre),'_',nombre,'_',apPat)),contrasenia,correo,'CLI',
        (select cliNum from cliente where cliNombre=nombre and cliApPat=apPat and cliApMat=apMat and cliFecNac=fecNac));
	else 
		insert into usuario (usNombre,usContrasenia,usCorreo,FK_TipoUS,FK_Cliente)
        values (userName,contrasenia,correo,'CLI',
        (select cliNum from cliente where cliNombre=nombre and cliApPat=apPat and cliApMat=apMat and cliFecNac=fecNac));
	end if;
    
end//
DELIMITER ;
 

# call SP_insert_cliente ('Yoel','Mendez','Arriaga','1997-08-10',null,null,'123456','arriaga@gmail.com');
# call SP_insert_cliente ('Kevin','Ortiz','Rieta','2001-12-02','6649977543',null,'123456','rieta@gmail.com');
# call SP_insert_cliente ('Maria','Peña','Santos','1999-10-05',null,'santos_maria','123456','santosM@gmail.com');

#  delete from usuario where usNum=8 or usNum=9 or usNum=17;
# delete from cliente where cliNum=14 or cliNum=15 or cliNum=17;
# delete from telef_clientes where tcNum = 4;

# select * from usuario;
# select * from cliente;
# select * from telef_clientes;


########################################### SP PARA INSERT PROVEEDORES ##############################################

# drop procedure SP_insert_proveedor;

DELIMITER //
create procedure SP_insert_proveedor (
    in nombre varchar(50),
	in descripcion text,
	in sitio varchar(60)
) 
begin
	declare codigo char(5);
	set codigo=upper(concat(substr(nombre,1,2),substr(nombre,char_length(nombre),2),'0'));
    
    insert into proveedor values (codigo,nombre,descripcion,sitio);
    
end//
DELIMITER ;


##########################################################################################################
#insert usuarios agentes

DELIMITER //
create procedure SP_insert_user_agente(
	in agente char(7),  #matricula del agente
    in userName varchar(30),
    in contrasenia varchar(30),
    in correo varchar(30)
)
begin
	insert into usuario (usNombre,usContrasenia,usCorreo,FK_TipoUS,FK_Agente) values
	(userName,contrasenia,correo,'AGT',agente);
end//
DELIMITER ;

########################################### INSERTAR UN LUGAR ####################################################

drop procedure SP_insert_lugar;

DELIMITER //
create procedure SP_insert_lugar(
	in nombre varchar(30),
    in descripcion text,
    in costo decimal(6,2),
    in capacidad int,
    in tipoLug int,
    in municipio char(3),
    in proveedor char(5),
    
    in calle varchar(40),
    in numInt varchar(25),
    in numExt varchar(25),
    in cp char(5)
)
begin
	declare codigo char(5);
    set codigo=upper(concat(substr(nombre,1,1),substr(nombre,char_length(nombre),1),tipoLug,substr(municipio,1,2)));
    
    if (calle is not null and numInt is not null and cp is not null) then
		
        insert into diclugar(dlCalle,dlNumInterior,dlNumExterior,dlCP) values
        (calle,numInt,numExt,cp);
        
        insert into lugar values
        (codigo,nombre,descripcion,costo,capacidad,tipoLug,
        (select dlNum from diclugar where dlCalle=calle and dlNumInterior=numInt and dlCP=cp),
        municipio,proveedor);
    else
		insert into lugar values
        (codigo,nombre,descripcion,costo,capacidad,tipoLug,null,municipio,proveedor);
    end if;
    
end//
DELIMITER ;

# call SP_insert_lugar ('Salón Toscano',null,250,70,1,'TIJ','BAA0','Matamoros','7545','5','22245');
# select * from lugar;
# select * from diclugar;
