import zod from 'zod';
import { usuarioSchema } from './usuario.js';

export const intermediarioSchema = usuarioSchema.extend({
  codigo: zod.string({
    required_error: "El codigo es requerido",
    invalid_type_error: "El codigo debe ser un texto"
  }).max(8),
  nombre: zod.string({
    required_error: "El nombre es requerido",
    invalid_type_error: "El nombre debe ser un texto"
  }).max(30),
  apellido: zod.string({
    required_error: "El apellido es requerido",
    invalid_type_error: "El apellido debe ser un texto"
  }).max(50),
  organizacion: zod.string({
    required_error: "La organizacion es requerida",
    invalid_type_error: "La organizacion debe ser un texto"
  }),
  correo: zod.string({
    required_error: "El correo es requerida",
    invalid_type_error: "El correo debe ser un texto"
  }).email({
    message: "El correo es invalido"
  }),
  contacto: zod.string({
    required_error: "El contacto es requerido",
    invalid_type_error: "El contacto debe ser un texto"
  }).max(15)
});

export const validateIntermediario = (input) => {
  return intermediarioSchema.safeParse(input);
}

export const validatePartialIntermediario = (input) => {
  return intermediarioSchema.partial().safeParse(input);
}

