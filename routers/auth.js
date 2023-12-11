const express = require('express');
const jwt = require('jsonwebtoken');
const { validationResult, check } = require('express-validator');
const { generarJWT } = require('../helpers/jwt'); // Importa la función generarJWT desde '../helpers/jwt'
const router = express.Router();
const secretKey = 'clave_secreta_para_el_token';

// Endpoint para iniciar sesión y obtener el token
router.post('/login', [
  check('username', 'El nombre de usuario es requerido').not().isEmpty(),
  check('password', 'La contraseña es requerida').not().isEmpty(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  // Verifica las credenciales (en un entorno real, se verificarían con una base de datos)
  if (username === 'usuario' && password === 'contraseña') {
    const token = generarJWT({ username }); // Utiliza la función generarJWT con el nombre de usuario
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
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
