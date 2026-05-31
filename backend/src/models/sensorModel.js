const db = require('../config/db');

class SensorModel {
    // Obtener todos los sensores, con filtro opcional por tipo
    static async getAll(tipo = null) {
        let query = 'SELECT * FROM sensores';
        let values = [];

        if (tipo) {
            query += ' WHERE tipo = ?';
            values.push(tipo);
        }

        query += ' ORDER BY fecha_registro DESC';

        const [rows] = await db.query(query, values);
        return rows;
    }

    // Obtener un sensor por su ID
    static async getById(id_sensor) {
        const query = 'SELECT * FROM sensores WHERE id_sensor = ?';
        const [rows] = await db.query(query, [id_sensor]);
        return rows.length ? rows[0] : null;
    }

    // Crear un nuevo sensor
    static async create(sensorData) {
        const { nombre, tipo, valor, unidad, ubicacion } = sensorData;
        const query = `
            INSERT INTO sensores (nombre, tipo, valor, unidad, ubicacion) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [nombre, tipo, valor, unidad, ubicacion]);
        return result.insertId;
    }

    // Actualizar un sensor existente
    static async update(id_sensor, sensorData) {
        const { nombre, tipo, valor, unidad, ubicacion } = sensorData;
        const query = `
            UPDATE sensores 
            SET nombre = ?, tipo = ?, valor = ?, unidad = ?, ubicacion = ? 
            WHERE id_sensor = ?
        `;
        const [result] = await db.query(query, [nombre, tipo, valor, unidad, ubicacion, id_sensor]);
        return result.affectedRows > 0;
    }

    // Eliminar un sensor
    static async delete(id_sensor) {
        const query = 'DELETE FROM sensores WHERE id_sensor = ?';
        const [result] = await db.query(query, [id_sensor]);
        return result.affectedRows > 0;
    }
}

module.exports = SensorModel;
