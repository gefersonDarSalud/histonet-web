import { Component, type ErrorInfo, type ReactNode } from "react";

// Tipos para las props y el estado
interface ErrorBoundaryProps {
    children: ReactNode;
    fallback: ReactNode; // El componente que se muestra en caso de error
    onError?: (error: Error, errorInfo: ErrorInfo) => void; // Función de callback para logging
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

// Implementación del componente de clase
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    readonly state: ErrorBoundaryState = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error: error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        if (this.props.onError) this.props.onError(error, errorInfo);
        console.error("ErrorBoundary:", error);
    }

    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}