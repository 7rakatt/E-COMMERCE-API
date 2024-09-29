import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { updateProductDto } from 'src/product/dtos/updateProduct.dto';
import { Product } from './schemas/product.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';
import { creatProductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  async findAll(query: Query): Promise<Product[]> {
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
    const products = await this.productModel
      .find({ ...keyword })
      .limit(limit)
      .skip(skip);
    return products;
  }

  async creat(product: creatProductDto):Promise<Product> {
    const newProduct = await this.productModel.create(product);
    return newProduct;
  }

  async findById(id: string): Promise<Product> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('not valid id');
    }
    const product = await this.productModel.findById(id);
    if (!product) {
      throw new NotFoundException('product is not found');
    }
    return product;
  }

  async update(id: string, product: updateProductDto): Promise<Product> {
    const updatedproduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!product) {
      throw new NotFoundException('product is not found');
    }
    return updatedproduct;
  }

  async delete(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
}
