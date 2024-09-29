import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import {Document} from 'mongoose'
export enum Catogary {
  Video_games = 'video games',
  Electronics = 'electronics',
  Books = 'books',
  Clothing = 'clothing',
  Beauty_and_personal_care = 'beauty and personal care',
  Cell_phone_accessories = 'cell phone accessories',
  Home_and_kitchen_items = 'home and kitchen items',
  Sports = 'sports',
  Toys_and_games = 'Toys and games',
}

@Schema({
  timestamps: true, //createdAt + updatedAt
})
export class Product extends Document{
  @Prop()
  @IsString()
  name: string;

  @Prop()
  @IsString()
  description: string;

  @Prop()
  @IsNumber()
  price: number;

  @Prop()
  catogary: Catogary;
}

export const productSchema = SchemaFactory.createForClass(Product);
