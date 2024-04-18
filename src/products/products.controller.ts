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
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
	@Post('create')
	async create(@Body() dto: Omit<Product, '_id'>) {}

	@Get(':id')
	async get(@Param('id') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: Product) {}

	@HttpCode(HttpStatus.OK)
	@Post('find')
	async find(@Body() dto: FindProductDto) {}
}
