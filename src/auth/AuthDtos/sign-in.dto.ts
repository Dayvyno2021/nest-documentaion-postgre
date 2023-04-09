import {IsNotEmpty, IsNumber} from 'class-validator';

export class SignInDto{
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  pass: string;
}