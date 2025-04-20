import { Router } from "express";
import { AlumnoController } from "../controllers/alumnos.js";

const alumnosRouter = Router();

alumnosRouter.get("/", AlumnoController.getAll);
alumnosRouter.get("/:codigo", AlumnoController.getByCodigo);
alumnosRouter.delete("/:codigo", AlumnoController.deleteByCodigo);
alumnosRouter.patch("/:codigo", AlumnoController.update);

export default alumnosRouter;
