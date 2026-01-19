import { IdNameSchema } from "#/utils/zod";
import { z } from "zod";

const extendedSchema = IdNameSchema.extend({
    description: z.string().optional(),
    type: z.string().optional(),
}).nullable();

export const Schema = z.object({
    clinicalInterview: z.string().max(10000).optional(),
    chiefComplaint: z.string().max(2000),
    familyHistory: extendedSchema.array().optional(),
    personalHistory: extendedSchema.array().optional(),
    // otherFamilyHistory: z.string().max(500).optional(),
    //personalHistoryInput: z.string().max(200).optional(), 
    habit: extendedSchema.array().optional(),
    habitDetails: z.string().max(500).optional(),
    bloodPressure: z.string().regex(/^\d{2,3}\/\d{2,3}$/, "Formato inválido (Ej: 120/80)").optional(),
    heartRate: z.number().int().min(30).max(200).nullable().optional(),
    temperature: z.number().min(30).max(45).nullable().optional(),
    weight: z.number().min(1).max(500).nullable().optional(),
    // painScale: z.number().int().min(0).max(10), 
    observations: z.string().max(2000).optional(),
    notes: z.string().max(2000).optional(),
    // medicalPlan: z.array(z.object({
    //     type: z.enum(["Medicamento", "Terapia", "Cita"]),
    //     detail: z.string(),
    // })).optional(),
});

export type VisitFormValues = z.infer<typeof Schema>;

export const otherFamilyHistoryOptions = [
    "Diabetes",
    "Hipertensión",
    "Cáncer",
    "Cardiopatía",
] as const;