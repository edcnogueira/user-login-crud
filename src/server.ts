import express from "express";
import { Router } from "./routes";

const port = 3333;

const app = express();
app.use(express.json());

app.use("/", Router);

app.listen(port, () => console.log("server run in port 3333"));
