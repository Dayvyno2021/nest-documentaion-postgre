import { Controller, Get, DefaultValuePipe, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common/decorators';
import { CatModel } from './cats-interfaces/create-cat.interface';
import { CatsService } from './cats.service';
import { CreateCatDto } from './catsDtos/create-cat.dto';
import { AuthGuard } from '../auth/AuthGuard/Auth.guard';
import { User } from '../users/userDecorator/user.decorator';
import { Cat } from './cat.entity';


@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService){}

    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Request() req):Promise<Cat[]> {
      // console.log(typeof JSON.stringify(this.catsServie.findAll()))
      console.log(req.user);
      // if (JSON.stringify(this.catsServie.findAll())==='[]'){
      //   throw new ConflictException('This a conflict exception');
      // }
      return  this.catsService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(
      @Request() req,
      @Body('age', new DefaultValuePipe(20), ParseIntPipe) age: number,
      @Body('name') name: string,
      @Body('breed') breed: string,
      ):Promise<Cat> {
      return this.catsService.create(req, {name, age, breed});
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    GetCatById(
      @Param('id', new DefaultValuePipe(4), ParseIntPipe) id:number,
      @Request() req,
    ):Promise<Cat[]> {
      return this.catsService.findById(id);
    }

    // @Get(':id')
    // async findOne(@Param('id', ParseIntPipe) id: number) {
    //   return this.catsService.findOne(id);
    // }
}
