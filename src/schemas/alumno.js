import zod from "zod";
import { usuarioSchema } from "./usuario.js";

export const alumnoSchema = usuarioSchema.extend({
  codigo: zod.string({
    required_error: "El código de alumno es requerido",
    invalid_type_error: "El código de alumno debe ser un texto",
  })
    .length(8),
  nombre: zod.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un texto",
  }),
  apellido: zod.string({
    required_error: "El apellido es requerido",
    invalid_type_error: "El apellido debe ser un texto",
  }),
  correoInstitucional: zod
    .string({
      required_error: "El correo institucional es requerido",
      invalid_type_error: "El correo institucional debe ser un texto",
    })
    .email({
      message: "El correo institucional es inválido",
    })
    .refine((value) => value.endsWith("@unmsm.edu.pe"), {
      message: "El correo institucional debe ser de la UNMSM",
    }),
  correoPersonal: zod
    .string({
      invalid_type_error: "El correo personal debe ser un texto",
    })
    .email({
      message: "El correo personal es inválido",
    }),
  celular: zod.string({
    required_error: "El celular es requerido",
    invalid_type_error: "El celular debe ser un texto",
  }),
  egresado: zod
    .boolean({
      required_error: "El egresado es requerido",
      invalid_type_error: "El egresado debe ser un booleano",
    })
    .default(false),
});

export const validateAlumno = (input) => {
  return alumnoSchema.safeParse(input);
};

export const validatePartialAlumno = (input) => {
  return alumnoSchema.partial().parse(input);
};
