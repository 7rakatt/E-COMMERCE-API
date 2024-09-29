import { PartialType } from '@nestjs/mapped-types';
import { creatOrderDto } from './createOrder.dto';

export class updateOrderDto extends PartialType(creatOrderDto) {}
