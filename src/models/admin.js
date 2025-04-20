import mysql from "mysql2/promise";
import { config } from "../config/mysqlConfig.js";

const pool = mysql.createPool({
  connectionLimit: 200,
  ...config,
});

const connect = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    throw new Error("Error de conexión a la base de datos: " + error);
  }
};

export class AdminModel {
  static async getAll() {
    const connection = await connect();
    const [result] = await connection.query(
      "SELECT BIN_TO_UUID(id) as id, nombreUsuario, contraseña, estado, idRol, metas FROM Usuario WHERE idRol = 5;"
    );

    if (result.length === 0) {
      return {
        success: false,
        message: "No se encontraron administradores",
      };
    }

    const administradores = result.map((admin) => {
      admin.rol = "Administrador";
      delete admin.idRol;
      return admin;
    });

    return {
      success: true,
      administradores,
    };
  }

  static async create(input) {
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
    if (
      nombreUsuario === undefined ||
      contraseña === undefined ||
      rol === undefined
    ) {
      return {
        success: false,
        message: "Faltan campos por llenar",
      };
    }

    if (rol !== "Administrador") {
      return {
        success: false,
        message: "Rol inválido",
      };
    }

    try {
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
      const [data, info] = result;

      if(data[0][0] && data[0][0].mensaje){
        return {
          success: false,
          message: data[0][0].mensaje,
        };
      }

      if(data[0][0].resultado === "Rol no válido")
      {
        return {
          success: false,
          message: data[0][0].resultado,
        };
      }

      return {
        success: true,
        data: data[0][0],
      }

    } catch (error) {
      console.log(error);
      throw new Error("Error creando Administrador, contacta con soporte.");
    }
  }

  static async getById(id) {
    const connection = await connect();
    const result = await connection.query(
      "SELECT BIN_TO_UUID(id) AS id, nombreUsuario, contraseña, estado, idRol, metas FROM Usuario WHERE id = UUID_TO_BIN(?) AND idRol = 5;",
      [id]
    );

    if (result.length === 0) {
      return {
        success: false,
        message: "No se encontró el administrador",
      };
    }

    const [admin] = result;
    admin.rol = "Administrador";
    delete admin.idRol;
    return {
      success: true,
      data: admin,
    };
  }

  static async update({ id, input }) {
    const { contraseña, estado, metas } = input;

    const connection = await connect();
    const result = await connection.query(
      "UPDATE Usuario SET  contraseña = ?, estado = ? WHERE id = UUID_TO_BIN(?);",
      [contraseña, estado, id]
    );

    if (result.length === 0) {
      return {
        success: false,
        message: "No se encontró el administrador",
      };
    }

    return {
      success: true,
      message: "Administrador actualizado exitosamente",
    };
  }

  static async delete({ id }) {
    const connection = await connect();
    const result = await connection.query(
      "DELETE FROM Usuario WHERE id = UUID_TO_BIN(?);",
      [id]
    );

    if (result[0].affectedRows === 0) {
      return {
        success: false,
        message: "No se encontró el administrador",
      };
    } else {
      return {
        success: true,
        message: "Administrador eliminado exitosamente",
        data: {
          id: id,
        },
      };
    }
  }
}
