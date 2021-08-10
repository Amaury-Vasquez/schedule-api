import { NextFunction } from "connect";
import express, { Express, Request, Response } from "express";

import { UserService } from "../services/users";

export const usersApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/users", router);

  const userService = new UserService();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userService.getUsers();
      res.status(200).json({ data, message: "Users list" });
    } catch (err) {
      next(err);
    }
  });
};
