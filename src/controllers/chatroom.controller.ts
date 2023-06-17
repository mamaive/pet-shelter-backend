import {ChatRoom} from "../entity/ChatRoom";
import {
    createChatRoom,
    getChatRoom,
    getChatRooms,
    updateChatRoom
} from "../repositories/chatroom.repository";
import {Get, Route, Tags, Post, Body, Path, Put} from "tsoa";
import {User} from "../entity/User";

@Route("chatroom")
@Tags("ChatRoom")
export default class ChatRoomController {
    @Get("/")
    public async getChatRooms(): Promise<Array<ChatRoom>> {
        return getChatRooms();
    }


    @Post("/")
    public async createChatRoom(@Body() body: ChatRoom): Promise<ChatRoom> {
        return createChatRoom(body);
    }

    @Get("/:id")
    public async getChatRoom(@Path() id: string): Promise<ChatRoom | null> {
        return getChatRoom(Number(id));
    }

    @Put("/:id")
    public async updateChatRoom(@Path() id: string, @Body() body: ChatRoom) {
        return updateChatRoom(Number(id), body);
    }
}