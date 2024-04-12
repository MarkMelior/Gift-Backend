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
import { UserModel } from 'src/user/user.model';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_NOT_FOUND } from './review.const';
import { ReviewStatus } from './review.model';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
	private readonly reviewService: ReviewService;

	// constructor(private readonly reviewService: ReviewService) {}

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const review = await this.reviewService.delete(id);

		if (!review) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}

	@Get('byUser/:id')
	async getByUserId(@Param('id') id: Pick<UserModel, '_id'>) {
		return this.reviewService.findByUserId(id);
	}

	@Get('byStatus/:status')
	async getByStatus(@Param('status') status: ReviewStatus) {
		return this.reviewService.findByStatus(status);
	}
}
