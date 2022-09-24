import { Router } from "express";

import {
  addUsers,
  disableUser,
  editUser,
  getAllUsers,
  removeUser,
} from "../controllers/users";

import { authMiddleware } from "../middlewares/authMiddleware";

const usersRoutes = Router();

usersRoutes.get("/", authMiddleware, async (req, res) => {
  const users = await getAllUsers();

  if (users) return res.status(200).json({ users: users });

  return res.status(400).json({ message: "error" });
});

usersRoutes.post("/", authMiddleware, async (req, res) => {
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

usersRoutes.put("/:id", authMiddleware, async (req, res) => {
  const {
    params: { id },
    body: { username, password },
  } = req;

  try {
    await editUser(id, username, password);
    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

usersRoutes.put("/disable/:id", authMiddleware, async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await disableUser(id);
    return res.status(200).json({ message: "user disabled" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

usersRoutes.delete("/delete/:id", authMiddleware, async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await removeUser(id);
    return res.status(200).json({ message: "user removed" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export { usersRoutes };
