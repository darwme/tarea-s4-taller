import { Router } from "express";
import { ProfesorController } from "../controllers/profesores.js";

const profesoresRouter = Router();

profesoresRouter.get("/", ProfesorController.getAll);
profesoresRouter.get("/:codigo", ProfesorController.getByCodigo);
profesoresRouter.delete("/:codigo", ProfesorController.deleteByCodigo);
profesoresRouter.patch("/:codigo", ProfesorController.update);

export default profesoresRouter;
