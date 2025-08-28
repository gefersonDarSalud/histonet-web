import PatientEntity from "../../core/entities/Patient.entities";

export type fromApiPatient = {
    user_id: string;
    full_name: string;
    email_address: string;
}

export type toApiPatient = {
    id: string;
    username: string;
    email: string;
}

export default {
    fromApi: (apiPatient: fromApiPatient): PatientEntity => {
        return new PatientEntity(
            apiPatient.user_id,
            apiPatient.full_name,
            apiPatient.email_address,
        );
    },
    // Puedes tener un método para convertir la entidad de vuelta a un formato para la API
    toApi: (user: toApiPatient) => {
        return {
            user_id: user.id,
            full_name: user.username,
            email_address: user.email,
        };
    }
};