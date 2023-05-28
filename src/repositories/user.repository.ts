import AppDataSource from "../config/database";
import { User } from "../entity/User";

export const getUsers = async (): Promise<Array<User>> => {
  const repository = AppDataSource.getRepository(User);
  return repository.find();
};

export const createUser = async (payload: User): Promise<User> => {
  const repository = AppDataSource.getRepository(User);
  const user = new User();
  user.firstName = payload.firstName;
  user.lastName = payload.lastName;
  user.email = payload.email;
  user.password = payload.password;
  user.role = payload.role;
  user.organization = payload.organization;
  user.staffID = payload .staffID;
  return repository.save(user);
};

export const getUser = async (id: number): Promise<User | null> => {
  const repository = AppDataSource.getRepository(User);
  const user = await repository.findOne({ where: { id: id } });
  if (!user) return null;
  return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const repository = AppDataSource.getRepository(User);
  const user = await repository.findOne({ where: { email: email } });
  if (!user) return null;
  return user;
};
