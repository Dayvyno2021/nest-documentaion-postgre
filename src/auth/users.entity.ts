import { Cat } from '../cats/cat.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password:string;
  
  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(type=>Cat, (cat)=>cat.user)
  cats: Cat[]

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}