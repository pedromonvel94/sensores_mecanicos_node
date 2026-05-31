import './SensorFilter.css';

const SensorFilter = ({ tipoSeleccionado, onFiltroChange }) => {
    return (
        <div className="filter-container">
            <label className="filter-label" htmlFor="filtro-tipo">Filtrar por tipo:</label>
            <select
                id="filtro-tipo"
                className="filter-select"
                value={tipoSeleccionado}
                onChange={(e) => onFiltroChange(e.target.value)}
            >
                <option value="">Todos los tipos</option>
                <option value="temperatura">Temperatura</option>
                <option value="presion">Presión</option>
                <option value="vibracion">Vibración</option>
            </select>
        </div>
    );
};

export default SensorFilter;
