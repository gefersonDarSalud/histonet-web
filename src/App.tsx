import './App.css'
import { Header } from '@/layout/header';
import { Footer } from '@/components/app/footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useFavicon } from "@/components/hooks/useFavicon";

export default () => {
    const activePath = useLocation().pathname;
    useFavicon("/favicon.ico");
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header activePath={activePath} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
