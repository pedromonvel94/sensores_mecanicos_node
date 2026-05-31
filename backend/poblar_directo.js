const db = require('./src/config/db');

const sensores = [
    {
        nombre: "Sensor Temperatura Caldera Principal",
        tipo: "temperatura",
        valor: 115.4,
        unidad: "°C",
        ubicacion: "Sala de Calderas - Sector A"
    },
    {
        nombre: "Presostato Compresor Alta Presión",
        tipo: "presion",
        valor: 8.5,
        unidad: "bar",
        ubicacion: "Área de Compresores - Zona Norte"
    },
    {
        nombre: "Acelerómetro Motor Reductor",
        tipo: "vibracion",
        valor: 4.2,
        unidad: "mm/s",
        ubicacion: "Línea de Ensamble 2 - Motor Principal"
    },
    {
        nombre: "Sensor Temperatura Cojinete Turbina",
        tipo: "temperatura",
        valor: 72.8,
        unidad: "°C",
        ubicacion: "Generador Eléctrico 01"
    },
    {
        nombre: "Manómetro Línea Hidráulica 1",
        tipo: "presion",
        valor: 120.0,
        unidad: "PSI",
        ubicacion: "Prensa Hidráulica 50T"
    },
    {
        nombre: "Vibración Eje Chumaceras",
        tipo: "vibracion",
        valor: 2.8,
        unidad: "mm/s",
        ubicacion: "Extractor de Aire 03"
    },
    {
        nombre: "Termocupla Horno de Fundición",
        tipo: "temperatura",
        valor: 450.0,
        unidad: "°C",
        ubicacion: "Planta de Tratamiento Térmico"
    },
    {
        nombre: "Transmisor Presión Gas Natural",
        tipo: "presion",
        valor: 2.3,
        unidad: "bar",
        ubicacion: "Tubería de Alimentación Principal"
    },
    {
        nombre: "Sensor Vibración Bomba Refrigerante",
        tipo: "vibracion",
        valor: 5.6,
        unidad: "mm/s",
        ubicacion: "Sistema de Enfriamiento Central"
    },
    {
        nombre: "Sensor Temp. Aceite Transmisión",
        tipo: "temperatura",
        valor: 88.3,
        unidad: "°C",
        ubicacion: "Caja de Cambios - Línea 3"
    },
    {
        nombre: "Presión Vapor Entrada Turbina",
        tipo: "presion",
        valor: 15.0,
        unidad: "bar",
        ubicacion: "Turbina de Vapor 02"
    },
    {
        nombre: "Vibrómetro Ventilador Tiro Forzado",
        tipo: "vibracion",
        valor: 6.1,
        unidad: "mm/s",
        ubicacion: "Torre de Enfriamiento B"
    },
    {
        nombre: "Sensor Temperatura Ambiente Tablero",
        tipo: "temperatura",
        valor: 34.5,
        unidad: "°C",
        ubicacion: "Tablero Eléctrico Control Principal"
    },
    {
        nombre: "Presión Aceite Lubricante",
        tipo: "presion",
        valor: 45.0,
        unidad: "PSI",
        ubicacion: "Bomba de Lubricación Principal"
    },
    {
        nombre: "Sensor de Vibración Molino de Bolas",
        tipo: "vibracion",
        valor: 8.9,
        unidad: "mm/s",
        ubicacion: "Molienda - Planta de Cemento"
    },
    {
        nombre: "Sensor Temperatura Motor Extrusor",
        tipo: "temperatura",
        valor: 95.1,
        unidad: "°C",
        ubicacion: "Línea de Extrusión Plásticos"
    },
    {
        nombre: "Transductor Presión Filtro de Agua",
        tipo: "presion",
        valor: 3.2,
        unidad: "bar",
        ubicacion: "Planta de Tratamiento de Aguas"
    },
    {
        nombre: "Vibración Bancada de Compresor",
        tipo: "vibracion",
        valor: 1.5,
        unidad: "mm/s",
        ubicacion: "Compresor de Aire Tornillo"
    },
    {
        nombre: "Termómetro Sistema Criogénico",
        tipo: "temperatura",
        valor: -180.2,
        unidad: "°C",
        ubicacion: "Tanque Almacenamiento Nitrógeno"
    },
    {
        nombre: "Sensor de Presión de Vacío",
        tipo: "presion",
        valor: -0.8,
        unidad: "bar",
        ubicacion: "Cámara de Vacío - Línea Empaque"
    }
];

async function insertarTodos() {
    console.log("Iniciando inserción directa en la base de datos MySQL...");
    let insertados = 0;
    
    for (const sensor of sensores) {
        try {
            const query = `
                INSERT INTO sensores (nombre, tipo, valor, unidad, ubicacion) 
                VALUES (?, ?, ?, ?, ?)
            `;
            await db.query(query, [sensor.nombre, sensor.tipo, sensor.valor, sensor.unidad, sensor.ubicacion]);
            console.log(`✅ Sensor insertado: "${sensor.nombre}"`);
            insertados++;
        } catch (error) {
            console.error(`❌ Error al insertar "${sensor.nombre}":`, error.message);
        }
    }
    
    console.log(`\nInserción terminada. Total insertados con éxito: ${insertados}/${sensores.length}`);
    db.end(); // Cerrar el pool para que el proceso termine
}

insertarTodos();
