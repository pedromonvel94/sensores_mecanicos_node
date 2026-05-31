# Fase 3: Servicios (Consumo de API)

Se ha implementado el módulo de conexión en la carpeta `src/services/api.js`.

## Lógica Centralizada
Utilizando `axios`, se crea una instancia base (`apiClient`) que toma la URL de nuestra variable de entorno `VITE_API_URL`. Esto asegura que todas las peticiones apunten al lugar correcto sin repetir código.

## Funciones Implementadas

1. `obtenerSensores()`: Realiza un `GET /sensores`. Retorna el arreglo completo de sensores de la base de datos.
2. `obtenerSensoresPorTipo(tipo)`: Realiza un `GET /sensores?tipo=:tipo`. Filtra los datos desde el backend optimizando el ancho de banda.
3. `crearSensor(sensorData)`: Realiza un `POST /sensores`. Envía el cuerpo JSON para insertar un nuevo sensor.
4. `actualizarSensor(id_sensor, sensorData)`: Realiza un `PUT /sensores/:id`. Modifica un registro existente.
5. `eliminarSensor(id_sensor)`: Realiza un `DELETE /sensores/:id`. Elimina un sensor.

*Nota: Todas las funciones manejan de forma asíncrona sus respuestas y están preparadas para lanzar errores (throws) que el componente visual atrapará e informará al usuario.*
