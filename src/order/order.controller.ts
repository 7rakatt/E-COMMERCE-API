import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';
import { creatOrderDto } from './dtos/createOrder.dto';
import { updateOrderDto } from './dtos/updateOrder.dto';
import { Query as expressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
export class OrderController {
  constructor(private OrderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Query() query: expressQuery): Promise<Order[]> {
    return this.OrderService.findAll(query);
  }

  @Post()
  @UseGuards(AuthGuard())
  async creatOrder(@Body() order: creatOrderDto,@Req() req): Promise<Order> {
    return this.OrderService.creat(order,req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<Order> {
    return this.OrderService.findById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  async updateOne(
    @Param('id') id: string,
    @Body() order: updateOrderDto,
  ): Promise<Order> {
    return this.OrderService.update(id, order);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string) {
    return this.OrderService.delete(id);
  }
}
