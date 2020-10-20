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

select pro_Nombre as proveedor, pro_Descripcion as descripcion, pro_Sitio as sitio from proveedor