# Monitoreo Mecánico 🚀

Este proyecto académico consiste en un **Dashboard de Monitoreo Mecánico en Tiempo Real** para sensores industriales de temperatura, presión y vibración. La arquitectura consta de una base de datos MySQL en la nube (Aiven), una API REST desarrollada en Node.js + Express, y una interfaz web moderna en React utilizando Chart.js para visualización de datos.

---

## 🛠️ Arquitectura del Proyecto

El proyecto está organizado en una estructura limpia y desacoplada:

```text
sensores_mecanicos_node/
├── .env                  # Variables de entorno unificadas (Raíz del proyecto)
├── .env.example          # Plantilla para variables de entorno
├── .gitignore            # Reglas de exclusión unificadas de Git
├── README.md             # Este archivo
├── backend/              # API REST (Node.js + Express)
│   ├── src/
│   │   ├── certs/        # Certificados SSL para la conexión con Aiven
│   │   │   ├── ca.pem    # Certificado CA real (No trackeado en Git)
│   │   │   └── ca.pem.example
│   │   ├── config/       # Conexión con la Base de Datos
│   │   ├── controllers/  # Controladores de la API
│   │   ├── models/       # Modelos de Datos SQL
│   │   ├── routes/       # Definición de Endpoints
│   │   └── index.js      # Punto de entrada del Backend
│   ├── package.json
│   └── poblar_directo.js # Script para sembrar 20 sensores de prueba
└── frontend/             # Panel de Control (React + Vite)
    ├── src/
    │   ├── components/   # Componentes modulares (Dashboard, Tabla, Gráficos)
    │   ├── services/     # Consumo de la API REST
    │   └── styles/       # Estilos globales y específicos
    ├── vite.config.js    # Configuración de Vite (Lee el .env de la raíz)
    └── package.json
```

---

## ⚙️ Configuración Inicial

### 1. Variables de Entorno (.env)
Se ha unificado la configuración de todo el proyecto en un único archivo `.env` ubicado en la **raíz del proyecto**.

1. Copia el archivo de ejemplo en la raíz del proyecto para crear tu `.env` real:
   ```bash
   cp .env.example .env
   ```
2. Abre el archivo `.env` recién creado y completa las credenciales de tu base de datos de Aiven:
   ```env
   PORT=3000
   DB_HOST=tu_host_aiven_mysql.k.aivencloud.com
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_PORT=10623
   DB_NAME=monitoreo_mecanico
   DB_SSL_CA=backend/src/certs/ca.pem
   VITE_API_URL=http://localhost:3000/api
   ```

### 2. Certificado SSL para Aiven
Aiven requiere una conexión segura (SSL/TLS).
1. Descarga el certificado **CA (ca.pem)** de tu servicio de base de datos desde la consola de Aiven.
2. Guárdalo dentro de la carpeta:
   `backend/src/certs/ca.pem`
3. Si el nombre o ubicación difiere, asegúrate de actualizar la variable `DB_SSL_CA` en el `.env` de la raíz.

---

## 🚀 Ejecución del Proyecto

### Paso 1: Levantar el Backend (API REST)
1. Ve al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   *El backend correrá en http://localhost:3000 y se conectará automáticamente a tu MySQL en Aiven.*

### Paso 2: Poblar la Base de Datos (Opcional para Pruebas)
Si tu base de datos está vacía o deseas inyectar **20 sensores reales** con valores de prueba (incluyendo presiones de vacío negativas y temperaturas criogénicas) para validar el Dashboard, ejecuta el siguiente script dentro de la carpeta `backend`:
```bash
node poblar_directo.js
```

### Paso 3: Levantar el Frontend (React + Vite)
1. Abre una nueva terminal y dirígete a la carpeta del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación de desarrollo:
   ```bash
   npm run dev
   ```
   *El frontend cargará las variables de la raíz y abrirá tu navegador en http://localhost:5173 (o la URL que te indique la consola).*

---

## 📊 Características del Dashboard de Monitoreo

* **Visualización Dinámica:**
  * **Modo Distribución (Sin Filtro):** Gráfico de barras que representa la *cantidad* total de sensores agrupados por tipo (Temperatura, Presión, Vibración).
  * **Modo Detalle (Con Filtro Activo):** Al filtrar por un tipo de sensor (por ejemplo, *Presión*), el gráfico se actualiza y muestra cada sensor individual por su **ID** en el eje X y su **valor de medida física** en el eje Y.
* **Soporte de Valores Negativos:** El gráfico de barras ajusta automáticamente la escala del eje Y por debajo de cero cuando hay sensores con valores negativos (como sensores de presión de vacío o termómetros criogénicos), dibujándolos hacia abajo.
* **Normalización de Unidades:** Si se grafican sensores de presión con unidades mixtas (`bar` y `PSI`), el gráfico normaliza automáticamente todos los valores a `bar` para hacerlos comparables, manteniendo los valores y unidades originales visibles en los tooltips al pasar el mouse por encima.
* **Componentes Reutilizables:** Diseñado con una separación limpia de responsabilidades en React.
