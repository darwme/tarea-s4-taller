import zod from "zod";
import { usuarioSchema } from "./usuario.js";

export const agenteExternoSchema = usuarioSchema.extend({
  nombre: zod.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un texto",
  }),
  codigo: zod.string({
    required_error: "El código de agente externo es requerido",
    invalid_type_error: "El código de agente externo debe ser un texto",
  }).length(8),
  necesidad: zod.string({
    required_error: "La necesidad es requerida",
    invalid_type_error: "La necesidad debe ser un texto",
  }),
  organizacion: zod
    .enum(["SAC", "SA", "SRL", "EIRL", "SAA"], {
      required_error: "La organización es requerida",
      invalid_type_error: "La organización debe ser un texto",
    })
    .default("SAC"),
  contacto: zod.string({
    required_error: "El contacto es requerido",
    invalid_type_error: "El contacto debe ser un texto",
  }),
  correo: zod.string({
    required_error: "El correo es requerido",
  }).email({
    message: "El correo es invalido"
  })
});

export const validateAgenteExterno = (input) => {
  return agenteExternoSchema.safeParse(input);
};

export const validatePartialAgenteExterno = (input) => {
  return agenteExternoSchema.partial().parse(input);
};
