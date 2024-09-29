import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class signupDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsEmail({}, { message: 'please inter correct email' })
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 20)
  readonly password: string;
  @IsOptional()
  readonly role?: string[];
}
