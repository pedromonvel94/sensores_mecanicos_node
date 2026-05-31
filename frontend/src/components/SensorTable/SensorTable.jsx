import './SensorTable.css';

const SensorTable = ({ sensores }) => {
    if (!sensores || sensores.length === 0) {
        return <p className="empty-message">No se encontraron sensores registrados.</p>;
    }

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleString('es-CO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="table-wrapper">
            <table className="sensor-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                        <th>Ubicación</th>
                        <th>Fecha de Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {sensores.map((sensor) => (
                        <tr key={sensor.id_sensor}>
                            <td>{sensor.id_sensor}</td>
                            <td>{sensor.nombre}</td>
                            <td>
                                <span className={`tipo-badge ${sensor.tipo}`}>
                                    {sensor.tipo}
                                </span>
                            </td>
                            <td>{sensor.valor} {sensor.unidad}</td>
                            <td>{sensor.ubicacion}</td>
                            <td>{formatearFecha(sensor.fecha_registro)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SensorTable;
