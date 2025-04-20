import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROUTES_PATH = __dirname;

const cleanFileName = (fileName) => {
  return fileName.split(".").shift();
};

const loadRoutes = async () => {
  try {
    const files = await fs.readdir(ROUTES_PATH);
    for (const file of files) {
      const prefixRouter = cleanFileName(file);
      if (prefixRouter !== "index") {
        console.log(`Cargando modulo ${prefixRouter}`);
        const { default: routeModule } = await import(
          `file://${path.join(ROUTES_PATH, file)}`
        );
        if (typeof routeModule === "function") {
          router.use(`/${prefixRouter}`, routeModule);
        } else {
          throw new Error(`Modulo ${prefixRouter} no es una función`);
        }
      }
    }
  } catch (error) {
    throw new Error("Error cargando las rutas:", error);
  }
};

loadRoutes();

export default router;
