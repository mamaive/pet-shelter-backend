import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

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

  @ManyToMany(() => User, user => user.email)
  @JoinTable()
  users?: User[];

  @Column()
  image: string = '';

  @Column()
  status?: number = 1;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
