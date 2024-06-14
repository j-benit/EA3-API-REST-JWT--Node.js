const { Schema, model } = require('mongoose');

const TipoEquipoSchema = new Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true, enum: ['activo', 'inactivo'] }, // Fixed typo
    fechaCreacion: { type: Date, default: Date.now, required: true },
    fechaActualizacion: { type: Date, default: Date.now, required: true }
});



module.exports = model('TipoEquipo', TipoEquipoSchema);