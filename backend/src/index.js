const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');
const sensorRoutes = require('./routes/sensorRoutes');

// Cargar variables de entorno desde la raíz del proyecto
dotenv.config({ 
    path: path.resolve(__dirname, '../../.env'), 
    override: true 
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de seguridad y utilidad
app.use(helmet()); // Protege la app configurando cabeceras HTTP de seguridad
app.use(cors());   // Permite peticiones desde el frontend (CORS)
app.use(express.json()); // Permite parsear el cuerpo de las peticiones a JSON

// Montar las rutas
app.use('/api/sensores', sensorRoutes);

// Ruta de prueba base para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.json({ mensaje: 'API REST de Sensores Industriales funcionando correctamente' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
