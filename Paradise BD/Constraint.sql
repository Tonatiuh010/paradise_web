use paradise;

alter table agente
add constraint UQ_agNombre_Completo unique(agNombre,agApPat,agApMat);

alter table cliente
add constraint UQ_cliNombre_Completo unique(cliNombre,cliApPat,cliApMat);

alter table cliente
drop constraint UQ_cliNombre_Completo;

alter table diclugar
alter dlNumExterior set default 'n/a';

alter table cliente
ADD CONSTRAINT CK_cliente_edad CHECK (cliEdad>=18);

alter table agente
add constraint CK_agente_edad check(agEdad>=18);

alter table agente
add constraint CK_agente_genero check(agGenero = 'Masculino' or 'Femenino');
