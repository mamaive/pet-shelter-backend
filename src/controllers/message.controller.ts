import {Message} from "../entity/Message";
import {createMessage, getMessage, getMessages, updateMessage} from "../repositories/message.repository";
import {Get, Route, Tags, Post, Body, Path, Put} from "tsoa";

@Route("message")
@Tags("Message")
export default class MessageController {
    @Get("/")
    public async getMessages(): Promise<Array<Message>> {
        return getMessages();
    }

    @Post("/")
    public async createMessage(@Body() body: Message): Promise<Message> {
        return createMessage(body);
    }

    @Get("/:id")
    public async getMessage(@Path() id: string): Promise<Message | null> {
        return getMessage(Number(id));
    }

    @Put("/:id")
    public async updateMessage(@Path() id: string, @Body() body: Message) {
        return updateMessage(Number(id), body);
    }
}