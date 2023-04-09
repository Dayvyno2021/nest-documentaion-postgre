import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../auth/users.entity";

@Entity()
export class Cat{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  breed: string;

  // @ManyToOne(type=>UserEntity)
  // userEntity: UserEntity
  @ManyToOne(type=>User, (user)=>user.cats)
  user: User
}