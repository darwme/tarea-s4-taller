import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/usuario.js";
import { validateAlumno, validatePartialAlumno } from "../schemas/alumno.js";
import { stringify } from "uuid";
import {
  validateProfesor,
  validatePartialProfesor,
} from "../schemas/profesor.js";
import {
  validateAgenteExterno,
  validatePartialAgenteExterno,
} from "../schemas/agenteExterno.js";

import { validateUsuario, validatePartialUsuario } from "../schemas/usuario.js";

import {
  validateIntermediario,
  validatePartialIntermediario,
} from "../schemas/intermediario.js";

export class AuthController {
  static async logout(req, res) {
    req.session.destroy();
    res.status(200).json({ message: "Sesión cerrada" });
  }

  static async register(req, res) {
    const rolesAndValidacion = {
      AgenteExterno: validateAgenteExterno,
      Profesor: validateProfesor,
      Alumno: validateAlumno,
      Intermediario: validateIntermediario,
      Ninguno: validateUsuario,
    };
    let rol = req.body.rol;
    let result = rolesAndValidacion[rol](req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    try {
      res.status(201).json(await UsuarioModel._create({ input: result.data }));
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }

  static async login(req, res) {
    const result = validatePartialUsuario(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    try {
      const idUsuario = await UsuarioModel.verifyUsuario({
        input: result.data,
      });
      if (idUsuario === null || idUsuario == undefined) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60 * 60, data: idUsuario[0] },
        "secret"
      );
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(500).json({ message: "Error verificando usuario: " + error });
    }
  }
}
