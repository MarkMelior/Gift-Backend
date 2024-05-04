import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
	REVIEW_NOT_FOUND,
	ReviewFindRequest,
} from 'src/app/contracts/commands';
import { ReviewCreateDto } from './review.dto';
import { Review } from './review.schema';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectModel(Review.name)
		private readonly reviewModel: Model<Review>,
	) {}

	async createReview(dto: ReviewCreateDto): Promise<Review> {
		const createdReview = await this.reviewModel.create(dto);
		return createdReview;
	}

	async deleteReview(id: string): Promise<Review> {
		const deletedReview = await this.reviewModel.findByIdAndDelete(id).exec();

		if (!deletedReview) {
			throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
		}

		return deletedReview;
	}

	async findReviews(dto: ReviewFindRequest) {
		const aggregatePipeline = [];

		if (dto.status) {
			aggregatePipeline.push({
				$match: {
					status: dto.status,
				},
			});
		}

		if (dto.userId) {
			aggregatePipeline.push({
				$match: {
					userId: dto.userId,
				},
			});
		}

		if (dto.ids && dto.ids.length) {
			const objectIds = dto.ids.map((id) => new Types.ObjectId(id));

			aggregatePipeline.push({
				$match: {
					_id: { $in: objectIds },
				},
			});
		}

		aggregatePipeline.push({ $limit: dto.limit ?? 10 });

		return (
			this.reviewModel
				.aggregate(aggregatePipeline)
				// .project(REVIEWS_DTO)
				.exec()
		);
	}
}
