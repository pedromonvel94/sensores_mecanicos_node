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
    // Contar sensores agrupados por tipo
    const conteo = sensores.reduce((acc, sensor) => {
        acc[sensor.tipo] = (acc[sensor.tipo] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(conteo).map(
        (tipo) => tipo.charAt(0).toUpperCase() + tipo.slice(1)
    );

    const colores = {
        temperatura: { bg: 'rgba(239, 68, 68, 0.7)', border: '#ef4444' },
        presion: { bg: 'rgba(245, 158, 11, 0.7)', border: '#f59e0b' },
        vibracion: { bg: 'rgba(34, 197, 94, 0.7)', border: '#22c55e' }
    };

    const backgroundColors = Object.keys(conteo).map(
        (tipo) => colores[tipo]?.bg || 'rgba(79, 140, 247, 0.7)'
    );
    const borderColors = Object.keys(conteo).map(
        (tipo) => colores[tipo]?.border || '#4f8cf7'
    );

    const data = {
        labels,
        datasets: [
            {
                label: 'Cantidad de sensores',
                data: Object.values(conteo),
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
                display: true,
                text: 'Sensores por Tipo',
                color: '#e4e4e7',
                font: { size: 14, weight: '600' },
                padding: { bottom: 16 }
            },
            tooltip: {
                backgroundColor: '#1a1d2e',
                titleColor: '#e4e4e7',
                bodyColor: '#9ca3af',
                borderColor: '#2a2e45',
                borderWidth: 1,
                cornerRadius: 8
            }
        },
        scales: {
            x: {
                ticks: { color: '#9ca3af', font: { size: 12 } },
                grid: { display: false }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#9ca3af',
                    font: { size: 12 },
                    stepSize: 1
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
