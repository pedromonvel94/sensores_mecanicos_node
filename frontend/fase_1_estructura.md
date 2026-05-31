# Fase 1: Estructura del Proyecto

## Árbol de Carpetas y Archivos

```
frontend/
├── public/                 # Archivos estáticos públicos
├── src/
│   ├── assets/             # Imágenes, íconos y otros recursos gráficos
│   ├── components/         # Componentes reutilizables de React
│   │   ├── Dashboard/      # Componente contenedor principal
│   │   ├── SensorTable/    # Componente para la tabla de datos
│   │   ├── SensorFilter/   # Componente para el filtro por tipo
│   │   ├── SensorChart/    # Componente para el gráfico de barras
│   │   ├── Loader/         # Indicador de carga
│   │   └── ErrorMessage/   # Mensaje de error reutilizable
│   ├── services/           # Lógica de consumo de API externa
│   │   └── api.js          # Configuración de Axios y endpoints
│   ├── styles/             # Hojas de estilo CSS Modules
│   │   ├── variables.css   # Variables globales de diseño
│   │   └── global.css      # Estilos generales y reseteo
│   ├── App.jsx             # Punto de entrada de la aplicación React
│   └── main.jsx            # Renderizado del DOM
├── .env                    # Variables de entorno (URLs de API, etc.)
├── package.json            # Dependencias del proyecto
├── vite.config.js          # Configuración del empaquetador Vite
└── README.md               # Documentación y entrega del proyecto
```

## Propósito
Esta estructura modulariza responsabilidades. Separamos la interfaz (components), la lógica de negocio y red (services) y el diseño (styles). Esto asegura que el código sea escalable, limpio y fácil de mantener a medida que la aplicación crezca.
