import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	MaxFileSizeValidator,
	NotFoundException,
	Param,
	ParseFilePipe,
	Patch,
	Post,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductCardResponse, ProductPricesResponse } from 'src/app/contracts';
import { ArticleValidationPipe } from 'src/app/pipes/article-validation.pipe';
import { IdValidationPipe } from 'src/app/pipes/id-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FilesService } from 'src/files/files.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import {
	PRODUCT_DELETE_ERROR,
	PRODUCT_NOT_FOUND_ERROR,
	PRODUCT_UPDATE_ERROR,
} from './products.const';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('products')
export class ProductsController {
	constructor(
		private readonly productsService: ProductsService,
		private readonly filesService: FilesService,
	) {}

	@Post()
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async create(@Body() dto: CreateProductDto) {
		return await this.productsService.create(dto);
	}

	@HttpCode(HttpStatus.OK)
	@Get('find')
	async find(@Query() dto: FindProductDto): Promise<ProductCardResponse[]> {
		return this.productsService.find(dto);
	}

	@Get('prices')
	async getPrices(): Promise<ProductPricesResponse> {
		return this.productsService.getPrices();
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
	@ApiBearerAuth()
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedProduct = await this.productsService.deleteById(id);

		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_DELETE_ERROR);
		}
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Patch(':id')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: CreateProductDto,
	) {
		const updatedProduct = await this.productsService.updateById(id, dto);

		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_UPDATE_ERROR);
		}

		return updatedProduct;
	}

	@Post('images/:productArticle')
	@HttpCode(HttpStatus.OK)
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@UseInterceptors(FilesInterceptor('images'))
	async uploadProducts(
		@UploadedFiles(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 20 })],
			}),
		)
		files: Express.Multer.File[],
		@Param('productArticle', ArticleValidationPipe) productArticle: string,
	) {
		const uploadedImages = await this.filesService.uploadProductImages(
			files,
			productArticle,
		);

		const response = await this.productsService.addProductImages(
			uploadedImages,
			productArticle,
		);

		return response;
	}

	@Delete('images/:productArticle/:images')
	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	async deleteProductImages(
		@Param('productArticle', ArticleValidationPipe) productArticle: string,
		@Param('images') images: string,
	) {
		const imagesArray = images.split(',');

		await this.filesService.deleteProductImages(productArticle, imagesArray);

		const response = await this.productsService.deleteImages(
			productArticle,
			imagesArray,
		);

		return response;
	}
}
