export default class PatientEntity {
    constructor(
        public id: string,
        public username: string,
        public email: string
    ) {
        if (!id || !username || !email) throw new Error('Patient entity must have id, username, and email.');
    }
}