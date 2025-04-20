import mysql from "mysql2/promise";
import { config } from "../config/mysqlConfig.js";

const pool =  await mysql.createPool({
  connectionLimit: 200,
  ...config
});

const connect = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    throw new Error("Error de conexión a la base de datos: " + error);
  }
};

export class IntermediarioModel {
  static async getAll() {
    try {
      const connection = await connect();
      const [result] = await connection.query("CALL GetUsuariosAndIntermediarios();");
    return result[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  static async getByCodigo({ codigo }) {
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "CALL GetUsuarioAndIntermediarioByCodigo(?);",
        [codigo]
      );
      return result[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  static async update({ codigoIN, input }) { 
    try {
      const {codigo, ...inputIN} = input;

      const inputJSON = JSON.stringify(inputIN);
      const connection = await connect();
      const [result] = await connection.query(
        "CALL UpdateUsuarioByCodigo(?,?);",
        [codigoIN, inputJSON]
      );

      if (result.affectedRows === 1) {
        return true;
      }

      return null;

    }catch (err) {
      console.error("error:",err);
      throw err;
    }
  }

  static async deleteByCodigo({ codigo }) {
    try {
      const connection = await connect();
      console.log("codigo",codigo);
      const [result] = await connection.query(
        "CALL DeleteUsuarioAndIntermediarioByCodigoIntermediario(?);",
        [codigo]
      );
      return result[0];
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
