const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un usuario por su ID
router.get('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo usuario
router.post('/', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').isLength({ min: 6 }),
    check('rol', 'invalid.rol').isIn(['Administrador', 'Docente']),
    check('estado', 'invalid.estado').isIn(['activo', 'inactivo']),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password, rol, estado } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ message: 'Email ya existe' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        usuario = new Usuario({
            nombre,
            email,
            password: hashedPassword,
            rol,
            estado,
            fechaCreacion: new Date(),
            fechaActualizacion: new Date()
        });

        await usuario.save();
        res.status(201).json({ message: 'Usuario creado correctamente', estado});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Actualizar un usuario por su ID
router.put('/:id', [
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').isLength({ min: 6 }),
    check('rol', 'invalid.rol').isIn(['Administrador', 'Docente']),
    check('estado', 'invalid.estado').isIn(['activo', 'inactivo']),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, email, password, rol, estado } = req.body;

    try {
        let usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        usuario.nombre = nombre;
        usuario.email = email;
        usuario.password = hashedPassword;
        usuario.rol = rol;
        usuario.estado = estado;
        usuario.fechaActualizacion = new Date();

        await usuario.save();
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Eliminar un usuario por su ID
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        await usuario.remove();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
