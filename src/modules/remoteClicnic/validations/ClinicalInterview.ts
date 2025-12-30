import { z } from "zod";

// --- Esquema de Validación Zod ---
export const VisitSchema = z.object({
    // Sección: Entrevista Clínica
    clinicalInterview: z.string()
        // .min(20, "Detalle la entrevista clínica (mínimo 20 caracteres).")
        .max(10000)
        .optional(),

    chiefComplaint: z.string()
        // .min(20, "Detalle la enfermedad actual (mínimo 20 caracteres).")
        .max(2000),

    // Sección: Antecedentes
    familyHistory: z.array(z.string()).optional(), // Ej: ['Diabetes', 'Cáncer']
    otherFamilyHistory: z.string().max(500).optional(),
    personalHistory: z.array(z.string()).optional(), // Ej: ['Alergia a Penicilina', 'Asma']
    personalHistoryInput: z.string().max(200).optional(), // Campo temporal para añadir nuevos

    // Sección: Hábitos
    habit: z.array(z.string()).optional(), // Ej: ['Tabaquismo', 'Ejercicio Regular']
    habitDetails: z.string().max(500).optional(),

    // Sección: Exploración Física
    bloodPressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/, "Formato inválido (Ej: 120/80)").optional(),
    heartRate: z.number().int().min(30).max(200).nullable().optional(), // Usamos nullable y optional para campos numéricos vacíos
    temperature: z.number().min(30).max(45).nullable().optional(),
    weight: z.number().min(1).max(500).nullable().optional(),
    painScale: z.number().int().min(0).max(10), // Rango de 0 a 10

    // Sección: Observaciones
    observations: z.string().max(2000).optional(),
    comments: z.string().max(2000).optional(),

    // NOTA: El Plan Médico es complejo y generalmente se maneja con arrays
    // o componentes de estado interno separados, pero lo tipamos como placeholder.
    medicalPlan: z.array(z.object({
        type: z.enum(["Medicamento", "Terapia", "Cita"]),
        detail: z.string(),
    })).optional(),
});

// --- Tipo TypeScript a partir del esquema Zod ---
export type VisitFormValues = z.infer<typeof VisitSchema>;

// --- Tipos para la UI ---
export const otherFamilyHistoryOptions = [
    "Diabetes",
    "Hipertensión",
    "Cáncer",
    "Cardiopatía",
] as const;

export const habitsOptions = [
    "Tabaquismo",
    "Alcoholismo",
    "Ejercicio Regular",
    "Dieta Balanceada",
] as const;