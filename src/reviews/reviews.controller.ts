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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReviewStatus } from 'src/app/contracts';
import { IdValidationPipe } from '../app/pipes/id-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './reviews.const';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@Post()
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewsService.create(dto);
	}

	@UseGuards(JwtAuthGuard)
	@ApiBearerAuth()
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
	async getByStatus(@Param('status') status: ReviewStatus) {
		const reviews = this.reviewsService.findByStatus(status);
		return reviews;
	}
}
