import express from "express";
import { AdminController } from "../controllers/admin.js";

const router = express.Router();

router.post("/", AdminController.create);
router.get("/", AdminController.getAll);
router.get("/:id", AdminController.getById);
router.delete("/:id", AdminController.deleteById);
router.put("/:id", AdminController.update);

export default router;
