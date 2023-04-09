import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './AuthDtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/users.entity';
import { DataSource, Repository } from 'typeorm';
import { RegisterDto } from './AuthDtos/register.dto';

@Injectable()
export class AuthService {

  constructor( 
    // private usersService: UsersService,

    private jwtService: JwtService,
    
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private dataSource: DataSource
  ){}

  async RegisterUser(registerDto: RegisterDto) :Promise<any>{
    const {firstName, lastName, password} = registerDto;
    const user =  this.usersRepository.create({
      firstName, 
      lastName, 
      password
    })
    const newUser = await this.usersRepository.save(user);

    // console.log(JSON.stringify(newUser))
    const payload = { username: newUser.id, sub: newUser.firstName };
    const token = await this.jwtService.signAsync(payload)
    return {
      ...newUser, token
    }

    // return user;
  }

  async signIn(signInDto: SignInDto):Promise<any>{
    const {firstName, pass} = signInDto;
    const user = await this.usersRepository.findOneBy({firstName});
    if (user?.password !== pass){
      throw new UnauthorizedException()
    }
    const payload = { username: user.id, sub: user.firstName };
    const token = await this.jwtService.signAsync(payload)
    return {
      ...user, token
    }
  }

  // async findOne(id:number):Promise<UserEntity>{
  //   return await this.usersRepository.findOneBy({id})
  // }

  async findAll():Promise<User[]>{
    return await this.usersRepository.find();
  }

  async remove(id:number):Promise<string>{
    await this.usersRepository.delete(id);
    return 'user deleted';
  }
}
