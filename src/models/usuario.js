import mysql from "mysql2/promise";
import { config } from "../config/mysqlConfig.js";
import crypto from "crypto";

const pool = mysql.createPool({
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

export class UsuarioModel {
  static async verifyUsuario({ input }) {
    const { nombreUsuario, contraseña } = input;
    const contraseñaHash = crypto
      .createHash("sha256")
      .update(contraseña)
      .digest("hex");
    try {
      const connection = await connect();
      const [result] = await connection.execute(
        "CALL VerifyUsuario(?, ?,@idUsuarioOut);",
        [nombreUsuario, contraseñaHash]
      );
      const idUsuarioOut = result[0][0].idUsuarioOut;
      if (!idUsuarioOut) {
        connection.release();
        return null;
      } else {
        const result2 = await connection.execute(
          "CALL GetUsuarioInfo(UUID_TO_BIN(?));",
          [idUsuarioOut]
        );
        connection.release();
        const userInfo = result2[0][0];
        return userInfo;
      }
    } catch (error) {
      throw new Error("Error verificando usuario: " + error.message);
    }
  }

  static async getAll() {
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "SELECT BIN_TO_UUID(id) as id, nombreUsuario, contraseña FROM Usuario;"
      );
      connection.release();
      return result;
    } catch (error) {
      throw new Error("Error seleccionando usuarios: ", error);
    }
  }

  static async getById({ id }) {
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "SELECT BIN_TO_UUID(id) as id, nombreUsuario, contraseña FROM Usuario WHERE id = UUID_TO_BIN(?);",
        [id]
      );
      connection.release();
      if (result.length === 0) {
        return null;
      }
    } catch (error) {
      throw new Error("Error seleccionando usuario por id: " + error);
    }
  }
  //register para usuario
  static async create({ input }) {
    const { nombreUsuario, contraseña } = input;

    const connection = await connect();
    const [uuidResult] = await connection.query("SELECT UUID() uuid;");
    const [{ uuid }] = uuidResult;

    try {
      connection.query(
        "INSERT INTO Usuario (id, nombreUsuario, contraseña) VALUES (UUID_TO_BIN(?), ?, ?);",
        [uuid, nombreUsuario, contraseña]
      );
    } catch (error) {
      throw new Error("Error creando usuario: ", error);
    }

    try {
      const [newUsuario] = await connection.query(
        "SELECT BIN_TO_UUID(id) as id, nombreUsuario, contraseña FROM Usuario WHERE id = UUID_TO_BIN(?);",
        [uuid]
      );
      connection.release();
      return newUsuario[0];
    } catch (error) {
      throw new Error("Error seleccionando usuario creado: ", error);
    }
  }
  //register para todos los roles
  static async _create({ input }) {
    try {
      const {
        nombreUsuario = "",
        contraseña = "",
        rol = "",
        nombre = "",
        apellido = "",
        codigo = "",
        correo = "",
        correoInstitucional = "",
        correoPersonal = correo,
        celular = "",
        egresado = false,
        investigador = false,
        encargadoEscuela = false,
        contacto = "",
        necesidad = "",
        organizacion = "",
      } = input;
      const connection = await connect();
      const result = await connection.execute(
        "CALL SetUsuario(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
        [
          nombreUsuario,
          contraseña,
          rol,
          nombre,
          apellido,
          codigo,
          correoInstitucional,
          correoPersonal,
          celular,
          egresado,
          investigador,
          encargadoEscuela,
          contacto,
          necesidad,
          organizacion,
        ]
      );
      if (result[0].affectedRows === 0) {
        console.log(result[0].message);
        throw new Error("Error creando usuario" + result[0].message);
      }

      return {
        message: result[0][1],
        data: result[0][0],
      };
    } catch (error) {
      console.log("error", error);
      throw new Error("Error creando usuario: " + error.message);
    }
  }

  static async update({ id, input }) {
    const { contraseña, estado } = input;
    try {
      const connection = await connect();
      const [result] = await connection.execute(
        `UPDATE Usuario SET contraseña = ?, estado = ? WHERE id = UUID_TO_BIN(?);`,
        [contraseña, estado, id]
      );
      if (result.affectedRows === 0) {
        return null;
      }
    } catch (error) {
      throw new Error("Error actualizando usuario");
    }
  }

  static async suspend({ id }) {
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "UPDATE Usuario SET estado = 'suspendido' WHERE id = UUID_TO_BIN(?);",
        [id]
      );

      if (result.affectedRows === 0) {
        return {
          success: false,
        };
      } else {
        return {
          success: true,
        };
      }
    } catch (error) {
      throw new Error("Error suspendiendo usuario: " + error);
    }
  }

  static async isAdministrador({ id }) {
    try {
      const connection = await connect();
      const [result] = await connection.query(
        "SELECT * FROM Usuario WHERE idUsuario = UUID_TO_BIN(?);",
        [id]
      );
      connection.release()
      if (result.affectedRows === 0) {
        return {
          success: false,
        };
      } else {
        const administrador = result[0].administrador;
        return {
          success: true,
          administrador: administrador,
        };
      }
    } catch (error) {
      throw new Error("Error verificando si es administrador: " + error);
    }
  }
}
