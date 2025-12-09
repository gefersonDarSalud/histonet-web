import type React from "react";
import { Button } from "../ui/button";
import { Bell, LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/hooks/useAuth";
import { Brandmark } from "./brandmark";
import { Breadcrumb } from "./breadcrumb";
import { useBreadcrumbPath } from "@/components/hooks/useBreadCrumbPath";
import { routeLabel } from "#/routes";

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
        //{ name: "Inicio", path: routeLabel.home },
        { name: "Telemedicina", path: routeLabel.remoteClinic },
        { name: "Pacientes", path: routeLabel.patient },
        // { name: "Configuración", path: "/configuracion" }
    ];

    const breadcrumbItems = useBreadcrumbPath(activePath);

    const onNavigate = (path: string) => {
        navigate(path);
        setIsMenuOpen(false);
    };

    const onLogout = () => {
        logout();
        navigate(routeLabel.login);
    }
    return (
        <>
            <header className="sticky top-0 z-10 border-b backdrop-blur-sm bg-darsalud-primary text-white">
                <div className="mr-auto flex h-16 max-w-7xl items-center justify-between pr-4 sm:pr-6 lg:pr-8">
                    <div className="flex items-center bg-white px-20" style={{
                        clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
                    }}>
                        <Brandmark className="h-16 w-auto self-center" />
                    </div>

                    {/* Navegación Principal (Desktop) */}
                    <nav className="hidden md:flex space-x-8 text-sm font-medium flex-1 self-center justify-center">
                        {links.map(item => {
                            const isActive = activePath.startsWith(item.path);
                            return (
                                <a className={`transition-colors py-1 border-b-2 ${isActive
                                    ? "text-darsalud-secondary-500 border-darsalud-secondary-500 font-semibold"
                                    : "text-white border-transparent hover:text-darsalud-secondary-300 hover:border-darsalud-secondary-300"
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
            <section className="px-10 w-full bg-white py-2">
                {/* ... [Brandmark y Navegación Principal] ... */}

                {/* Breadcrumb y Contenido Central */}
                <div className="flex-1 self-center hidden md:flex">
                    <Breadcrumb items={breadcrumbItems} />
                </div>

                <div className="flex">
                    {/* ... [Botones y Avatar] ... */}
                </div>
            </section>
        </>
    )
}