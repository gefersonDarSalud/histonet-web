// src/pages/Login.tsx

import type { ReactElement as Component } from 'react';

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

export const Login = (): Component => {
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
                        <form>
                            <div>
                                <div className="grid w-full items-center gap-5">
                                    {/* Campo de Correo Electrónico */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="email">Correo electrónico</Label>
                                        <Input id="email" type="email" placeholder="nombre@ejemplo.com" required />
                                    </div>

                                    {/* Campo de Contraseña */}
                                    <div className="flex flex-col space-y-2">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input id="password" type="password" required />
                                    </div>

                                    {/* Enlace de Olvidaste tu contraseña */}
                                    <div className="text-sm text-right">
                                        <a href="#" className="font-medium text-blue-600 hover:underline">
                                            ¿Olvidaste tu contraseña?
                                        </a>
                                    </div>

                                    {/* Botón de Iniciar Sesión */}
                                    <Button type="submit" className="w-full">
                                        Iniciar Sesión
                                    </Button>

                                </div>
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
                                    onClick={() => alert("Simulando inicio de sesión con Google...")}
                                >
                                    <GoogleIcon />
                                    <span>Google</span>
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};