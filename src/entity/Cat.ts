import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany, ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {ChatRoom} from "./ChatRoom";
import {Favourite} from "./Favourite";

@Entity()
export class Cat {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string = '';

    @Column()
    breed: string = '';

    @Column()
    age: number = 0;

    @Column()
    description: string = "";

    @ManyToOne(() => User, user => user.cats)
    user?: User;

    @Column()
    image: string = '';

    @OneToMany(() => ChatRoom, (chatroom) => chatroom.cat)
    chatRooms?: ChatRoom[]

    @OneToMany(() => Favourite, (favourite) => favourite.cat)
    favourites?: Favourite[];

    @Column()
    status?: number = 1;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
