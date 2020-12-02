

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

DELIMITER //
create procedure SP_insert_userAg(
	out num int,
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
    
	select usNum from usuario order by usNum desc limit 1 into num; 
end//
DELIMITER ;

DELIMITER //
create procedure SP_delete_telefono(
in num int
)
begin 
delete from telef_agentes where tgNum=num;

end //
DELIMITER ;

DELIMITER //
create trigger DIS_CLIENTE_INSERT before insert on cliente
for each row 
begin 
	declare edad int;
	select timestampdiff(year,new.cliFecNac,curdate())  into edad;
    
	set new.cliEdad=edad; 
end //
DELIMITER ;

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


DELIMITER //
create procedure SP_insert_userCli(
	out num int,
    in userName varchar(30),
    in contrasenia varchar(30),
    in correo varchar(60)
)
begin
	if(userName is not null) then
		insert into usuario (usNombre,usContrasenia,usCorreo,usTipoUS) values
		(userName,contrasenia,correo,'Cliente');
	else 
		set @prueba =  (select count(usNum) from usuario)+1;
		set @again= concat('usuario',@prueba);
        
		insert into usuario (usNombre,usContrasenia,usCorreo,usTipoUS) values
		(@again,contrasenia,correo,'Cliente');
	end if;
    
    select usNum from usuario order by usNum desc limit 1 into num; 
    
end//
DELIMITER ;

DELIMITER //
create procedure SP_insert_lugar(
	out numLug int,    
	in nombre varchar(30),
    in descripcion text,
    in costo decimal(12,2),
    in capacidad int,
    in tipoLug int,
    in calle varchar(40),
    in numInt varchar(25),
    in numExt varchar(25),
    in cp char(5),
	in municipio char(3)
)
begin	    
    
    if (calle is not null and numInt is not null and cp is not null and municipio is not null) then
		
        insert into lugar(lugNombre,lugDescripcion,lugCosto,lugCapacidad,FK_TipoL) values
        (nombre,descripcion,costo,capacidad,tipoLug);
        
        insert into dicLugar values ((select lugNum from lugar order by lugNum desc limit 1),
        calle,numInt,numExt,cp,municipio);
        
    else
		insert into lugar(lugNombre,lugDescripcion,lugCosto,lugCapacidad,FK_TipoL) values
        (nombre,descripcion,costo,capacidad,tipoLug);
    end if;
    
    select lugNum from lugar order by lugNum desc limit 1 into numLug;
   
end//
DELIMITER 

DELIMITER //
create procedure SP_update_lugar 
(
in num int,
in costo decimal(12,2),
in capacidad int
)
begin
	update lugar set lugCosto=costo, lugCapacidad=capacidad where lugNum=num;
end //
DELIMITER ;

DELIMITER //
create procedure SP_insertar_EspLug (
	in numEsp int,
    in numLug int
)
begin 
	insert into lugEspacio (lg_NumEspacio,lg_NumLugar) values (numEsp,numLug);
end//
DELIMITER ;

DELIMITER //
create procedure SP_delete_EspLug (
	in numEsp int,
    in numLug int
)
begin 
	delete from lugEspacio where lg_NumLugar=numLug and lg_NumEspacio=numEsp;
end//
DELIMITER ;

DELIMITER //
create procedure sp_log_in
(
	in usern varchar(60),
    in passwd varchar(30)
)
begin
	set @tipoU=(select tipo from vw_user_list
				where contrasenia = passwd  and (correo=usern or nombre=usern));                
	if(@tipoU='Cliente') then
		select numc as id, numU, tipo from vw_primary_user
		where contrasenia = passwd  and (correo=usern or username=usern);
	elseif(@tipoU='Agente') then
		select mat as id, numU, tipo from vw_primary_user
		where contrasenia = passwd  and (correo=usern or username=usern);
	else
		select '0' as id, numU, tipo from vw_user_list 
        where contrasenia = passwd  and (correo=usern or nombre=usern);
	end if;
end// 
DELIMITER ;

DELIMITER //
create procedure sp_update_perfilCli
(
	in cliente int,
	in campo int,
	in cambio varchar(60)
)
begin
	case
	  when campo=1 then
			UPDATE cliente INNER JOIN usuario
			ON FK_usuario = usNum 
			SET usNombre = cambio
			where cliNum=cliente;
	  when campo=2 then
			UPDATE cliente INNER JOIN usuario
			ON FK_usuario = usNum 
			SET usContrasenia = cambio
			where cliNum=cliente;
	  when campo=3 then
			UPDATE cliente
			SET cliTelefono = cambio
			where cliNum=cliente;
	end case;
    
end//
DELIMITER ;

DELIMITER //
create procedure sp_delete_perfilCli
(
	in cliente int
)
begin
	declare usernum int;
	set usernum=(select num_us from vw_cliente_perfil where num=cliente);
    delete from usuario where usNum=usernum;
end//
DELIMITER ;

DELIMITER //
create trigger DIS_PRE_RESERVACION_REGISTRO before insert on pre_Reservacion 
for each row 
begin 
    set new.prFechaRegistro = (SELECT NOW());
end //
DELIMITER ;

DELIMITER //
create procedure SP_PRE_RESERVACION_REGISTRO 
(
	in fecha_inicial date,
    in fecha_finalizar date,
    in lugar int,
    in cliente int
)
begin 
    insert into pre_Reservacion(prFechaRegistro,prFechaInic,prFechaFin,prStatus,FK_Lugar,FK_Cliente) values
    ((SELECT NOW()),fecha_inicial,fecha_finalizar,'Proceso',lugar,cliente);
end //
DELIMITER ;

DELIMITER //
create trigger DIS_RESERVACION_DIAS before insert on reservacion 
for each row 
begin 
	declare dias int;
    declare total decimal(12,2);
	set dias=(SELECT DATEDIFF((select prFechaFin from pre_reservacion where prNum=new.resNumPR),
								(select prFechaInic from pre_reservacion where prNum=new.resNumPR)))+1;
    set total=((select lugCosto from pre_reservacion inner join lugar 
				on FK_Lugar=lugNum where prNum=new.resNumPR) * dias);  
                                
    set new.resTotDias = dias;
    set new.resTotPagar = total;
    set new.resFecConfirmacion = (SELECT NOW());
end //
DELIMITER ;

DELIMITER // 
    create procedure SP_insertarReservacion (
		in pr int,
        in notas text
	)
	begin 
		insert reservacion(resNumPR) values(pr);
        update pre_Reservacion set prNotas=notas, prStatus='Autorizada' where prNum=pr;
    end //
    DELIMITER ;

DELIMITER //
 create procedure SP_updatePreReservacion(
	in pr int,
    in notas text
 )
	begin 
		update pre_Reservacion set prStatus='Rechazada', prNotas=notas where prNum=pr ;
    end //
    DELIMITER ;

DELIMITER //
create procedure SP_insert_espacios 
(
	in nombre varchar(20)
)
begin
		insert into espacio (espNombre) values (nombre);
end //
DELIMITER ;

DELIMITER //
create procedure SP_delete_imagen 
(
	in num int
)
begin
	delete from imagenesLugar where img_Num=num;    
end //
DELIMITER ;

DELIMITER //
create procedure SP_insert_TL
(
	in nombre varchar(30)
)
begin
		insert into tipoLugar (tlNombre) values (nombre);
end //
DELIMITER ;

DELIMITER //
create procedure SP_lugares_complete_list
(
	in numLug int
)
begin
	declare numExt varchar(25);
    set numExt=(select dlNumExterior from diclugar where dlNum=numLug);
    
    if (numExt is null) then 
			select lugNum as 'No', lugNombre as Lugar, lugDescripcion as Descripcion, lugCosto as Costo, lugCapacidad as Capacidad,
			concat('Ubicado en ',dlCalle,' CP ',dlCP,' #',dlNumInterior,' ',mun_nombre) as Domicilio,
			tlNombre as 'Tipo de Lugar', espNombre as Espacios
			from vw_lugar_complete_data
			where lugNum=numLug;
	else
			select lugNum as 'No', lugNombre as Lugar, lugDescripcion as Descripcion, lugCosto as Costo, lugCapacidad as Capacidad,
					concat('Ubicado en ',dlCalle,' CP ',dlCP,' #',dlNumInterior,'-',dlNumExterior,' ',mun_nombre) as Domicilio,
					tlNombre as 'Tipo de Lugar', espNombre as Espacios
			from vw_lugar_complete_data
			where lugNum=numLug;
	end if;
end//
DELIMITER ;

DELIMITER //
create procedure sp_perfil_cliente
(
	in id int
)
begin
	select * from vw_cliente_perfil
    where num=id;
end//
DELIMITER ;

DELIMITER //
create procedure SP_preReservacion_asignarAgente(
in pr int,
in agente char (7)

)
begin 
		update pre_Reservacion set FK_Agente=agente where prNum=pr;
end //
DELIMITER ;

DELIMITER //
create procedure sp_update_perfilAgen
(
	in agente char(7),
	in campo int,
	in cambio varchar(60)
)
begin
	case
	  when campo=1 then
			UPDATE agente INNER JOIN usuario
			ON FK_usuario = usNum 
			SET usNombre = cambio
			where agMatricula = agente;
	  when campo=2 then
			UPDATE agente INNER JOIN usuario
			ON FK_usuario = usNum 
			SET usContrasenia = cambio
			where agMatricula = agente;
	  when campo=3 then
			insert into telef_agentes(tgTelefono,FK_agente) values(cambio,agente);
	end case;
    
end//
DELIMITER ;

DELIMITER //
create procedure sp_navegador_busqueda(
	in parametro varchar(100)
)
begin 
		select DISTINCT lugNum as num, lugNombre as lugar, lugDescripcion as descripcion, lugCosto as costo, lugCapacidad as capacidad 
		from vw_lugar_complete_data 
		where (lugNombre like (concat(parametro,'%')) or lugNombre like (concat('%',parametro,'%')) or lugNombre like (concat('%',parametro)))
		or (lugDescripcion like (concat(parametro,'%')) or lugDescripcion like (concat('%',parametro,'%')) or lugDescripcion like (concat('%',parametro)))
		or (lugCosto like (concat(parametro,'%')) or lugCosto like (concat('%',parametro,'%')) or lugCosto like (concat('%',parametro)))
		or (lugCapacidad like (concat(parametro,'%')) or lugCapacidad like (concat('%',parametro,'%')) or lugCapacidad like (concat('%',parametro)))
		or (tlNombre like (concat(parametro,'%')) or tlNombre like (concat('%',parametro,'%')) or tlNombre like (concat('%',parametro)))
		or (mun_nombre like (concat(parametro,'%')) or mun_nombre like (concat('%',parametro,'%')) or mun_nombre like (concat('%',parametro)))
		or (espNombre like (concat(parametro,'%')) or espNombre like (concat('%',parametro,'%')) or espNombre like (concat('%',parametro)));
end //
DELIMITER ;

DELIMITER //
create procedure sp_delete_user_email(
in email varchar(50)
)
begin 
		delete from usuario where usCorreo=email;
end //
DELIMITER ;

DELIMITER //
create procedure sp_preReservacion_cancelada
(
	in pr int
)
begin
	 declare mensaje varchar(40);
     set mensaje='CANCELADA POR EL CLIENTE';
     
     update pre_reservacion 
     set prStatus='Rechazada', prNotas=mensaje
     where prNum=pr;

end//
DELIMITER ;

DELIMITER //
create procedure sp_dias_disponibles
(
	in fecInic date,
    in fecFin date,
    in lugar int
    #out mensaje varchar(60)
)
begin
	 DECLARE dias int;
     DECLARE resultado int;
     DECLARE busqueda date;
     DECLARE ocupado int default 0;
     DECLARE counter int default 0;
     SET dias = (SELECT DATEDIFF(fecFin,fecInic))+1;
     
     my_loop: LOOP
     
     IF counter=dias THEN
     select ocupado;
     LEAVE my_loop;
     END IF;
     
     set busqueda= (select DATE_ADD(fecInic,INTERVAL counter DAY));
     
     set resultado=(select count(*)
     from pre_Reservacion
     where prFechaInic<= busqueda and prFechaFin>=busqueda and FK_Lugar=lugar and prStatus!='Rechazada');
     
     SET counter=counter+1;
     SET ocupado = ocupado + resultado;
     END LOOP my_loop;

end//
DELIMITER ;