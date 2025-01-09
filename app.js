import express from "express";
import dotenv from "dotenv";
dotenv.config();

const hostAddress = process.env.HOST_ADDRESS;
const hostPort = process.env.HOST_PORT;

const app = express();

// # Registering Middlewares
import errorsHandler from "./middlewares/errorsHandler.js";
import pageNotFoundHandler from "./middlewares/pageNotFoundHandler.js";

// # JSON Parser + Static File in Public Folder
app.use(express.json());
app.use(express.static("public"));

// # Router Setup
import { router as postRouter } from "./routers/posts.js";
app.use("/posts", postRouter);

// # Meme
app.get("/", (req, res) => {
  res.send("Benvenuto nel Circo 🤡");
});

// # Middlewares Usage
app.use(errorsHandler);
app.use(pageNotFoundHandler);

// # Server Listening
app.listen(hostPort, () => {
  console.log(`Server listening at: ${hostAddress}:${hostPort}`);
});
