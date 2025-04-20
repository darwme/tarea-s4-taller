import zod from "zod";

export const usuarioSchema = zod.object({
  nombreUsuario: zod.string({
    required_error: "El usuario es requerido",
    invalid_type_error: "El usuario debe ser un texto",
  }),
  contraseña: zod.string({
    required_error: "La contraseña es requerida",
    invalid_type_error: "La contraseña debe ser un texto",
  }),
  estado: zod
    .enum(["activo", "restringido", "inactivo"], {
      required_error: "El estado es requerido",
      invalid_type_error: "El estado debe ser un texto",
    })
    .default("activo"),
  rol: zod.enum(
    ["Alumno", "Profesor", "AgenteExterno", "Administrador", "Intermediario"], {
    required_error: "El rol es requerido",
    invalid_type_error: "El rol debe ser un texto"
  }),
  metas: zod.string().optional(),
});

export const validateUsuario = (input) => {
  return usuarioSchema.safeParse(input);
};

export const validatePartialUsuario = (input) => {
  return usuarioSchema.partial().safeParse(input);
};
