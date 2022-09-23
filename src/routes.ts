import { Router as RouterExpress } from "express";
import { loginRoute } from "./routes/login.routes";
import { usersRoutes } from "./routes/users.routes";

const Router = RouterExpress();

Router.use("/users", [usersRoutes]);
Router.use("/login", [loginRoute]);

export { Router };
