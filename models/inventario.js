const { Schema, model } = require('mongoose');

const InventarioSchema = new Schema({
    serial: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },  // Fixed typo
    color: { type: String, required: true },
    foto: { type: String, required: true },
    fechaCompra: { type: Date, required: true },
    precio: { type: Number, required: true },
    usuario: { type: Schema.ObjectId, ref: 'usuario', required: false },
    marca: { type: Schema.ObjectId, ref: 'marca', required: false },
    tipoEquipo: { type: Schema.ObjectId, ref: 'tipoEquipo', required: false },
    fechaCreacion: { type: Date, required: true },
    fechaActualizacion: { type: Date, required: true }
});

module.exports = model('Inventario', InventarioSchema); // Single module.exports statement
