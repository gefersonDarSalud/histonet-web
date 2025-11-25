import { StrictMode, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.tsx';
import { useAuth } from '@/auth/hooks/useAuth.ts';
import { AuthProvider } from '@/auth/components/authProvider.tsx';
import { ServiceProvider } from './serviceProvider.tsx';
import { AppAlert } from '@/components/app/appAlert.tsx';

const RootApp = () => {
    const { message, setMessage } = useAuth();
    const handleCloseAlert = useCallback(() => setMessage(null), [setMessage]);
    return (
        <StrictMode>
            <RouterProvider router={router} />
            {message && (
                <AppAlert
                    message={message}
                    onClose={handleCloseAlert}
                />
            )}
        </StrictMode>
    );
};

// 2. Componente principal que envuelve toda la aplicación en el proveedor de contexto.
const AppWrapper = () => (
    <ServiceProvider>
        <AuthProvider>
            <RootApp />
        </AuthProvider>
    </ServiceProvider>
);


createRoot(document.getElementById('root')!).render(<AppWrapper />);