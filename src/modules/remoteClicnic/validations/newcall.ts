import { z } from "zod";

/**
 * Schema de validación para el formulario de Nueva Llamada
 * 
 * Flujo de registro:
 * 1. Búsqueda de paciente por cédula o nombre
 * 2. Selección del tipo de ingreso (Particular, Asegurado, Corporativo, Convenio)
 * 3. Motivo de la llamada
 * 4. Selección de titular (si aplica)
 * 5. Baremo de precios y servicios
 */
export const schema = z.object({
  // Datos del paciente (búsqueda)
  patientId: z.string().min(1, "Debe seleccionar un paciente"),
  patientCode: z.string(),
  patientFullName: z.string(),
  
  // Tipo de ingreso
  admissionType: z.enum(['particular', 'asegurado', 'corporativo', 'convenio']),
  
  // Motivo de la llamada
  visitMotive: z.string().min(1, "Debe ingresar el motivo de la llamada"),
  
  // Datos del titular (para dependientes)
  policyHolderId: z.string().optional(),
  policyHolderName: z.string().optional(),
  
  // Empresa/Aseguradora (para corporativos/asegurados)
  businessId: z.string().optional(),
  businessName: z.string().optional(),
  
  // Baremo y servicios
  feeScheduleId: z.string().optional(),
  services: z.array(z.string()).optional(),
  
  // Observaciones adicionales
  observations: z.string().optional(),
}).refine((data) => {
  // Validación condicional: si es asegurado o corporativo, requiere empresa
  if (['asegurado', 'corporativo'].includes(data.admissionType)) {
    return !!data.businessId;
  }
  return true;
}, {
  message: "Debe seleccionar una empresa/aseguradora para este tipo de ingreso",
  path: ["businessId"],
});

export type SchemaType = z.infer<typeof schema>;
