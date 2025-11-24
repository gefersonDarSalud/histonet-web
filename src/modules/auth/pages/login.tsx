import { useState, type ReactElement as Component } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from '../components/logo';
import { GoogleIcon } from '../components/googleIcon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Login = (): Component => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, setMessage } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@test.com' && password === 'password') {
            login();
            navigate(from, { replace: true });
        } else {
            setMessage('Credenciales incorrectas. Usa admin@darsalud.com / password');
            setTimeout(() => setMessage(null), 4000);
        }
    };

    const handleGoogleLogin = () => {
        setMessage('Simulando inicio de sesión con Google...');
        setTimeout(() => {
            login();
            navigate('/dashboard');
        }, 1500);
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="w-full max-w-9/12 mx-auto p-4">
                <Card className="shadow-lg flex flex-row justify-evenly py-16 px-4 items-center">
                    <div className="text-center mb-8 ml-8">
                        {/* <Droplet className="mx-auto h-12 w-auto text-blue-600" /> */}
                        <Logo />

                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                            Bienvenido a Histonet
                        </h1>
                        <p className="mt-2 text-md text-gray-600">
                            Inicia sesión para gestionar tus citas.
                        </p>
                    </div>
                    <CardHeader>
                        {/* Opcional: Podrías poner un título aquí si lo necesitaras */}
                    </CardHeader>
                    <CardContent className='flex-1  max-w-1/2 px-0'>
                        <form onSubmit={handleLogin}>

                            <div className="grid w-full items-center gap-5">
                                {/* Campo de Correo Electrónico */}

                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="nombre@ejemplo.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Campo de Contraseña */}
                            <div className="grid w-full items-center gap-5">

                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Enlace de Olvidaste tu contraseña */}
                            <div className="text-sm text-right">
                                <Link to="/forgot-password" className="font-medium text-blue-600 hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* Botón de Iniciar Sesión */}
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                <LogIn className="w-4 h-4 mr-2" /> Iniciar Sesión
                            </Button>

                        </form>
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    O continuar con
                                </span>
                            </div>
                        </div>
                        {/* BOTÓN DE GOOGLE */}
                        <Button
                            className="w-full flex items-center justify-center space-x-3 border-gray-300 hover:bg-gray-50"
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                        >
                            <GoogleIcon />
                            <span>Google</span>
                        </Button>

                        <p className='mt-6 text-center text-sm text-gray-500'>
                            ¿No tienes cuenta? <Link to="/signup" className='text-blue-600 hover:underline font-medium'>Regístrate</Link>
                        </p>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
};