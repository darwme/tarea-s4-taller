import zod from "zod";
import { usuarioSchema } from "./usuario.js";

export const profesorSchema = usuarioSchema.extend({
  codigo: zod.string({
    required_error: "El código de profesor es requerido",
    invalid_type_error: "El código de profesor debe ser un texto",
  }).length(6),
  nombre: zod.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un texto",
  }),
  apellido: zod.string({
    required_error: "El apellido es requerido",
    invalid_type_error: "El apellido debe ser un texto",
  }),
  correo: zod
    .string({
      invalid_type_error: "El correo personal debe ser un texto",
    })
    .email({
      message: "El correo personal es inválido",
    }),
  investigador: zod
    .boolean({
      required_error: "El investigador es requerido",
      invalid_type_error: "El investigador debe ser un booleano",
    })
    .default(false),
  telefono: zod.string({
    required_error: "El celular es requerido",
    invalid_type_error: "El celular debe ser un texto",
  }),
  encargadoEscuela: zod
    .boolean({
      required_error: "El encargado de escuela es requerido",
      invalid_type_error: "El encargado de escuela debe ser un booleano",
    })
    .default(false),
});

export const validateProfesor = (input) => {
  return profesorSchema.safeParse(input);
};

export const validatePartialProfesor = (input) => {
  return profesorSchema.partial().safeParse(input);
};
