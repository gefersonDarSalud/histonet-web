import './App.css'
import { Header } from '@/components/app/header';
import { Footer } from '@/components/app/footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useFavicon } from "@/components/hooks/useFavicon";
import { routeLabel } from './routes';
import { Main } from '@/components/app/main';

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
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </div>
    );
};

export default App;
