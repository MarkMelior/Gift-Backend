import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewStatus } from './review.entity';
import { REVIEW_NOT_FOUND } from './reviews.const';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@Post()
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewsService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const review = await this.reviewsService.delete(id);

		if (!review) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byUser/:id')
	async getByUserId(@Param('id') id: number) {
		return this.reviewsService.findByUserId(id);
	}

	@Get('byStatus/:status')
	async getByStatus(@Param('status') status: ReviewStatus) {
		return this.reviewsService.findByStatus(status);
	}
}
