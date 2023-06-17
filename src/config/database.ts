import {DataSource} from "typeorm";
import {User} from "../entity/User";
import {Cat} from "../entity/Cat";
import {Favourite} from "../entity/Favourite";
import {Message} from "../entity/Message";
import {ChatRoom} from "../entity/ChatRoom";

const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "db.sqlite3",
    synchronize: true,
    logging: false,
    entities: [User, Cat, Favourite,ChatRoom, Message],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;
