const{ Schema, model} = require('mongoose');
const TipoEquipoSchema =Schema({
    nombre: {type: String, required: true},
    estado:{typo: String, required: true,enum: ['activo','inactivo']},
    fechaCreacion:{type: Date, required: true},
    fechaActualizacion:{type: Date, required: true}

});
module.exports= model('tipoEquipo,',TipoEquipoSchema);