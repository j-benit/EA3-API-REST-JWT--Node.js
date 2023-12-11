const express = require('express');
const router = express.Router();
const EstadoEquipo = require('../models/EstadoEquipo');
const { validationResult, check } = require('express-validator');

// Obtener todos los estados de equipo
router.get('/', async (req, res) => {
    try {
        const estadosEquipo = await EstadoEquipo.find();
        res.json(estadosEquipo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un estado de equipo por su ID
router.get('/:id', async (req, res) => {
    try {
        const estado = await EstadoEquipo.findById(req.params.id);
        if (!estado) {
            return res.status(404).json({ message: 'Estado de equipo no encontrado' });
        }
        res.json(estado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo estado de equipo
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['activo', 'inactivo']),
    // Agrega otras validaciones según tus necesidades
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, estado } = req.body;

    try {
        const nuevoEstadoEquipo = new EstadoEquipo({
            nombre,
            estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        await nuevoEstadoEquipo.save();
        res.status(201).json({ message: 'Estado de equipo creado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un estado de equipo por su ID
router.put('/:id', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['activo', 'inactivo']),
    // Agrega otras validaciones según tus necesidades
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, estado } = req.body;

    try {
        let estadoEquipo = await EstadoEquipo.findById(req.params.id);

        if (!estadoEquipo) {
            return res.status(404).json({ message: 'Estado de equipo no encontrado' });
        }

        estadoEquipo.nombre = nombre;
        estadoEquipo.estado = estado;
        estadoEquipo.fechaActualizacion = new Date();

        await estadoEquipo.save();
        res.json({ message: 'Estado de equipo actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un estado de equipo por su ID
router.delete('/:id', async (req, res) => {
    try {
        const estadoEquipo = await EstadoEquipo.findById(req.params.id);

        if (!estadoEquipo) {
            return res.status(404).json({ message: 'Estado de equipo no encontrado' });
        }

        await estadoEquipo.remove();
        res.json({ message: 'Estado de equipo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
