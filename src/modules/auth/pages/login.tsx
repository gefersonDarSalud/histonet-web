import { useState, type ReactElement as Component } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from '../../layout/logo';
import { Link, } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { useServices } from '@/components/hooks/useServices';
import { routeLabel } from '#/routes';
import type { objectList } from '#/utils/types';
import type { Message } from '@/components/app/appAlert';
import { LoadingCircle } from '@/components/app/loading';
import { ModalProfile } from '../components/modalProfile';
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Field, FieldLabel, FieldSet } from '@/components/ui/field';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '#/stores/auth/useAuth';
import { useAlertStore } from '#/stores/alert/useAlert';

const idNameSchema = z.object({
    username: z.string(),
    password: z.string(),
})

type IdNameSchema = z.infer<typeof idNameSchema>

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

    const form = useForm({
        resolver: zodResolver(idNameSchema),
    })

    const { alert } = useAlertStore.getState();


    const [openModal, setOpenModal] = useState<boolean>(false);
    const { authService } = useServices();
    const { login } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: (credentials: IdNameSchema) => {
            return authService.execute({
                email: credentials.username,
                password: credentials.password
            });
        },
        onSuccess: () => {
            login();
            alert(messages.sessionSuccess);
            setOpenModal(true);

        },

        onError: (error) => {
            console.error(error);
            alert(messages.sessionError);
        }
    });

    const handleCallbackForm = form.handleSubmit(async (data: IdNameSchema) => loginMutation.mutate(data));

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="w-full max-w-9/12 mx-auto p-4">
                <Card className="shadow-lg flex flex-row justify-evenly py-16 px-4 items-center">
                    <div className="text-center mb-8 ml-8">
                        <Logo />
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
                            Bienvenido a Histonet
                        </h1>
                        <p className="mt-2 text-md text-gray-600">
                            Inicia sesión para gestionar tus citas.
                        </p>
                    </div>
                    <CardContent className='flex-1  max-w-1/2 px-0'>
                        <form onSubmit={handleCallbackForm}>
                            <FieldSet>
                                <Controller name="username" control={form.control} render={({ field }) =>
                                    <Field>
                                        <FieldLabel htmlFor="username">Nombre de Usuario</FieldLabel>
                                        <Input
                                            id="username"
                                            placeholder="@NombreDeUsuario"
                                            onChange={field.onChange}
                                            disabled={loginMutation.isPending}
                                            required
                                        />
                                    </Field>}
                                />
                                <Controller name="password" control={form.control} render={({ field }) =>
                                    <Field>
                                        <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                                        <Input
                                            id="password"
                                            placeholder="******"
                                            type='password'
                                            onChange={field.onChange}
                                            disabled={loginMutation.isPending}
                                            required
                                        />
                                    </Field>}
                                />
                            </FieldSet>

                            {/* Enlace de Olvidaste tu contraseña */}
                            <div className="text-sm text-right my-4">
                                <Link to="/forgot-password" className="font-medium text-blue-600 hover:underline">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>



                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                {loginMutation.isPending
                                    ?
                                    <>
                                        <LoadingCircle />
                                        Validando...
                                    </>
                                    :
                                    <>
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Iniciar Sesión
                                    </>
                                }
                            </Button>
                        </form>

                        <ModalProfile open={openModal} onOpenChange={setOpenModal} isDoctor />

                        <p className='mt-6 text-center text-sm text-gray-500'>
                            ¿No tienes cuenta?
                            <Link to={routeLabel.register} className='text-blue-600 hover:underline font-medium'>
                                Regístrate
                            </Link>
                        </p>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
};