import type React from "react";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";


export const Header = (): React.ReactElement => {
    return (
        <>
            <header className="bg-white border-b  border-gray-200 px-4 md:px-6 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <span className="text-xl font-bold text-blue-600">DarSalud</span>
                    <nav className="hidden md:flex space-x-4 text-sm font-medium">
                        <Link to="/home" className="hover:text-blue-600 transition-colors">Inicio</Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Bell size={20} />
                    </Button>
                    <div className="flex items-center space-x-2">
                        <Avatar>
                            <AvatarImage src="https://placehold.co/32x32/E5E7EB/1F2937?text=CR" alt="@Dr.Carlos" />
                            <AvatarFallback>CR</AvatarFallback>
                        </Avatar>
                        <span className="hidden md:block text-sm font-medium">Dr. Carlos R.</span>
                    </div>
                </div>
            </header>
        </>
    )
}