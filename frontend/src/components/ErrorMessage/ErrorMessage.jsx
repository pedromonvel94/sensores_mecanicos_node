import './ErrorMessage.css';

const ErrorMessage = ({ mensaje }) => {
    return (
        <div className="error-container">
            <span className="error-icon">⚠</span>
            <p>{mensaje || 'Ha ocurrido un error inesperado.'}</p>
        </div>
    );
};

export default ErrorMessage;
