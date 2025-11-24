import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md p-8 text-center shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Recuperar Contraseña</h1>
                <p className="text-gray-600 mb-6">
                    Ingresa tu correo electrónico para enviarte un enlace de recuperación.
                </p>
                <div className="grid w-full items-center gap-2 mb-6">
                    <Label htmlFor="recovery-email">Correo electrónico</Label>
                    <Input id="recovery-email" type="email" placeholder="tu-correo@ejemplo.com" required />
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 mb-4">
                    Enviar Enlace
                </Button>
                <Link to="/" className='text-blue-600 hover:underline text-sm'>
                    Volver al inicio de sesión
                </Link>
            </Card>
        </div>
    );
}