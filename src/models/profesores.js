import mysql from "mysql2/promise";
import { config } from "../config/mysqlConfig.js";

const connect = async () => {
  return await mysql.createConnection(config);
};

export class ProfesorModel {
  static async getAll() {
    try {
      const connection = await connect();
      const [result] = await connection.query(
      "CALL GetUsuariosAndProfesores();"
      );
      return result[0];
    } catch (error) {
      throw error; // Propagate the error to the next level
    }
  }
  static async getByCodigo({ codigo }) {
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "CALL GetUsuarioAndProfesorByCodigo(?);",
        [codigo]
      );
      return result[0];
    } catch (error) {
      throw new Error("Error selecting teacher: ", error);
    }
  }
  static async deleteByCodigo({ codigo }) {
    try {
      const connection = await connect();
      const result = await connection.query(
        "CALL DeleteUsuarioAndProfesorByCodigoProfesor(?);",
        [codigo]
      );
      return result;
    } catch (error) {
      throw new Error("El error es : " + error.toString(), error);
    }
  }
  static async update({ codigo, input }) {
    const {
      nombreUsuario,
      contraseña,
      nombre,
      apellido,
      telefono,
      correo,
      investigador,
      encargadoEscuela,
    } = input;
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "CALL UpdateUsuarioAndProfesor(?,?,?,?,?,?,?,?,?);",
        [
          codigo,
          nombreUsuario,
          contraseña,
          nombre,
          apellido,
          telefono,
          correo,
          investigador,
          encargadoEscuela,
        ]
      );

      if (result.affectedRows === 0) {
        return null;
      }
      return result;
    } catch (error) {
      throw new Error("Error actualizando profesor: ", error);
    }
  }
}
