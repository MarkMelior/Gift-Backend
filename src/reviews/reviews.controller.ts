import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IdValidationPipe } from '../app/pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ReviewCreateDto, ReviewsFindDto } from './review.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	async createReview(@Body() dto: ReviewCreateDto) {
		return this.reviewsService.createReview(dto);
	}

	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async deleteReview(@Param('id', IdValidationPipe) id: string) {
		return this.reviewsService.deleteReview(id);
	}

	@Get()
	async findReviews(@Query() dto: ReviewsFindDto) {
		return this.reviewsService.findReviews(dto);
	}
}
