create database paradise;
use paradise;

create table dicLugar
(
	dlNum tinyint auto_increment not null,
	dlCalle	varchar(40) not null,
	dlNumInterior varchar(25) not null,	
	dlNumExterior varchar(25) null,	
	dlCP char(5) not null,
    
    constraint PK_dicLugar_num primary key (dlNum)
);

create table municipio
(	
	mun_cod	char(3) not null,
	mun_nombre	varchar(10)	not null,
    
	constraint PK_municipio_cod primary key (mun_cod)
);

create table proveedor
(		
	pro_Cod	char(5) not null,
	pro_Nombre	varchar(50) not null,	
	pro_Descripcion	text null,	
	pro_Sitio	varchar(60) null,
	
    constraint PK_proveedor_cod primary key (pro_Cod)
);

create table correo_proveedor
(		
	cpNum int auto_increment not null,
	cpCorreo varchar(40) not null,
	FK_Proveedor char(5) not null,
    
    constraint PK_correoPro_num primary key (cpNum),
    constraint FK_correoPro_proveedor foreign key (FK_Proveedor) references proveedor(pro_Cod) on delete cascade
);
		
create table telef_proveedor
(		
	tpNum int auto_increment not null,	
	tpTelefono char(10) not null,	
	FK_Proveedor char(5) not null,
	
    constraint PK_telefonoPro_num primary key (tpNum),
    constraint FK_telefonoPro_proveedor foreign key (FK_Proveedor) references proveedor(pro_Cod) on delete cascade
);

create table tipoLugar
(		
	tlNum	int	auto_increment not null,
	tlNombre varchar(30) not null,
	
    constraint PK_tipoLugar_num primary key (tlNum)
);

create table espacio
(		
	espNum	int	auto_increment not null,
	espNombre varchar(20) not null,
    
    constraint PK_espacio_num primary key (espNum)
);	

create table metodoPag
(		
	mp_Num int auto_increment not null,
	pm_Metodo varchar(30) not null,
    
    constraint PK_metodoPag_num primary key (mp_Num)
);	

create table genero
(		
	genCod	char(1)	not null,
	Nombre	varchar(15) not null,
    
    constraint PK_genero_cod primary key (genCod)
);	

create table agente
(		
	agMatricula	char(7) not null,
	agNombre varchar(40) not null,
	agApPat	varchar(20) not null,	
	agApMat	varchar(20)	null,
	agFecNac date not null,	
	agEdad tinyint,	
	FK_genero char(1) null,
    
    constraint PK_agente_matricula primary key (agMatricula),
    constraint FK_agente_genero foreign key (FK_genero) references genero(genCod) on delete cascade
);

create table telef_agentes
(		
	tgNum	int	auto_increment not null,
	tgTelefono	char(10) not null,	
	FK_agente	char(7)	 not null,
    
    constraint PK_telAgente_num primary key (tgNum),
    constraint FK_telAgente_agente foreign key (FK_agente) references agente(agMatricula) on delete cascade
);

create table correo_agentes
(		
	caNum int auto_increment not null,
	caCorreo varchar(40) not null,	
	FK_agente char(7) not null,
    
    constraint PK_correoAg_num primary key (caNum),
    constraint FK_correoAg_agente foreign key (FK_agente) references agente(agMatricula) on delete cascade
);

create table cliente
(		
	cliNum	int auto_increment not null,
	cliNombre	varchar(40)	not null,
	cliApPat	varchar(20)	not null,
	cliApMat	varchar(20)	null,
	cliFecNac	date not null,
	cliEdad	tinyint	null,
    
    constraint PK_cliente_num primary key (cliNum)
);

/*create table correo_clientes
(		
	ccNum	int	auto_increment not null,
	ccCorreo	varchar(40)	not null,
	FK_cliente	int	not null,
    
    constraint PK_correoCli_num primary key (ccNum),
    constraint FK_correoCli_cliente foreign key (FK_cliente) references cliente(cliNum) on delete cascade
);*/
		
create table telef_clientes
(		
	tcNum	int	auto_increment not null,
	tcTelefono	char(10) not null,
	FK_cliente	int	not null,

    constraint PK_telefCli_num primary key (tcNum),
    constraint FK_telefCli_cliente foreign key (FK_cliente) references cliente(cliNum) on delete cascade
);

create table tipo_US
(		
	tuCod	char(3)	not null,
	tuTipo	varchar(20)	not null,
    
    constraint PK_tipoUS_cod primary key (tuCod)
);

create table usuario
(		
	usNum	int	auto_increment not null,
	usNombre	varchar(30)	not null,
	usContrasenia	varchar(30)	not null,
    usCorreo varchar(30) not null,
	FK_TipoUS	char(3)	null,
	FK_Cliente	int	null,
	FK_Agente	char(7)	null,
    
    constraint PK_usuario_num primary key (usNum),
    constraint UQ_usuario_correo unique (usCorreo),
    constraint FK_usuario_cliente foreign key (FK_cliente) references cliente(cliNum) on delete cascade,
    constraint FK_usuario_agente foreign key (FK_agente) references agente(agMatricula) on delete cascade,
    constraint FK_usuario_tipoUS foreign key (FK_TipoUS) references tipo_US(tuCod) on delete cascade
);

# ALTER TABLE usuario CHANGE `usContraseña` `usContrasenia` varchar(30);

create table lugar
(
	lugCod	char(5)	not null,   
	lugNombre varchar(30) not null,	
	lugDescripcion text null,	
	lugCosto decimal(6,2) null,
	lugCapacidad int null,	
	FK_TipoL int null not null,	                          
	FK_Direccion tinyint null,	                   
	FK_Municipio char(3) not null,	                   
	FK_Proveedor char(5) null,	                   
    
	constraint PK_lugar_num primary key (lugCod),
    constraint FK_lugar_tipoL foreign key (FK_TipoL) references TipoLugar(tlNum) on delete cascade,
    constraint FK_lugar_direccion foreign key (FK_direccion) references dicLugar(dlNum) on delete cascade,
    constraint FK_lugar_municipio foreign key (FK_Municipio) references municipio(mun_Cod) on delete cascade,
    constraint FK_lugar_proveedor foreign key (FK_Proveedor) references proveedor(pro_Cod) on delete cascade,
    
    
	constraint CK_lugar_costo check(lugCosto>0),
	constraint CK_lugar_capacidad check(lugCapacidad>0),
	constraint UQ_lugar_nombre unique(lugNombre)
);

create table imagenes
(		
	img_Num	int	auto_increment not null,
	img_Nombre	varchar(50)	not null,
	img_Descripcion	text null,	
	# img_Imagen blob not null,	
	FK_Lugar char(5) not null,
    
    constraint PK_imagenes_Num primary key (img_Num),
    constraint FK_imagenes_lugar foreign key (FK_Lugar) references lugar(lugCod) on delete cascade
);

create table lugEspacio
(		
	lg_NumEspacio int not null,
	lg_CodLugar	char(5) not null,
	lg_Descripcion	varchar(50) null,
	
    constraint FK_lugEspacio_numEspacio foreign key (lg_NumEspacio) references espacio(espNum) on delete cascade,
    constraint FK_lugEspacio_numLugar foreign key (lg_CodLugar) references lugar(lugCod) on delete cascade
);

alter table lugEspacio
add constraint FK_lugEspacio
primary key (lg_NumEspacio, lg_CodLugar);

create table Post_Reservacion
(		
	prNum	int	auto_increment not null,
	prFechaRegistro datetime not null,	
	prFechaEsperada date not null,	
	FK_Lugar char(5) not null,
	FK_Cliente int not null,
	FK_Agente char(7) null,
    
    constraint PK_postReserv_num primary key (prNum),
	constraint FK_postReserv_lugar foreign key (FK_Lugar) references lugar(lugCod) on delete cascade,
    constraint FK_postReserv_cliente foreign key (FK_Cliente) references cliente(cliNum) on delete cascade,
    constraint FK_postAgente_agente foreign key (FK_Agente) references agente(agMatricula) on delete cascade
);
		
create table reservacion
(		
	resConsecutivo int auto_increment not null,
	resNumPR int not null,	
	resFechaProceso	datetime not null,	
	resFechaInic date not null,	
	resFechaFin	date not null,	
	resTotalDias tinyint null,	
	resTotPagar decimal(6,2) null,	
	FK_MetPago int null,
	FK_lugar char(5) not null,
	FK_cliente int not null,
	FK_agente char(7) null,
    
    constraint PK_reservacion_consec primary key (resConsecutivo),
	constraint FK_reservacion_metPago foreign key (FK_MetPago) references metodoPag(mp_Num) on delete cascade,
    constraint FK_reservacion_lugar foreign key (FK_lugar) references lugar(lugCod) on delete cascade,
    constraint FK_reservacion_cliente foreign key (FK_Cliente) references cliente(cliNum) on delete cascade,
    constraint FK_reservacion_agente foreign key (FK_Agente) references agente(agMatricula) on delete cascade
);

create table agentes_Baja
(
	abConsecutivo	int auto_increment not null,
	abMatricula	char(7) not null,	
	abNombre	varchar(40)	not null,
	abApPat	varchar(20)	not null,
	abApMat	varchar(20)	null,
	abFecNac	date	not null,
	abEdad	tinyint	null,
	abCorreo	varchar(30) not null,	
	abContrasenia	varchar(30)	not null,
	FK_genero	char(1)	not null, 
	FK_TipoUS	char(3)	not null,
    
    constraint PK_agBaja_consecutivo primary key (abConsecutivo),
    constraint FK_agBaja_tipoUS foreign key (FK_TipoUS) references tipo_US(tuCod) on delete cascade,
    constraint FK_agBaja_genero foreign key (FK_genero) references genero(genCod) on delete cascade
);		

create table clientes_Baja
(		
	cbNum	int	auto_increment not null,
	cbNombre	varchar(40)	not null,
	cbApPat	varchar(20)	not null,
	cbApMat	varchar(20)	null,
	cbFecNac	date not null,
	cbEdad	tinyint	null,
	cbCorreo	varchar(30) not null,	
	cbContrasenia	varchar(30)	not null,
	FK_TipoUS	char(3)	not null,
    
    constraint PK_cliBaja_num primary key (cbNum),
    constraint FK_cliBaja_tipoUS foreign key (FK_TipoUS) references tipo_US(tuCod) on delete cascade
);


