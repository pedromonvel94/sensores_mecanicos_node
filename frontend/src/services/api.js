import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Obtener todos los sensores
export const obtenerSensores = async () => {
    const response = await apiClient.get('/sensores');
    return response.data;
};

// Obtener sensores filtrados por tipo
export const obtenerSensoresPorTipo = async (tipo) => {
    const response = await apiClient.get(`/sensores?tipo=${tipo}`);
    return response.data;
};

// Crear un nuevo sensor
export const crearSensor = async (sensorData) => {
    const response = await apiClient.post('/sensores', sensorData);
    return response.data;
};

// Actualizar un sensor existente
export const actualizarSensor = async (id_sensor, sensorData) => {
    const response = await apiClient.put(`/sensores/${id_sensor}`, sensorData);
    return response.data;
};

// Eliminar un sensor
export const eliminarSensor = async (id_sensor) => {
    const response = await apiClient.delete(`/sensores/${id_sensor}`);
    return response.data;
};
