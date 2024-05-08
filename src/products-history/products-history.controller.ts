import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtData } from 'src/auth/decorators/jwt-data.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ProductsHistoryService } from './products-history.service';

@ApiTags('products-history')
@Controller('products-history')
export class ProductsHistoryController {
	constructor(
		private readonly productsHistoryService: ProductsHistoryService,
	) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	async getProductsHistoryByUsername(@JwtData() username: string) {
		return this.productsHistoryService.findProductsHistoryByUsername(username);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async addProductsHistoryByUsername(
		@Body() articles: string[],
		@JwtData() username: string,
	) {
		return this.productsHistoryService.addProductsHistoryByUsername(
			articles,
			username,
		);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete()
	async removeProductsHistoryByUsername(@JwtData() username: string) {
		return this.productsHistoryService.removeProductsHistoryByUsername(
			username,
		);
	}
}
