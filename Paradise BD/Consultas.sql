create view vw_lugar_complete_data as
	select * from lugar left join tipoLugar 
	on FK_TipoL=tlNum left join dicLugar 
	on dlNum=lugNum left join municipio 
	on mun_cod=FK_Municipio left join lugEspacio 
	on lg_NumLugar=lugNum left join espacio 
	on lg_NumEspacio=espNum
	union all 
	select * from lugar right join tipoLugar 
	on FK_TipoL=tlNum right join dicLugar 
	on dlNum=lugNum right join municipio 
	on mun_cod=FK_Municipio right join lugEspacio 
	on lg_NumLugar=lugNum right join espacio 
	on lg_NumEspacio=espNum 
	where dlNum is null;

create view vw_lugares_basic_list as
	select lugNum as 'No', lugNombre as Lugar, lugDescripcion as Descripcion, 
    lugCosto as Costo, lugCapacidad as Capacidad 
    from lugar;

create view vw_lugares_filtros_list as
	select lugNum as num, lugNombre as Lugar, lugDescripcion as Descripcion, lugCosto as Costo, lugCapacidad as Capacidad,
	tlNum as Categoria, espNum as Espacio, mun_cod as Municipio
	from vw_lugar_complete_data;

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
    
	create view vw_cliente_perfil as	
    select cliNum as num, cliNombre as nombre, cliApPat as paterno, cliApMat as materno,  
	cliFecNac as nacimiento, cliEdad as edad, cliTelefono as telefono, usNum as num_us,
	usNombre as usuario, usContrasenia as contrasenia, usCorreo as email, usTipoUS as tipo
	from cliente inner join usuario
	on FK_usuario=usNum; 

create view vw_agente_telefonos as
select tgNum as num, tgTelefono as telefono, FK_agente as agente from telef_agentes;

create view vw_reservacion_completa as
select prNum as num,
date_format(prFechaRegistro, '%d-%m-%Y  %h:%i') as fechas,
date_format(prFechaInic, '%d-%m-%Y') as inicio,
date_format(prFechaFin, '%d-%m-%Y') as termino,
prStatus as estado, 
prNotas as notas, 
FK_Lugar as lugar, 
FK_Cliente as cliente, 
FK_Agente as agente,
date_format(resFecConfirmacion, '%d-%m-%Y  %h:%i') as confirmacion,
resTotDias as dias, resTotPagar as total 
from pre_Reservacion left join reservacion
on prNum=resNumPR
union all
select prNum as num, 
date_format(prFechaRegistro, '%d-%m-%Y  %h:%i') as registro,
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
from pre_Reservacion right join reservacion
on prNum=resNumPR
where resFecConfirmacion is null or resTotDias is null or resTotPagar is null;

CREATE VIEW VW_lugar_admin AS
    SELECT 
        lugNum numero,
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
    FROM
        lugar l
            LEFT JOIN
        tipoLugar tl ON l.FK_TipoL = tl.tlNum
            LEFT JOIN
        dicLugar dl ON dl.dlNum = l.lugNum
            LEFT JOIN
        municipio m ON m.mun_cod = dl.FK_Municipio 
    UNION ALL SELECT 
        lugNum numero,
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
    FROM
        lugar l
            RIGHT JOIN
        tipoLugar tl ON l.FK_TipoL = tl.tlNum
            RIGHT JOIN
        dicLugar dl ON dl.dlNum = l.lugNum
            RIGHT JOIN
        municipio m ON m.mun_cod = dl.FK_Municipio
    WHERE
        dl.dlNum IS NULL;

CREATE view VW_agente_admin as 
select agMatricula as matricula, agNombre as nombre,agApPat as paterno,agApMat as materno,agFecNac as
nacimiento,agEdad as edad, agGenero as genero, usNum as num, usNombre as usuario, 
usContrasenia as contrasenia, usCorreo as correo, usTipoUS as tipo
from agente inner join usuario
on FK_usuario=usNum;

create view VW_espacios_admim as 
select espNombre nombre, espNum numero from espacio;

create view VW_lugEspacios as
select lg_numEspacio numEsp, lg_NumLugar numLugar,espNombre nombre from lugEspacio join espacio 
on lg_NumEspacio=espNum order by lg_NumLugar;

create view VW_tipolugares_admin as
select tlNum numero, tlNombre nombre from tipoLugar;

