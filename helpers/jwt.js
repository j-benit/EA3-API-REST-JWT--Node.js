const jwt = require('jsonwebtoken');

const secretKey = 'clave_secreta_para_el_token';

// Función para generar un token JWT a partir de un objeto de usuario
const generarJWT = (usuario) => {
  // Verifica si el objeto de usuario tiene los datos requeridos
  if (!usuario || !usuario.userId || !usuario.username || !usuario.role) {
    throw new Error('Datos de usuario incompletos para generar el token');
  }

  const userData = {
    userId: usuario.userId,
    username: usuario.username,
    role: usuario.role
    // Puedes agregar más información si es necesario
  };

  // Genera el token JWT con tiempo de expiración de 2 horas
  const token = jwt.sign(userData, secretKey, { expiresIn: '2h' }); // El token expira en 2 horas

  return token;
};

// Ejemplo de uso
const usuarioEjemplo = {
  userId: '123456',
  username: 'usuarioEjemplo',
  role: 'admin'
};

try {
  const tokenGenerado = generarJWT(usuarioEjemplo);
  console.log('Token generado:', tokenGenerado);
} catch (error) {
  console.error('Error al generar el token:', error.message);
}
