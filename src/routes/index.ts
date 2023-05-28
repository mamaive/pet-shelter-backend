import express from "express";
import PingController from "../controllers/ping";
import UserRouter from "./user.router";
import CatRouter from "./cat.router";

const router = express.Router();

router.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});
router.use("/users", UserRouter);
router.use("/cats", CatRouter);

export default router;
