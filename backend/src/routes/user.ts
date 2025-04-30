import express from "express";
import crypto from "crypto";
import { signinSchema, signupSchema } from "../services/zod";
import prisma from "../services/db";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authMiddleware } from "../services/middleware";

export const userRouter = express.Router();

userRouter.post("/signin", async (req: Request, res: Response) => {
  const body = req.body;
  const { success } = await signinSchema.safeParseAsync(body);
  if (!success) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }
  const { username, password } = body;

  const existingUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!existingUser) {
    res.status(401).json({ message: "User doesn't exist. Signup first" });
    return;
  }

  const hashedPassword = await prisma.user.findUnique({
    where: { username: username },
    select: { password: true },
  });

  if (!hashedPassword?.password) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  const match = await bcrypt.compare(password, hashedPassword?.password || "");

  if (!match) {
    res.status(401).json({ message: "Invalid password" });
    return;
  }

  const token = jwt.sign(
    {
      userId: existingUser.id,
      username: existingUser.username,
      salt: existingUser.salt,
    },
    String(process.env.JWT_SECRET),
    {
      expiresIn: "8h",
    },
  );
  res.status(200).json({
    message: "Signin successful",
    token: token,
    salt: existingUser.salt,
  });
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  const { success } = await signupSchema.safeParseAsync(body);

  if (!success) {
    res.status(400).json({ message: "Invalid data" });
    return;
  }

  const { username, password } = body;

  const existingUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    res.status(409).json({ message: "Username already exists" });
    return;
  }

  const salt = crypto.randomBytes(17).toString("hex");
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
        salt: salt,
      },
    });

    const token = jwt.sign(
      { userId: user.id, username: user.username, salt: user.salt },
      String(process.env.JWT_SECRET),
      {
        expiresIn: "1h",
      },
    );

    res.status(201).json({
      message: "Signup successful",
      token: token,
      salt: user.salt,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.get("/me", authMiddleware, async (_, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: res.locals.user?.userId,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
    },
  });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  res.status(200).json({ user });
});
