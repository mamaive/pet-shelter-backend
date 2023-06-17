import {Message} from "../entity/Message";
import AppDataSource from "../config/database";


export const getMessages = async (): Promise<Array<Message>> => {
    const repository = AppDataSource.getRepository(Message);
    return repository.find({
        relations: {
            user: true,
            chatRoom: true,
        }
    })
};
export const createMessage = async (payload: Message): Promise<Message> => {
    const repository = AppDataSource.getRepository(Message);
    const message = new Message();
    message.chatRoom = payload.chatRoom
    message.user = payload.user
    message.text = payload.text
    return repository.save(message);
};

export const getMessage = async (id: number): Promise<Message | null> => {
    const repository = AppDataSource.getRepository(Message);
    const message = await repository.findOne({where: {id: id}});
    if (!message) return null;
    return message;
};

export const updateMessage = async (id: number, body: Message) => {
    const repository = AppDataSource.getRepository(Message);
    const message = await repository.findOne({where: {id: id}});
    return repository.save({
        ...message,
        ...body,
    });
};