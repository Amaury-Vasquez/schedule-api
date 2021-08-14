import { NextFunction } from "connect";
import express, { Express, Request, Response } from "express";

import { UserService } from "../services/users";
import { ScheduleValues } from "../interfaces/index";
import { createUserSchema, idSchema } from "../schemas/users";
import { validationHandler } from "../middleware/validationHandler";
import { ObjectId } from "mongodb";

export const usersApi = (app: Express) => {
  const router = express.Router();
  app.use("/api/users", router);

  const userService = new UserService();

  router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userService.getUsers();
      res.status(200).json({ data, message: "users list" });
    } catch (err) {
      next(err);
    }
  });

  router.get(
    "/:id",
    validationHandler(idSchema, "params"),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {
          params: { id },
        } = req;
        const data = await userService.get({ _id: new ObjectId(id) });
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
        const { email, password, username } = req.body;
        const schedule: ScheduleValues = {
          subjects: [],
          days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
        };
        const data = await userService.createUser({
          email,
          password,
          username,
          schedule,
        });
        res.status(201).json({ data, message: "User created succesfully" });
      } catch (err) {
        next(err);
      }
    }
  );
  router.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { username, password } = req.body;
        const data = await userService.get({ username, password });
        data._id
          ? res.status(200).json({ data, message: "user found" })
          : res.status(404).json({ data, message: "bad auth, user not found" });
      } catch (err) {
        next(err);
      }
    }
  );
};
