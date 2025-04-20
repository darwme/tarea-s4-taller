import { ExternoModel } from "../models/externos.js";
import { validatePartialAgenteExterno } from "../schemas/agenteExterno.js";
import {tokenManager} from "../config/security.js";

export class ExternoController {
  static async getAll(req, res) {
    try {
      tokenManager(req);
      const externosListados = await ExternoModel.getAll();
      res.status(200).json(externosListados);
    } catch (error) {
      res.status(500).json({ message: "Error seleccionando externos" });
    }
  }

  static async getByCodigo(req, res) {
    const { codigo } = req.params;
    try {
      tokenManager(req);
      const externo = await ExternoModel.getByCodigo({ codigo });
      res.status(200).json(externo);
    } catch (error) {
      res.status(500).json({ message: "Error seleccionando externo" });
    }
  }

  static async update(req, res) {
    const result = validatePartialAgenteExterno(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { codigo } = req.params;
    if (!codigo) {
      res.status(400).json({ message: "El codigo es requerido" });
    }
    try {
      tokenManager(req);
      const updatedExterno = await ExternoModel.update({
        codigo,
        input: result.data,
      });
      res.status(200).json(updatedExterno);
    } catch (error) {
      res.status(500).json({ message: "Error actualizando externo" });
    }
  }

  static async deleteByCodigo(req, res) {
    const { codigo } = req.params;
    try {
      tokenManager(req);
      await ExternoModel.deleteByCodigo(codigo);
      res.status(201).json("Se elimino el usuario");
    } catch (error) {
      res.status(500).json({ message: "Error eliminando externo" });
    }
  }
}
