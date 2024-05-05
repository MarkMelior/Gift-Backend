import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtData } from 'src/auth/decorators/jwt-data.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FavoritesService } from './favorites.service';

@ApiTags('favorites')
@Controller('favorites')
export class FavoritesController {
	constructor(private readonly favoritesService: FavoritesService) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	async getUserFavorites(@JwtData() username: string) {
		return this.favoritesService.findFavoritesByUsername(username);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async addUserFavorites(
		@Body() favorites: string[],
		@JwtData() username: string,
	) {
		return this.favoritesService.addFavoritesByUsername(favorites, username);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Put()
	async replaceUserFavorites(
		@Body() favorites: string[],
		@JwtData() username: string,
	) {
		return this.favoritesService.replaceFavoritesByUsername(
			favorites,
			username,
		);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch('toggle/:article')
	async toggleUserFavorites(
		@Param('article') article: string,
		@JwtData() username: string,
	) {
		return this.favoritesService.toggleFavoritesByUsername(article, username);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete(':article')
	async deleteUserFavorites(
		@Param('article') article: string,
		@JwtData() username: string,
	) {
		return this.favoritesService.deleteFavoritesByUsername(article, username);
	}
}
