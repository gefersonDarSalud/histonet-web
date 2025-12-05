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
import type { Patient, Response } from '#/core/entities';
import { AddRelationshipModalSearchPatient } from './addRelationshipModalSearchPatient';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useToast } from '@/hooks/useToast';
import type { ToastProps } from '#/hooks/toastProvider';
import type { SetPatientRelationshipServiceProps } from '#/core/services/patient/setPatientRelationship';
import { Code } from '@/components/app/code';

interface AddRelationshipModalProps {
    triggerText: string;
    mainPatientId: string;
    onSaveSuccess: () => void;
}

const validationErrors: ToastProps[] = [
    {
        title: "Error de Validación",
        description: "Debe seleccionar el beneficiario/titular y el tipo de relación.",
        variant: 'destructive',
    },
    {
        title: "Error de Validación",
        description: "No se puede establecer una relación con el paciente actual.",
        variant: 'destructive',
    }
]

export const AddRelationshipModal = ({ triggerText, mainPatientId, onSaveSuccess }: AddRelationshipModalProps): React.ReactElement => {

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
    const [relationship, setRelationship] = useState<string>('');
    const [relationshipType, setRelationshipType] = useState<'TITULAR' | 'BENEFICIARIO'>('BENEFICIARIO');
    const [isSaving, setIsSaving] = useState(false);

    const { setPatientRelationship, searchPatientsService } = useServices(); // Añadimos setPatientRelationship
    const { toast } = useToast();

    const { data: patientSearched, execute: patientSearchedFetch } = useFetch<Patient[], string[]>(searchPatientsService.execute, []);

    // Datos simulados para el parentesco
    const relationshipOptions = [
        { value: 'madre', label: 'Madre' },
        { value: 'padre', label: 'Padre' },
        { value: 'hermano', label: 'Hermano(a)' },
        { value: 'primo', label: 'Primo(a)' },
        { value: 'otro', label: 'Otro' },
    ];

    useEffect(
        () => { if (searchTerm !== '') patientSearchedFetch(searchTerm) },
        [patientSearchedFetch, searchTerm]
    );

    const handleClose = () => {
        setIsOpen(false);
        setSearchTerm('');
        setSelectedPatient(null);
        setRelationship('');
        setIsSaving(false); // Limpiar también el estado de guardado
    };

    const handleSaveRelationship = async () => {
        if (!selectedPatient || !relationship) return toast(validationErrors[0]);
        if (selectedPatient === mainPatientId) return toast(validationErrors[1]);

        setIsSaving(true);

        try {
            let beneficiary: string = selectedPatient;
            let owner: string = mainPatientId;
            if (relationshipType === 'TITULAR') {
                beneficiary = mainPatientId;
                owner = selectedPatient;
            }
            const relationshipData: SetPatientRelationshipServiceProps = { beneficiary, owner, relationship };
            const response: Response = await setPatientRelationship.execute(relationshipData);

            // 5. Manejar la respuesta
            if (response.status === 1) {
                toast({
                    title: "Éxito",
                    description: response.resultado || "Relación guardada correctamente.",
                    variant: 'default',
                });
                handleClose();
                onSaveSuccess();
            }
            else {
                toast({
                    title: "Error al guardar",
                    description: "Ocurrió un error al guardar la relación.",
                    variant: 'destructive',
                });
            }
        }

        catch (error) {
            console.error("Error saving relationship:", error);
            toast({
                title: "Error de Conexión",
                description: "No se pudo comunicar con el servidor para guardar la relación.",
                variant: 'destructive',
            });
        }

        finally {
            setIsSaving(false);
        }
    };

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
                        <AddRelationshipModalSearchPatient
                            list={patientSearched ?? []}
                            selected={{ value: selectedPatient, set: setSelectedPatient }}
                            text={{ value: searchTerm, set: setSearchTerm }}
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
                    <Button variant="outline" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button type="button" onClick={handleSaveRelationship} disabled={isSaving || !selectedPatient || !relationship}>
                        {isSaving ? "Guardando..." : "Guardar"}
                    </Button>
                    <Code data={{
                        isOpen,
                        searchTerm,
                        selectedPatient,
                        relationship,
                        relationshipType,
                        isSaving,
                        patientSelected
                    }} />
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};