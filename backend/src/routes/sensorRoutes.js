const express = require('express');
const SensorController = require('../controllers/sensorController');

const router = express.Router();

// Rutas base: /api/sensores
router.get('/', SensorController.getAll);
router.get('/:id', SensorController.getById);
router.post('/', SensorController.create);
router.put('/:id', SensorController.update);
router.delete('/:id', SensorController.delete);

module.exports = router;
