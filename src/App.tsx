// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Header } from '@/components/app/header';
import { Footer } from '@/components/app/footer';
import { Outlet } from 'react-router-dom';

const App = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default App;
