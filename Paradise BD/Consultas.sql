select * from agente where agMatricula like "a%" or agNombre like "a%" or agApPat like "a%";

select lugNombre as lugar, lugDescripcion as descripcion, lugCosto as costo, 
lugCapacidad as capacidad, tl.tlNombre as tipo, 
concat(dlCalle,' cp ',dlCP,' #',dlNumInterior,' ext.',dlNumExterior) as direccion,
mun_nombre as municipio, espNombre as espacios
from lugar as lug inner join tipolugar as tl
on lug.FK_TipoL= tl.tlNum inner join diclugar as dicl
on lug.FK_Direccion= dicl.dlNum inner join municipio as mun
on FK_Municipio= mun_cod inner join lugespacio as luge
on lug.lugCod= lg_CodLugar inner join espacio as esp
on lg_NumEspacio= espNum;

# where lugNombre like "a%" or lugDescripcion like "a%" or FK_Municipio like "a%" or FK_Direccion like "a%";

select pro_Nombre as proveedor, pro_Descripcion as descripcion, pro_Sitio as sitio from proveedor;


######################################### Vistas ####################################


create view VW_lugar_admin as 
select lugNum numero,lugNombre nombre,lugDescripcion _desc,lugCosto costo,lugCapacidad capacidad 
from 
lugar l join tipolugar tl on l.FK_TipoL=tl.tlNum
join municipio m  on m.mun_cod=l.FK_Municipio
join diclugar dl on dl.dlNum=l.lugNum
;

select * from VW_lugar_admin;

##----------------------------------------- Lugar Admin -----------------------------------

drop view VW_agente_admin ;
create view VW_agente_admin as 
select agMatricula matricula, agNombre nombre,agApPat apPat,agApMat apMat,agFecNac/*concat(day(agFecNac),' de ',monthname(agFecNac),' del ',year(agFecNac))*/ nacimiento, g.genNombre genero from agente ag join genero g on ag.FK_genero=g.genCod;

##------------------------------------------ Espacio -----------------------------------------

create view VW_espacios_admim as 
select espNombre nombre, espNum numero from espacio;
