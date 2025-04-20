import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/usuario.js";
import { stringify } from "uuid";

function validateToken(token) {
  let decoded = jwt.verify(token, "secret");
  const id = decoded.data["usuario_id"];
  return UsuarioModel.getById({ id }) !== null;
}

export function tokenManager(req) {
  if (!validateToken(req.headers.authorization.split(" ")[1])) {
    throw new Error("Token invalido");
  }
}

function verifyToken(headers) {
  try {
    if (!headers.authorization) {
      throw new Error("Token no proporcionado");
    }
    const token = headers.authorization.split(" ")[1];
    const deacoded = jwt.verify(token, "secret");
    return deacoded.data;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expirado");
    } else if (error.name === "JsonWebTokenError") {
      throw new Error("Token inválido");
    } else {
      throw new Error("Error de autenticación");
    }
  }
}

export function verifySystemToken(headers) {
  const { rol, ...resto } = verifyToken(headers);
  if (rol !== "System") {
    throw new Error("Solo System tienen acceso");
  }
}

export function verifyAdministradorToken(headers) {
  const { rol, ...resto } = verifyToken(headers);
  console.log(rol, encargadoEscuela);
  if (rol !== "Administrador") {
    throw new Error("Solo Administrador tiene acceso");
  }
}