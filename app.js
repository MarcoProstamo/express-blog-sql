import express from "express";
import dotenv from "dotenv";
dotenv.config();

const hostAddress = process.env.HOST_ADDRESS;
const hostPort = process.env.HOST_PORT;

const app = express();

// # Router Setup
import { router as postRouter } from "./routers/posts.js";
app.use("/posts", postRouter);

// # Registering Middlewares
import errorsHandler from "./middlewares/errorsHandler.js";
import pageNotFoundHandler from "./middlewares/pageNotFoundHandler.js";

// # JSON Parser + Static File in Public Folder
app.use(express.json());
app.use(express.static("public"));

// # Middlewares Usage
app.use(errorsHandler);
app.use(pageNotFoundHandler);

// # Server Listening
app.listen(hostPort, () => {
  console.log(`Server listening at: ${hostAddress}:${hostPort}`);
});
