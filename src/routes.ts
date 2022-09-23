import { Router as RouterExpress } from "express";
import { usersRoutes } from "./routes/users.routes";

const Router = RouterExpress();

Router.use("/users", [usersRoutes]);

export { Router };
