# Fase 4: Componentes de React

## Diseño Atómico y Reusabilidad
El frontend se construyó dividiendo la interfaz en componentes pequeños y manejables ubicados en `src/components/`:

### 1. `Dashboard.jsx`
Es el **Componente Contenedor (Smart Component)**. Se encarga de llamar al servicio de la API, guardar los datos en el estado (`useState`), manejar la carga (`Loader`), capturar errores y pasar la información a los componentes hijos mediante *props*.

### 2. `SensorFilter.jsx`
Un **Componente Presentacional (Dumb Component)** que renderiza un menú desplegable `<select>`. Dispara una función `onChange` cada vez que el usuario elige un nuevo tipo de sensor, notificando al Dashboard para que re-consulte a la API.

### 3. `SensorTable.jsx`
Recibe la lista de sensores por *props* y renderiza la tabla. Está diseñado para mostrar una estructura limpia: ID, Nombre, Tipo, Valor (con su unidad), Ubicación y Fecha.

### 4. `SensorChart.jsx`
Recibe los mismos datos y utiliza `react-chartjs-2` para pintar un **Gráfico de Barras**. La data se mapea dinámicamente: las etiquetas (X) son los nombres de los sensores y los valores (Y) son sus magnitudes. Reacciona automáticamente cuando cambian los datos.

### 5. `Loader.jsx` y `ErrorMessage.jsx`
Componentes de retroalimentación visual (Feedback UI). Muestran un "spinner" moderno durante la espera de red y alertas rojas estilizadas si el backend no responde.
