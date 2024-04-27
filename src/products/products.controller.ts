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
import { JwtData } from 'src/app/decorators/jwt-data.decorator';
import { ArticleValidationPipe } from 'src/app/pipes/article-validation.pipe';
import { IdValidationPipe } from 'src/app/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UsersService } from 'src/user/users.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Product } from './product.schema';
import {
	FAVORITES_NOT_FOUND_ERROR,
	PRODUCT_DELETE_ERROR,
	PRODUCT_NOT_FOUND_ERROR,
	PRODUCT_UPDATE_ERROR,
} from './products.const';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly usersService: UsersService,
	) {}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() dto: CreateProductDto) {
		return this.productsService.create(dto);
	}

	@Get('prices')
	async getPrices() {
		return this.productsService.getPrices();
	}

	@UseGuards(JwtAuthGuard)
	@Get('favorites')
	async getUserFavorites(@JwtData() username: string) {
		const userFavorites = await this.usersService.getUserFavorites(username);

		const favoritesProducts = await this.productsService.findByArticles(
			userFavorites.favorites,
		);

		if (favoritesProducts.length === 0) {
			throw new NotFoundException(FAVORITES_NOT_FOUND_ERROR);
		}

		return favoritesProducts;
	}

	@Get('search/:text')
	async textSearch(@Param('text') text: string) {
		return this.productsService.findByText(text);
	}

	@Get(':article')
	async get(@Param('article', ArticleValidationPipe) article: string) {
		const product = await this.productsService.findByArticle(article);

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
}
