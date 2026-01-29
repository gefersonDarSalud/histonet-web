import type React from "react";
import { Button } from "../../components/ui/button";
import { Bell, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brandmark } from "../../components/app/brandmark";
import { Breadcrumb } from "../../components/app/breadcrumb";
import { useBreadcrumbPath } from "@/components/hooks/useBreadCrumbPath";
import { routeLabel } from "#/routes";
import { Profile } from "./profile";
import { useAuthStore } from "#/stores/auth/useAuth";
import { ModalProfile } from "@/auth/components/modalProfile";

interface HeaderProps {
    activePath: string;
}

interface NavLink {
    name: string;
    path: string;
}

export const Header = ({ activePath }: HeaderProps): React.ReactElement => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const { isProfileSelected } = useAuthStore.getState()
    const [openModal, setOpenModal] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isOpen = isProfileSelected === false || openModal === true

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
            <header className="sticky top-0 z-100 border-b backdrop-blur-sm bg-darsalud-primary text-white">
                <ModalProfile open={isOpen} onOpenChange={setOpenModal} isDoctor />
                <div className="mr-auto flex h-16 max-w-7xl items-center justify-between pr-4 sm:pr-6 lg:pr-8">
                    <div className="flex items-center bg-white px-20" style={{
                        clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
                    }}>
                        <Brandmark className="h-16 w-auto self-center" />
                    </div>

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
                        <Profile modal={{
                            value: openModal,
                            set: setOpenModal
                        }} />

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