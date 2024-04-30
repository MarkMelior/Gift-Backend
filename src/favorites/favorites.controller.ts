import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtData } from 'src/app/decorators/jwt-data.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
@ApiTags('favorites')
export class FavoritesController {
	constructor(private readonly favoritesService: FavoritesService) {}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Get()
	async getUserFavorites(@JwtData() username: string) {
		return this.favoritesService.findFavoritesByUsername(username);
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post()
	async addUserFavorites(
		@Body() favorites: string[],
		@JwtData() username: string,
	) {
		return this.favoritesService.addFavoritesByUsername(favorites, username);
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Post('replace')
	async replaceUserFavorites(
		@Body() favorites: string[],
		@JwtData() username: string,
	) {
		return this.favoritesService.replaceFavoritesByUsername(
			favorites,
			username,
		);
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Delete(':article')
	async deleteUserFavorites(
		@Param('article') article: string,
		@JwtData() username: string,
	) {
		return this.favoritesService.deleteFavoritesByUsername(article, username);
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
	@Patch('toggle/:article')
	async toggleUserFavorites(
		@Param('article') article: string,
		@JwtData() username: string,
	) {
		return this.favoritesService.toggleFavoritesByUsername(article, username);
	}
}
