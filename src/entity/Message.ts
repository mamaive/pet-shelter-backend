import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    JoinTable,
    ManyToMany, ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {Cat} from "./Cat";
import {ChatRoom} from "./ChatRoom";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => ChatRoom, chatRoom => chatRoom.messages)
    chatRoom?: ChatRoom;

    @ManyToOne(() => User, user => user.messages)
    user?: User;

    @Column()
    text: string = "";

    @Column()
    status?: number = 1;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}