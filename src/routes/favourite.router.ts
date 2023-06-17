import express from "express";
import FavouriteController from "../controllers/favourite.controller";
import jwt from "jsonwebtoken";
import {config} from "../../config";
import MessageController from "../controllers/message.controller";

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

            const controller = new FavouriteController();
            const response = await controller.getFavourites();
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

            const controller = new FavouriteController();
            const response = await controller.createFavourite(req.body);
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
            const controller = new FavouriteController();
            const response = await controller.getFavourite(req.params.id);
            if (!response) res.status(404).send({message: "No Favourite found"});
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

            const controller = new FavouriteController();
            const response = await controller.updateFavourite(req.params.id, req.body);
            if (!response) res.status(404).send({message: "No Favourite found"});
            return res.send(response);
        }
    } catch (error) {
        return res.status(401).json({error: "Not Authorized"});
    }


});

export default router;
