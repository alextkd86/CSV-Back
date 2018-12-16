/**
 * Created by apascual on 16/12/2018
 */

/************************************************************************************************************************************************
***************** Archivo en el que definimos la configuración de Express y de la estrategia de login (PASSPORT.JS)******************************
*************************************************************************************************************************************************/

/****************************************************
*		CARGAMOS LOS MÓDULOS QUE NECESITAMOS
****************************************************/
var express = require('express'),
	glob = require('glob'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	compress = require('compression'),
	methodOverride = require('method-override'),
	mongoose = require('mongoose'),
	constants = require('../util/constants');

/*******************************************************************************
*		DEFINIMOS UNA FUNCIÓN A EXPORTAR PARA LLAMARLA DESDE NUESTRO app.js
*******************************************************************************/
module.exports = function(app, config){
	var env = process.env.NODE_ENV || 'development';
	app.locals.ENV = env;
	app.locals.ENV_DEVELOPMENT = env == 'development';

	app.use(logger('dev'));
	//Ahora le decimos a la aplicación que use el módulo body-parser
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(compress());
	app.use(methodOverride());

	app.use(function(req, res, next) { //allow cross origin requests
        var allowedOrigins = [constants.ACCESS_CONTROL_ALLOW_ORIGIN];
		var origin = req.headers.origin;
		if(allowedOrigins.indexOf(origin) > -1){
		     res.setHeader('Access-Control-Allow-Origin', origin);
		}
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });

	/*******************************************************************************
	*						CARGAMOS TODOS LOS CONTROLLERS
	*******************************************************************************/
	var controllers = glob.sync(config.root + '/controllers/*.js');
	controllers.forEach(function(controller){
		console.log(controller);
		require(controller)(app);
	});
}