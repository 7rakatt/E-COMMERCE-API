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
import { ProductService } from './product.service';
import { Product } from './schemas/product.schema';
import { creatProductDto } from './dtos/createProduct.dto';
import { updateProductDto } from '../product/dtos/updateProduct.dto';
import { Query as expressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';

@Controller('product')
export class ProductController {
  constructor(private ProductService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard())
  async findAll(@Query() query: expressQuery): Promise<Product[]> {
    return this.ProductService.findAll(query);
  }

  @Post()
  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard(), RolesGuard)
  async creatProduct(@Body() product: creatProductDto): Promise<Product> {
    return this.ProductService.creat(product);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.ProductService.findById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateOne(
    @Param('id') id: string,
    @Body() product: updateProductDto,
  ): Promise<Product> {
    return this.ProductService.update(id, product);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard(), RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param('id') id: string) {
    return this.ProductService.delete(id);
  }
}
