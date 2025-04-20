import Router from 'express';
import { IntermediarioController } from '../controllers/intermediarios.js';

const intermediariosRouter = Router();

intermediariosRouter.get("/", IntermediarioController.getAll);
intermediariosRouter.get("/:codigo", IntermediarioController.getByCodigo);

intermediariosRouter.put("/:codigo", IntermediarioController.update);
intermediariosRouter.delete("/:codigo", IntermediarioController.deleteByCodigo);

export default intermediariosRouter;
