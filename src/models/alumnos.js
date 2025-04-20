import { UsuarioModel } from "./usuario.js";
import mysql from "mysql2/promise";
import { config } from "../config/mysqlConfig.js";

const connect = async () => {
  return await mysql.createConnection(config);
};
export class AlumnoModel extends UsuarioModel {
  static async getAll() {
    try {
      const connection = await connect();
      const [result] = await connection.query("CALL GetUsuariosAndAlumnos();");
      return result[0];
    } catch (error) {
      throw new Error("Error selecting students: ", error);
    }
  }

  static async getByCodigo({ codigo }) {
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "CALL GetUsuariosAndAlumnosByCodigo(?);",
        [codigo]
      );
      return result[0];
    } catch (error) {
      throw new Error("Error selecting student: ", error);
    }
  }
  static async deleteByCodigo({ codigo }) {
    try {
      const connection = await connect();
      const result = await connection.query(
        "CALL DeleteUsuarioAndAlumnoByCodigoAlumno(?);",
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
      celular,
      correoPersonal,
      egresado,
    } = input;
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "CALL UpdateUsuarioAndAlumno(?,?,?,?,?,?,?,?);",
        [
          codigo,
          nombreUsuario,
          contraseña,
          nombre,
          apellido,
          celular,
          correoPersonal,
          egresado,
        ]
      );
      if (result.affectedRows === 0) {
        return null;
      }
      return result;
    } catch (error) {
      throw new Error("Error updating student: " + error.message);
    }
  }
}
