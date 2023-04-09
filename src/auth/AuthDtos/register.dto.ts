import { IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto{
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;
  
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}