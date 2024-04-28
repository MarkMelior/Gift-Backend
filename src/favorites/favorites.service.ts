import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/product.schema';
import { ProductsService } from 'src/products/products.service';
import { User } from 'src/user/user.schema';
import { USER_NOT_FOUND_ERROR } from 'src/user/users.const';
import { FAVORITES_NOT_FOUND_ERROR } from './favorites.const';

@Injectable()
export class FavoritesService {
	constructor(
		@InjectModel(Product.name)
		private readonly productModel: Model<Product>,

		@InjectModel(User.name)
		private readonly userModel: Model<User>,

		private readonly productsService: ProductsService,
	) {}

	async findFavoritesByUsername(username: string) {
		const userFavorites = await this.userModel.findOne({ username }).exec();

		const favoritesProducts = await this.productsService.findByArticles(
			userFavorites.favorites,
		);

		if (favoritesProducts.length === 0) {
			throw new NotFoundException(FAVORITES_NOT_FOUND_ERROR);
		}

		return favoritesProducts;
	}

	async addFavoritesByUsername(favorites: string[], username: string) {
		try {
			const updatedUser = await this.userModel.findOneAndUpdate(
				{ username },
				{ $addToSet: { favorites: { $each: favorites } } },
				{ new: true },
			);

			if (!updatedUser) {
				throw new NotFoundException('Пользователь не найден');
			}

			return updatedUser.favorites;
		} catch (error) {
			throw new Error(
				`Ошибка при добавлении избранных продуктов: ${error.message}`,
			);
		}
	}

	async deleteFavoritesByUsername(article: string, username: string) {
		try {
			const updatedUser = await this.userModel.findOneAndUpdate(
				{ username },
				{ $pull: { favorites: article } },
				{ new: true },
			);

			if (!updatedUser) {
				throw new NotFoundException(USER_NOT_FOUND_ERROR);
			}

			return updatedUser.favorites;
		} catch (error) {
			throw new Error(
				`Error deleting product from favorites: ${error.message}`,
			);
		}
	}
}
