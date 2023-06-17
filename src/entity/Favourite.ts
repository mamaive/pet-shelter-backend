import {
    Column,
    CreateDateColumn,
    Entity, JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./User";
import {Cat} from "./Cat";

@Entity()
export class Favourite {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => User, user => user.favourites)
    user?: User;

    @ManyToOne(() => Cat, cat => cat.favourites)
    cat?: Cat;

    @Column()
    status?: number = 1;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}