import {
	Body,
	Controller,
	Delete,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Put,
	Query,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ArticleValidationPipe } from 'src/app/pipes/article-validation.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ProductCreateDto, ProductsFindDto } from './product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FilesInterceptor('images'))
	@ApiBearerAuth()
	@Post()
	async create(
		@UploadedFiles(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 20 })],
			}),
		)
		files: Express.Multer.File[],
		@Body() dto: { body: string },
	) {
		return this.productsService.createProduct(dto.body, files);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Put(':article')
	async updateProduct(
		@Param('article') article: string,
		@Body() dto: ProductCreateDto,
	) {
		return this.productsService.updateProduct(article, dto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete(':article')
	async deleteProduct(@Param('article') article: string) {
		return this.productsService.deleteProduct(article);
	}

	@Get()
	async findProducts(@Query() dto: ProductsFindDto) {
		return this.productsService.findProducts(dto);
	}

	@Get(':article')
	async findProductByArticle(
		@Param('article', ArticleValidationPipe) article: string,
	) {
		return this.productsService.findProductByArticle(article);
	}

	// @Get('prices')
	// async getPrices(): Promise<ProductPricesResponse> {
	// 	return this.productsService.getPrices();
	// }

	// @Post('images/:productArticle')
	// @HttpCode(HttpStatus.OK)
	// @UseGuards(JwtAuthGuard)
	// @ApiBearerAuth()
	// @UseInterceptors(FilesInterceptor('images'))
	// async uploadProducts(
	// 	@UploadedFiles(
	// 		new ParseFilePipe({
	// 			validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 20 })],
	// 		}),
	// 	)
	// 	files: Express.Multer.File[],
	// 	@Param('productArticle', ArticleValidationPipe) productArticle: string,
	// ) {
	// 	const uploadedImages = await this.filesService.uploadProductImages(
	// 		files,
	// 		productArticle,
	// 	);

	// 	const response = await this.productsService.addProductImages(
	// 		uploadedImages,
	// 		productArticle,
	// 	);

	// 	return response;
	// }

	// @Delete('images/:productArticle/:images')
	// @UseGuards(JwtAuthGuard)
	// @ApiBearerAuth()
	// async deleteProductImages(
	// 	@Param('productArticle', ArticleValidationPipe) productArticle: string,
	// 	@Param('images') images: string,
	// ) {
	// 	const imagesArray = images.split(',');

	// 	await this.filesService.deleteProductImages(productArticle, imagesArray);

	// 	const response = await this.productsService.deleteImages(
	// 		productArticle,
	// 		imagesArray,
	// 	);

	// 	return response;
	// }
}
