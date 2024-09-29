import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsString } from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import  mongoose  from 'mongoose';
import { Product } from '../../product/schemas/product.schema';

export enum Status {
  processing = 'processing',
  out_for_deliver = 'out for deliver',
  delivered = 'delivered',
  rejected = 'rejected',
}

@Schema({
  timestamps: true, //createdAt + updatedAt
})
export class Order {

  @Prop({type: mongoose.Schema.Types.ObjectId,ref: 'User'})
  user: User;

  @Prop()
  @IsString()
  name: string;

  @Prop()
  @IsString()
  phone: string;

  @Prop()
  @IsString()
  address: string;

  @Prop()
  total?: number;

  
  @Prop({default: Status.processing})
  status?: Status;
  
  @Prop()
  orders: mongoose.ObjectId[];
  
}

export const orderSchema = SchemaFactory.createForClass(Order);
