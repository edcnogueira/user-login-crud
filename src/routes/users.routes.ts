import { Router } from "express";
import { addUsers, getAllUsers } from "../controllers/users";

const usersRoutes = Router();

usersRoutes.get("/", (req, res) => {
  const users = getAllUsers();

  if (users) return res.status(200).json({ users: users });

  return res.status(400).json({ message: "error" });
});

usersRoutes.post("/", (req, res) => {
  const {
    body: { username, password },
  } = req;

  try {
    const userAdd = addUsers(username, password);
    if (userAdd) return res.status(200).end();
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export { usersRoutes };
