import express from "express";
import { userRouter } from "./user";
import { credsRouter } from "./creds";

export const router = express.Router();

router.use("/user", userRouter);
router.use("/creds", credsRouter);
