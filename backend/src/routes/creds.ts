import express from "express";
import { authMiddleware } from "../services/middleware";
import prisma from "../services/db";

export const credsRouter = express.Router();

credsRouter.get("/", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: res.locals.user?.userId },
    select: {
      username: true,
      id: true,
      Credentials: {
        select: {
          id: true,
          name: true,
          username: true,
          password: true,
          url: true,
          iv: true,
        },
      },
    },
  });
  res.status(200).json({ credentials: user?.Credentials || [] });
});

credsRouter.post("/", authMiddleware, async (req, res) => {
  const { tag, username, password, url, iv } = req.body;
  if (!password || !username || !iv) {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: res.locals.user?.userId },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const credentials = await prisma.credential.create({
    data: {
      name: tag || "Untagged",
      username: username,
      password: password,
      url: url || "undefined",
      userId: user.id,
      iv: iv,
    },
  });

  res.status(200).json(credentials);
});

credsRouter.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: res.locals.user.userId },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const credential = await prisma.credential.delete({
    where: { id: Number(id) },
  });

  if (!credential) {
    res.status(404).json({ message: "Credential not found" });
    return;
  }

  res.status(200).json({ message: "Credential deleted" });
});

credsRouter.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { tag, username, password, url, iv } = req.body;
  if (!password || !username || !iv) {
    res.status(400).json({ message: "Password and username are required" });
    return;
  }
  const user = await prisma.user.findUnique({
    where: { id: res.locals.user?.userId },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const data = await prisma.credential.update({
    where: { id: Number(id) },
    data: {
      name: tag || "Untagged",
      username: username,
      password: password,
      url: url || "undefined",
      iv: iv,
    },
  });
  if (!data) {
    res.status(404).json({ message: "Credential not found" });
    return;
  }
  res.status(200).json(data);
});
