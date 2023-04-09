import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from '../cats/cats.module';
// import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './AuthConstant/authConstant';
import { User } from './users.entity';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
  imports: [
    // UsersModule,
    // ConfigModule,
    // JwtModule,
    TypeOrmModule.forFeature([User]),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService)=>({
    //     global: true,
        // secret: configService.get('JWT_SECRET'),
    //     secret: jwtConstants.secret,
    //     signOptions: { expiresIn: '2d' },
    //   })
    // }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '2d' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]
})
export class AuthModule {}
