import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { Catogary } from '../schemas/product.schema';

export class creatProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly description: string;
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
  @IsEnum(Catogary, { message: 'please enter a correct catogary' })
  @IsNotEmpty()
  readonly catogary: Catogary;
}
