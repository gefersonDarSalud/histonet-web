import './App.css'
import { Header } from '@/components/app/header';
import { Footer } from '@/components/app/footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useFavicon } from "#/hooks/useFavicon";
import { routeLabel } from './routes';

const faviconUrl = "/favicon.ico";

const App = () => {
    const activePath = useLocation().pathname;

    const isAuthPage = activePath === routeLabel.login || activePath === routeLabel.signup;

    useFavicon(faviconUrl); // Simulación de tu hook

    if (isAuthPage) {
        return <Outlet />;
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header activePath={activePath} />

            {/* <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8"> */}
            <Outlet />
            {/* </main> */}

            <Footer />
        </div>
    );
};

export default App;
