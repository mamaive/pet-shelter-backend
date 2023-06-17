import {
    Column,
    CreateDateColumn,
    Entity, JoinColumn,
    JoinTable,
    ManyToMany, ManyToOne, OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {Cat} from "./Cat";
import {Message} from "./Message";

@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => User, (user) => user.chatRooms)
    user?: User;

    @ManyToOne(() => Cat, (cat) => cat.chatRooms)
    cat?: Cat;

    @OneToMany(() => Message, (message) => message.chatRoom)
    messages?: Message[];

    @Column()
    status?: number = 1;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}