import type { MedicalVisitAction, MedicalVisitNursingDetails } from "#/core/entities";
import { useReducer, type ReactNode } from "react";
import { MedicalVisitContext } from "..";

type PatialMedicalVisit = Partial<MedicalVisitNursingDetails>;

const initialMedicalVisitState: PatialMedicalVisit = {
    visitNumber: '',
    status: 'PENDIENTE', // Usamos el estado inicial definido en tus tipos
    patient: null,
    feeSchedule: { id: '', name: 'N/A' },
    dateTime: new Date().toISOString(),
    motive: { id: '', name: 'N/A' },
    visitType: { subType: 'PARTICULAR', groupType: 'INDIVIDUAL' },
    // Inicialización del objeto biometrics
    biometrics: {
        size: 0,
        weight: 0,
        temperature: 0,
        pulse: 0,
        pressure: null,
        bodyMassIndex: 0,
        oxygenSaturation: 0,
    }
};


const medicalVisitReducer = (
    state: MedicalVisitNursingDetails,
    action: MedicalVisitAction
): PatialMedicalVisit => {
    switch (action.type) {
        case 'SET_MEDICAL_VISIT':
            // 💡 Permite actualizar cualquier campo parcial en el nivel superior de MedicalVisit
            return { ...state, ...action.payload };

        case 'SET_STATUS':
            return { ...state, status: action.payload };

        case 'SET_PATIENT':
            // Reemplaza o establece la lista de pacientes
            return { ...state, patient: action.payload };

        case 'UPDATE_BIOMETRICS':
            // 💡 Actualiza el objeto anidado 'biometrics' de forma inmutable
            return {
                ...state,
                biometrics: {
                    ...state.biometrics,
                    ...action.payload
                }
            };

        case 'RESET_VISIT':
            // Reinicia a los valores iniciales.
            return initialMedicalVisitState;

        default:
            return state;
    }
};


interface MedicalVisitProviderProps {
    children: ReactNode;
}

/**
 * Proveedor de Contexto para la Visita Médica. Usa useReducer para gestionar
 * el estado complejo de forma predecible.
 */
export const MedicalVisitProvider = ({ children }: MedicalVisitProviderProps) => {
    const [state, dispatch] = useReducer(medicalVisitReducer, initialMedicalVisitState);

    // El valor del contexto
    const value = { state, dispatch };

    return (
        <MedicalVisitContext.Provider value={value}>
            {children}
        </MedicalVisitContext.Provider>
    );
};