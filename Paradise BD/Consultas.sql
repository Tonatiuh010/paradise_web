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
#ESTO ES UNA PRUEBA, NO TOCAR!!!!!

create view vw_lugares_filtros_list as
	select lugNum as 'No', lugNombre as Lugar, lugDescripcion as Descripcion, lugCosto as Costo, lugCapacidad as Capacidad,
	#--------- Estos campos se van a mandar a llamar cuando se seleccione la vista --------------------------------------#
	tlNum as Categoria, espNum as Espacio, mun_cod as Municipio
    #---------- Estos son campos que necesito unicamente para generar la busqueda ---------------------------------------#
	from lugar inner join diclugar
	on dlNum = lugNum inner join municipio
	on FK_Municipio=mun_cod inner join tipolugar
	on FK_TipoL=tlNum inner join lugespacio
	on lg_NumLugar=lugNum inner join espacio
	on lg_NumEspacio=espNum;

    

select Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list
where Capacidad>200 and (Espacio=3 or Espacio=4 or Espacio=5 or Espacio=6)
order by Costo asc;

select 'No',Lugar, Descripcion, Costo, Capacidad from vw_lugares_filtros_list
where Municipio='MXL' and Capacidad>=100 and Capacidad<=200;

select Lugar, Descripcion, Costo, Capacidad, Espacio from vw_lugares_filtros_list;

###########################################  FIN DEL RESERVADO #####################################################
# where lugNombre like "a%" or lugDescripcion like "a%" or FK_Municipio like "a%" or FK_Direccion like "a%";



select * from lugar;
select * from diclugar;
select * from espacio;



######################################### Vistas ####################################

drop view VW_lugar_admin ;
create view VW_lugar_admin as 
select lugNum numero,lugNombre nombre,lugDescripcion _desc,lugCosto costo,lugCapacidad capacidad,tlNombre tipoLugar,dlCalle calle,dlNumInterior numInterior, dlNumExterior numExterior,dlCP CP
from 
lugar l left join tipolugar tl on l.FK_TipoL=tl.tlNum
left join municipio m  on m.mun_cod=l.FK_Municipio
left join diclugar dl on dl.dlNum=l.lugNum
union all 
select lugNum numero,lugNombre nombre,lugDescripcion _desc,lugCosto costo,lugCapacidad capacidad,tlNombre tipoLugar,dlCalle calle,dlNumInterior numInterior, dlNumExterior numExterior,dlCP CP
from 
lugar l right join tipolugar tl on l.FK_TipoL=tl.tlNum
right join municipio m  on m.mun_cod=l.FK_Municipio
right join diclugar dl on dl.dlNum=l.lugNum
where dl.dlNum is null
;

select * from VW_lugar_admin where nombre='Salón Toscano';


##----------------------------------------- Lugar Admin -----------------------------------

drop view VW_agente_admin ;
create view VW_agente_admin as 
select agMatricula matricula, agNombre nombre,agApPat apPat,agApMat apMat,agFecNac/*concat(day(agFecNac),' de ',monthname(agFecNac),' del ',year(agFecNac))*/ nacimiento, g.genNombre genero from agente ag join genero g on ag.FK_genero=g.genCod;

##------------------------------------------ Espacio -----------------------------------------

create view VW_espacios_admim as 
select espNombre nombre, espNum numero from espacio;

select * from VW_espacios_admim;

##------------------------------------------ Tipos_Lugares -----------------------------------------

create view VW_tipolugares_admin as
select tlNum numero, tlNombre nombre from tipolugar;
select * from VW_tipolugares_admin;

 
select * from lugar where FK_tipoL in (select tlNum from tipolugar);

select * from VW_lugar_admin where nombre like '%';

call SP_lugares_complete_list (9);

##--------------------------------------------- EL basurero -----------------------------------------------




DELIMITER //
create procedure SP_lugares_complete_list_ts
(
	in numLug int
)
begin
	select * from VW_lugar_admin where numero=numLug;
end//
DELIMITER ;


call SP_lugares_complete_list_ts (9);