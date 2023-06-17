import {Favourite} from "../entity/Favourite";
import AppDataSource from "../config/database";


export const getFavourites = async (): Promise<Array<Favourite>> => {
    const repository = AppDataSource.getRepository(Favourite)
    return repository.find({
        relations: {
            user: true,
            cat: true,
        },
    })
};
export const createFavourite = async (payload: Favourite): Promise<Favourite> => {
    const repository = AppDataSource.getRepository(Favourite);
    const favourite = new Favourite();
    favourite.cat = payload.cat
    favourite.user = payload.user
    favourite.status = payload.status
    return repository.save(favourite);
};

export const getFavourite = async (id: number): Promise<Favourite | null> => {
    const repository = AppDataSource.getRepository(Favourite);
    const favourite = await repository.findOne({where: {id: id}});
    if (!favourite) return null;
    return favourite;
};

export const updateFavourite = async (id: number, body: Favourite) => {
    const repository = AppDataSource.getRepository(Favourite);
    const favourite = await repository.findOne({where: {id: id}});
    return repository.save({
        ...favourite,
        ...body,
    });
};
