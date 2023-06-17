import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn, OneToMany,
} from "typeorm";
import {Favourite} from "./Favourite";
import {Cat} from "./Cat";
import {Message} from "./Message";
import {ChatRoom} from "./ChatRoom";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    firstName: string = "";

    @Column()
    lastName: string = "";

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    role?: number = 1;

    @Column()
    organization?: string;

    @Column()
    staffID?: string;

    @Column()
    signupCode?: string;

    @OneToMany(() => ChatRoom, (chatroom) => chatroom.user)
    chatRooms?: ChatRoom[]

    @OneToMany(() => Favourite, (favourite) => favourite.user)
    favourites?: Favourite[];

    @OneToMany(() => Message, (message) => message.user)
    messages?: Message[];

    @OneToMany(() => Cat, (cat) => cat.user)
    cats?: Cat[]

    @Column()
    status?: number = 1;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}