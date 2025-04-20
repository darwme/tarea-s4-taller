import { IntermediarioModel } from '../models/intermediarios.js';
import { validatePartialIntermediario } from '../schemas/intermediario.js';
import { tokenManager } from '../config/security.js';

export class IntermediarioController {
  static async getAll(req, res) {
    try {
      tokenManager(req);
      const intermediariosListados = await IntermediarioModel.getAll();
      res.status(200).json(intermediariosListados);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error seleccionando intermediarios" })
    }
  }

  static async getByCodigo(req, res) {
    const { codigo } = req.params;
    try {
      tokenManager(req);
      const intermediarioObtenido = await IntermediarioModel.getByCodigo({ codigo });
      res.status(200).json(intermediarioObtenido);
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error seleccionando intermediario" });
    }
  }

  static async update(req, res) {
    const { codigo } = req.params;
    const { body } = req;
    if(!codigo) {
      return res.status(400).json({ message: "El código es requerido" });
    }
    try {
      tokenManager(req);
      const input = validatePartialIntermediario(body);
      if (!input.success) {
        return res.status(400).json({ error: input.error });
      }
      const result = await IntermediarioModel.update({ codigoIN: codigo, input: input.data });
      
      if (!result) {
        return res.status(400).json(
          {
            success: false,
            message: "No se encontró el intermediario"
          }
        );
      }

      return res.status(200).json({
        success: true,
        message: "Intermediario actualizado"
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error actualizando intermediario" });
    }
  }

  static async deleteByCodigo(req, res) {
    const { codigo } = req.params;
    try {
      tokenManager(req);
      const eliminado = await IntermediarioModel.deleteByCodigo({ codigo });
      if (!eliminado) {
        return res.status(404).json({ message: "No se encontró el intermediario" });
      }
      res.status(200).json({ message: "Intermediario eliminado" });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error eliminando intermediario" });
    }
  }
}
