/*
* Created by APJ on 16/12/2018
*/

var express = require('express'),
	//Cargamos la configuración del puerto, de la base de datos que vamos a usar, etc..
	config = require('./configuration/configEnviroment'),
	glob = require('glob'),
	mongoose = require('mongoose');

/***************************************************************
* Nos concetamos a la base de datos definida en configEnviroment
***************************************************************/
// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useMongoClient: true });
//Controlamos si salta algún error en la base de datos
var dataBase = mongoose.connection;
dataBase.on('error', function(){
	throw new Error("You don't connect to the database: " + config.db);
});
//Mostramos por consola si la base de datos se ha arrancado correctamente
dataBase.on('open', function(err){
	if(err){
		throw err;
	}
	console.log("Mongoose is connected to the DDBB: " + config.db);
});

/**********************************************************************
* Cargamos todos los documentos de la base de datos para poder usarlos
**********************************************************************/
var models = glob.sync(config.root + '/models/*.js');
models.forEach(function(model){
	require(model);
});

var app = express();

//Cargamos el archivo configExpress
require('./configuration/configExpress')(app, config);

//Arrancamos el servidor
var server = app.listen(config.port, function(){
	console.log('Express server listening on port: ' + config.port);
});
