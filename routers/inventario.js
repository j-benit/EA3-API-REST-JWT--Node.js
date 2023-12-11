const express = require('express');
const router = express.Router();
const Inventario = require('../models/Inventario');
const { validationResult, check } = require('express-validator');

// Obtener todos los elementos del inventario
router.get('/', async (req, res) => {
    try {
        const inventario = await Inventario.find();
        res.json(inventario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un elemento del inventario por su ID
router.get('/:id', async (req, res) => {
    try {
        const elemento = await Inventario.findById(req.params.id);
        if (!elemento) {
            return res.status(404).json({ message: 'Elemento no encontrado' });
        }
        res.json(elemento);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo elemento en el inventario
router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('nombre', 'invalid.nombre').not().isEmpty(),
    // Agregar otras validaciones según tus requisitos
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { serial, nombre, descripcion, color, foto, fechaCompra, precio } = req.body;

    try {
        const nuevoElemento = new Inventario({
            serial,
            nombre,
            descripcion,
            color,
            foto,
            fechaCompra,
            precio,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        await nuevoElemento.save();
        res.status(201).json({ message: 'Elemento creado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un elemento del inventario por su ID
router.put('/:id', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('nombre', 'invalid.nombre').not().isEmpty(),
    // Agregar otras validaciones según tus requisitos
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { serial, nombre, descripcion, color, foto, fechaCompra, precio } = req.body;

    try {
        let elemento = await Inventario.findById(req.params.id);

        if (!elemento) {
            return res.status(404).json({ message: 'Elemento no encontrado' });
        }

        elemento.serial = serial;
        elemento.nombre = nombre;
        elemento.descripcion = descripcion;
        elemento.color = color;
        elemento.foto = foto;
        elemento.fechaCompra = fechaCompra;
        elemento.precio = precio;
        elemento.fechaActualizacion = new Date();

        await elemento.save();
        res.json({ message: 'Elemento actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un elemento del inventario por su ID
router.delete('/:id', async (req, res) => {
    try {
        const elemento = await Inventario.findById(req.params.id);

        if (!elemento) {
            return res.status(404).json({ message: 'Elemento no encontrado' });
        }

        await elemento.remove();
        res.json({ message: 'Elemento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
