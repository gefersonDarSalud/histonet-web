import type React from "react";
import { Button } from "../ui/button";
import { Bell, LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/hooks/useAuth";

interface HeaderProps {
    activePath: string;
}

interface NavLink {
    name: string;
    path: string;
}

export const Header = ({ activePath }: HeaderProps): React.ReactElement => {

    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links: NavLink[] = [
        { name: "Inicio", path: "/" },
        { name: "Gestión de Ingresos", path: "/ingresos" },
        { name: "Pacientes", path: "/pacientes" },
        { name: "Configuración", path: "/configuracion" }
    ];

    const onNavigate = (path: string) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const onLogout = () => {
        logout();
        navigate('/login');
    }
    return (

        <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-900">DarSalud</span>
                </div>

                {/* Navegación Principal (Desktop) */}
                <nav className="hidden md:flex space-x-8 text-sm font-medium flex-1 self-center justify-center">
                    {links.map(item => {
                        const isActive = item.path === activePath;
                        return (
                            <a className={`transition-colors py-1 border-b-2 ${isActive
                                ? "text-blue-600 border-blue-600 font-semibold"
                                : "text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300"
                                }`}
                                key={item.name}
                                href={item.path}
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigate(item.path);
                                }}
                            >
                                {item.name}
                            </a>
                        );
                    })}
                </nav>
                <div className="flex">
                    <Button variant="ghost" size="icon">
                        <Bell size={20} />
                    </Button>

                    <Avatar>
                        <AvatarImage src="https://placehold.co/32x32/E5E7EB/1F2937?text=CR" alt="@Dr.Carlos" />
                        <AvatarFallback>CR</AvatarFallback>
                    </Avatar>

                    {/* Botón de Menú Móvil */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-gray-600 hover:text-blue-600"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu size={20} />
                    </Button>
                </div>
            </div>

            {/* Menú Móvil Desplegable */}
            {isMenuOpen && (
                <div className="md:hidden border-t py-2 bg-white/95">
                    <nav className="flex flex-col space-y-1 px-4 sm:px-6">
                        {links.map((item) => {
                            const isActive = item.path === activePath;
                            return (
                                <a
                                    key={item.name}
                                    href={item.path}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate(item.path);
                                        setIsMenuOpen(false); // Cierra el menú al navegar
                                    }}
                                    className={`block rounded-md px-3 py-2 text-base font-medium transition-colors ${isActive
                                        ? "bg-blue-50 text-blue-600 font-semibold"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    {item.name}
                                </a>
                            );
                        })}
                        <Button
                            onClick={onLogout}
                            variant="destructive"
                            className="w-full mt-4"
                        >
                            <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
                        </Button>
                    </nav>
                </div>
            )}
        </header>

    )
}