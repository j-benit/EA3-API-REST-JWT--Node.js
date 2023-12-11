const{ Schema, model} = require('mongoose');
const InventarioSchema =Schema({
    serial: {type: String, required: true,unique: true},
    nombre: {type: String, required: true},
    descripcion:{typo: String, required: true},
   color:{type:String, required: true},
    foto:{type: String, required: true},
    fechaCompra:{type: Date, required: true},
    precio: {type: Number, required: true},
    usuario:{type: Schema.ObjectId, ref:'usuario', required: false},
    marca:{type: Schema.ObjectId, ref:'marca', required: false},
    tipoEquipo:{type: Schema.ObjectId, ref:'tipoEquipo', required: false},
    fechaCreacion:{type: Date, required: true},
    fechaActualizacion:{type: Date, required: true}
 
});
module.exports= model('inventario',InventarioSchema);
module.exports = router;
