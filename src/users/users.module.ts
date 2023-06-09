import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/users.entity';
import { UsersService } from './users.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
