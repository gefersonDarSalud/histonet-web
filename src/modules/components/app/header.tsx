import type React from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";


export const Header = (): React.ReactElement => {
    const links: string[] = [
        "Inicio",
        "Gestión de Ingresos",
        "Pacientes",
        "Configuración"
    ];
    return (

        <header className="sticky top-0 z-10 border-b bg-white/95 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                    <span className="text-xl font-bold text-gray-900">DarSalud</span>
                </div>
                <nav className="hidden md:flex space-x-8 text-sm font-medium flex-1 self-center justify-center">
                    {links.map(item => (
                        <a key={item} href="#" className={`transition-colors hover:text-gray-900 ${item === "Gestión de Ingresos" ? "text-gray-900 font-semibold" : "text-gray-500"}`}>
                            {item}
                        </a>
                    ))}
                </nav>
                <div className="flex">
                    <Button variant="ghost" size="icon">
                        <Bell size={20} />
                    </Button>

                    <Avatar>
                        <AvatarImage src="https://placehold.co/32x32/E5E7EB/1F2937?text=CR" alt="@Dr.Carlos" />
                        <AvatarFallback>CR</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>

    )
}