import express from "express";
import cors from "cors";

import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/", router());

// Error Handler
// app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(port, () => {
  console.log(`🚀 Server is listening on port ${port}`);
});
