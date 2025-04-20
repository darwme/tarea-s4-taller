import express from "express";
import { renderAlumnoHTML, renderAlumnosHTML } from "../views/alumnoView.js";

const router = express.Router();

// Ruta para un alumno específico
router.get("/alumnos/:id", async (req, res) => {
  // Simula obtener datos desde la base de datos o servicio
  const alumno = {
    id: req.params.id,
    nombre: "Juan Pérez",
    email: "juan.perez@example.com",
    carrera: "Ingeniería",
  };
  res.send(renderAlumnoHTML(alumno));
});

// Ruta para listar todos los alumnos
router.get("/alumnos", async (req, res) => {
  // Simula obtener datos desde la base de datos o servicio
  const alumnos = [
    { id: 1, nombre: "Juan Pérez", email: "juan.perez@example.com", carrera: "Ingeniería" },
    { id: 2, nombre: "Ana López", email: "ana.lopez@example.com", carrera: "Medicina" },
  ];
  res.send(renderAlumnosHTML(alumnos));
});

export default router;
