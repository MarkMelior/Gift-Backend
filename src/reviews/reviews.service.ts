import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.schema';

@Injectable()
export class ReviewsService {
	constructor(
		@InjectModel(Review.name)
		private readonly reviewModel: Model<Review>,
	) {}

	// ! FOR TEST
	getAll() {
		return this.reviewModel.find();
	}

	async create(dto: CreateReviewDto): Promise<Review> {
		const createdReview = this.reviewModel.create(dto);
		return createdReview;
	}

	async delete(id: string): Promise<Review> {
		const deletedReview = this.reviewModel.findByIdAndDelete(id).exec();
		return deletedReview;
	}

	// async findByUserId(userId: string): Promise<Review[]> {
	// 	return this.reviewModel.findById(userId);
	// }

	// async findByStatus(status: ReviewStatus): Promise<Review[]> {
	// 	return this.reviewModel.findBy({ status });
	// }
}
