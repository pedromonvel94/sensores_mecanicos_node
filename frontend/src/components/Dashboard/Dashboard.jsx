import { useState, useEffect } from 'react';
import { obtenerSensores, obtenerSensoresPorTipo } from '../../services/api';
import SensorFilter from '../SensorFilter/SensorFilter';
import SensorTable from '../SensorTable/SensorTable';
import SensorChart from '../SensorChart/SensorChart';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Dashboard.css';

const Dashboard = () => {
    const [sensores, setSensores] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Obtener sensores al montar y cuando cambie el filtro
    useEffect(() => {
        const fetchSensores = async () => {
            setCargando(true);
            setError(null);
            try {
                let data;
                if (tipoFiltro) {
                    data = await obtenerSensoresPorTipo(tipoFiltro);
                } else {
                    data = await obtenerSensores();
                }
                setSensores(data);
            } catch (err) {
                console.error('Error al obtener sensores:', err);
                setError('No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose.');
            } finally {
                setCargando(false);
            }
        };

        fetchSensores();
    }, [tipoFiltro]);

    // Calcular estadísticas
    const totalSensores = sensores.length;
    const tiposUnicos = [...new Set(sensores.map((s) => s.tipo))].length;

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Monitoreo Mecánico</h1>
                    <p className="dashboard-subtitle">Dashboard de sensores industriales en tiempo real</p>
                </div>
                <SensorFilter tipoSeleccionado={tipoFiltro} onFiltroChange={setTipoFiltro} />
            </div>

            {error && <ErrorMessage mensaje={error} />}

            {cargando ? (
                <Loader />
            ) : (
                <div className="dashboard-content">
                    {/* Tarjetas de estadísticas */}
                    <div className="stats-row">
                        <div className="stat-card">
                            <div className="stat-value">{totalSensores}</div>
                            <div className="stat-label">Sensores registrados</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value">{tiposUnicos}</div>
                            <div className="stat-label">Tipos de sensor</div>
                        </div>
                    </div>

                    {/* Gráfico de barras */}
                    <div className="card">
                        <h2 className="card-title">Distribución por tipo</h2>
                        <SensorChart sensores={sensores} />
                    </div>

                    {/* Tabla de sensores */}
                    <div className="card">
                        <h2 className="card-title">Listado de sensores</h2>
                        <SensorTable sensores={sensores} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
