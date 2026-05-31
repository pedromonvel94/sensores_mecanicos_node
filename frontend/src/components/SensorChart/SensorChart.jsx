import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import './SensorChart.css';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SensorChart = ({ sensores }) => {
    // Detectar si todos los sensores pertenecen a un mismo tipo (filtro activo)
    const tiposUnicos = [...new Set(sensores.map((s) => s.tipo))];
    const esFiltroActivo = tiposUnicos.length === 1 && sensores.length > 0;
    const tipoActivo = esFiltroActivo ? tiposUnicos[0] : null;

    const colores = {
        temperatura: { bg: 'rgba(239, 68, 68, 0.7)', border: '#ef4444' },
        presion: { bg: 'rgba(245, 158, 11, 0.7)', border: '#f59e0b' },
        vibracion: { bg: 'rgba(34, 197, 94, 0.7)', border: '#22c55e' }
    };

    let labels = [];
    let dataValues = [];
    let backgroundColors = [];
    let borderColors = [];
    let datasetLabel = '';
    let yStepSize = 1;
    let tooltipCallback = {};

    if (esFiltroActivo) {
        // Modo 2: Listar sensores individuales con sus valores reales
        labels = sensores.map((s) => `ID: ${s.id_sensor}`);
        
        const colorConfig = colores[tipoActivo] || { bg: 'rgba(79, 140, 247, 0.7)', border: '#4f8cf7' };
        backgroundColors = sensores.map(() => colorConfig.bg);
        borderColors = sensores.map(() => colorConfig.border);
        yStepSize = undefined; // Dejar que Chart.js decida la escala para decimales

        // Si es presión, verificar si hay unidades mixtas (bar y PSI)
        if (tipoActivo === 'presion') {
            const unidades = sensores.map(s => s.unidad.toLowerCase().trim());
            const tieneMixtas = unidades.includes('bar') && unidades.includes('psi');

            if (tieneMixtas) {
                // Normalizar todo a 'bar' para la escala del gráfico
                dataValues = sensores.map(s => {
                    const u = s.unidad.toLowerCase().trim();
                    if (u === 'psi') {
                        return parseFloat((s.valor / 14.5038).toFixed(2));
                    }
                    return s.valor;
                });
                datasetLabel = 'Valor normalizado (bar)';

                tooltipCallback = {
                    title: function(context) {
                        const index = context[0].dataIndex;
                        const sensor = sensores[index];
                        return `ID: ${sensor.id_sensor} - ${sensor.nombre}`;
                    },
                    label: function(context) {
                        const index = context.dataIndex;
                        const sensor = sensores[index];
                        const valGrafico = context.parsed.y;
                        return [
                            `Valor en gráfico: ${valGrafico} bar`,
                            `Valor original: ${sensor.valor} ${sensor.unidad}`
                        ];
                    }
                };
            } else {
                // Presión con una sola unidad uniforme
                dataValues = sensores.map((s) => s.valor);
                const unidad = sensores[0]?.unidad || '';
                datasetLabel = `Valor (${unidad})`;

                tooltipCallback = {
                    title: function(context) {
                        const index = context[0].dataIndex;
                        const sensor = sensores[index];
                        return `ID: ${sensor.id_sensor} - ${sensor.nombre}`;
                    },
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += `${context.parsed.y} ${unidad}`;
                        }
                        return label;
                    }
                };
            }
        } else {
            // Para otros tipos (temperatura, vibracion), graficar de forma normal
            dataValues = sensores.map((s) => s.valor);
            const unidad = sensores[0]?.unidad || '';
            datasetLabel = `Valor (${unidad})`;
            
            tooltipCallback = {
                title: function(context) {
                    const index = context[0].dataIndex;
                    const sensor = sensores[index];
                    return `ID: ${sensor.id_sensor} - ${sensor.nombre}`;
                },
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                        label += `${context.parsed.y} ${unidad}`;
                    }
                    return label;
                }
            };
        }
    } else {
        // Modo 1: Mostrar cantidad agregada de sensores por tipo
        const conteo = sensores.reduce((acc, sensor) => {
            acc[sensor.tipo] = (acc[sensor.tipo] || 0) + 1;
            return acc;
        }, {});

        labels = Object.keys(conteo).map(
            (tipo) => tipo.charAt(0).toUpperCase() + tipo.slice(1)
        );
        dataValues = Object.values(conteo);
        
        backgroundColors = Object.keys(conteo).map(
            (tipo) => colores[tipo]?.bg || 'rgba(79, 140, 247, 0.7)'
        );
        borderColors = Object.keys(conteo).map(
            (tipo) => colores[tipo]?.border || '#4f8cf7'
        );
        
        datasetLabel = 'Cantidad de sensores';
        yStepSize = 1; // Conteos enteros
    }

    // Determinar dinámicamente si el eje Y debe comenzar en 0 o permitir valores negativos
    const valorMinimo = dataValues.length > 0 ? Math.min(...dataValues) : 0;
    const yBeginAtZero = valorMinimo >= 0;

    const data = {
        labels,
        datasets: [
            {
                label: datasetLabel,
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2,
                borderRadius: 6,
                barPercentage: 0.6
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false // Ocultamos el título interno del gráfico para usar el título de la tarjeta en HTML
            },
            tooltip: {
                backgroundColor: '#1a1d2e',
                titleColor: '#e4e4e7',
                bodyColor: '#9ca3af',
                borderColor: '#2a2e45',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: tooltipCallback
            }
        },
        scales: {
            x: {
                ticks: { color: '#9ca3af', font: { size: 11 } },
                grid: { display: false }
            },
            y: {
                beginAtZero: yBeginAtZero,
                ticks: {
                    color: '#9ca3af',
                    font: { size: 12 },
                    stepSize: yStepSize
                },
                grid: { color: 'rgba(42, 46, 69, 0.5)' }
            }
        }
    };

    return (
        <div className="chart-container">
            <Bar data={data} options={options} />
        </div>
    );
};

export default SensorChart;
