import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { updateOrderDto } from './dtos/updateOrder.dto';
import { Order } from './schemas/order.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { Product } from 'src/product/schemas/product.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: mongoose.Model<Order>,
  ) {}

  async findAll(query: Query): Promise<Order[]> {
    const limit = +query.limit || 2;
    const curPage = Number(query.page) || 1;
    const skip = (curPage - 1) * limit;
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};
    const orders = await this.orderModel
      .find({ ...keyword })
      .limit(limit)
      .skip(skip);
    return orders;
  }

  async creat(order: Order, user: User): Promise<Order> {
    const data = Object.assign(order, { user: user._id });
    const res = await this.orderModel.create(data);
    return res;
  }

  async findById(id: string): Promise<Order> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('not valid id');
    }
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('order is not found');
    }
    return order;
  }

  async update(id: string, order: updateOrderDto): Promise<Order> {
    const updatedorder = await this.orderModel.findByIdAndUpdate(id, order, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      throw new NotFoundException('order is not found');
    }
    return updatedorder;
  }

  async delete(id: string): Promise<Order> {
    return await this.orderModel.findByIdAndDelete(id);
  }
}
