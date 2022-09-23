import { Router } from "express";
import { addUsers, editUser, getAllUsers } from "../controllers/users";

const usersRoutes = Router();

usersRoutes.get("/", (req, res) => {
  const users = getAllUsers();

  if (users) return res.status(200).json({ users: users });

  return res.status(400).json({ message: "error" });
});

usersRoutes.post("/", async (req, res) => {
  const {
    body: { username, password },
  } = req;

  try {
    await addUsers(username, password);
    return res.status(201).json({ message: "ok" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

usersRoutes.put("/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const userEdit = editUser(id);
    if (userEdit) return res.status(200).json({ user: userEdit });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export { usersRoutes };
