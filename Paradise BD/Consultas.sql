############################################# RESERVADO NO! TOCAR ##################################################

#------------------------------------------------------------------------------------------------------------

#Vista para extraer la información completa del lugar
create view vw_lugar_complete_data as
	select * from lugar left join tipolugar 
	on FK_TipoL=tlNum left join diclugar 
	on dlNum=lugNum left join municipio 
	on mun_cod=FK_Municipio left join lugespacio 
	on lg_NumLugar=lugNum left join espacio 
	on lg_NumEspacio=espNum
	union all 
	select * from lugar right join tipolugar 
	on FK_TipoL=tlNum right join diclugar 
	on dlNum=lugNum right join municipio 
	on mun_cod=FK_Municipio right join lugespacio 
	on lg_NumLugar=lugNum right join espacio 
	on lg_NumEspacio=espNum 
	where dlNum is null;

#-----------------------------------------------------------------------------------------------------------------

#Vista de lugares para una consulta básica
create view vw_lugares_basic_list as
	select lugNum as 'No', lugNombre as Lugar, lugDescripcion as Descripcion, 
    lugCosto as Costo, lugCapacidad as Capacidad 
    from lugar;

#------------------------------------------------------------------------------------------------------------------

#SP o vista para los filtros de busqueda

create view vw_lugares_filtros_list as
	select lugNum as num, lugNombre as Lugar, lugDescripcion as Descripcion, lugCosto as Costo, lugCapacidad as Capacidad,
	#--------- Estos campos se van a mandar a llamar cuando se seleccione la vista --------------------------------------#
	tlNum as Categoria, espNum as Espacio, mun_cod as Municipio
    #---------- Estos son campos que necesito unicamente para generar la busqueda ---------------------------------------#
	from vw_lugar_complete_data;

/*select Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list
where Capacidad>200 and (Espacio=3 or Espacio=4 or Espacio=5 or Espacio=6)
order by Costo asc;

select num, Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list
where Municipio='MXL' and Capacidad>=100 and Capacidad<=200;

select num, Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list where Categoria='3' ;*/

#----------------------------------------------------------------------------------------------------------------

# Vista para obtener las llaves primarias y tipo de usuario de los diferentes usuarios
create view vw_primary_user as
	select cliNum as numC, usNum as numU, usTipoUS as tipo, agMatricula as mat, usNombre as username, usContrasenia as contrasenia, usCorreo as correo
	from cliente as cli right join usuario as us
	on cli.FK_usuario=us.usNum right join agente as ag
	on ag.FK_usuario=us.usNum 
	union all
	select cliNum as numC, usNum as numU, usTipoUS as tipo, agMatricula as mat, usNombre as username, usContrasenia as contrasenia, usCorreo as correo
	from cliente as cli left join usuario as us
	on cli.FK_usuario=us.usNum left join agente as ag
	on ag.FK_usuario=us.usNum 
	where cliNum is null or agMatricula is null;
    
    create view vw_user_list as
		select usNum as numU, usNombre as nombre, usCorreo as correo, usContrasenia as contrasenia, usTipoUS as tipo 
    from usuario;
 
	select * from vw_primary_user;
    select * from usuario;
    
    create view vw_user_list as
    select usNum as numU, usNombre as nombre, usCorreo as correo, usContrasenia as contrasenia, usTipoUS as tipo from usuario;
    
    select * from vw_lugares_filtros_list;
    
    select DISTINCT num, Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list where categoria=1;
    
#-----------------------------------------------------------------------------------------------------------------
create view vw_cliente_perfil as	
    select cliNum as num, cliNombre as nombre, cliApPat as paterno, cliApMat as materno,  
	cliFecNac as nacimiento, cliEdad as edad, cliTelefono as telefono, usNum as num_us,
	usNombre as usuario, usContrasenia as contrasenia, usCorreo as email, usTipoUS as tipo
	from cliente inner join usuario
	on FK_usuario=usNum; 

/*select * from cliente;
select * from usuario;
select * from vw_cliente_perfil;*/

#-----------------------------------------------------------------------------------------------------------------

create view vw_agente_telefonos as
select tgNum as num, tgTelefono as telefono, FK_agente as agente from telef_agentes;

#select num, telefono from vw_agente_telefonos where agente=?;

#-----------------------------------------------------------------------------------------------------------------
#--->PRE_RESERVACION

/*insert pre_reservacion(prFechaRegistro,prFechaInic,prFechaFin,prStatus,prNotas,FK_Lugar,FK_cliente) values
('2020-11-07 15:22:10','2020-12-20','2020-12-23','Proceso','Aun sin autorizar',4,10);*/



alter view vw_reservacion_completa as
select prNum as num,
date_format(prFechaRegistro, '%d-%m-%Y  %h:%i') as fechas,
#prFechaRegistro as registro, 
date_format(prFechaInic, '%d-%m-%Y') as inicio,
date_format(prFechaFin, '%d-%m-%Y') as termino,
prStatus as estado, ##'Proceso' -- 'Rechazada' -- 'Autorizada' -- 'Finalizada'
prNotas as notas, 
FK_Lugar as lugar, 
FK_Cliente as cliente, 
FK_Agente as agente,
date_format(resFecConfirmacion, '%d-%m-%Y  %h:%i') as confirmacion,
resTotDias as dias, resTotPagar as total 
from pre_reservacion left join reservacion
on prNum=resNumPR
union all
select prNum as num, 
date_format(prFechaRegistro, '%d-%m-%Y  %h:%i') as registro,
#prFechaRegistro as registro, 
date_format(prFechaInic, '%d-%m-%Y') as inicio,
date_format(prFechaFin, '%d-%m-%Y') as termino,
prStatus as estado, 
prNotas as notas, 
FK_Lugar as lugar, 
FK_Cliente as cliente, 
FK_Agente as agente,
date_format(resFecConfirmacion, '%d-%m-%Y  %h:%i') as confirmacion,
resTotDias as dias, 
resTotPagar as total 
from pre_reservacion right join reservacion
on prNum=resNumPR
where resFecConfirmacion is null or resTotDias is null or resTotPagar is null;


select * from vw_reservacion_completa where estado='Proceso' and agente is null;

#select * from vw_reservacion_completa



select * from vw_reservacion_completa
where cliente=10;

select * from lugar;

update pre_reservacion
set prNotas='Evento Finalizado'
where prNum =1;

update pre_reservacion
set prStatus='Rechazada'
where prNum =13;


#where cliente=10;
#select * from pre_reservacion;

#alter table cliente
#AUTO_INCREMENT = 0;

###########################################  FIN DEL RESERVADO #####################################################


######################################### ADMIN/AGENTE ####################################

#drop view VW_lugar_admin ;

create view VW_lugar_admin as 
select lugNum numero,
lugNombre nombre,
lugDescripcion _desc,
lugCosto costo,
lugCapacidad capacidad,
tlNombre tipoLugar,
tlNum tipoLugar_numero,
dlCalle calle,
dlNumInterior numInterior, 
dlNumExterior numExterior,
dlCP CP,
mun_cod municipio_codigo,
mun_nombre municipio
from 
lugar l left join tipolugar tl on l.FK_TipoL=tl.tlNum
left join diclugar dl on dl.dlNum=l.lugNum
left join municipio m  on m.mun_cod=dl.FK_Municipio
union all 
select lugNum numero,
lugNombre nombre,
lugDescripcion _desc,
lugCosto costo,
lugCapacidad capacidad,
tlNombre tipoLugar,
tlNum tipoLugar_numero,
dlCalle calle,
dlNumInterior numInterior, 
dlNumExterior numExterior,
dlCP CP,
mun_cod municipio_codigo,
mun_nombre municipio
from 
lugar l right join tipolugar tl on l.FK_TipoL=tl.tlNum
right join diclugar dl on dl.dlNum=l.lugNum
right join municipio m  on m.mun_cod=dl.FK_Municipio
where dl.dlNum is null;

#select * from VW_lugar_admin;
select * from VW_lugar_admin;

##----------------------------------------- Lugar Admin -----------------------------------
/*concat(day(agFecNac),' de ',monthname(agFecNac),' del ',year(agFecNac))*/
##------------------------------------------ Agente Admin ---------------------------------
#drop view VW_agente_admin ;

CREATE view VW_agente_admin as 
select agMatricula as matricula, agNombre as nombre,agApPat as paterno,agApMat as materno,agFecNac as
nacimiento,agEdad as edad, agGenero as genero, usNum as num, usNombre as usuario, 
usContrasenia as contrasenia, usCorreo as correo, usTipoUS as tipo
from agente inner join usuario
on FK_usuario=usNum;


#select * from agente;
#select * from usuario;

select * from VW_agente_admin;


select * from lugar;
select * from agente;
select * from usuario;

insert into telef_agentes(tgTelefono,FK_agente) values('6647799903','VAC0FZA') ;



##------------------------------------------ Espacio -----------------------------------------------

create view VW_espacios_admim as 
select espNombre nombre, espNum numero from espacio;

#select * from VW_espacios_admim;

##------------------------------------------Espacios X lugar ---------------------------------------

#drop view VW_lugEspacios ;

create view VW_lugEspacios as
select lg_numEspacio numEsp, lg_NumLugar numLugar,espNombre nombre from lugespacio join espacio 
on lg_NumEspacio=espNum order by lg_NumLugar;


#select * from vw_lugEspacios;

select * from vw_lugEspacios where numLugar=1;

##------------------------------------------ Tipos_Lugares -----------------------------------------

create view VW_tipolugares_admin as
select tlNum numero, tlNombre nombre from tipolugar;

#select * from VW_tipolugares_admin;

##--------------------------------------------- EL basurero -----------------------------------------------
select DISTINCT num, Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list where (Categoria =1  and Costo = 2500) or (categoria=1);

select * from vw_lugares_filtros_list;
