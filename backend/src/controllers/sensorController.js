const SensorModel = require('../models/sensorModel');

class SensorController {
    // GET /api/sensores
    static async getAll(req, res) {
        try {
            const { tipo } = req.query;
            const sensores = await SensorModel.getAll(tipo);
            res.json(sensores);
        } catch (error) {
            console.error('Error en getAll:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener sensores' });
        }
    }

    // GET /api/sensores/:id
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const sensor = await SensorModel.getById(id);
            if (!sensor) {
                return res.status(404).json({ error: 'Sensor no encontrado' });
            }
            res.json(sensor);
        } catch (error) {
            console.error('Error en getById:', error);
            res.status(500).json({ error: 'Error interno del servidor al obtener el sensor' });
        }
    }

    // POST /api/sensores
    static async create(req, res) {
        try {
            const { nombre, tipo, valor, unidad, ubicacion } = req.body;
            
            // Validación básica
            if (!nombre || !tipo || valor === undefined || !unidad || !ubicacion) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, tipo, valor, unidad, ubicacion' });
            }

            // Validar que el tipo sea uno de los permitidos por el ENUM
            const tiposPermitidos = ['temperatura', 'presion', 'vibracion'];
            if (!tiposPermitidos.includes(tipo)) {
                return res.status(400).json({ error: `El tipo debe ser uno de: ${tiposPermitidos.join(', ')}` });
            }

            const insertId = await SensorModel.create({ nombre, tipo, valor, unidad, ubicacion });
            res.status(201).json({ 
                mensaje: 'Sensor creado exitosamente', 
                id: insertId 
            });
        } catch (error) {
            console.error('Error en create:', error);
            res.status(500).json({ error: 'Error interno del servidor al crear el sensor' });
        }
    }

    // PUT /api/sensores/:id
    static async update(req, res) {
        try {
            const { id } = req.params;
            const { nombre, tipo, valor, unidad, ubicacion } = req.body;

            // Validación básica
            if (!nombre || !tipo || valor === undefined || !unidad || !ubicacion) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios: nombre, tipo, valor, unidad, ubicacion' });
            }

            const actualizado = await SensorModel.update(id, { nombre, tipo, valor, unidad, ubicacion });
            if (!actualizado) {
                return res.status(404).json({ error: 'Sensor no encontrado para actualizar' });
            }
            
            res.json({ mensaje: 'Sensor actualizado exitosamente' });
        } catch (error) {
            console.error('Error en update:', error);
            res.status(500).json({ error: 'Error interno del servidor al actualizar el sensor' });
        }
    }

    // DELETE /api/sensores/:id
    static async delete(req, res) {
        try {
            const { id } = req.params;
            const eliminado = await SensorModel.delete(id);
            if (!eliminado) {
                return res.status(404).json({ error: 'Sensor no encontrado para eliminar' });
            }
            res.json({ mensaje: 'Sensor eliminado exitosamente' });
        } catch (error) {
            console.error('Error en delete:', error);
            res.status(500).json({ error: 'Error interno del servidor al eliminar el sensor' });
        }
    }
}

module.exports = SensorController;
