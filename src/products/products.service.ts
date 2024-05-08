import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
	ProductCreateRequestSchema,
	SortSortingEnum,
} from 'src/app/contracts/commands';
import { FilesService } from 'src/files/files.service';
import { ProductCreateDto, ProductsFindDto } from './product.dto';
import { Product } from './product.schema';
import {
	PRODUCTS_CARD_DTO,
	PRODUCT_DELETE_ERROR,
	PRODUCT_NOT_FOUND_ERROR,
	PRODUCT_UPDATE_ERROR,
} from './products.const';

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product.name)
		private readonly productModel: Model<Product>,

		private readonly filesService: FilesService,
	) {}

	async createProduct(dto: string, files: Express.Multer.File[]) {
		if (!dto) {
			throw new BadRequestException('Отсутствует тело запроса body');
		}

		const article = String(Math.floor(Math.random() * 900000000) + 100000000);

		const validationResult = ProductCreateRequestSchema.safeParse(
			JSON.parse(dto),
		);

		if (validationResult.success) {
			const uploadedImages = await this.filesService.uploadProductImages(
				files,
				article,
			);

			const request: ProductCreateDto = {
				...validationResult.data,
				article,
				images: uploadedImages,
			};

			return this.productModel.create(request);
		} else {
			throw new BadRequestException(validationResult.error);
		}
	}

	async updateProduct(article: string, dto: ProductCreateDto) {
		const updatedProduct = await this.productModel
			.findOneAndUpdate({ article }, dto, { new: true })
			.exec();

		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_UPDATE_ERROR);
		}

		return updatedProduct;
	}

	async deleteProduct(article: string) {
		const deletedProduct = this.productModel
			.findOneAndDelete({ article })
			.exec();

		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_DELETE_ERROR);
		}

		return deletedProduct;
	}

	async findProductByArticle(article: string) {
		const product = await this.productModel.findOne({ article }).exec();

		if (!product) {
			throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
		}

		return product;
	}

	async findProductsByArticles(articles: string[]) {
		return this.productModel
			.find({ article: { $in: articles } })
			.select(PRODUCTS_CARD_DTO)
			.exec();
	}

	async findProducts(dto: ProductsFindDto) {
		const aggregatePipeline = [];

		// Поиск по param
		if (dto.param) {
			aggregatePipeline.push({
				$match: {
					$or: [
						{ title: { $regex: dto.param, $options: 'i' } },
						{ description: { $regex: dto.param, $options: 'i' } },
					],
				},
			});
		}

		// Поиск по артикулам продуктов
		if (dto.articles && dto.articles.length) {
			aggregatePipeline.push({
				$match: {
					article: { $in: dto.articles },
				},
			});
		}

		// Фильтрация по максимальной цене
		if (dto.maxPrice) {
			aggregatePipeline.push({
				$match: {
					'markets.price': { $lte: dto.maxPrice },
				},
			});
		}

		// Фильтрация по минимальной цене
		if (dto.minPrice) {
			aggregatePipeline.push({
				$match: {
					'markets.price': { $gte: dto.minPrice },
				},
			});
		}

		// Добавление фильтров
		if (dto.filters && dto.filters.length > 0) {
			const filterNotMatch = dto.filters.map((filter) => ({
				filters: { $nin: [filter] },
			}));
			aggregatePipeline.push({
				$match: {
					$and: filterNotMatch,
				},
			});
		}

		// Добавление сортировки
		if (dto.sort) {
			switch (dto.sort) {
				case SortSortingEnum.Enum.popular:
					// Сортировка по популярности
					aggregatePipeline.push({ $sort: { reviewCount: -1 } });
					break;
				case SortSortingEnum.Enum.rating:
					// Сортировка по рейтингу
					aggregatePipeline.push({ $sort: { 'markets.rating': -1 } });
					break;
				case SortSortingEnum.Enum.creativity:
					// Сортировка по креативности
					aggregatePipeline.push({ $sort: { creativity: -1 } });
					break;
				case SortSortingEnum.Enum.expensive:
					// Сортировка по убыванию цены
					aggregatePipeline.push({ $sort: { 'markets.price': -1 } });
					break;
				case SortSortingEnum.Enum.cheap:
					// Сортировка по возрастанию цены
					aggregatePipeline.push({ $sort: { 'markets.price': 1 } });
					break;
				case SortSortingEnum.Enum.new:
					// Сортировка по новизне
					aggregatePipeline.push({ $sort: { createdAt: -1 } });
					break;
				default:
					// По умолчанию сортируем по популярности
					aggregatePipeline.push({ $sort: { reviewCount: -1 } });
					break;
			}
		}

		// Добавление лимита
		aggregatePipeline.push({ $limit: dto.limit ?? 20 });

		return this.productModel
			.aggregate(aggregatePipeline)
			.project(PRODUCTS_CARD_DTO)
			.exec();
	}

	// async getPrices() {
	// 	const result = await this.productModel
	// 		.aggregate([
	// 			{
	// 				$unwind: '$markets',
	// 			},
	// 			{
	// 				$group: {
	// 					_id: null,
	// 					minPrice: { $min: '$markets.price' },
	// 					maxPrice: { $max: '$markets.price' },
	// 					avgPrice: { $avg: '$markets.price' },
	// 				},
	// 			},
	// 			{
	// 				$project: {
	// 					_id: 0,
	// 					minPrice: 1,
	// 					maxPrice: 1,
	// 					avgPrice: 1,
	// 				},
	// 			},
	// 		])
	// 		.exec();

	// 	return result.length > 0 ? result[0] : {};
	// }

	// async addProductImages(uploadedImages: string[], productArticle: string) {
	// 	const product = await this.findByArticle(productArticle);

	// 	if (!product) {
	// 		throw new NotFoundException('Продукт не найден');
	// 	}

	// 	const updatedImages = [...product.images, ...uploadedImages];

	// 	const updatedProduct = await this.productModel.findOneAndUpdate(
	// 		{ article: productArticle },
	// 		{ images: updatedImages },
	// 		{ new: true },
	// 	);

	// 	if (!updatedProduct) {
	// 		throw new NotFoundException('Не удалось обновить продукт');
	// 	}

	// 	return updatedProduct.images;
	// }

	// async deleteImages(productArticle: string, images: string[]) {
	// 	const product = await this.findByArticle(productArticle);

	// 	if (!product) {
	// 		throw new NotFoundException('Продукт не найден');
	// 	}

	// 	const updatedImages = product.images.filter(
	// 		(image) => !images.includes(image),
	// 	);

	// 	const updatedProduct = await this.productModel.findOneAndUpdate(
	// 		{ article: productArticle },
	// 		{ images: updatedImages },
	// 		{ new: true },
	// 	);

	// 	if (!updatedProduct) {
	// 		throw new NotFoundException('Не удалось обновить продукт');
	// 	}

	// 	return updatedProduct.images;
	// }
}
