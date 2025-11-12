
export interface Business {
    id: string;
    name: string;
    code: string;
    insurance?: {
        id: string;
        name: string;
        code: string;
    } | null;
}