use paradise;

alter table agente
add constraint UQ_agNombre_Completo unique(agNombre,agApPat,agApMat);

alter table cliente
add constraint UQ_cliNombre_Completo unique(cliNombre,cliApPat,cliApMat);

alter table cliente
drop constraint UQ_cliNombre_Completo;

alter table diclugar
alter dlNumExterior set default 'n/a';
