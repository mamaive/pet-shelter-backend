import CatController from "../src/controllers/cat.controller";
import request from "supertest";
import app from "../src/index";

// describe("Server.ts tests", () => {
//   test("Math test", () => {
//     expect(2 + 2).toBe(4);
//   });
// });
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY4NjE1MzQ5Nn0.PtK2lO2cvMKvHL1WG8L_GVOgrF3ldOSiDNMm42OKoNw";
const cat = {
    "name": "Siu Gut",
    "breed": "Siamese",
    "age": 1,
    "description": "gb",
    "image": "5debd290-fa6b-43b0-b8c1-3a6783c4f986-1685974793028.png",
    "user": 1
}
let cat_id = 0;
const updated_cat = {
    "name": "Siu Gut H H",
    "breed": "Siamese",
    "age": 1,
    "description": "gb",
    "image": "5debd290-fa6b-43b0-b8c1-3a6783c4f986-1685974793028.png",
    "user": 1
}

//describe("Test app.ts", () => {
//    test("Catch-all route", async () => {
//        const res = await request(app).get("/");
//        expect(res.body).toEqual({});
//    });
//});

describe("Test cat.controller.ts", () => {


    test("getCats", async () => {
        const res = await request(app).get("/cat");
        expect(res.status).toEqual(200);
    });
    test("getCat", async () => {
        const res = await request(app).get("/cat/1").set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
    });
    test("createCat", async () => {
        const res = await request(app).post("/cat").set('Authorization', `Bearer ${token}`).send(cat);
          cat_id = res.body.id;
        expect(res.status).toEqual(200);

    });
    test("updateCat", async () => {
        const res = await request(app).put("/cat" + `/${cat_id}`).set('Authorization', `Bearer ${token}`).send(updated_cat);
        expect(res.status).toEqual(200);
    });
    test("deleteCat", async () => {
        const res = await request(app).delete("/cat" + `/${cat_id}`).set('Authorization', `Bearer ${token}`);
        expect(res.status).toEqual(200);
    });
});

