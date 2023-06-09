import express from "express";
import CatController from "../controllers/cat.controller";
import jwt from "jsonwebtoken";
import {config} from "../../config";
import ChatRoomController from "../controllers/chatroom.controller";

const router = express.Router();

router.get("/", async (req, res) => {
    const controller = new CatController();
    const response = await controller.getCats();
    return res.send(response);
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


            const controller = new CatController();
            const response = await controller.createCat(req.body);
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

            const controller = new CatController();
            const response = await controller.getCat(req.params.id);
            if (!response) res.status(404).send({message: "No Cat found"});
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

            const controller = new CatController();
            const response = await controller.updateCat(req.params.id, req.body);
            if (!response) res.status(404).send({message: "No Cat found"});
            return res.send(response);
        }
    } catch (error) {
        return res.status(401).json({error: "Not Authorized"});
    }


});

router.delete("/:id", async (req, res) => {

    if (!req.headers.authorization) {

            console.log("delete2")
        return res.status(401).json({error: "Not Authorized"});
    }
    // Bearer <token>>
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    try {
        // Verify the token is valid
        const user = jwt.verify(token, config.JWT_SECRET_KEY);
        if (user) {

            const controller = new CatController();
            const response = await controller.deleteCat(req.params.id);

            console.log("delete1")
            if (!response) res.status(404).send({message: "No Cat found"});
            return res.send(response);
        }
    } catch (error) {

            console.log("delete3")
        return res.status(401).json({error: "Not Authorized"});
    }


});

export default router;
 