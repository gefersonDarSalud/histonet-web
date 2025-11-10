import { isValidIdNumber } from "#/utils/functions";
import type { Patient } from "../entities/patient.entity";
import type { PatientRepository } from "../repositories/patient.repository";

// Asumiremos que es un service para "buscar pacientes"
export class SearchPatientsService {
    private repository: PatientRepository;

    constructor(repository: PatientRepository) {
        this.repository = repository;
    }

    async execute(TextSearched: string): Promise<Patient[]> {
        const fullNameTerms: string[] = [];
        let id = '';
        let fullname = '';

        const arrayText = TextSearched
            .split(' ')
            .map(text => text.trim());

        arrayText.forEach(text => {
            if (isValidIdNumber(text)) {
                id = text;
            } else {
                fullNameTerms.push(text);
                fullname = fullNameTerms.join(' ');
            }
        });

        const patients: Patient[] = await this.repository.searchPatients({ id, fullname });

        return patients;
    }
}