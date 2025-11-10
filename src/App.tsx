import './App.css'
import { Header } from '@/components/app/header';
import { Footer } from '@/components/app/footer';
import { Outlet } from 'react-router-dom';
import { useFavicon } from "#/hooks/useFavicon";

const faviconUrl = "/favicon.ico";

const App = () => {
    useFavicon(faviconUrl);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default App;
