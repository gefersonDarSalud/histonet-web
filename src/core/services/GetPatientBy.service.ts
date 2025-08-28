import type PatientRepository from "../repositories/patient.repository";
import baseService from "./base.service";

class GetUserBy extends baseService {
    constructor(public patientRepository: PatientRepository) {
        super();
    }

    async execute(id: string) {
        const user = await this.patientRepository.getById(id);
        if (!user) {
            throw new Error('User not found.');
        }
        return user;
    }
}
export default GetUserBy;