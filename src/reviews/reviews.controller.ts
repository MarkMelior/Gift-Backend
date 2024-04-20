import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { IdValidationPipe } from '../app/pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewStatus } from './review.schema';
import { REVIEW_NOT_FOUND } from './reviews.const';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewsService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const review = await this.reviewsService.delete(id);

		if (!review) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byUser/:id')
	async getByUserId(@Param('id', IdValidationPipe) id: string) {
		return this.reviewsService.findByUserId(id);
	}

	@Get('byStatus/:status')
	async getByStatus(@Param('status') status: string) {
		const reviews = this.reviewsService.findByStatus(
			parseInt(status) as ReviewStatus,
		);
		return reviews;
	}
}
