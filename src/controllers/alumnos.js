import { AlumnoModel } from "../models/alumnos.js";
import { validateAlumno, validatePartialAlumno } from "../schemas/alumno.js";
import {tokenManager} from "../config/security.js";

export class AlumnoController {
  static async getAll(req, res) {
    try {
      tokenManager(req);
      const alumnosListados = await AlumnoModel.getAll();
      res.status(200).json(alumnosListados);
    } catch (error) {
      res.status(500).json({ message: "Error seleccionando alumnos" });
    }
  }

  static async getByCodigo(req, res) {
    const { codigo } = req.params;
    try {
      tokenManager(req);
      const alumno = await AlumnoModel.getByCodigo({ codigo });
      res.status(200).json(alumno);
    } catch (error) {
      res.status(500).json({ message: "Error seleccionando alumno" });
    }
  }

  static async update(req, res) {
    const result = validatePartialAlumno(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { codigo } = req.params;
    if (!codigo) {
      res.status(400).json({ message: "El codigo es requerido" });
    }
    try {
      tokenManager(req);
      const updatedAlumno = await AlumnoModel.update({
        codigo,
        input: result.data,
      });
      res.status(200).json(updatedAlumno);
    } catch (error) {
      res.status(500).json({ message: "Error actualizando alumno" });
    }
  }

  static async deleteByCodigo(req, res) {
    const { codigo } = req.params;
    try {
      tokenManager(req);
      await AlumnoModel.deleteByCodigo(codigo);
      res.status(201).json("Se elimino el usuario");
    } catch (error) {
      res.status(500).json({ message: "Error eliminando alumno" });
    }
  }
}
