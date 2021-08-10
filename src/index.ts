import express from "express";

import { config } from "./config";
import { usersApi } from "./routes/usersApi";

const app = express();

// Body parser
app.use(express.json());

// Routes
usersApi(app);
// Initialize app
app.listen(config.port, () =>
  console.log(`App running at http://localhost:${config.port}`)
);

process.on("uncaughtException", (err) => console.error(err));
process.on("SIGTERM", () => {});
