const express = require('express');
const router = express.Router();
const Marca = require('../models/Marca');
const { validationResult, check } = require('express-validator');

// Obtener todas las marcas
router.get('/', async (req, res) => {
    try {
        const marcas = await Marca.find();
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una marca por su ID
router.get('/:id', async (req, res) => {
    try {
        const marca = await Marca.findById(req.params.id);
        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }
        res.json(marca);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva marca
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
        const nuevaMarca = new Marca({
            nombre,
            estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        await nuevaMarca.save();
        res.status(201).json({ message: 'Marca creada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar una marca por su ID
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
        let marca = await Marca.findById(req.params.id);

        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }

        marca.nombre = nombre;
        marca.estado = estado;
        marca.fechaActualizacion = new Date();

        await marca.save();
        res.json({ message: 'Marca actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar una marca por su ID
router.delete('/:id', async (req, res) => {
    try {
        const marca = await Marca.findById(req.params.id);

        if (!marca) {
            return res.status(404).json({ message: 'Marca no encontrada' });
        }

        await marca.remove();
        res.json({ message: 'Marca eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
