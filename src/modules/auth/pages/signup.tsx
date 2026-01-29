// src/pages/Signup.jsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCallback, useMemo, useState, type ChangeEvent, type ReactElement as Component, type SyntheticEvent } from "react";

const COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<,>.?/|\\~`]).{8,}$/;
const MIN_LENGTH = 8;

function isAlreadyRegistered(data: string): boolean {
    return true
}

export const Signup = (): Component => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmError, setConfirmError] = useState('');

    const validateEmailError = useCallback((email: string): boolean => {
        if (isAlreadyRegistered(email)) {
            setEmailError('el email ya esta registrado')
            return false
        }
        return true;
    }, []);

    const validatePassword = useCallback((pass: string) => {
        if (!pass) {
            setPasswordError('La contraseña es obligatoria.');
            return false;
        }
        if (pass.length < MIN_LENGTH) {
            setPasswordError(`Debe tener al menos ${MIN_LENGTH} caracteres.`);
            return false;
        }
        if (!COMPLEXITY_REGEX.test(pass)) {
            setPasswordError('Debe incluir Mayúscula, minúscula, número y un símbolo.');
            return false;
        }
        setPasswordError('');
        return true;
    }, []);

    const validateConfirmation = useCallback((confirmPass: string, mainPass: string) => {
        if (!confirmPass) {
            setConfirmError('Confirma tu contraseña.');
            return false;
        }
        if (confirmPass !== mainPass) {
            setConfirmError('Las contraseñas no coinciden.');
            return false;
        }
        setConfirmError('');
        return true;
    }, []);

    const handleEmailRegistration = (e: ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        validateEmailError(newEmail);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Validar complejidad al escribir
        validatePassword(newPassword);

        // Revalidar confirmación si ya se había escrito algo
        if (confirmPassword) {
            validateConfirmation(confirmPassword, newPassword);
        }
    };

    const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newConfirm = e.target.value;
        setConfirmPassword(newConfirm);

        // Validar coincidencia al escribir
        validateConfirmation(newConfirm, password);
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        // Validar todos los campos al intentar enviar
        const isPasswordValid = validatePassword(password);
        const isConfirmValid = validateConfirmation(confirmPassword, password);

        if (isPasswordValid && isConfirmValid && name && email) {
            alert('Formulario válido. Viendo consola para datos.');
        } else {
            console.error('El formulario contiene errores o campos vacíos.');
        }
    };

    const isFormIncompleteOrInvalid = useMemo(() => {
        return !name || !email || !password || !confirmPassword || passwordError || confirmError;
    }, [name, email, password, confirmPassword, passwordError, confirmError]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Crear cuenta</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="name">Nombre completo</Label>
                            <Input className="mt-2"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                id="name"
                                type="text"
                                placeholder="Tu nombre"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input className="mt-2"
                                value={email}
                                onChange={handleEmailRegistration}
                                id="email"
                                type="email"
                                placeholder="ejemplo@correo.com"
                            />
                            {emailError && (
                                <p className="mt-1 text-sm text-red-600 font-medium">{emailError}</p>

                            )}
                        </div>
                        <div>
                            <Label htmlFor="password">Contraseña</Label>
                            <Input className="mt-2"
                                value={password}
                                onChange={handlePasswordChange}
                                id="password"
                                type="password"
                                placeholder="********"
                            />
                            {passwordError && (
                                <p className="mt-1 text-sm text-red-600 font-medium">{passwordError}</p>
                            )}
                            <div className="mt-2 text-xs text-gray-500 space-y-1">
                                <p>Requisitos de complejidad:</p>
                                <ul className="list-disc list-inside ml-2">
                                    <li className={password.length >= MIN_LENGTH ? 'text-green-600' : 'text-gray-500'}>Mínimo {MIN_LENGTH} caracteres</li>
                                    <li className={/(?=.*[A-Z])/.test(password) ? 'text-green-600' : 'text-gray-500'}>Al menos una mayúscula</li>
                                    <li className={/(?=.*\d)/.test(password) ? 'text-green-600' : 'text-gray-500'}>Al menos un número</li>
                                    <li className={/(?=.*[!@#$%^&*()_+={}[\]:;"'<,>.?/|\\~`])/.test(password) ? 'text-green-600' : 'text-gray-500'}>Al menos un símbolo</li>
                                </ul>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="confirm">Confirmar contraseña</Label>
                            <Input className="mt-2"
                                value={confirmPassword}
                                onChange={handleConfirmChange}
                                id="confirm"
                                type="password"
                                placeholder="********"
                            />
                            {confirmError && (
                                <p className="mt-1 text-sm text-red-600 font-medium">{confirmError}</p>
                            )}
                        </div>
                        <Button className="w-full"
                            type="submit"
                            disabled={isFormIncompleteOrInvalid == true ? true : false}
                        >

                            Registrarse
                        </Button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        ¿Ya tengo una cuenta?{" "}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Iniciar sesión
                        </a>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
