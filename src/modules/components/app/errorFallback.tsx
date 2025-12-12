import type { FC } from "react";

interface ErrorFallbackProps {
    error: Error | null;
    // Puedes añadir una función para reintentar (por ejemplo, recargar datos)
    // resetErrorBoundary: () => void; 
}

// Componente funcional usando const y arrow function
export const ErrorFallback: FC<ErrorFallbackProps> = ({ error }) => {
    return (
        <div
            role="alert"
            style={{
                padding: '20px',
                border: '2px solid #ff4d4d',
                backgroundColor: '#fff0f0',
                borderRadius: '8px',
                textAlign: 'center',
                margin: '20px'
            }}
        >
            <h2>❌ ¡Ocurrió un error inesperado!</h2>
            <p>Lo sentimos, no pudimos cargar esta parte de la aplicación.</p>

            {/* Información detallada para el desarrollador (opcional) */}
            {error && (
                <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px', textAlign: 'left', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
                    <summary>Detalles del Error (Para desarrolladores)</summary>
                    <code>{error.message}</code>
                </details>
            )}

            {/* Opción para reintentar si se implementa el reset */}
            {/* <button onClick={resetErrorBoundary}>Reintentar</button> */}
        </div>
    );
};