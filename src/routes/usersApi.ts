import { NextFunction } from "connect";
import express, { Express, Request, Response } from "express";

import { UserService } from "../services/users";
import { createUserSchema, idSchema } from "../schemas/users";
import { validationHandler } from "../middleware/validationHandler";

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

  router.get(
    "/:id",
    // validationHandler(idSchema, "params"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {
          params: { id },
        } = req;
        console.log(id);
        const data = await userService.get(id);
        res.status(200).json({ data, message: `user found` });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/",
    validationHandler(createUserSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { body } = req;
        const data = await userService.createUser(body);
        res.status(200).json({ data, message: "OK" });
      } catch (err) {
        next(err);
      }
    }
  );
};
