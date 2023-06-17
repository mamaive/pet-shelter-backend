import AppDataSource from "../config/database";
import {Cat} from "../entity/Cat";
import {Favourite} from "../entity/Favourite";
import {ChatRoom} from "../entity/ChatRoom";

export const getCats = async (): Promise<Array<Cat>> => {
    const repository = AppDataSource.getRepository(Cat);
    return repository.find({
        relations: {
            user: true,
        },
        where: {status: 1},
    })
};

export const createCat = async (payload: Cat): Promise<Cat> => {
    const repository = AppDataSource.getRepository(Cat);
    const cat = new Cat();
    cat.user = payload.user;
    cat.name = payload.name;
    cat.breed = payload.breed;
    cat.age = payload.age;
    cat.description = payload.description;
    cat.image = payload.image;
    return repository.save(cat);
};

export const getCat = async (id: number): Promise<Cat | null> => {
    const repository = AppDataSource.getRepository(Cat);
    const cat = await repository.findOne({where: {id: id}});
    if (!cat) return null;
    return cat;
};

export const updateCat = async (id: number, body: Cat) => {
    const repository = AppDataSource.getRepository(Cat);
    const cat = await repository.findOne({where: {id: id}});
    return repository.save({
        ...cat,
        ...body,
    });
};

export const deleteCat = async (id: number): Promise<Cat | null> => {
    const repository = AppDataSource.getRepository(Cat);
    const cat = await repository.findOne({where: {id: id}});
    if (cat) {
        const parent = await AppDataSource.getRepository(Favourite).find({
            where: {
                cat: {
                    id: id,
                }
            },
        })
        for (let i = 0; i < parent.length; i++) {
            await AppDataSource.getRepository(Favourite).remove(parent[i]);
        }
        const parent2 = await AppDataSource.getRepository(ChatRoom).find({
            where: {
                cat: {
                    id: id,
                }
            },
        })
        for (let i = 0; i < parent2.length; i++) {
            await AppDataSource.getRepository(ChatRoom).remove(parent2[i]);
        }
        await repository.remove(cat);
    }
    return cat;
}