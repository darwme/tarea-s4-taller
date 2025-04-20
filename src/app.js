import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import alumnoRoutes from "./routes/alumnoRoutes.js";
import profesorRoutes from "./routes/profesorRoutes.js";

export const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(morgan("combined"));
app.use(routes);
// app.use(alumnoRoutes);
// app.use(profesorRoutes);
app.listen(port, (error) => {
  if (!error) {
    console.log(`UserAPIREST is running on http://localhost:${port}`);
  } else {
    console.log(error);
  }
});
