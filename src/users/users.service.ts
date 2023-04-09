import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/users.entity';

// This should be a real class/interface representing a user entity
// export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async findOne(id:number):Promise<User>{
    return await this.usersRepository.findOneBy({id})
  }

  async findAll():Promise<User[]>{
    return await this.usersRepository.find();
  }

  async remove(id:number):Promise<string>{
    await this.usersRepository.delete(id);
    return 'user deleted';
  }
}
