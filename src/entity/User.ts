import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { Cat } from "./Cat";

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
  status?: number = 1;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}

@Entity()
export class UserFavoriteCat{
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToMany(() => Cat, cat => cat.name)
  cats: Cat[] = [];
}

@Entity()
export class UserMessage{
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  member!: string;

  @Column()
  worker!: string;

  @Column()
  cat!: string;

  @Column()
  message!: string;

  @Column()
  status?: number = 1;

  @CreateDateColumn()
  createdAt?: Date;
}