const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const url = process.env.BASE_URL;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;