import express from "express";
import MessageController from "../controllers/message.controller";
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
            const controller = new MessageController();
            const response = await controller.getMessages();
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
            const controller = new MessageController();
            const response = await controller.createMessage(req.body);
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
            const controller = new MessageController();
            const response = await controller.getMessage(req.params.id);
            if (!response) res.status(404).send({message: "No Message found"});
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
        // Verify the token is v alid
        const user = jwt.verify(token, config.JWT_SECRET_KEY);
        if (user) {
            const controller = new MessageController();
            const response = await controller.updateMessage(req.params.id, req.body);
            if (!response) res.status(404).send({message: "No Message found"});
            return res.send(response);
        }
    } catch (error) {
        return res.status(401).json({error: "Not Authorized"});
    }


    const controller = new MessageController();
    const response = await controller.updateMessage(req.params.id, req.body);
    if (!response) res.status(404).send({message: "No Message found"});
    return res.send(response);
});

export default router;
