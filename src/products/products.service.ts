import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto, SortSorting } from './dto/find-product.dto';
import { Product } from './product.schema';

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product.name)
		private readonly productModel: Model<Product>,
	) {}

	async create(dto: CreateProductDto) {
		const createdProduct = await this.productModel.create(dto);
		return createdProduct;
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async findByArticle(article: string) {
		return this.productModel.findOne({ article }).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async find(dto: FindProductDto) {
		const aggregatePipeline = [];

		// Фильтрация по максимальной цене
		if (dto.maxPrice !== undefined) {
			aggregatePipeline.push({
				$match: {
					'markets.price': { $lte: dto.maxPrice },
				},
			});
		}

		// Фильтрация по минимальной цене
		if (dto.minPrice !== undefined) {
			aggregatePipeline.push({
				$match: {
					'markets.price': { $gte: dto.minPrice },
				},
			});
		}

		// Добавление фильтров
		if (dto.filters && dto.filters.length > 0) {
			const filterMatch = dto.filters.map((filter) => ({ filters: filter }));
			aggregatePipeline.push({
				$match: {
					$and: filterMatch,
				},
			});
		}

		// Добавление сортировки
		if (dto.sort) {
			switch (dto.sort) {
				case SortSorting.POPULAR:
					// Сортировка по популярности
					aggregatePipeline.push({ $sort: { reviewCount: -1 } });
					break;
				case SortSorting.RATING:
					// Сортировка по рейтингу
					aggregatePipeline.push({ $sort: { 'markets.rating': -1 } });
					break;
				case SortSorting.CREATIVITY:
					// Сортировка по креативности
					aggregatePipeline.push({ $sort: { creativity: -1 } });
					break;
				case SortSorting.EXPENSIVE:
					// Сортировка по убыванию цены
					aggregatePipeline.push({ $sort: { 'markets.price': -1 } });
					break;
				case SortSorting.CHEAP:
					// Сортировка по возрастанию цены
					aggregatePipeline.push({ $sort: { 'markets.price': 1 } });
					break;
				case SortSorting.NEW:
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
		aggregatePipeline.push({ $limit: dto.limit });

		return this.productModel.aggregate(aggregatePipeline).exec();
	}

	async findByText(text: string) {
		return this.productModel
			.find({
				$or: [
					{ title: { $regex: text, $options: 'i' } },
					{ seoText: { $regex: text, $options: 'i' } },
				],
			})
			.exec();
	}

	async getPrices() {
		const result = await this.productModel
			.aggregate([
				{
					$unwind: '$markets',
				},
				{
					$group: {
						_id: null,
						minPrice: { $min: '$markets.price' },
						maxPrice: { $max: '$markets.price' },
						avgPrice: { $avg: '$markets.price' },
					},
				},
				{
					$project: {
						_id: 0,
						minPrice: 1,
						maxPrice: 1,
						avgPrice: 1,
					},
				},
			])
			.exec();

		return result.length > 0 ? result[0] : {};
	}
}
