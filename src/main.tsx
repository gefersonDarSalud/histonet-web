import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.tsx';
import { useAuth } from '@/auth/hooks/useAuth.ts';
import { cn } from '@/lib/utils.ts';
import { AuthProvider } from '@/auth/components/authProvider.tsx';
import { ServiceProvider } from './serviceProvider.tsx';

const RootApp = () => {
    const { message, isLoggedIn } = useAuth();

    return (
        <StrictMode>
            <RouterProvider router={router} />
            {message && (
                <div className={cn(
                    "fixed bottom-4 right-4 p-4 rounded-xl shadow-2xl text-white transition-opacity duration-300 z-50",
                    isLoggedIn ? "bg-green-600" : "bg-red-600"
                )}>
                    {message}
                </div>
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