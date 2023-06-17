import {ChatRoom} from "../entity/ChatRoom";
import AppDataSource from "../config/database";

export const getChatRooms = async (): Promise<Array<ChatRoom>> => {
    const repository = AppDataSource.getRepository(ChatRoom);
    return repository.find({
        relations: {
            user: true,
            cat: true,
            messages: {user: true},
        },
        order: {messages: {createdAt: "ASC",}
        },
    })
};

export const createChatRoom = async (payload: ChatRoom): Promise<ChatRoom> => {
    const repository = AppDataSource.getRepository(ChatRoom);
    const chatroom = new ChatRoom();
    console.log(payload.user);
    chatroom.user = payload.user
    console.log(chatroom.user)
    chatroom.cat = payload.cat
    return repository.save(chatroom);
};

export const getChatRoom = async (id: number): Promise<ChatRoom | null> => {
    const repository = AppDataSource.getRepository(ChatRoom);
    const chatroom = await repository.findOne({where: {id: id}});
    if (!chatroom) return null;
    return chatroom;
};

export const updateChatRoom = async (id: number, body: ChatRoom) => {
    const repository = AppDataSource.getRepository(ChatRoom);
    const chatroom = await repository.findOne({where: {id: id}});
    return repository.save({
        ...chatroom,
        ...body,
    });
};