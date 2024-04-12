import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from 'src/user/user.model';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel, ReviewStatus } from './review.model';

@Injectable()
export class ReviewService {
	constructor(
		@InjectRepository(ReviewModel)
		private readonly reviewModel: Repository<ReviewModel>,
	) {}

	async create(dto: CreateReviewDto): Promise<ReviewModel> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<ReviewModel> {
		const review = await this.reviewModel.findOneBy({ _id: parseInt(id) });

		return this.reviewModel.remove(review);
	}

	async findByUserId(userId: Pick<UserModel, '_id'>): Promise<ReviewModel[]> {
		return this.reviewModel.findBy({ userId });
	}

	async findByStatus(status: ReviewStatus): Promise<ReviewModel[]> {
		return this.reviewModel.findBy({ status });
	}
}
