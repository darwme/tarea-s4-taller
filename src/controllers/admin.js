import { AdminModel } from "../models/admin.js";
import { validateUsuario, validatePartialUsuario } from "../schemas/usuario.js";
import { tokenManager, verifySystemToken, verifyAdministradorToken } from "../config/security.js";

export class AdminController {
  static async getAll(req, res) {
    try {
      //verifySystemToken(req);
      const result = await AdminModel.getAll();
      console.log("result:" + JSON.stringify(result, null, 1));
      if (result.success) {
        res.status(200).json(result.administradores);
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      console.log("error:", JSON.stringify(error, null, 1));
      res
        .status(500)
        .json({ message: "Error seleccionando administradores", error });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      //verifySystemToken(req);
      const result = await AdminModel.getById(id);

      if (result.success) {
        res.status(200).json({
          result,
          message: "Administrador encontrado exitosamente",
        });
      } else {
        res.status(404).json({ message: result.message });
      }
    } catch (error) {
      res.status(500).json({ message: "Error seleccionando administrador" });
    }
  }

  static async create(req, res) {
    try {
      //verifySystemToken();
      const result = validateUsuario(req.body);
      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const createdAdmin = await AdminModel.create(result.data);

      if (createdAdmin.success) {
        res.status(201).json({
          success: createdAdmin.success,
          data: createdAdmin?.data,
          message: createdAdmin.message,
        });
      } else {
        res.status(400).json({
          success: createdAdmin.success,
          message: createdAdmin.message,
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    //verifySystemToken(req);
    const result = validatePartialUsuario(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "El id es requerido" });
    }
    try {
      const updatedAdmin = await AdminModel.update({
        id,
        input: result.data,
      });

      if (updatedAdmin.success) {
        res.status(200).json(updatedAdmin);
      } else {
        res.status(400).json({ message: updatedAdmin.message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;
    try {
      tokenManager(req);
      const result = await AdminModel.delete({ id });

      if (result.success) {
        res.status(200).json({
          result,
          message: result.message,
        });
      } else {
        res
          .status(404)
          .json({ message: "No se ha encontrado el administrador" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
