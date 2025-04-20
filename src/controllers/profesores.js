import { ProfesorModel } from "../models/profesores.js";
import {
  validateProfesor,
  validatePartialProfesor,
} from "../schemas/profesor.js";
import {tokenManager} from "../config/security.js";

export class ProfesorController {
  static async getAll() {
    try {
      const profesoresListados = await ProfesorModel.getAll();
      return profesoresListados; 
    } catch (error) {
      console.error("Error seleccionando profesores:", error);
      throw new Error("Error seleccionando profesores: " + error);
    }
  }

  static async getByCodigo(req, res) {
    const { codigo } = req.params;
    try {
      //tokenManager(req);
      const profesor = await ProfesorModel.getByCodigo({ codigo });
      return profesor;
    } catch (error) {
      res.status(500).json({ message: "Error seleccionando profesor" });
    }
  }

  static async create(req, res) {
    const result = validateProfesor(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    try {
      //tokenManager(req);
      const newProfesor = await ProfesorModel.create({ input: result.data });
      res.status(201).json(newProfesor);
    } catch (error) {

      res.status(500).json({ message: "Error creando profesor" });
    }
  }

  static async deleteByCodigo(req, res) {
    const { codigo } = req.params;
    try {
      //tokenManager(req);
      const deletedProfesor = await ProfesorModel.deleteByCodigo({ codigo });
      res.status(200).json(deletedProfesor);
    } catch (error) {
      res.status(500).json({ message: "Error eliminando profesor" });
    }
  }

  static async update(req, res) {
    const result = validatePartialProfesor(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { codigo } = req.params;
    try {
      //tokenManager(req);
      const updatedProfesor = await ProfesorModel.update({
        codigo,
        input: result.data,
      });
      res.status(200).json(updatedProfesor);
    } catch (error) {
      res.status(500).json({ message: "Error actualizando profesor" });
    }
  }
}
