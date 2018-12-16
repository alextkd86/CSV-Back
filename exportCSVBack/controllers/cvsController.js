/**
 * Created by apascual on 16/12/2018
 */
/***************************************
 ******    Controlador para CVS's  *****
 ***************************************/
var express = require('express'),
    router = express.Router(),
    FilesModel = require('../models/FilesModel'),
    Promise = require('promise'),
    moment = require('moment'),
    _ = require('lodash'),
    path = require('path'),
    constants = require('../util/constants'), 
    fs = require('fs'), 
    multer = require('multer'), 
    upload = multer({ dest: 'csv/' }), 
    csvFilePath='./csv/archivo.csv', 
    csv=require('csvtojson');

module.exports = function(app){
    app.use('/v01/csv', router);
}

/*
*   Rest encargado de cargar un CSV  
*/
router.post('/upload-csv', function (req, res) {
    csv({
            delimiter:";"
        })
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            //Volcamos los datos a nuestra DDBB
            var fileModel = null;
            //Procedemos a guardar los registros desde el CSV
            if(null !== jsonObj && undefined !== jsonObj && jsonObj.length !== 0) {
                for(let i=0; i<jsonObj.length; i++){
                    fileModel = new FilesModel(jsonObj[i]);
                    fileModel.save(function(err) {
                        if(err) throw err;
                        console.log("Guardado el registro con Numero de Factura: " + jsonObj[i].numberBill);
                    });
                }
                res.status(200).json("Datos importados correctamente");
            } else {
                res.status(406).send("No se han importado datos, ya que el fichero no contiene datos o no son válidos.");
            }
        });
});

/*
*   Dvuelve todas las facturas ordenadas por año
*   NOTA: No paginamos en servidor, nos traemos todos los registros.
*/
router.get('/getAll', function (req, res) {
    function findAllInvoices(){
        return new Promise(function(resolve, reject) {
            FilesModel
                .find()
                .sort("year")
                .exec(function (err, results) {
                    if (err) throw err;
                    if(results != null){
                        resolve(results);
                    }else{
                        reject(res.__('No existen datos en nuestra base de datos'));
                    }
                });
        });
    }
    findAllInvoices().then(
        function(data){
            return res.json(data);
        },
        function(err){
            return res.status(404).send(err);
        });
});

/*
* Actualiza un registro 
* NOTA: Solo le dejamos modificar el precio
*/
router.put('/update/bill/:id', function(req, res){
    function updateBill(){
        return new Promise(function(resolve, reject){
            FilesModel.findById(req.params.id, function (err, bill) {
                if(bill != null){
                    bill.price = req.body.price;
                    bill.save(function(err){
                        if(err) throw err;
                        resolve(bill);
                    });
              }else{
                reject('No existe un registro con ese id');
              }
            });
        });
    }

    updateBill().then(
        function(data){
            return res.json(data);
        },
        function(err){
            return res.status(401).send(err);
            
        });
    
});

/*
* Elimina un registro
*/
router.delete('/remove/:id', function(req, res){
    function deleteBill(){
        return new Promise(function(resolve, reject){
            FilesModel.findByIdAndRemove(req.params.id, function (err, result) {
                if(result !== null) {
                    resolve(result);
                } else {
                    reject("No existe un registro con el id: " + req.params.id + ". Por tanto, no se ha podido eliminar nada.");
                }
            });
        });
    }

    deleteBill().then(
        function(data){
            return res.json(data);
        },
        function(err){
            return res.status(404).send(err);
        });
    
});

