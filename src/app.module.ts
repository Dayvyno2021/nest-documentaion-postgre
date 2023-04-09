import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationConfigSchema } from './config.schema';
import { DataSource } from 'typeorm';
import { User } from './auth/users.entity';
import { Cat } from './cats/cat.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CatsModule,
    AuthModule,
    // JwtModule,
    // UsersModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.STAGE}`,
      isGlobal: true,
      validationSchema: validationConfigSchema
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgre',
    //   password: 'Micheal823',
    //   database: 'task-management',
    //   entities: [],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: configService.get('DB_PASSWORD'),
        database: 'cat-management',
        autoLoadEntities: true,
        synchronize: true,
      })
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({path: 'cats', method: RequestMethod.GET})
  }
}
