/**
 * Created by apascual on 16/12/2018
 */

 var constants = require('../util/constants');
//Nos creamos la variable mongoose para poder trabajar con esta librería (ORM de MongoDB)
var mongoose = require('mongoose');
//Esta var llamara Schema es para crearme el schema de Videos
var Schema = mongoose.Schema;

//Nos creamos la estructura de la tabla Videos
var FileSchema = new Schema({
    nameClient: String,
    city: String,
    nif: String, 
    month: {
        type: String,
        enum: [constants.MONTH1, constants.MONTH2, constants.MONTH3, constants.MONTH4, constants.MONTH5, constants.MONTH6, 
        constants.MONTH7, constants.MONTH8, constants.MONTH9, constants.MONTH10, constants.MONTH11, constants.MONTH12]
    }, 
    year: Number,
    numberBill: String,
    price: Number
});

//Exportamos el modelo para que se pueda utilizar fuera de este archivo.
//Le pasamos el nombre con el que lo vamos a usar y la referencia al esquema
module.exports = mongoose.model("FilesModel", FileSchema);