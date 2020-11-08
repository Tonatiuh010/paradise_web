############################################# RESERVADO NO! TOCAR ##################################################

# select * from agente where agMatricula like "a%" or agNombre like "a%" or agApPat like "a%";
select * from tipolugar;
use paradise;
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
	where dlNum is null
#------------------------------------------------------------------------------------------------------------------

#Procedimiento Almacenado para acceder a la vista "vw_lugar_complete_data"
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

call SP_lugares_complete_list(1);

#-----------------------------------------------------------------------------------------------------------------

#Vista de lugares para una consulta básica
create view vw_lugares_basic_list as
	select lugNum as 'No', lugNombre as Lugar, lugDescripcion as Descripcion, 
    lugCosto as Costo, lugCapacidad as Capacidad 
    from lugar;


select * from lugespacio;
select * from espacio;
select * from lugar;
#------------------------------------------------------------------------------------------------------------------

#SP o vista para los filtros de busqueda

alter view vw_lugares_filtros_list as
	select lugNum as num, lugNombre as Lugar, lugDescripcion as Descripcion, lugCosto as Costo, lugCapacidad as Capacidad,
	#--------- Estos campos se van a mandar a llamar cuando se seleccione la vista --------------------------------------#
	tlNum as Categoria, espNum as Espacio, mun_cod as Municipio
    #---------- Estos son campos que necesito unicamente para generar la busqueda ---------------------------------------#
	from vw_lugar_complete_data;

    

select Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list
where Capacidad>200 and (Espacio=3 or Espacio=4 or Espacio=5 or Espacio=6)
order by Costo asc;

select num, Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list
where Municipio='MXL' and Capacidad>=100 and Capacidad<=200;

select num, Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list where Categoria='3' ;

#----------------------------------------------------------------------------------------------------------------
select * from cliente;
select * from agente;

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
    

    select * from usuario;
    
#-----------------------------------------------------------------------------------------------------------------
alter view vw_cliente_perfil as	
    select cliNum as num, cliNombre as nombre, cliApPat as paterno, cliApMat as materno,  
	cliFecNac as nacimiento, cliEdad as edad, cliTelefono as telefono, usNum as num_us,
	usNombre as usuario, usContrasenia as contrasenia, usCorreo as email, usTipoUS as tipo
	from cliente inner join usuario
	on FK_usuario=usNum; 

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


select * from cliente;
select * from usuario;
select * from vw_cliente_perfil;

call sp_perfil_cliente (10);
#-----------------------------------------------------------------------------------------------------------------
#drop procedure sp_update_perfilCli;



/*
UPDATE cliente INNER JOIN usuario
ON FK_usuario = usNum 
SET usNombre = 'pancrasio'
where cliNum=2;
*/

select * from usuario;
select * from cliente;

#-----------------------------------------------------------------------------------------------------------------
select * from telef_agentes;

create view vw_agente_telefonos as
select tgNum as num, tgTelefono as telefono, FK_agente as agente from telef_agentes;

select num, telefono from vw_agente_telefonos where agente=?;

#-----------------------------------------------------------------------------------------------------------------
#--->POST_RESERVACION

/*insert pre_reservacion(prFechaRegistro,prFechaInic,prFechaFin,prStatus,prNotas,FK_Lugar,FK_cliente) values
('2020-11-07 15:22:10','2020-12-20','2020-12-23','Proceso','Aun sin autorizar',4,10);*/

alter view vw_reservacion_completa as
select prNum as num, prFechaRegistro as registro, prFechaInic as inicio, prFechaFin as termino,
prStatus as estado, prNotas as notas, FK_Lugar as lugar, FK_Cliente as cliente, FK_Agente as agente,
resFecConfirmacion as confirmacion, resTotDias as dias, resTotPagar as total 
from pre_reservacion inner join reservacion
on prNum=resNumPR;

select * from vw_reservacion_completa;
select * from pre_reservacion;

###########################################  FIN DEL RESERVADO #####################################################
# where lugNombre like "a%" or lugDescripcion like "a%" or FK_Municipio like "a%" or FK_Direccion like "a%";

select * from lugar;
select * from diclugar;
select * from espacio;


######################################### Vistas ####################################

drop view VW_lugar_admin ;
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
where dl.dlNum is null
;

select * from VW_lugar_admin where nombre='Salón Toscano';


##----------------------------------------- Lugar Admin -----------------------------------
/*concat(day(agFecNac),' de ',monthname(agFecNac),' del ',year(agFecNac))*/

drop view VW_agente_admin ;

alter view VW_agente_admin as 
select agMatricula as matricula, agNombre as nombre,agApPat as paterno,agApMat as materno,agFecNac as
nacimiento,agEdad as edad, agGenero as genero, usNum as num, usNombre as usuario, 
usContrasenia as contrasenia, usCorreo as correo, usTipoUS as tipo
from agente inner join usuario
on FK_usuario=usNum;

select * from agente;
select * from usuario;

insert into telef_agentes(tgTelefono,FK_agente) values('6647799903','VAC0FZA') ;

##------------------------------------------ Espacio -----------------------------------------------

create view VW_espacios_admim as 
select espNombre nombre, espNum numero from espacio;

select * from VW_espacios_admim;

##------------------------------------------Espacios X lugar ---------------------------------------

drop view VW_lugEspacios ;
create view VW_lugEspacios as
select lg_numEspacio numEsp, lg_NumLugar numLugar,espNombre nombre from lugespacio join espacio 
on lg_NumEspacio=espNum order by lg_NumLugar;

select * from vw_lugEspacios;
##------------------------------------------ Tipos_Lugares -----------------------------------------

create view VW_tipolugares_admin as
select tlNum numero, tlNombre nombre from tipolugar;
select * from VW_tipolugares_admin;

##--------------------------------------------- EL basurero -----------------------------------------------

