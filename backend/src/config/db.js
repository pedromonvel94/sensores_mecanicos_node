const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({ 
    path: path.resolve(__dirname, '../../../.env'), 
    override: true 
});

// Configuración de la conexión a Aiven MySQL
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 25060,
    database: process.env.DB_NAME || 'monitoreo_mecanico',
};

// Aiven requiere conexión SSL
// Verificamos si el certificado está configurado en el .env
if (process.env.DB_SSL_CA) {
    const certPath = path.resolve(__dirname, '../../../', process.env.DB_SSL_CA);
    try {
        if (fs.existsSync(certPath)) {
            dbConfig.ssl = {
                ca: fs.readFileSync(certPath).toString(),
                rejectUnauthorized: true
            };
        } else {
            console.warn(`Advertencia: No se encontró el certificado SSL en: ${certPath}`);
            console.warn('Aiven requiere SSL. Asegúrate de colocar tu ca.pem en src/certs/');
        }
    } catch (error) {
        console.error('Error al leer el certificado SSL:', error.message);
    }
}

// Crear un pool de conexiones para mejor rendimiento
const pool = mysql.createPool(dbConfig);

// Verificar la conexión inicial
pool.getConnection()
    .then(connection => {
        console.log('Conexión exitosa a la base de datos MySQL (Aiven).');
        connection.release();
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err.message);
        console.error('Detalle del error:', err);
        console.error('Verifica tus credenciales en el archivo .env y el certificado ca.pem.');
    });

module.exports = pool;
