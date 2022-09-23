import { Router } from "express";
import { login } from "../controllers/login";

const loginRoute = Router();

loginRoute.post("/", async (req, res) => {
  const {
    body: { username, password },
  } = req;
  try {
    const user = await login(username, password);

    if (user === false) return res.status(200).json({ message: "user does not exist" });

    if (user === true) return res.status(200).json({ message: "user logged" });

    return res.status(200).json({ message: "invalid password" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export { loginRoute };
