import AppDataSource from "../config/database";
import { Cat } from "../entity/Cat";

export const getCats = async (): Promise<Array<Cat>> => {
  const repository = AppDataSource.getRepository(Cat);
  return repository.findBy({status: 1});
};

export const createCat = async (payload: Cat): Promise<Cat> => {
  const repository = AppDataSource.getRepository(Cat);
  const cat = new Cat();
  cat.name = payload.name;
  cat.breed = payload.breed;
  cat.age = payload.age;
  cat.description = payload.description;
  cat.image = payload.image;
  return repository.save(cat);
};

export const getCat = async (id: number): Promise<Cat | null> => {
  const repository = AppDataSource.getRepository(Cat);
  const cat = await repository.findOne({ where: { id: id } });
  if (!cat) return null;
  return cat;
};

export const updateCat = async (id: number, body: Cat) => {
  const repository = AppDataSource.getRepository(Cat);
  const cat = await repository.findOne({ where: { id: id } });
  return repository.save({
    ...cat,
    ...body,
  });
};