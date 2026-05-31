# Monitoreo Mecánico - Frontend

Dashboard web para el monitoreo de sensores mecánicos industriales. Consume la API REST desarrollada en Node.js + Express.

## Tecnologías Utilizadas

- **React** — Librería de interfaces de usuario basada en componentes.
- **Vite** — Bundler rápido para desarrollo y producción.
- **Axios** — Cliente HTTP para consumo de la API REST.
- **Chart.js + react-chartjs-2** — Visualización de datos mediante gráficos.
- **CSS tradicional** — Estilos modulares por componente.

## Requisitos Previos

- Node.js v18 o superior.
- El backend (`/backend`) debe estar ejecutándose en `http://localhost:3000`.

## Instalación

```bash
cd frontend
npm install
```

## Configuración de Variables de Entorno

Crea o edita el archivo `.env` en la raíz de `frontend/`:

```env
VITE_API_URL=http://localhost:3000/api
```

> Modifica la URL si tu backend corre en otro puerto o dominio.

## Ejecución en Desarrollo

```bash
npm run dev
```

Abre tu navegador en la URL que Vite te indique (normalmente `http://localhost:5173`).

## Arquitectura del Proyecto

```
src/
├── components/          # Componentes de React
│   ├── Dashboard/       # Contenedor principal (lógica y estado)
│   ├── SensorTable/     # Tabla de datos de sensores
│   ├── SensorFilter/    # Filtro por tipo de sensor
│   ├── SensorChart/     # Gráfico de barras (Chart.js)
│   ├── Loader/          # Indicador de carga
│   └── ErrorMessage/    # Alerta de error
├── services/            # Llamadas HTTP centralizadas
│   └── api.js           # Instancia de Axios y funciones CRUD
└── styles/              # Estilos globales y variables CSS
    ├── global.css
    └── variables.css
```

## Funcionalidades

- Tabla con listado completo de sensores.
- Filtro interactivo por tipo (temperatura, presión, vibración).
- Gráfico de barras con cantidad de sensores por tipo.
- Actualización automática del gráfico y tabla al cambiar el filtro.
- Manejo de estados de carga (spinner).
- Manejo de errores de conexión.
- Diseño responsive (desktop y móvil).
