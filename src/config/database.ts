import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Cat } from "../entity/Cat";

const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: "db.sqlite3",
  synchronize: true,
  logging: false,
  entities: [User, Cat],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
