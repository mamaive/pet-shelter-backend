import {Favourite} from "../entity/Favourite";
import {
    createFavourite,

    getFavourite,
    getFavourites,
    updateFavourite
} from "../repositories/favourite.repository";
import {Get, Route, Tags, Post, Body, Path, Put} from "tsoa";

@Route("favourite")
@Tags("Favourite")
export default class FavouriteController {
    @Get("/")
    public async getFavourites(): Promise<Array<Favourite>> {
        return getFavourites();
    }

    @Post("/")
    public async createFavourite(@Body() body: Favourite): Promise<Favourite> {
        return createFavourite(body);
    }

    @Get("/:id")
    public async getFavourite(@Path() id: string): Promise<Favourite | null> {
        return getFavourite(Number(id));
    }

    @Put("/:id")
    public async updateFavourite(@Path() id: string, @Body() body: Favourite) {
        return updateFavourite(Number(id), body);
    }

}