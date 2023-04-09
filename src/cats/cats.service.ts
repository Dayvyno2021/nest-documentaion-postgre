import { Injectable, NotFoundException } from '@nestjs/common';
import { UseGuards, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from 'src/auth/AuthGuard/Auth.guard';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';
import { CatModel } from './cats-interfaces/create-cat.interface';
import { CreateCatDto } from './catsDtos/create-cat.dto';

@Injectable()
export class CatsService {
  // private readonly cats: CatModel[] = [];

  constructor(
    @InjectRepository(Cat)
    private catRepository: Repository<Cat>
  ){}

  async findAll(): Promise<Cat[]>{
    return await this.catRepository.find();
  }

  @UseGuards(AuthGuard)
  async create(
    @Request() req,
    createCatDto: CreateCatDto
    ):Promise<Cat> {
    const {name, age, breed} = createCatDto;
    // console.log(req?.user?.username)
    const newCat = this.catRepository.create({
      name,
      age,
      breed,
      user: req?.user?.username
    })
    await this.catRepository.save(newCat)
    return newCat;
  }

  @UseGuards(AuthGuard)
  async findById(@Request() req): Promise<Cat[]>{
    return this.catRepository.find({
      where: {
        user:{
          id: req?.user?.username
        }
      },
      relations: {
        user: true,
      }
    })
  }
}
