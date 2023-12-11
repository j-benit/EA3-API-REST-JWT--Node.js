const express = require('express');
const router = express.Router();
const TipoEquipo = require('../models/TipoEquipo');
const { validationResult, check } = require('express-validator');

// Obtener todos los tipos de equipo
router.get('/', async (req, res) => {
    try {
        const tiposEquipo = await TipoEquipo.find();
        res.json(tiposEquipo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un tipo de equipo por su ID
router.get('/:id', async (req, res) => {
    try {
        const tipoEquipo = await TipoEquipo.findById(req.params.id);
        if (!tipoEquipo) {
            return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
        }
        res.json(tipoEquipo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo tipo de equipo
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['activo', 'inactivo']),
    // Agregar otras validaciones según tus necesidades
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, estado } = req.body;

    try {
        const nuevoTipoEquipo = new TipoEquipo({
            nombre,
            estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        await nuevoTipoEquipo.save();
        res.status(201).json({ message: 'Tipo de equipo creado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un tipo de equipo por su ID
router.put('/:id', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['activo', 'inactivo']),
    // Agregar otras validaciones según tus necesidades
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, estado } = req.body;

    try {
        let tipoEquipo = await TipoEquipo.findById(req.params.id);

        if (!tipoEquipo) {
            return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
        }

        tipoEquipo.nombre = nombre;
        tipoEquipo.estado = estado;
        tipoEquipo.fechaActualizacion = new Date();

        await tipoEquipo.save();
        res.json({ message: 'Tipo de equipo actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un tipo de equipo por su ID
router.delete('/:id', async (req, res) => {
    try {
        const tipoEquipo = await TipoEquipo.findById(req.params.id);

        if (!tipoEquipo) {
            return res.status(404).json({ message: 'Tipo de equipo no encontrado' });
        }

        await tipoEquipo.remove();
        res.json({ message: 'Tipo de equipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
