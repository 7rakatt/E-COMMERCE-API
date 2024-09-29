import { PartialType } from '@nestjs/mapped-types';
import { creatProductDto } from './createProduct.dto';

export class updateProductDto extends PartialType(creatProductDto) {}
