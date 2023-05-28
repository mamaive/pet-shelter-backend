import express from "express";
import CatController from "../controllers/cat.controller";

const router = express.Router();

router.get("/", async (req, res) => {
  const controller = new CatController();
  const response = await controller.getCats();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new CatController();
  const response = await controller.createCat(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new CatController();
  const response = await controller.getCat(req.params.id);
  if (!response) res.status(404).send({ message: "No Cat found" });
  return res.send(response);
});

router.put("/:id", async (req, res) => {
  const controller = new CatController();
  const response = await controller.updateCat(req.params.id, req.body);
  if (!response) res.status(404).send({ message: "No Cat found" });
  return res.send(response);
});

export default router;
 