import mysql from "mysql2/promise";
import { config } from "../config/mysqlConfig.js";

const connect = async () => {
  return await mysql.createConnection(config);
};

export class ExternoModel {
  static async getAll() {
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "CALL GetUsuariosAndAgenteExternos();"
      );
      return result[0];
    } catch (error) {
      throw new Error("Error selecting externos: ", error);
    }
  }

  static async getByCodigo({ codigo }) {
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "CALL GetUsuarioAndExternoByCodigo(?);",
        [codigo]
      );
      return result[0];
    } catch (error) {
      throw new Error("Error selecting externo: ", error);
    }
  }

  static async deleteByCodigo({ codigo }) {
    try {
      const connection = await connect();
      const result = await connection.query(
        "CALL DeleteUsuarioAndExternoByCodigoExterno(?);",
        [codigo]
      );
      return result;
    } catch (error) {
      throw new Error("El error es : " + error.toString(), error);
    }
  }

  static async update({ codigo, input }) {
    const { nombreUsuario, contraseña, necesidad, contacto } = input;
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "CALL UpdateUsuarioAndExterno(?,?,?,?,?,?,?,?);",
        [codigo, nombreUsuario, contraseña, necesidad, contacto]
      );
      return result;
    } catch (error) {
      throw new Error("El error es : " + error.toString(), error);
    }
  }
}
