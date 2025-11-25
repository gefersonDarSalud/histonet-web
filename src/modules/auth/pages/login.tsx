import { useState, type ReactElement as Component } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    // CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from '../components/logo';
// import { GoogleIcon } from '../components/googleIcon';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useServices } from '#/hooks/useServices';
import { routeLabel } from '#/routes';
import type { objectList } from '#/utils/types';
import type { Message } from '@/components/app/appAlert';

const messages: objectList<Message> = {
    'sessionSuccess': {
        title: 'Inicio de Sesión Exitoso',
        variant: 'default',
        description: 'has iniciado sesión exitosamente.'
    },
    'sessionError': {
        title: 'Error',
        variant: 'destructive',
        description: 'No se pudo iniciar sesión.'
    },
}


export const Login = (): Component => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { authService } = useServices();
    const { login, setMessage } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;
        setIsLoading(true);
        setMessage(null);

        try {
            const result = await authService.execute({ email: email, password: password });
            console.log("Login exitoso. Datos recibidos:", result);
            login(result.auth);
            setMessage(messages.sessionSuccess);
            navigate(from, { replace: true });
        }

        catch (error) {
            console.log(error);
            setMessage(messages.sessionError);
            setTimeout(() => setMessage(null), 5000);
        }

        finally {
            setIsLoading(false);
        }
    };

    // const handleGoogleLogin = () => {
    //     setMessage('Simulando inicio de sesión con Google...');
    //     setTimeout(() => {
    //         login();
    //         navigate(routeLabel.home, { replace: true });
    //     }, 1500);
    // }

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
                    {/* <CardHeader>
                         Opcional: Podrías poner un título aquí si lo necesitaras 
                    </CardHeader> */}
                    <CardContent className='flex-1  max-w-1/2 px-0'>
                        <form onSubmit={handleLogin}>

                            <div className="grid w-full items-center gap-5">
                                {/* Campo de Correo Electrónico */}

                                <Label htmlFor="email">Correo electrónico</Label>
                                <Input
                                    id="email"
                                    placeholder="nombre@ejemplo.com"
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Campo de Contraseña */}
                            <div className="grid w-full items-center gap-5 mt-4">

                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            {/* Enlace de Olvidaste tu contraseña */}
                            <div className="text-sm text-right my-4">
                                <Link to="/forgot-password" className="font-medium text-blue-600 hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* Botón de Iniciar Sesión */}
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Validando...
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4 mr-2" /> Iniciar Sesión
                                    </>
                                )}
                            </Button>

                        </form>
                        {/* <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    O continuar con
                                </span>
                            </div>
                        </div> */}
                        {/* BOTÓN DE GOOGLE */}
                        {/* <Button
                            className="w-full flex items-center justify-center space-x-3 border-gray-300 hover:bg-gray-50"
                            type="button"
                            variant="outline"
                            onClick={handleGoogleLogin}
                        >
                            <GoogleIcon />
                            <span>Google</span>
                        </Button> */}

                        <p className='mt-6 text-center text-sm text-gray-500'>
                            ¿No tienes cuenta? <Link to={routeLabel.register} className='text-blue-600 hover:underline font-medium'>Regístrate</Link>
                        </p>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
};