import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../enums/role.enum';

@Schema({
  timestamps: true,
})
export class User extends Document{
  @Prop()
  name: string;
  @Prop({unique:[true,'the email or password cannot be used']})
  email: string;
  @Prop()
  password:string
  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.User]
  })
  role:Role[]
}

export const userSchema = SchemaFactory.createForClass(User);
