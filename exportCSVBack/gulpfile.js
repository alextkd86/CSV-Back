
/*
* Created by APJ on 16/12/2018
*/

var gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	plumber = require('plumber'),
	livereload = require('gulp-livereload');


gulp.task('development', function(){
	livereload.listen();
	nodemon({
		script: 'server.js',
		ext: 'js coffee',
		stdout: false
	}).on('readable', function(){
		this.stdout.on('data', function(chunk){
			if(/^Express server listening on port/.test(chunk)){
				livereload.changed(__dirname);
			}
		});
		this.stdout.pipe(process.stdout);
		this.stderr.pipe(process.stderr);
	});
});

//Iniciamos el servidor solo escribiendo  -->  gulp, ya que por defecto llama a la tarea 'development' que hemos definido arriba y lo inicia.
gulp.task('default', [
	'development'
]);