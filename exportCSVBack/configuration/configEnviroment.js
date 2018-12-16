/**
 * Created by apascual on 16/12/2018.
 */

/************************************************************************************************************************************
*****    En este archivo está la configuración de en que tipo de entorno estamos trabajando: Desarrollo, Test o Produccion.   *******
*************************************************************************************************************************************/

var path = require('path'),
	// __dirname hace referencia a la ruta en la cual se encuentra el archivo que actualmente se está ejecutando
	rootPath = path.normalize(__dirname + '/..'),
	env = process.env.NODE_ENV || 'development';

//Declaramos 3 tipos de configuración: Desarrollo, test y producción
var config = {
	development: {
		root: rootPath,
		app: {
			name: 'exportCSVDevelopment'
		},
		port: 3001,
		db: 'mongodb://127.0.0.1:27017/exportCSVDevelopment'
	},
	test: {
		root: rootPath,
		app: {
			name: 'exportCSVTest'
		},
		port: 3002,
		db: 'mongodb://127.0.0.1:27017/exportCSVTest'
	},
	production: {
		root: rootPath,
		app: {
			name: 'exportCSV'
		},
		port: 3003,
		db: 'mongodb://127.0.0.1:27017/exportCSVProduction'
	}
};

//Exportamos el modulo que vamos a usar en app.js y express.js para saber a que puerto y a que base de datos nos vamos a conectar
module.exports = config[env];