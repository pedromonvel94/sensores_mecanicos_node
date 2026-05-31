# Fase 2: Configuración

## Archivos Base

Se ha generado el proyecto base utilizando **Vite** con la plantilla de React. Vite proporciona un entorno de desarrollo extremadamente rápido y una construcción de producción optimizada.

### 1. Variables de Entorno (`.env`)
Se centralizan las configuraciones externas para que el frontend no dependa de URLs "hardcodeadas". Esto facilita el despliegue a producción.

```env
VITE_API_URL=http://localhost:3000/api
```

### 2. Dependencias Instaladas (`package.json`)
- `axios`: Cliente HTTP para consumir la API REST con manejo fácil de promesas y errores.
- `chart.js` y `react-chartjs-2`: Librería estándar de la industria para crear gráficos interactivos y adaptables.

### 3. Configuración del Bundler (`vite.config.js`)
Configuración estándar de Vite para compilar React, con soporte para alias y variables seguras (prefijadas con `VITE_`).
