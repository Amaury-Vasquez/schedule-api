import express from "express";

import { config } from "./config";
import { usersApi } from "./routes/usersApi";

const cors = require("cors");
// const corsOptions = {
//   origin: "http://localhost:3005/auth",
//   optionsSuccessStatus: 200,
// }; 

const app = express();

// Cors
app.use(cors());
// Body parser
app.use(express.json());

// Routes
usersApi(app);
// Initialize app
const server = app.listen(config.port, () =>
  console.log(`App running at http://localhost:${config.port}`)
);

process.on("uncaughtException", (err) => console.error(err));
process.on("SIGTERM", () => server.close());
