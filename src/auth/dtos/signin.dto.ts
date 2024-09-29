import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class signinDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  readonly password: string;
}
