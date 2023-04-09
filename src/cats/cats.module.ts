import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cat } from './cat.entity';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Cat]),
    // JwtModule
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
