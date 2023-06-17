import {Cat} from "../entity/Cat";
import {createCat, getCat, getCats, updateCat, deleteCat} from "../repositories/cat.repository";
import {Get, Route, Tags, Post, Body, Path, Put, Delete} from "tsoa";

@Route("cat")
@Tags("Cat")
export default class CatController {
    @Get("/")
    public async getCats(): Promise<Array<Cat>> {
        return getCats();
    }

    @Post("/")
    public async createCat(@Body() body: Cat): Promise<Cat> {
        return createCat(body);
    }

    @Get("/:id")
    public async getCat(@Path() id: string): Promise<Cat | null> {
        return getCat(Number(id));
    }

    @Put("/:id")
    public async updateCat(@Path() id: string, @Body() body: Cat) {
        return updateCat(Number(id), body);
    }

    @Delete("/:id")
    public async deleteCat(@Path() id: string): Promise<Cat | null> {
        return deleteCat(Number(id));
    }
}