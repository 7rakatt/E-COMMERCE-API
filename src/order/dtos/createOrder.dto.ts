import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { Status } from '../schemas/order.schema';
import { User } from '../../auth/schemas/user.schema';
import { Product } from '../../product/schemas/product.schema';
import mongoose from 'mongoose'

export class creatOrderDto {
  @IsEmpty({ message: 'you cannot pass the user id' })
  readonly user: User;
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly phone: string;
  @IsString()
  @IsNotEmpty()
  readonly address: string;
  @IsArray()
  @IsNotEmpty()
  readonly orders: mongoose.ObjectId[];
  @IsEnum(Status, { message: 'please enter a correct status' })
  @IsOptional()
  readonly status?: Status;
}
