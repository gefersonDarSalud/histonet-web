import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/index.tsx';
import { ServiceProvider } from './serviceProvider.tsx';
import { AppAlert } from '@/components/app/appAlert.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAlertStore } from './stores/alert/useAlert.ts';
import { AuthInitializer } from '@/auth/components/authInitializer.tsx';

const RootApp = () => {
    const { message, alert } = useAlertStore();

    return (
        <StrictMode>
            <RouterProvider router={router} />
            {message && <AppAlert message={message} onClose={() => alert(null)} />}
        </StrictMode>
    );
};

const AppWrapper = () => (
    <QueryClientProvider client={new QueryClient()}>
        <ServiceProvider>
            <AuthInitializer>
                <RootApp />
            </AuthInitializer>
        </ServiceProvider>
    </QueryClientProvider>
);

createRoot(document.getElementById('root')!).render(<AppWrapper />);