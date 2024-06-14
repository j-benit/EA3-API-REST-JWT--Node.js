const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Importa bcrypt
const { validationResult, check } = require('express-validator');
const { generarJWT } = require('../helpers/jwt'); // Importa la función generarJWT desde '../helpers/jwt'
const User = require('../models/Usuario'); // Asegúrate de importar tu modelo User correctamente
const router = express.Router();
const secretKey = 'clave_secreta_para_el_token';

// Endpoint para iniciar sesión y obtener el token
router.post('/login', [
  check('username', 'El nombre de usuario es requerido').not().isEmpty(),
  check('password', 'La contraseña es requerida').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password} = req.body;

  try {
    // Buscar al usuario en la base de datos por el nombre de usuario
    const usuario = await User.findOne({ nombre: username });
    
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada
    const esPasswordValida = await bcrypt.compare(password, usuario.password);

    if (!esPasswordValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    
    const token = generarJWT({ username }); // Utiliza la función generarJWT con el nombre de usuario
    res.json({ token });
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    res.status(500).json({ message: 'Error de servidor' });
  }
});

// Middleware para verificar el token en las peticiones protegidas
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.usuario = decoded;
    next();
  });
};

// Ruta protegida que requiere autenticación mediante token
router.get('/recurso-protegido', verificarToken, (req, res) => {
  res.json({ message: 'Acceso permitido al recurso protegido', usuario: req.usuario });
});

module.exports = router;
