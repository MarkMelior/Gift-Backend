import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { JwtData } from 'src/app/decorators/jwt-data.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
export class FavoritesController {
	constructor(private readonly favoritesService: FavoritesService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getUserFavorites(@JwtData() username: string) {
		return this.favoritesService.findFavoritesByUsername(username);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	async addUserFavorites(
		@Body() favorites: string[],
		@JwtData() username: string,
	) {
		return this.favoritesService.addFavoritesByUsername(favorites, username);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':article')
	async deleteUserFavorites(
		@Param('article') article: string,
		@JwtData() username: string,
	) {
		return this.favoritesService.deleteFavoritesByUsername(article, username);
	}
}
