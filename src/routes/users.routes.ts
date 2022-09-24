import { Router } from "express";
import { logs } from "../controllers/logs";

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
  const userId = req.userId;

  const users = await getAllUsers();
  await logs("find all users", userId);

  if (users) return res.status(200).json({ users: users });

  return res.status(400).json({ message: "error" });
});

usersRoutes.post("/", authMiddleware, async (req, res) => {
  const {
    body: { username, password },
    userId,
  } = req;

  try {
    await addUsers(username, password);

    await logs("add user", userId);

    return res.status(201).json({ message: "user added" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

usersRoutes.put("/:id", authMiddleware, async (req, res) => {
  const {
    params: { id },
    body: { username, password },
    userId,
  } = req;

  try {
    await editUser(id, username, password);

    await logs("edit user", userId);

    return res.status(200).json({ message: "user edited" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

usersRoutes.put("/disable/:id", authMiddleware, async (req, res) => {
  const {
    params: { id },
    userId,
  } = req;

  try {
    await disableUser(id);

    await logs("disable user", userId);

    return res.status(200).json({ message: "user disabled" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

usersRoutes.delete("/delete/:id", authMiddleware, async (req, res) => {
  const {
    params: { id },
    userId,
  } = req;

  try {
    await removeUser(id);

    await logs("remove user", userId);

    return res.status(200).json({ message: "user removed" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

export { usersRoutes };
