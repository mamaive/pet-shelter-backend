import express from "express";
import PingController from "../controllers/ping";
import UserRouter from "./user.router";
import CatRouter from "./cat.router";

import FavouriteRouter from "./favourite.router";
import MessageRouter from "./message.router";
import ChatroomRouter from "./chatroom.router";

const router = express.Router();
router.get("/ping", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});
router.use("/user", UserRouter);
router.use("/cat", CatRouter);
router.use("/favourite", FavouriteRouter);
router.use("/message", MessageRouter);
router.use("/chatroom", ChatroomRouter)
export default router;
