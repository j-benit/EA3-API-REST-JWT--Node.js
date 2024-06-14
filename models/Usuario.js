const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    estado: { type: String, required: true, enum: ['activo', 'inactivo'] }, // Fixed typo
    password: { type: String, required: true },
    rol: { type: String, required: true, enum: ['Administrador', 'Docente'] },
    fechaCreacion: { type: Date, default: Date.now, required: true },
    fechaActualizacion: { type: Date, default: Date.now, required: true }
});



module.exports = model('Usuario', UsuarioSchema);