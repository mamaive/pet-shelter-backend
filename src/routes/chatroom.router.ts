import express from "express";

import ChatRoomController from "../controllers/chatroom.controller";
import jwt from "jsonwebtoken";
import {config} from "../../config";


const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({error: "Not Authorized"});
    }
    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token is valid
        const user = jwt.verify(token, config.JWT_SECRET_KEY);
        if (user) {

            const controller = new ChatRoomController();
            const response = await controller.getChatRooms();
            return res.send(response);
        }
    } catch (error) {
        return res.status(401).json({error: "Not Authorized"});
    }


});

router.post("/", async (req, res) => {

    if (!req.headers.authorization) {
        return res.status(401).json({error: "Not Authorized"});
    }
    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token is valid
        const user = jwt.verify(token, config.JWT_SECRET_KEY);

        if (user) {
            console.log(req.body)
            const controller = new ChatRoomController();
            const response = await controller.createChatRoom(req.body);
            return res.send(response);
        }
    } catch (error) {
        return res.status(401).json({error: "Not Authorized"});
    }

});

router.get("/:id", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({error: "Not Authorized"});
    }
    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token is valid
        const user = jwt.verify(token, config.JWT_SECRET_KEY);
        if (user) {
            const controller = new ChatRoomController();
            const response = await controller.getChatRoom(req.params.id);
            if (!response) res.status(404).send({message: "No ChatRoom found"});
            return res.send(response);
        }
    } catch (error) {
        return res.status(401).json({error: "Not Authorized"});
    }


});

router.put("/:id", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({error: "Not Authorized"});
    }
    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token is valid
        const user = jwt.verify(token, config.JWT_SECRET_KEY);
        if (user) {
            const controller = new ChatRoomController();
            const response = await controller.updateChatRoom(req.params.id, req.body);
            if (!response) res.status(404).send({message: "No ChatRoom found"});
            return res.send(response);
        }
    } catch (error) {
        return res.status(401).json({error: "Not Authorized"});
    }


});

export default router;
