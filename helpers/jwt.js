const jwt = require('jsonwebtoken');
const { verificarToken } = require('../middleware/validationMiddleware');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const generarJWT = (usuario) => {
  if (!usuario || !usuario.username) {
    throw new Error('Datos de usuario incompletos para generar el token');
  }

  const userData = {
    username: usuario.username,
    role: usuario.role,
  };

  const token = jwt.sign(userData, secretKey, { expiresIn: '2h' });

  return token;
};

module.exports = {
  generarJWT,
};