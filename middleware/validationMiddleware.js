const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

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
const verificarRolDocente = (req, res, next) => {
  const { role } = req.usuario;

  if (role === 'Docente') {
    return res.status(403).json({ message: 'Acceso denegado para usuarios con rol de docente' });
  }

  next();
};

module.exports = {
  verificarToken,
  verificarRolDocente,
};
