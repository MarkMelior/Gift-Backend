import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Param,
	Patch,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/app/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Product } from './product.schema';
import {
	PRODUCT_DELETE_ERROR,
	PRODUCT_NOT_FOUND_ERROR,
	PRODUCT_UPDATE_ERROR,
} from './products.const';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() dto: CreateProductDto) {
		return this.productsService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const product = await this.productsService.findById(id);

		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}

		return product;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productsService.deleteById(id);

		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_DELETE_ERROR);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: Product,
	) {
		const updatedProduct = await this.productsService.updateById(id, dto);

		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_UPDATE_ERROR);
		}

		return updatedProduct;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(HttpStatus.OK)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productsService.find(dto);
	}

	@Get('search/:text')
	async textSearch(@Param('text') text: string) {
		return this.productsService.findByText(text);
	}
}
