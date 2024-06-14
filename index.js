const express = require('express');
const connectDB = require('./db/connect-mongo');
const estadoEquipoRoutes = require('./routers/estadoEquipo');
const inventarioRoutes = require('./routers/inventario');
const marcaRoutes = require('./routers/marca');
const tipoEquipoRoutes = require('./routers/tipoEquipo');
const usuarioRoutes = require('./routers/usuario');
const authRoutes = require('./routers/auth');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Ruta para la raíz de la API
app.get('/', (req, res) => {
  res.send('¡Bienvenido a mi API!');
});

// Rutas
app.use('/',authRoutes);
app.use('/api/estadoEquipo', estadoEquipoRoutes);
app.use('/api/inventario', inventarioRoutes);
app.use('/api/marca', marcaRoutes);
app.use('/api/tipoEquipo', tipoEquipoRoutes);
app.use('/api/usuario', usuarioRoutes);

// Puerto
const PORT = process.env.PORT ;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
