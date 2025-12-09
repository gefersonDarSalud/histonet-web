import { StrictMode, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.tsx';
import { useAuth } from '@/auth/hooks/useAuth.ts';
import { AuthProvider } from '@/auth/components/authProvider.tsx';
import { ServiceProvider } from './serviceProvider.tsx';
import { AppAlert } from '@/components/app/appAlert.tsx';
import { useToast } from '@/components/hooks/useToast.tsx';
import { ToastProvider } from './context/providers/toastProvider.tsx';

const RootApp = () => {
    const { message: authMessage, setMessage: setAuthMessage } = useAuth();
    const { message: toastMessage, setMessage: setToastMessage } = useToast();
    const authHandleCloseAlert = useCallback(() => setAuthMessage(null), [setAuthMessage]);
    const toastHandleCloseAlert = useCallback(() => setToastMessage(null), [setToastMessage]);

    return (
        <StrictMode>
            <RouterProvider router={router} />
            {authMessage && (
                <AppAlert
                    message={authMessage}
                    onClose={authHandleCloseAlert}
                />
            )}

            {toastMessage && (
                <AppAlert
                    message={toastMessage}
                    onClose={toastHandleCloseAlert}
                />
            )}
        </StrictMode>
    );
};

// 2. Componente principal que envuelve toda la aplicación en el proveedor de contexto.
const AppWrapper = () => (
    <ServiceProvider>
        <AuthProvider>
            <ToastProvider>
                <RootApp />
            </ToastProvider>
        </AuthProvider>
    </ServiceProvider>
);


createRoot(document.getElementById('root')!).render(<AppWrapper />);