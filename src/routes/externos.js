import { Router } from "express";
import { ExternoController } from "../controllers/externos.js";

const externosRouter = Router();

externosRouter.get("/", ExternoController.getAll);
externosRouter.get("/:codigo", ExternoController.getByCodigo);
externosRouter.delete("/:codigo", ExternoController.deleteByCodigo);
externosRouter.patch("/:codigo", ExternoController.update);

export default externosRouter;
