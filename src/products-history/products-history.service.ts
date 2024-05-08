import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/user/user.schema';
import { USER_NOT_FOUND_ERROR } from 'src/user/users.const';
import { PRODUCT_HISTORY_NOT_FOUND_ERROR } from './products-history.const';

@Injectable()
export class ProductsHistoryService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<User>,

		private readonly productsService: ProductsService,
	) {}

	async findProductsHistoryByUsername(username: string) {
		const userProductsHistory = await this.userModel
			.findOne({ username })
			.exec();

		const productsHistory = await this.productsService.findProductsByArticles(
			userProductsHistory.history,
		);

		if (productsHistory.length === 0) {
			throw new NotFoundException(PRODUCT_HISTORY_NOT_FOUND_ERROR);
		}

		return productsHistory;
	}

	async addProductsHistoryByUsername(articles: string[], username: string) {
		try {
			const updatedUser = await this.userModel.findOneAndUpdate(
				{ username },
				{ $addToSet: { history: { $each: articles } } },
				{ new: true },
			);

			if (!updatedUser) {
				throw new NotFoundException('Пользователь не найден');
			}

			return updatedUser.history;
		} catch (error) {
			throw new Error(
				`Ошибка при добавлении продуктов в историю: ${error.message}`,
			);
		}
	}

	async removeProductsHistoryByUsername(username: string) {
		try {
			const updatedUser = await this.userModel.findOneAndUpdate(
				{ username },
				{ $unset: { history: 1 } },
				{ new: true },
			);

			if (!updatedUser) {
				throw new NotFoundException(USER_NOT_FOUND_ERROR);
			}

			return `${updatedUser.username}, история удалена`;
		} catch (error) {
			throw new Error(`Error deleting product from history: ${error.message}`);
		}
	}
}
