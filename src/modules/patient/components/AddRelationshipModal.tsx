// src/patient/components/AddRelationshipModal.tsx

import React, { useEffect, useMemo, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'; // Asume esta ruta
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'; // Usamos Avatar para el resultado de búsqueda
import { useFetch } from '#/hooks/useFetch';
import { useServices } from '#/hooks/useServices';
import type { Patient } from '#/core/entities';
import { AddRelationshipModalSearchPatient } from './addRelationshipModalSearchPatient';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';

// Interfaz para el paciente seleccionado en la búsqueda (basada en tu PatientRelationship)
// export interface SelectedPatient {
//     patient_code: string; // Código/Cédula
//     id_patient: string;
//     id_client: string;
//     fullname: string;
// }

interface AddRelationshipModalProps {
    triggerText: string;
}

export const AddRelationshipModal = ({ triggerText }: AddRelationshipModalProps): React.ReactElement => {

    // Estado del modal (abierto/cerrado)
    const [isOpen, setIsOpen] = useState(false);
    // Estado para el texto de búsqueda (simulación)
    const [searchTerm, setSearchTerm] = useState('');
    // Estado para el paciente seleccionado
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
    // Estado para el parentesco
    const [relationship, setRelationship] = useState<string>('');
    // Estado para el tipo de relación a agregar
    const [relationshipType, setRelationshipType] = useState<'TITULAR' | 'BENEFICIARIO'>('BENEFICIARIO');

    const {
        data: patientSearched,
        // loading: isLoadingPatientSearched,
        // error: beneficiariesError,
        execute: patientSearchedFetch,
        // set: setGrouppatientSearched,
    } = useFetch<Patient[], string[]>(
        useServices().searchPatientsService.execute,
        []
    );

    // Datos simulados para el parentesco
    const relationshipOptions = [
        { value: 'madre', label: 'Madre' },
        { value: 'padre', label: 'Padre' },
        { value: 'hermano', label: 'Hermano(a)' },
        { value: 'primo', label: 'Primo(a)' },
        { value: 'otro', label: 'Otro' },
    ];

    // Función que simula la búsqueda de un paciente (basado en la imagen)
    useEffect(
        () => {
            if (searchTerm !== '') patientSearchedFetch(searchTerm)
        },
        [patientSearchedFetch, searchTerm]
    );

    const patientSelected = useMemo(() => {
        return patientSearched?.find(patient => patient.id.toLowerCase() === selectedPatient?.toLowerCase());
    }, [patientSearched, selectedPatient])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="default" onClick={() => setIsOpen(true)}>
                    {triggerText}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40vw]">
                <DialogHeader>
                    <DialogTitle>Agregar Titular/Beneficiario</DialogTitle>
                    <DialogDescription>
                        Busque y seleccione un paciente para agregarlo como titular o beneficiario.
                    </DialogDescription>
                </DialogHeader>

                {/* Sección Buscar Paciente */}
                <FieldGroup className='flex flex-row justify-center items-center'>
                    <Field>
                        <FieldLabel htmlFor="search-patient" className="text-left">
                            Buscar Paciente
                        </FieldLabel>
                        {/* <Search className="h-4 w-4 text-gray-400 absolute ml-3" /> */}
                        <AddRelationshipModalSearchPatient
                            list={patientSearched !== null ? patientSearched : []}
                            selected={{
                                value: selectedPatient,
                                set: setSelectedPatient
                            }}
                            text={{
                                value: searchTerm,
                                set: setSearchTerm,
                            }}
                            patient={typeof patientSelected !== 'undefined' ? patientSelected : null}
                        />
                    </Field>

                    <Field className='max-w-40'>
                        <Label htmlFor="type-select">Tipo de Relación</Label>
                        <Select
                            value={relationshipType}
                            onValueChange={(value: 'TITULAR' | 'BENEFICIARIO') => setRelationshipType(value)}
                        >
                            <SelectTrigger id="type-select" className="w-[150px]">
                                <SelectValue placeholder="Seleccione Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BENEFICIARIO">Beneficiario</SelectItem>
                                <SelectItem value="TITULAR">Titular</SelectItem>
                            </SelectContent>
                        </Select>
                    </Field>
                </FieldGroup>

                <FieldGroup className='flex-row'>

                    {/* Resultado de la Búsqueda */}
                    {/* <div className="border p-3 rounded-lg flex items-center justify-between min-h-[60px]">
                        {selectedPatient ? (
                            <>
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarFallback className="bg-gray-200 p-2 rounded-full h-8 w-8 flex items-center justify-center">
                                            {selectedPatient.fullname.slice(0, 2).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-sm">{selectedPatient.fullname}</div>
                                        <div className="text-xs text-gray-500">C.I. {selectedPatient.patient_code}</div>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    onClick={() => handleSelectPatient(selectedPatient!)}
                                    // Desactivamos el botón si ya está seleccionado (solo para el ejemplo)
                                    // En la práctica real, este botón solo aparece al buscar
                                    disabled
                                >
                                    Seleccionar
                                </Button>
                            </>
                        ) : (
                            // Simulación: Si hay texto de búsqueda pero no se encontró nada, mostramos un mensaje
                            searchTerm.length > 0 ? (
                                <span className="text-sm text-gray-500">No se encontró paciente.</span>
                            ) : (
                                <span className="text-sm text-gray-400">Escriba para buscar...</span>
                            )
                        )}
                    </div> */}

                    {/* Código (Campo de solo lectura) */}
                    <Field>
                        <FieldLabel htmlFor="codigo" className="text-left">
                            Código
                        </FieldLabel>
                        <Input id="codigo" value={patientSelected?.code} disabled /> {/* Código estático según tu imagen */}
                    </Field>

                    {/* Nombre (Campo de solo lectura) */}
                    <Field>

                        <FieldLabel htmlFor="nombre" className="text-left">
                            Nombre
                        </FieldLabel>
                        <Input id="nombre" value={patientSelected?.fullname ?? ''} disabled />
                    </Field>

                    {/* Parentesco */}
                    <Field>
                        <FieldLabel htmlFor="parentesco" className="text-left">
                            Parentesco
                        </FieldLabel>
                        <Select value={relationship} onValueChange={setRelationship}>
                            <SelectTrigger id="parentesco">
                                <SelectValue placeholder="Seleccione Parentesco" />
                            </SelectTrigger>
                            <SelectContent>
                                {relationshipOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Field>


                </FieldGroup>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                    >
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};