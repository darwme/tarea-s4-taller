import express from "express";
import { renderProfesorHTML, renderProfesoresHTML } from "../views/profesorView.js";
import { ProfesorController } from "../controllers/profesores.js";

const router = express.Router();

// Ruta para un profesor específico
router.get("/profesores/:codigo", async (req, res) => {
  // Simula obtener datos desde la base de datos o servicio
  const codigo = req.params.codigo;
  const profesor = await ProfesorController.getByCodigo(codigo);
  if (!profesor) 
    return res.status(404).send("Profesor no encontrado");

  res.send(renderProfesorHTML(profesor));
});

// Ruta para listar todos los profesores
router.get("/profesores", async (req, res) => {
  try {
    const profesoresListados = await ProfesorController.getAll(req, res, true); // Pasa `true` para obtener datos sin procesar
    if (!profesoresListados) {
      console.error("Error: profesoresListados es undefined");
      return res.status(500).send("Error al obtener la lista de profesores");
    }

    if (!Array.isArray(profesoresListados)) {
      console.error("Error: profesoresListados no es un array");
      return res.status(500).send("Error interno: los datos de profesores no son válidos");
    }

    if (profesoresListados.length === 0) {
      return res.status(404).send("No hay profesores disponibles");
    }

    res.send(renderProfesoresHTML(profesoresListados)); // Renderiza la vista HTML
  } catch (error) {
    console.error("Error al obtener la lista de profesores:", error);
    if (!res.headersSent) {
      res.status(500).send("Error al obtener la lista de profesores");
    }
  }
});

export default router;
