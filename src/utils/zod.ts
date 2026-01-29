import * as z from "zod";

export const IdNameSchema = z.object({
    id: z.string().min(1, "El ID string es requerido."),
    name: z.string().min(1, "El nombre es requerido para la selección."),
});     